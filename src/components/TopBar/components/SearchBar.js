import React, {useEffect} from 'react';
import {useState} from "react";
import AutoComplete from "./AutoComplete";
import {SearchIcon} from "@heroicons/react/solid";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTags, selectTagsStatus} from "../../../redux/tags/tagSlice";
import Chip from "../../Chip";
import {useNavigate, useSearchParams} from "react-router-dom";
import Loader from "../../Loader";
import {XIcon} from "@heroicons/react/outline";
import {searchRecipesStatus, updateFilteredRecipes} from "../../../redux/recipe/recipesSlice";
import {arrayToQueryParamString} from "../../../utilis/generalUtilis";

const SearchBar = ({closeModal, setChips, chips}) => {
  let [searchParams] = useSearchParams();
  const allTags = useSelector(selectAllTags);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState({value: '', clicked: false});
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const status = useSelector(selectTagsStatus);
  const searchRecipesStatusValue = useSelector(searchRecipesStatus);
  const spanElement = document.querySelector('.raw');
  const [isFocused, setIsFocused] = useState(false);
  const handleChipsChange = () => {
    setSearchTerm({value: spanElement.innerText.toLowerCase(), clicked: false})
  };
  const handleRemoveChip = (index) => {
    let newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  }
  const setSearchValues = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setDisplaySuggestions(false);
      let data = event.target.innerText.split('\n');
      if (data[0] === '') {
        return
      }
      const tagObj = filteredSuggestions.find(item => item.tag === data[0]);
      if (tagObj) {
        setChips([...chips, tagObj])
      } else {
        //separating comma separated tags
        if (data[0].includes(',')) {
          let tags = data[0].split(',');
          for (let i = 0; i < tags.length; i++) {
            let tag = tags[i].trim();
            let type = null;

            for (let j = 0; j < allTags.length; j++) {
              let item = allTags[j];

              if (item.tag === tag) {
                type = item.type;
                break;
              }
            }

            setChips(prev => [...prev, {tag: tag, type: type}]);
          }

        } else {
          setChips([...chips, {tag: data[0], type: null}])
        }
      }
      setSearchTerm({value: '', clicked: false});
      document.querySelector('.raw').innerText = '';
    }
  }

  useEffect(() => {
    if (chips?.length > 0 && searchRecipesStatusValue !== 'pending') {
      navigate(`/search?page=1&keyword=${arrayToQueryParamString(chips)}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  useEffect(() => {
    if (chips?.length === 0){
      dispatch(updateFilteredRecipes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!searchParams.get('keyword')) {
      setChips([]);
    }else{
      setChips(JSON.parse(searchParams.get('keyword')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('keyword')])

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  function setFocusAndCaret() {
    setIsFocused(true);
    spanElement.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(spanElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative flex-1">
        <div>
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-wwlBlack block md:text-wwlWhite" aria-hidden="true"/>
          </div>
          <div
            id="search"
            contentEditable={false}
            name="search"
            className='flex items-center md:items-start text-base rounded-full font-chivo font-normal flex-nowrap py-1.5 pl-10 text-sm border-none sm:text-sm h-10 min-w-4xl max-w-4xl overflow-hidden bg-wwlWhite md:bg-wwlWhiteTransparent md:pl-12'
            autoComplete="off"
            onKeyDown={(event) => setSearchValues(event)}
          >
            {chips?.length > 0 ? chips.map((item, index) => (
              <Chip key={index} handleRemoveChip={handleRemoveChip} tag={item?.tag} index={index}/>
            )) : null}
            {!isFocused && searchTerm.value === '' && chips?.length < 1 &&
              <p onClick={e => setFocusAndCaret()}
                 className="py-1 whitespace-nowrap text-wwlBlack md:text-white">Search
                for recipes</p>}
            <span onInput={() => handleChipsChange()} contentEditable={true}
                  onFocus={e => setIsFocused(true)}
                  onBlur={e => setIsFocused(false)}
                  className="block py-1 focus-visible:outline-none flex-grow text-wwlBlack raw md:text-wwlWhite">
            </span>
            {status === 'pending' &&
              <div className='mr-10 md:mr-4'><Loader width='30px' height='30px'/></div>}
          </div>
          <div className='block md:hidden absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer'>
            <XIcon className="h-5 w-5 text-wwlBlack block cross" aria-hidden="true"
                   onClick={e => closeModal(e)}/>
          </div>
          <div className="absolute w-full mt-2 rounded-2xl overflow-hidden">
            <AutoComplete filteredSuggestions={filteredSuggestions}
                          setFilteredSuggestions={setFilteredSuggestions}
                          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                          displaySuggestions={displaySuggestions}
                          setDisplaySuggestions={setDisplaySuggestions}
                          setChips={setChips}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;