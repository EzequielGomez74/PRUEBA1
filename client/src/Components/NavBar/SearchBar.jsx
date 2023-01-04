import React, { useEffect, useRef, useState } from "react";
import s from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getProducts, getSearchResults } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function SearchBar({ searchTerm, setSearchTerm }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const ininitialLoad = useRef(true);

  useEffect(() => {
    if (ininitialLoad.current) {
      dispatch(getProducts());
      ininitialLoad.current = false;
    }
    if (searchTerm !== "") dispatch(getSearchResults(products, searchTerm));
  }, [dispatch, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={s.input}
        placeholder={`Buscar productos`}
      />
      <button className={s.inputIcon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default SearchBar;
