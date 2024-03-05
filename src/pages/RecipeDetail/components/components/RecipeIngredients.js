import React from 'react';
import PropTypes from "prop-types";
import {getText} from "../../../../utilis/generalUtilis";
import {selectCurrentUser} from "../../../../redux/user/userSlice";
import {useSelector} from "react-redux";
const RecipeIngredients = ({title, dataToRender, spaceBetweenItems, dairyFree, glutenFree, servingsCount,servings ,printable=false}) => {

    const currentUser = useSelector(selectCurrentUser);
    let unit_preference = currentUser?.unit_preference;
    let result = null;
    if (typeof dataToRender === 'string') {
        const paragraphs = dataToRender.split('<p>').filter(paragraph => paragraph !== '' && paragraph !== '</p>');
        result = paragraphs.map((paragraph, index) => {
            return `<h1 class="font-chivo font-bold text-md mt-5">Step ${index + 1} : </h1> <p>` + paragraph;
        }).join('');
    }
    return (
        <div className="pl-2 lg:pl-6">
            {title &&
                <h1 className={`${printable ? '' : '-ml-6 '}font-chivo font-bold text-lg mb-4`}>{title}:</h1>}
            <ul className={`${title === 'Ingredients' ? 'list-disc' : 'list-decimal'} ml-5 lg:mr-0`}>
                {Array.isArray(dataToRender) && dataToRender?.map((item, index) => {
                    return (
                        <li key={index}
                            className={`font-chivo text-sm md:text-base text-wwlBlack ${spaceBetweenItems ? 'mb-2' : ''}`}>
                            {servingsCount &&
                                <span>
                                    {getText(dairyFree, glutenFree, item, servingsCount, servings, unit_preference)}
                                </span>} {item.notes &&
                            <span className={'text-xs italic'}>({item.notes})</span>}
                        </li>
                    )
                })}
            </ul>
            {typeof dataToRender === 'string' &&
                <div dangerouslySetInnerHTML={{__html: result}}
                     className={`font-chivo text-sm md:text-base text-wwlBlack ${spaceBetweenItems ? 'mb-2' : ''}`}></div>}

        </div>

    );
};
// '1 TSP paprika',
RecipeIngredients.propTypes = {
    title: PropTypes.string,
    // dataToRender: PropTypes.array.isRequired //causing warnings , need to fix later
}

export default RecipeIngredients;