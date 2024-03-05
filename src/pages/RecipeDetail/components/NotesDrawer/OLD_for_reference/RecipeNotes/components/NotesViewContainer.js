import React from 'react'
import { SegmentedControl, SegmentedControls } from '@workweeklunchui/wwl-core-ui'

const NotesViewContainer = ({ children, handleClose, setDisplayedNoteType }) => (
  <div className='container'>
    <div className='stickyHeader'>
      <div className='stickyHeader__Title'>
        <h1>Notes</h1>
        <div onClick={handleClose}>&#10006;</div>
      </div>
      <div className='stickyHeader__buttons'>
        <SegmentedControls>
          <SegmentedControl onClick={() => setDisplayedNoteType('personal')}>Personal Notes</SegmentedControl>
          <SegmentedControl onClick={() => setDisplayedNoteType('community')}>Community Notes</SegmentedControl>
        </SegmentedControls>
      </div>
    </div>
    {children}
  </div>
)

export default NotesViewContainer
