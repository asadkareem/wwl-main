import React, { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import SingleNote from '../SingleNote'
import { useSelector } from 'react-redux'
import { selectNotesState } from '../../../../../../redux/notes/notesSlice'

const ReplyChain = ({ noteID, recipeId, userId, noteOwnerId, isAdmin, displayedNoteType }) => {
  const { personalNotes, communityNotes } = useSelector(selectNotesState)

  const [isOpen, setIsOpen] = useState(false)
  const [replies, setReplies] = useState(null)

  useEffect(() => {
    displayedNoteType === 'personal'
      ? setReplies(personalNotes.filter((note) => note.parentId === noteID).reverse())
      : setReplies(communityNotes.filter((note) => note.parentId === noteID).reverse())
  }, [communityNotes, displayedNoteType, noteID, personalNotes])

  const avatarColor = ['Yellow', 'Pink', 'Teal', 'Navy']

  return replies?.length ? (
    <>
      <div className='CommenChain__Toggle' onClick={() => setIsOpen(() => !isOpen)}>
        {replies.length} {replies.length > 1 ? 'Replies' : 'Reply'}
        {!isOpen ? <ChevronDownIcon className='inline-icons' /> : <ChevronUpIcon className='inline-icons' />}
      </div>

      {isOpen && (
        <div className='ReplyChain__ParentContainer'>
          {replies.map((reply, index) => (
            <SingleNote
              key={reply.id}
              type={'reply'}
              noteID={noteID}
              recipeId={recipeId}
              note={reply}
              avatarColor={avatarColor[index % 4]}
              userId={userId}
              noteOwnerId={noteOwnerId}
              isAdmin={isAdmin}
              displayedNoteType={displayedNoteType}
            />
          ))}
        </div>
      )}
    </>
  ) : null
}

export default ReplyChain
