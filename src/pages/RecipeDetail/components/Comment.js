import React, {useEffect, useState} from 'react';
import {getImages, removeImages} from "../../../utilis/generalUtilis";

const Comment = ({description}) => {
    const parentRef = React.useRef();
    const [images, setImages] = useState([]);
    const [filteredDescription, setFilteredDescription] = useState('');
    useEffect(() => {
        setImages(getImages(description))
        setFilteredDescription(removeImages(description))

    }, [description])


    return (
        <div className='lg:flex lg:justify-between lg:max-h-94' id={"parent"} ref={parentRef}>
            <div className={`lg:mr-8 w-full ${images?.length > 0 ?  'lg:w-3/5' : 'lg:w-full'}`}>
                <h1 className=' mt-5 font-chivo font-black text-2xl mb-4 lg:mt-0 xl:mt-10'>Recipe Notes</h1>
                    <section className='text-sm font-chivo mb-4 editor-container' id={'recipe-notes-container'}
                         dangerouslySetInnerHTML={{__html: filteredDescription}}>
                    </section>
                {/*<RecipeIngredients dataToRender={comments} spaceBetweenItems={true}/>*/}
            </div>
            {images.length > 0 && <div className='my-10 lg:my-0 flex flex-col flex-grow'>
                {images.map((image, index) => {
                    return <img key={index} srcSet={image} alt="recipe"
                                className="mx-auto mt-8 lg:mx-0 h-40 md:h-56 lg:h-60 object-cover w-9/12 rounded-lg lg:w-full"/>
                    // className="mx-auto mt-8 lg:mx-0 h-40 md:h-56 lg:h-60 object-cover w-9/12 rounded-lg lg:w-full"/>

                })}
            </div>}
        </div>
    );
};

export default Comment;