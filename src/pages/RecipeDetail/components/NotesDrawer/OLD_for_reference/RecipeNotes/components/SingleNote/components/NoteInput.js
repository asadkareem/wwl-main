import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeText, selectNotesState } from '../../../../../../redux/notes/notesSlice'
import { PostButtons } from './PostButtons'

const NoteInput = ({ recipeId, displayedNoteType }) => {
  const dispatch = useDispatch()

  const { noteText } = useSelector(selectNotesState)

  const [btnsVisible, setBtnsVisible] = useState(false)

  return (
    <>
      <div className={btnsVisible ? 'TextArea__Container expanded' : 'TextArea__Container'}>
        <textarea
          onClick={() => setBtnsVisible(true)}
          onChange={(e) => dispatch(changeText({ textValue: e.target.value, textType: 'noteText' }))}
          type='text'
          placeholder={displayedNoteType === 'personal' ? 'Add a note to self' : 'Share a note with everyone'}
          value={noteText}
        />
      </div>

      {btnsVisible && (
        <div className='MainPostButtons__Container'>
          <PostButtons
            textType='noteText'
            text={noteText}
            recipeId={recipeId}
            displayedNoteType={displayedNoteType}
            setVisible={setBtnsVisible}
          />
        </div>
      )}
    </>
  )
}

export default NoteInput
