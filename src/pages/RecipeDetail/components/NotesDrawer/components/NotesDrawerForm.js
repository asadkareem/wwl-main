import React, {useEffect, useRef, useState} from 'react';
import Button from "../../../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../../../redux/user/userSlice";
import {useParams} from "react-router-dom";
import {postNote, updateNote} from "../../../../../redux/notes/notesThunk";
import {removeNote, selectEditableNote} from "../../../../../redux/notes/notesSlice";
import Loader from "../../../../../components/Loader";
import {toast} from "react-hot-toast";

const NotesDrawerForm = ({currentTab, extraClasses, isReply = false, parent, setOpenReplyMenuIndex}) => {
    const {id: recipeId} = useParams();
    const {_id: userId, name} = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const textInput = useRef('');
    const [loading, setLoading] = useState(false)

    const editableNote = useSelector(selectEditableNote);
    useEffect(() => {
      if(loading === false){
        textInput.current.value = editableNote?.contents || ''
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editableNote])

    async function handleSubmit(e) {
      e.preventDefault();
      if(textInput.current.value === ''){
        toast.error('Please enter a note')
        return 0;
      }
      setLoading(true)
      const noteType = currentTab === "Personal Notes" ? "personal" : "community";
      const commonPayload = {
        owner: userId,
        user_name: name,
        recipe_id: recipeId,
        note_type: noteType,
        contents: textInput.current.value,
        is_pinned: editableNote?.is_pinned || false,
        is_flagged: editableNote?.is_flagged || false,
        parent_note: parent || null,
      };
      //handling edit request
      try {
        if (editableNote) {
          await dispatch(updateNote({body:commonPayload,_id: editableNote?.id, index: editableNote.index})).unwrap();
          await dispatch(removeNote())
        } else {
          await dispatch(postNote(commonPayload)).unwrap();
        }
        if (isReply) {
          setOpenReplyMenuIndex(-1);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false)
      textInput.current.value = "";
    }
function handleCancel(){
  if(isReply){
    setOpenReplyMenuIndex(-1);
  }
  else{
    dispatch(removeNote())
  }
  textInput.current.value = "";
}
    return (
      <div className='px-8 py-2 '>
        <form onSubmit={handleSubmit}>
                <textarea name="" id="" cols="44" ref={textInput} rows="6"
                          className={`w-full font-chivo text-wwlGray400 focus:ring-0 border border-wwlGray400 rounded-lg resize-none text-sm focus:border-wwlGray400 ${extraClasses}`}
                          placeholder='Add a note to self...'></textarea>
          {loading ? <Loader/> : <div className='flex mt-4'>
            <Button btnText='Cancel' smallButton={true} type='button'
                    extraClasses='rounded-lg mr-2 border border-wwlOrange text-wwlOrange hover:text-wwlWhite hover:bg-wwlOrange'
                    onClick={() => {
                      handleCancel();
                    }
                    }/>
            <Button btnText='Post' type='submit' btnFilled={true} smallButton={true}
                    extraClasses='rounded-lg border border-transparent bg-wwlOrange text-wwlWhite hover:bg-wwlWhite hover:border-wwlOrange hover:text-wwlOrange'/>
          </div>}
        </form>
      </div>
    );
  }
;

export default NotesDrawerForm;
