import { useSelector } from 'react-redux'
import type { RootState } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { MeetingRelatedQuestions } from './MeetingRelatedQuestions'
import { MeetingStream } from './MeetingStream'

export function MeetingMainResponse({
  setQuestion,
}: { setQuestion: (question: string) => void }) {
  const user = useSelector((state: RootState) => state.user)

  return (
    <GlobalColContainer extraClass=" h-[100%]">
      <div>
        {!user.chatId && (
          <>
            <h2 className="fr-mb-2w">Poser une question à Albert</h2>
            <p>
              Albert France services a pour objectif de faciliter les missions
              quotidiennes des conseillers France services en proposant des réponses
              personnalisées à des cas d’usage donnés. <br />
              <br />
              Pour disposer d’une réponse pertinente, veuillez vous reporter aux conseils
              d’utilisation et dialoguez avec Albert pour affiner la réponse.
            </p>
            <div className="flex gap-4 space-between flex-grow fr-mt-4w">
              <div>
                <h6 style={{ lineHeight: 1 }} className="fr-mb-3v fr-mt-2w ">
                  Première utilisation ?
                </h6>
                <p className="fr-mb-3v">Cliquez sur la question pour tester Albert</p>
              </div>
              <div
                onClick={() => setQuestion('Peut-on faire une saisie sur le RSA ?')}
                className="fr-background-alt--blue-france fr-p-2w fr-text--md cursor-pointer rounded bg-contain  fr-mt-2w ml-auto fr-mr-6w"
              >
                Peut-on faire une saisie sur le RSA ?
              </div>
            </div>
          </>
        )}
        {user.chatId !== 0 && user.lastStreamId !== 0 && (
          <div className="flex flex-col space-between flex-grow">
            <MeetingStream />
            <MeetingRelatedQuestions setQuestion={setQuestion} />
          </div>
        )}
      </div>
    </GlobalColContainer>
  )
}
