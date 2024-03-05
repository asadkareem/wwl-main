import React from 'react'
import { Button } from '@workweeklunchui/wwl-core-ui'
import { useDispatch, useSelector } from 'react-redux'
import { changeText, selectNotesState } from '../../../../../../redux/notes/notesSlice'
import { selectCurrentUser } from '../../../../../../redux/user/userSlice'
import { PostButtons } from './PostButtons'

const ReplyInput = ({ noteID, recipeId, replyInput, setReplyInput, displayedNoteType }) => {
  const { replyText } = useSelector(selectNotesState)
  const { name } = useSelector(selectCurrentUser)

  const dispatch = useDispatch()

  return (
    replyInput && (
      <div className='Reply__Container'>
        <div className='Reply__Container__Header'>
          <div className='SingleNote__userInitial'>
            <div className='SingleNote__userInitial__Yellow'>{name.charAt(0)}</div>
          </div>
          <div className='Reply__Container__Header__ReplyAuthor'>
            {name}
            <br />
            {/* <span>This appears on your posts</span> */}
          </div>
          {/* <Button colorScheme='navy' variant='flat'>
            Edit
          </Button> */}
        </div>
        <div className='TextArea__Container expanded'>
          <textarea
            type='text'
            value={replyText}
            onChange={(e) =>
              dispatch(
                changeText({
                  textValue: e.target.value,
                  textType: 'replyText'
                })
              )
            }
          />
        </div>
        <div className='Reply__Container__Footer'>
          <PostButtons
            textType='replyText'
            text={replyText}
            recipeId={recipeId}
            noteID={noteID}
            displayedNoteType={displayedNoteType}
            setVisible={setReplyInput}
          />
          {/* <div>Posting Rules</div> */}
        </div>
      </div>
    )
  )
}

export default ReplyInput
