import { useState, useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate';
import s from './Dropdown.module.css';

const Dropdown = ({ description }) => {
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return <div ref={parent} className={s.dropdown}>
    <strong className={`dropdown-label`} onClick={reveal}>Ver detalles</strong>
    { show && <p className={`dropdown-content`} >{ description }</p> }
  </div>
}

<<<<<<< HEAD
export default Dropdown;
=======
export default Dropdown
>>>>>>> a81739dcfc51972965136dab2818ec451e6c18ec
