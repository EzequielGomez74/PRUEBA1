import axiosInstance from "./axiosInstance";
import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_PAYPREFERENCES_BY_ID,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  ORDER_BY_PRICE,
  ADD_FAVORITE,
  ADD_CART,
  REMOVE_CART,
  REMOVE_FAVORITE,
  TOGGLE_DARK_MODE,
  GET_REVIEWS_BY,
} from "./actionTypes";

// export const getProducts = (id) => {
//   return async function (dispatch) {
//     try {
//       const response = await axiosInstance.get("/products");
//       console.log(response.data);
//       return dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
//     } catch (error) {
//       console.log("FAILED TO AUTHENTICATE");
//     }
//   };
// };

export function getProducts() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/products");
      return dispatch({ type: GET_ALL_PRODUCTS, payload: json.data });
    } catch (error) {
      alert(error);
    }
  };
}

export function getProductById(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/products/${id}`);
      return dispatch({ type: GET_PRODUCT_BY_ID, payload: json.data });
    } catch (error) {
      alert(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/categories");
      return dispatch({ type: GET_CATEGORIES, payload: json.data });
    } catch (error) {
      alert(error);
    }
  };
}

export function getProductsByCategory(category) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/products?category=${category}`
      );
      return dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: json.data });
    } catch (error) {
      alert(error);
    }
  };
}

export const filterByBrand = (products, brand) => {
  return function (dispatch) {
    const filteredByBrand = products.filter((p) => p.brand === brand);
    dispatch({ type: FILTER_BY_BRAND, payload: filteredByBrand });
  };
};

export const filterByPrice = (products, max, min) => {
  return function (dispatch) {
    const filteredByPrice = products.filter(
      (p) => p.price < max && p.price > min
    );
    dispatch({ type: FILTER_BY_PRICE, payload: filteredByPrice });
  };
};

export const orderByPrice = (products, order) => {
  return function (dispatch) {
    if (order === "asc") {
      const asc = products.sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        else return 0;
      });
      dispatch({ type: ORDER_BY_PRICE, payload: [...asc] });
    }
    if (order === "desc") {
      const desc = products.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        else return 0;
      });
      dispatch({ type: ORDER_BY_PRICE, payload: [...desc] });
    }
  };
};

export const addFavorite = (payload) => {
  return {
    type: ADD_FAVORITE,
    payload,
  };
};

export const removeFavorite = (id) => {
  return {
    type: REMOVE_FAVORITE,
    payload: id,
  };
};

export const addCart = (payload) => {
  return {
    type: ADD_CART,
    payload,
  };
};

export const removeCart = (id) => {
  return {
    type: REMOVE_CART,
    payload: id,
  };
};

export function toggleDarkMode() {
  return { type: TOGGLE_DARK_MODE };
}
