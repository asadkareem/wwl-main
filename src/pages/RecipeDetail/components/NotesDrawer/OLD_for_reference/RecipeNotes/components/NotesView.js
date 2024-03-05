import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotesViewContainer from './NotesViewContainer'
import SingleNote from './SingleNote/SingleNote'
import NoteInput from './SingleNote/components/NoteInput'
import Loading from '../../../Helpers/Loading'
import { selectCurrentUser } from '../../../../redux/user/userSlice'
import { selectNotesState } from '../../../../redux/notes/notesSlice'
import { getNotes } from '../../../../redux/notes/notesThunk'
import './index.css'

function NotesView({ recipeId, handleClose }) {
  const dispatch = useDispatch()

  const { id, isAdmin } = useSelector(selectCurrentUser)
  const { isLoading, personalNotes, communityNotes } = useSelector(selectNotesState)

  const [displayedNoteType, setDisplayedNoteType] = useState('personal')

  const avatarColor = ['Yellow', 'Pink', 'Teal', 'Navy']

  let notesDisplayed = displayedNoteType === 'personal' ? personalNotes : communityNotes

  useEffect(() => {
    if (!notesDisplayed.length || recipeId !== notesDisplayed[0].recipeId) {
      dispatch(getNotes({ recipeId, displayedNoteType }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, notesDisplayed.length, displayedNoteType, recipeId])

  return (
    <NotesViewContainer handleClose={handleClose} setDisplayedNoteType={setDisplayedNoteType}>
      <NoteInput recipeId={recipeId} displayedNoteType={displayedNoteType} />
      {isLoading ? (
        <div className='NotesLoader'>
          <Loading height={40} width={40} />
        </div>
      ) : notesDisplayed.length === 0 || (!isAdmin && notesDisplayed.every((note) => note.isFlagged)) ? (
        <div className='No_Notes'>No Notes to show</div>
      ) : (
        [
          ...notesDisplayed.filter((note) => !note.parentId && (note.isPinned || (isAdmin && note.isFlagged))),
          ...notesDisplayed.filter((note) => !note.parentId && !note.isPinned && !note.isFlagged)
        ].map((note, index) => (
          <SingleNote
            key={note.id}
            type={'note'}
            noteID={note.id}
            recipeId={recipeId}
            note={note}
            avatarColor={avatarColor[index % 4]}
            userId={id}
            noteOwnerId={note.userId}
            isAdmin={isAdmin}
            displayedNoteType={displayedNoteType}
          />
        ))
      )}
    </NotesViewContainer>
  )
}

export default NotesView
