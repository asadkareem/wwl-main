import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@workweeklunchui/wwl-core-ui'
import { changeText } from '../../../../../../redux/notes/notesSlice'
import { postNote } from '../../../../../../redux/notes/notesThunk'

export const PostButtons = ({ textType, text, recipeId, noteID = null, displayedNoteType, setVisible }) => {
  const dispatch = useDispatch()

  const onCancel = () => {
    dispatch(changeText({ textValue: '', textType: textType }))
    setVisible(false)
  }

  const onPost = () => {
    dispatch(
      postNote({
        displayedNoteType: displayedNoteType,
        contents: text,
        parentId: noteID,
        isPinned: false,
        isFlagged: false,
        recipeId: recipeId
      })
    )
    dispatch(changeText({ textValue: '', textType: textType }))
    setVisible(false)
  }

  return (
    <>
      <Button
        colorScheme='navy'
        isDisabled={text ? false : true}
        variant={text ? 'filled' : 'flate'}
        onClick={() => onPost()}
      >
        Post
      </Button>
      <Button colorScheme='navy' variant='flat' onClick={() => onCancel()}>
        Cancel
      </Button>
    </>
  )
}
