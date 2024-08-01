import { CurrQuestionContext } from '@utils/context/questionContext'
import { emitCloseStream } from '@utils/eventsEmitter'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DisplayChatTab } from '../components/Chat/DisplayChatTab'
import { InitialQuestion } from '../types'
import { useParams } from 'react-router-dom'
import { useGetArchive } from '@api'

export function Chatbot({ chatId }: { chatId?: number }) {
  const dispatch = useDispatch()
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const { id } = useParams<{ id: string }>()
  const { data: archiveData, isLoading } = useGetArchive(chatId)
  console.log('archiveData', archiveData)
  console.log('chatid', chatId) 
/*   useEffect(() => {
    if (chatId !== undefined && archiveData) {
      if (Array.isArray(archiveData)) {
        for (let i = archiveData.length - 1; i >= 0; i--) {
          dispatch({ type: 'ADD_HISTORY', newItem: archiveData[i] })
        }
      }
    }
  }, [chatId, archiveData, dispatch]) */
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'SET_CHAT_ID',
        nextChatId: Number(id),
      })
    }
  }, [id, dispatch])
  const updateCurrQuestion = (newQuestion) => {
    setCurrQuestion(newQuestion)
  }

  useEffect(() => {
    emitCloseStream()
    dispatch({ type: 'SET_CHAT_ID', nextChatId: 0 })
    dispatch({ type: 'SET_STREAM_ID', nextChatId: 0 })
    return () => {
      emitCloseStream()
      dispatch({ type: 'RESET_USER' })
    }
  }, [])

  return (
    <CurrQuestionContext.Provider value={{ currQuestion, updateCurrQuestion }}>
      <DisplayChatTab  />
    </CurrQuestionContext.Provider>
  )
}
