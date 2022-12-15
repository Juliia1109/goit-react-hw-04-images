import PropTypes from 'prop-types';
import css from './Modal.module.css';
import React from 'react';
import { useEffect } from "react";


export default function Modal ({ onClose, img, alt }) {
 
  useEffect(()=> {
      const closeByEsc = e => {
        if(e.code === "Escape") {
            onClose()
        }
    };


  window.addEventListener("keydown", closeByEsc);
  return ()=> {
      window.removeEventListener("keydown", closeByEsc);
    };
  }, [onClose]);


const closeBackdrop = e => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};
  
  
    return (
<div className={css.Overlay} onClick={closeBackdrop}>
<div className={css.Modal}>
<img src={img} alt={alt} />
</div>
</div>
    );
  }


Modal.propTypes = {
	img: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
}