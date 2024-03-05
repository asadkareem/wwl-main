import React, {useState} from 'react';
import NotesDrawerForm from "./NotesDrawerForm";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../../../redux/user/userSlice";
import {deleteNote, updateNote} from "../../../../../redux/notes/notesThunk";
import {editNote} from "../../../../../redux/notes/notesSlice";
import {getFirstChar} from "../../../../../utilis/generalUtilis";

const Comment = ({
                   comment,
                   index,
                   setOpenReplyMenuIndex,
                   handleReplyClick,
                   openReplyMenuIndex,
                   isReply = false,
                   nestedComment,
                   currenTab,
                   setLoading
                 }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(comment?.is_flagged);
  const [pin, setPin] = useState(comment?.is_pinned);
  const handleEditClick = (comment) => {
    if (isReply) {
      dispatch(editNote({id: comment._id, contents: comment.contents, index}))
    } else {
      dispatch(editNote({id: comment._id, contents: comment.contents, pinned: false, flagged: false}))
    }
  }
  const handleDelete = (id) => {
    setLoading(true)
    dispatch(deleteNote({id, note_type: currenTab.split(" ")[0].toLowerCase(), isReply, index})).then(() => setLoading(false))
  }
  const handleAdminActions = async (type, _id) => {
    if (type === 'pin') {
      setPin(!pin)
      await dispatch(updateNote({body: {is_pinned: !pin}, _id, index}))
    } else {
      setFlag(!flag)
      await dispatch(updateNote({body: {is_flagged: !flag}, _id, index}))
    }
  }

  return (
    <li className={`${index === 0 ? 'py-5' : 'py-5'} ${isReply ? 'pb-0 pl-8' : ''}`}>
      <div className="flex-grow flex justify-start items-start gap-2">
        <div
          className="w-9 h-9 rounded-full bg-red-300 flex justify-center items-center text-white font-semibold flex-shrink-0">
          {getFirstChar(comment.user_name)}
        </div>
        <div className="flex-grow">
          <div
            className="font-inter text-sm mb-1 text-wwlGray500 font-semibold">{isReply ? comment?.user_name[0]?.name : comment?.user_name}</div>
          <div className="font-inter text-sm mb-1 text-wwlGray500 font-semibold">Posted March 21, 2021</div>
          <div className="font-chivo text-sm md:text-base text-wwlBlack ">{comment?.contents}</div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {/*if replie comment does not exist show button, if it is a reply dont show reply button*/}
              {!isReply && currenTab === 'Comments' && <button onClick={() => handleReplyClick(index)}
                                                                      className="whitespace-nowrap mt-2 text-xs font-chivo text-wwlGray500 font-semibold">Reply</button>}

              {(currentUser?._id === comment.owner || currentUser?.is_admin) && <>
                <button className="whitespace-nowrap mt-2 text-xs font-chivo text-wwlGray500 font-semibold"
                        onClick={() => {
                          handleEditClick(comment)
                        }
                        }>Edit
                </button>
                <button className="whitespace-nowrap mt-2 text-xs font-chivo text-wwlGray500 font-semibold"
                        onClick={e => handleDelete(comment._id)}>Delete
                </button>
              </>}
              {currentUser?.is_admin && currenTab === 'Comments' && <button
                className="whitespace-nowrap mt-2 text-xs font-chivo text-wwlGray500 font-semibold"
                onClick={e => handleAdminActions('flag', comment._id)}>{flag ? 'Flagged' : 'Set Flag'}</button>}
            </div>
            {currentUser.is_admin && currenTab === 'Comments' &&
              <button className="whitespace-nowrap mt-2 text-xs font-chivo text-gray-600"
                      onClick={e => handleAdminActions('pin', comment._id)}>{pin ? 'Pinned' : 'Set Pin'}</button>}
          </div>
        </div>
      </div>

      {openReplyMenuIndex === index && !isReply && (
        <NotesDrawerForm extraClasses="w-full" isReply={true} parent={comment?._id} currentTab={currenTab}
                         setOpenReplyMenuIndex={setOpenReplyMenuIndex}/>
      )}
      <ul>
        {nestedComment  &&
          nestedComment.map(reply => {
            if (reply.user_name.length > 0) {
              return <Comment key={reply._id} isReply={true} comment={reply} currenTab={currenTab} index={index} setLoading={setLoading}/>
            } else {
              return null;
            }
          })
        }
      </ul>
    </li>
  );
};

export default Comment;