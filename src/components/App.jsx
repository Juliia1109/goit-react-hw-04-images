import React from 'react';
import Notiflix from 'notiflix';
import { fetchImages } from 'services/pixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from './App.module.css';
import { useState, useEffect } from 'react';

export function App () {

  const [images, setImages] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);
  const [showModal, setShowModal] = useState (false);
  const [largeImageURL, setLargeImageURL] = useState ('');
  const [tags, setTags] = useState ('');
  const [page, setPage] = useState (1);
  const [searchInput, setSearchInput] = useState ('');
  const [, setError] = useState (null);
  const [total, setTotal] = useState(0);

useEffect (()=> {
  if(!searchInput) return
  setIsLoading(true);
  fetchImages(searchInput, page)
 .then(({ hits, totalHits }) => {
  if (hits.length === 0) {
  return  Notiflix.Notify.warning(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

if (page === 1) {
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
}

const arrayImages = hits.map(({id, webformatURL, largeImageURL, tags }) => {
  return {
    id,
    webformatURL,
    largeImageURL,
    tags,
  };
});

setImages(images => [...images, ...arrayImages]);
setTotal(totalHits);
})
.catch(error => setError(error))
.finally(() => setIsLoading(false));
}, [page, searchInput])



  const handleOnSubmit= (searchInput)=> {
   setSearchInput(searchInput);
   setImages ([]);
   setPage(1);
  };

 
  const openModal = e => {
    setLargeImageURL(e.target.dataset.large);
    setTags(e.target.alt);
    toggleModal()
  };


  const showImages  = () => {
    setPage((page)=>page + 1)
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  };


    return (
    <div className={css.Container}>

    <Searchbar onSubmit={handleOnSubmit}/> 

    {images.length > 0 && 
    (<ImageGallery images={images} openModal={openModal} />)}

    {isLoading && <Loader />} 

    {images.length > 0 && !isLoading && images.length !== total && 
    (<Button text="Load more" handleClick={showImages} />)}

    {showModal && 
    (<Modal onClose={toggleModal} img={largeImageURL} alt={tags} />)}

    </div>
    );
  }


