import {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAllTags} from "../../../redux/tags/tagSlice";
import SuggestionsList from "./SuggestionsList";

const Autocomplete = ({
                          sidebarOpen, setChips, searchTerm, filteredSuggestions, setFilteredSuggestions, setSearchTerm, displaySuggestions, setDisplaySuggestions
                      }) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    const suggestions = useSelector(selectAllTags);
    const searchItem = searchTerm => {
        setInputValue(searchTerm.value);
        const allFilteredSuggestions = suggestions.filter(suggestion => {
            return suggestion.tag.toLowerCase().includes(searchTerm.value.toLowerCase())
        });
        setFilteredSuggestions(allFilteredSuggestions);
        if (searchTerm.clicked) {
            setDisplaySuggestions(false);
        } else {
            setDisplaySuggestions(true);
        }
    };


    useEffect(() => {
        if(searchTerm.clicked){
            return
        }else{
            searchItem(searchTerm);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const onSelectSuggestion = index => {
        setSelectedSuggestion(index);
        setInputValue(filteredSuggestions[index]);
        setFilteredSuggestions([]);
        setDisplaySuggestions(false);
    };
    return (
        <>
            <SuggestionsList
              inputValue={inputValue}
              selectedSuggestion={selectedSuggestion}
              onSelectSuggestion={onSelectSuggestion}
              displaySuggestions={displaySuggestions}
              suggestions={filteredSuggestions}
              searchTerm={searchTerm}
              setChips={setChips}
              setSearchTerm={setSearchTerm}
              sidebarOpen={sidebarOpen}
            />
        </>
    );
};

export default Autocomplete;