import React, { useEffect, useState } from 'react';
import s from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getProducts , getSearchResults } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

function SearchBar({ searchTerm, setSearchTerm }) {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const results = useSelector(state => state.results)

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    dispatch(getSearchResults(products, searchTerm))
  }

  return (
    <div>
        <input type="text" value={searchTerm} onChange={handleChange} className={s.input} placeholder={`Buscar productos` } />
        <button className={s.inputIcon} ><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
        {/* <div>
        { searchTerm.length && results.length ? results.map(p => <span> {p.name} </span> ) : <span>No hay resultados</span> }
        </div> */}
    </div>
  )
}

export default SearchBar