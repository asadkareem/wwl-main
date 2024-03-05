import React, { useState } from 'react'
import './index.scss'
import { Button } from '@workweeklunchui/wwl-core-ui'
import { Drawer } from '@material-ui/core'
import Icon from '../../Icon'
import NotesView from './components/NotesView'
import { useSelector } from 'react-redux'

const RecipeNotes = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const communityNotes = useSelector(state => state.notes.communityNotes)

  const handleOpen = () => {
    setDrawerOpen(true)
  }

  const handleClose = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      <Button colorScheme='navy' className='notes-button' onClick={handleOpen}>
       <div className='badge-wrapper'>
        <Icon icon='notes' className='notes-button-icon' />
        {communityNotes.length > 0 && <div className='notes-badge'>!</div>}
        </div>
        Notes
      </Button>
      <Drawer anchor='right' open={drawerOpen} onClose={handleClose}>
        <NotesView recipeId={recipeId} handleClose={handleClose} />
      </Drawer>
    </>
  )
}

export default RecipeNotes
