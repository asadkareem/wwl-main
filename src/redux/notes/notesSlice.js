import {createSlice} from '@reduxjs/toolkit'
import {getNotes, postNote, updateNote, deleteNote} from './notesThunk'

const initialState = {
  status: null,
  isLoading: false,
  personalNotes: [],
  communityNotes: [],
  editableNote: null
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: { //dunno what is chnageText
    changeText: (state, {payload}) => {
      const textType = payload.textType
      const textValue = payload.textValue
      state[textType] = textValue
    },
    editNote: (state, {payload}) => {
      state.editableNote = payload
    },
    removeNote: (state) => {
      state.editableNote = null
    }
  },
  extraReducers: {
    [getNotes.pending]: (state) => {
      state.isLoading = true
    },
    [getNotes.fulfilled]: (state, {payload}) => {
      state.isLoading = false
      if (payload[1] === 'personal') state.personalNotes = payload[0]
      else state.communityNotes = payload[0]
    },
    [getNotes.rejected]: (state) => {
      state.isLoading = false
    },
    [postNote.pending]: (state) => {
      state.status = 'pending'
    },
    [postNote.fulfilled]: (state, {payload}) => {
      state.status = 'success'
      if (payload.parent_note) {
        // eslint-disable-next-line array-callback-return
        state.communityNotes.notes.map(note => {
          if (note._id === payload.parent_note) { //accessing the note
            if (note.replies) {
              note.replies.push(payload)
            } else {
              note.replies = [payload]
            }
          }
        })
      } else if (payload.note_type === 'personal') {
        state.personalNotes.notes.push(payload)
      } else if (payload.note_type === 'comments') {
        state.communityNotes.notes.push(payload)
      }
    },
    [postNote.rejected]: (state) => {
      state.status = 'failed'
    },
    [updateNote.pending]: (state) => {
      state.status = 'pending'
    },
    [updateNote.fulfilled]: (state, {payload}) => {
      state.status = 'success'
      if (payload.data.parent_note) {
        let replyIndex = state.communityNotes.notes[payload.parentIndex].replies.findIndex(reply => reply._id === payload.data._id); // find the index of the reply
        if (replyIndex !== -1) { // check if the reply was found
          state.communityNotes.notes[payload.parentIndex].replies[replyIndex] = payload.data // update the text property
        }
      } else if (payload.data.note_type === 'personal') {
        const elemIndex = state.personalNotes.notes.findIndex((obj) => obj._id === payload.data._id);
        state.personalNotes.notes[elemIndex].contents = payload.data.contents
      } else if (payload.data.note_type === 'comments') {
        const elemIndex = state.communityNotes.notes.findIndex((obj) => obj._id === payload.data._id);
        state.communityNotes.notes[elemIndex].contents = payload.data.contents
      }
    },
    [updateNote.rejected]: (state) => {
      state.status = 'failed'
    },
    [deleteNote.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteNote.fulfilled]: (state, {payload}) => { //id, noteType, Isreply, Parentindex
      state.status = 'success'
      if (payload[2] && payload[1] === 'comments') {
        state.communityNotes.notes[payload[3]].replies = state.communityNotes.notes[payload[3]].replies.filter(item => item._id !== payload[0]);
      }
      if (payload[1] === 'personal') {
        state.personalNotes.notes = state.personalNotes.notes.filter((note) => note._id !== payload[0])
      } else {
        state.communityNotes.notes = state.communityNotes.notes.filter((note) => note._id !== payload[0])
      }
    },
    [deleteNote.rejected]: (state) => {
      state.status = 'failed'
    }
  }
})

export const selectNotesState = (state) => state.notes
export const selectEditableNote = (state) => state.notes.editableNote
export const {changeText, editNote, removeNote} = notesSlice.actions
export default notesSlice.reducer
