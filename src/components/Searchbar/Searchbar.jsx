import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { MdSavedSearch } from 'react-icons/md';
import React  from 'react';
import { useState } from 'react';

export default function Searchbar ({ onSubmit }) {

  const [searchInput, setSearchInput] = useState('');

  const handleChange = e => {
    setSearchInput(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
 if (searchInput.trim() === '') {
      return;
    }
    onSubmit(searchInput);
    setSearchInput('');
  };


    return (
     <div>
     <header className={css.Searchbar}>
     <form className={css.SearchForm} onSubmit={handleSubmit}>
     <button type="submit" className={css.SearchFormButton} >
     <MdSavedSearch style={{ width: 25, height: 25 }} />
    </button>
    <input
     className={css.SearchFormInput}
     value={searchInput}
     type="text"
     autoComplete="off"
     autoFocus
     placeholder="Search images and photos"
     onChange={handleChange}
    />
   </form>
   </header>
   </div>
    )
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}