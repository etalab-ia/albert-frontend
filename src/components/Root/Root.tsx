import { userUrl } from '@api'
import { InitialUserAuth, type UserAuth } from '@utils/auth'
import { isMFSContext } from '@utils/context/isMFSContext'
import { checkConnexion } from '@utils/localStorage'
import { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from '../../pages/404'
import { Chatbot } from '../../pages/Chatbot'
import { Contact } from '../../pages/Contact'
import { FAQ } from '../../pages/FAQ'
import { History } from '../../pages/History'
import { Login } from '../../pages/Login'
import { NewPassword } from '../../pages/NewPassword'
import { ResetPassword } from '../../pages/ResetPassword'
import { Signup } from '../../pages/Signup'
import { Tools } from '../../pages/Tools'
import Footer from './Footer'
import Header from './Header'

export const Root = () => {
  const [userAuth, setUserAuth] = useState<UserAuth>(InitialUserAuth)
  const [authFailed, setAuthFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isMFS = useContext(isMFSContext)
  const location = useLocation()
  const ChatbotPathRegex = /^\/chat(\/.*)?$/

  useEffect(() => {
    checkConnexion(setUserAuth, userUrl).finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col" id="screen">
      <Header
        username={userAuth.username}
        setUserAuth={setUserAuth}
        userAuth={userAuth}
      />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/login"
            element={
              !userAuth.isLogin ? (
                <Login
                  authFailed={authFailed}
                  setAuthFailed={setAuthFailed}
                  setUserAuth={setUserAuth}
                />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />
          {isMFS ? (
            <Route path="/FAQ" element={<FAQ />} />
          ) : (
            <Route
              path={'/FAQ'}
              element={
                !userAuth.isLogin ? <Navigate to="/login" /> : <Navigate to="/404" />
              }
            />
          )}

          <Route
            path="/chat"
            element={!userAuth.isLogin ? <Navigate to="/login" /> : <Chatbot />}
          />
          <Route
            path="/chat/:id"
            element={!userAuth.isLogin ? <Navigate to="/login" /> : <Chatbot />}
          />
          <Route
            path="/history"
            element={!userAuth.isLogin ? <Navigate to="/login" /> : <History />}
          />
          <Route
            path="/"
            element={
              !userAuth.isLogin ? <Navigate to="/login" /> : <Navigate to="/chat" />
            }
          />
          <Route path="/404" element={<Error404 />} />
          {!isMFS ? (
            <Route
              path="/chat"
              element={!userAuth.isLogin ? <Navigate to="/login" /> : <Chatbot />}
            />
          ) : (
            <Route
              path={'/chat'}
              element={
                !userAuth.isLogin ? <Navigate to="/login" /> : <Navigate to="/404" />
              }
            />
          )}
          <Route
            path="/contact"
            element={
              !userAuth.isLogin ? (
                <Navigate to="/login" />
              ) : (
                <Contact setUserAuth={setUserAuth} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                authFailed={authFailed}
                setAuthFailed={setAuthFailed}
                userAuth={userAuth}
                setUserAuth={setUserAuth}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ResetPassword
                setAuthFailed={setAuthFailed}
                userAuth={userAuth}
                setUserAuth={setUserAuth}
              />
            }
          />
          <Route
            path="/new-password"
            element={
              <NewPassword authFailed={authFailed} setAuthFailed={setAuthFailed} />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      {!ChatbotPathRegex.test(location.pathname) &&
        location.pathname !== '/chat' &&
        location.pathname !== '/' && <Footer />}
    </div>
  )
}
