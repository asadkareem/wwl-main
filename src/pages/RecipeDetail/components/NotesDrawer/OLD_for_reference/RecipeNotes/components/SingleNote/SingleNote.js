import React, { useState } from 'react'
import ReplyInput from './components/ReplyInput'
import { Button } from '@workweeklunchui/wwl-core-ui'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../../../../redux/navigation/navigationSlice'
import { deleteNote, updateNote } from '../../../../../redux/notes/notesThunk'
import ReplyChain from './components/ReplyChain'
import { ActionMenu } from './components/ActionMenu'
import { FlagNotice } from './components/FlagNotice'
import Icon from '../../../../Icon'
import { colors } from '../../../../../colors'

const SingleNote = ({ type, noteID, recipeId, note, avatarColor, userId, noteOwnerId, isAdmin, displayedNoteType }) => {
  const dispatch = useDispatch()
  const [replyInput, setReplyInput] = useState(false)

  const postDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const onPin = () => {
    dispatch(updateNote({ id: note.id, isPinned: !note.isPinned }))
  }

  const onFlag = () => {
    dispatch(updateNote({ id: note.id, isFlagged: !note.isFlagged }))
    if (!note.isFlagged) dispatch(setNotification({ msg: 'Thank you for your feedback!' }))
  }

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete the note?')) {
      dispatch(deleteNote({ id: note.id, displayedNoteType: note.displayedNoteType }))
    }
  }

  return (
    <div className={type === 'reply' ? 'SingleReply' : 'SingleNote'}>
      <div className={type === 'reply' ? 'ReplyChain__Container' : 'SingleNote__Container'}>
        <div className='SingleNote__userInitial'>
          <div className={`SingleNote__userInitial__` + avatarColor}>{note.userName.charAt(0)}</div>
        </div>
        <div className={type === 'reply' ? 'SingleReply__Content' : 'SingleNote__Content'}>
          <div className='SingleNote__Content__textContainer'>
            <span className='SingleNote__Content__textContainer__Header'>{note.userName}</span>
            <span className='SingleNote__Content__textContainer__Header date'>Posted {postDate}</span>
            <span className='SingleNote__Content__textContainer__postText'>{note.contents}</span>
          </div>
          <div className='SingleNote__Content__footer'>
            <div className='SingleNote__Content__footer__buttons'>
              {note.isFlagged && isAdmin ? (
                <FlagNotice onDelete={onDelete} onFlag={onFlag} />
              ) : (
                <Button colorScheme='gray' variant='flat' onClick={() => setReplyInput(true)}>
                  Reply
                </Button>
              )}
            </div>
            {type === 'note' && note.isPinned && (
              <div className='SingleNote__Content__footer__pinnedBy'>
                <Icon icon={'pin'} height={12} width={12} color={colors['primary'][80]} /> Pinned by{' '}
                {note.displayedNoteType === 'personal' ? 'you' : 'WWL'}
              </div>
            )}
          </div>
          {replyInput && (
            <ReplyInput
              noteID={noteID}
              recipeId={recipeId}
              replyInput={replyInput}
              setReplyInput={setReplyInput}
              displayedNoteType={displayedNoteType}
            />
          )}
        </div>
        {!note.isFlagged && (
          <ActionMenu
            type={type}
            displayedNoteType={note.displayedNoteType}
            isPinned={note.isPinned}
            isAdmin={isAdmin}
            isNoteOwner={userId === noteOwnerId}
            onDelete={onDelete}
            onPin={onPin}
            onFlag={onFlag}
          />
        )}
      </div>
      {type === 'note' && (
        <ReplyChain
          noteID={noteID}
          recipeId={recipeId}
          userId={userId}
          noteOwnerId={noteOwnerId}
          isAdmin={isAdmin}
          displayedNoteType={displayedNoteType}
        />
      )}
    </div>
  )
}

export default SingleNote
