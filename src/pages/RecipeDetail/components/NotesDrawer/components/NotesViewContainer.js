import React, {createRef, useEffect,  useState} from 'react';
import Comment from "./Comment";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectNotesState} from "../../../../../redux/notes/notesSlice";
import {getNotes} from "../../../../../redux/notes/notesThunk";
import {getRequest} from "../../../../../redux/wwlAPI";
import {Circles} from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../../components/Loader";
import VerticalScroller from "../../../../../components/VerticalScroller";

const NotesViewContainer = ({currenTab}) => {
  const {personalNotes, communityNotes} = useSelector(selectNotesState);
  const [page, setPage] = useState({
    community: 2, personal : 2
  })
  const [communityItems, setCommunityItems] = useState({data: [], hasMore: false})
  const [personalItems, setPersonalItems] = useState({data: [], hasMore: false})
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false) //do not make new FETCHMORE request while previous are pending
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      if (currenTab === 'Personal Notes') {
        await dispatch(getNotes({id, page: 1, notesType: 'personal'}));
      } else {
        await dispatch(getNotes({id, page: 1, notesType: 'community'}));
      }
      setLoading(false)
    }
    fetchData().catch(e => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenTab, dispatch]);

  useEffect(() => {
    setCommunityItems({data: communityNotes?.notes || [], hasMore: true})
    setPersonalItems({data: personalNotes?.notes || [], hasMore: true})
  }, [communityNotes, personalNotes]);

  const fetchMoreCommunityNotes = async () => {
    if (communityItems.data?.length < 20) {
      setCommunityItems(prevState => ({
        ...prevState,
        hasMore: false
      }));
      return 0;
    }
    if (isFetching) return 0
    setIsFetching(true);
    const data = await getRequest(`/recipeNotes/get_community/${id}/${page.community}`)
    const check = {
      comments: [...communityItems.data, ...data.data.notes]
    }
    if (data.data.notes.length < 20) {
      setCommunityItems({data: check.comments, hasMore: false})
    } else {
      setCommunityItems({data: check.comments, hasMore: true})
      setPage({personal: page.personal, community: page.community + 1})

    }
    setIsFetching(false);
  }
  const fetchMorePersonalNotes = async () => {
    if (personalItems.data?.length < 20) {
      setPersonalItems(prevState => ({
        ...prevState,
        hasMore: false
      }));
      return 0;
    }
    if (isFetching) return 0
    setIsFetching(true);
    const data = await getRequest(`/recipeNotes/get_personal/${id}/${page.personal}`)
    const check = {
      comments: [...personalItems.data, ...data.data.notes]
    }
    if (data.data.notes.length < 20) {
      setPersonalItems({data: check.comments, hasMore: false})
    } else {
      setPersonalItems({data: check.comments, hasMore: true})
      setPage({personal: page.personal + 1, community: page.community})
    }
    setIsFetching(false);
  }

  const [openReplyMenuIndex, setOpenReplyMenuIndex] = useState(-1);
  const scrollParentRef = createRef()
  const handleReplyClick = (index) => {
    if (openReplyMenuIndex === index) {
      setOpenReplyMenuIndex(-1);
    } else {
      setOpenReplyMenuIndex(index);
    }
  };
  if (loading) {
    return <Loader show={true}/>
  }
  return (
    <VerticalScroller>
      <ul className='px-4 divide-y divide-wwlGray200 sm:divide-wwlGreenTransparent'>
        <InfiniteScroll
          pageStart={0}
          loadMore={currenTab === 'Personal Notes' ? fetchMorePersonalNotes : fetchMoreCommunityNotes}
          hasMore={currenTab === 'Personal Notes' ? personalItems.hasMore : communityItems.hasMore}
          loader={
            <div key={'loader-loading'} className='flex justify-center py-2'>
              <Circles
                height="50"
                width="50"
                color="#FF644C"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          }
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
        >
          {currenTab === 'Personal Notes' && (personalItems.data?.length > 0 ? personalItems.data.map((comment, index) => {
            return <Comment comment={comment}
                            index={index}
                            key={comment._id}
                            handleReplyClick={handleReplyClick}
                            openReplyMenuIndex={openReplyMenuIndex}
                            setOpenReplyMenuIndex={setOpenReplyMenuIndex}
                            nestedComment={comment?.replies}
                            setLoading={setLoading}
                            currenTab={currenTab}/>
          }) : <div className='px-8 flex-grow flex justify-center items-center'>
            <p className="font-base font-inter text-lg text-wwlGray500 text-center mt-5">There's nothing here Yet!</p>
          </div>)}
          {currenTab === 'Comments' && (communityItems.data?.length > 0 ? communityItems.data.map((comment, index) => {
            return <Comment comment={comment}
                            index={index}
                            key={comment._id}
                            handleReplyClick={handleReplyClick}
                            openReplyMenuIndex={openReplyMenuIndex}
                            setOpenReplyMenuIndex={setOpenReplyMenuIndex}
                            nestedComment={comment?.replies}
                            setLoading={setLoading}
                            currenTab={currenTab}/>
          }) : <div className='px-8 flex-grow flex justify-center items-center'>
            <p className="font-base font-inter text-lg text-wwlGray500 text-center mt-5">There's nothing here Yet!</p>
          </div>)}
        </InfiniteScroll>
      </ul>
    </VerticalScroller>
  );
};

export default NotesViewContainer;
