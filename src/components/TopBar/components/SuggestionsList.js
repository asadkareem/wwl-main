
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SuggestionsList = ({
                           suggestions,
                           inputValue,
                           onSelectSuggestion,
                           displaySuggestions,
                           searchTerm,
                           setChips,setSearchTerm,sidebarOpen
                         }) => {
  function handleClick(suggestion) {
    if(sidebarOpen){
      setSearchTerm({value:[suggestion], clicked: true})
    }
    else{
      setChips(prevState => [...prevState, {tag: suggestion.tag, type: suggestion.type}])
      setSearchTerm({value:'', clicked: false})
      document.querySelector('.raw').innerText = ''
    }
  }

  if (inputValue && displaySuggestions) {
    if (suggestions.length > 0) {
      return (
        <ul className={
          classNames(
            searchTerm
              ? 'rounded-b-2xl'
              : 'rounded-none',
            'h-fit overflow-y-auto bg-wwlWhite py-2 px-7 font-inter font-normal text-base shadow-[0px_1px_2px_rgba(0,0,0,0.07)]'
          )
        }>
            {/* eslint-disable-next-line array-callback-return */}
          {suggestions.map((suggestion, index) => {
            if (index < 8) {
              const searchTermIndex = suggestion.tag.toLowerCase().indexOf(searchTerm.value)
              const matchedTextFromSuggestion = suggestion.tag.substr(searchTermIndex, searchTerm.value.length)
              const textBeforeMatchedText = suggestion.tag.substr(0, searchTermIndex)
              const textAfterMatchedText = suggestion.tag.substr(searchTermIndex + searchTerm.value.length)

              return (
                <button className='block py-1 text-start break-all' onClick={() => {
                  handleClick(suggestion)
                }} key={suggestion.tag}>
                  <li
                    onClick={() => onSelectSuggestion(index)}
                    className="transition-colors duration-150 hover:text-wwlOrange"
                  >
                    {textBeforeMatchedText}<span
                    className="font-bold">{matchedTextFromSuggestion}</span>{textAfterMatchedText}
                  </li>
                </button>
              );
            }
          })}
        </ul>
      );
    }
    else {
      return <button onClick={() => {
        handleClick({tag: inputValue, type: null})
      }} className="bg-wwlWhite w-full font-inter font-normal py-2 px-7 text-base rounded-b-2xl text-start">Search for <span className='font-bold'>{inputValue}</span></button>;
    }
  }
};

export default SuggestionsList;