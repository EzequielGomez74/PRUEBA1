import axiosInstance from "./axiosInstance";
import axios from "axios";

import {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  FILTER_BY_BRAND,
  ADD_FAVORITE,
  ADD_CART,
  REMOVE_CART,
  REMOVE_FAVORITE,
  TOGGLE_DARK_MODE,
  GET_REVIEWS_BY,
  SORT_BY_PRICE,
  GET_LOGGED_USER,
  GET_SEARCH_TERM,
  GET_SEARCH_RESULTS,
  GET_RESULTS,
  CLEAN_DETAIL,
} from "./actionTypes";

const jwt = require("react-jwt");

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.get("/products");
      console.log("Mostrando productos");
      return dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log("FAILED TO AUTHENTICATE");
    }
  };
};

// export function getProducts() {
//   return async function (dispatch) {
//     try {
//       var json = await axios.get("http://localhost:3001/products");
//       return dispatch({ type: GET_ALL_PRODUCTS, payload: json.data });
//     } catch (error) {
//       alert(error);
//     }
//   };
// }

export function getProductById(id) {
  return async function (dispatch) {
    try {
      var json = await axiosInstance.get(`/products/${id}`);
      return dispatch({ type: GET_PRODUCT_BY_ID, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export const getReviewsBy = (productId, userId) => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.get(
        `/reviews?product_id=${productId}`
      );
      return dispatch({ type: GET_REVIEWS_BY, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postReview = (review, onSuccess) => {
  return async function () {
    try {
      let postedReview = await axiosInstance.post("/reviews", review);
      onSuccess();
      return postedReview;
    } catch (error) {
      console.log(error);
    }
  };
};

export function getCategories() {
  return async function (dispatch) {
    try {
      var json = await axiosInstance.get("/categories");
      return dispatch({ type: GET_CATEGORIES, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getProductsByCategory(category) {
  return async function (dispatch) {
    try {
      var json = await axiosInstance.get(`/products?category=${category}`);
      return dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function toggleDarkMode() {
  return { type: TOGGLE_DARK_MODE };
}

// export const filterByPrice = (products, max, min) => {
//     return function(dispatch){
//         const filteredByPrice = products.filter((p) => p.price < max && p.price > min)
//         dispatch({type: FILTER_BY_PRICE, payload: filteredByPrice})
//     }
// }

export const filterByBrand = (brand) => {
  return { type: FILTER_BY_BRAND, payload: brand };
};

// export const filterByPrice = (priceOrder) => {
//   return { type: SORT_BY_PRICE, payload: priceOrder };
// };

export const orderByPrice = (priceOrder) => {
  return { type: SORT_BY_PRICE, payload: priceOrder };
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

export const getSearchResults = (searchTerm) => {
  // return function (dispatch) {
  //   const results = products.filter((p) =>
  //     p.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   dispatch({ type: GET_SEARCH_RESULTS, payload: results });
  // };
  return { type: GET_SEARCH_RESULTS, payload: searchTerm };
};

export const getResults = (products, searchTerm) => {
  return function (dispatch) {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch({ type: GET_RESULTS, payload: results });
  };
};

// export const setSearchTerm = (searchTerm) => {
//     return {
//         type: SET_SEARCH_TERM, searchTerm
//     }
// }

// export const setSearchResults = (results) => {
//     return {
//         type: SET_SEARCH_RESULTS, results
//     }
// }

export const getUser = () => {
  return async function (dispatch) {
    const user = await axiosInstance.get("/");
  };
};

export const getLoginUser = (user) => {
  return async function (dispatch) {
    try {
      //const config = {Authorization:"Bearer "+}
      const data = {
        username: user.username,
        password: user.password,
        guest: false,
      };
      const response = await axios.put("/enter/login", data, {
        withCredentials: true,
      });
      console.log("2 ", response.data);
      if (response.data.accessToken) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        //abrir token, sacar username y hacer el getuser y guardarlo en estado global user
        let username = "";
        jwt.verify(
          response.data.accessToken,
          process.env.ACCESS_TOKEN_SECRET,
          async (err, decoded) => {
            if (err) return new Error(err);
            //forbidden invalid token
            username = decoded.username;
          }
        );
        const response = await axios.get(`/user?username=${username}`);

        return dispatch({ type: GET_LOGGED_USER, payload: response.data });
      } else if (response.data.twoFactor) {
        //generarpopup
      } else if (response.data === null) {
        return "TOKEN INCORRECTO, REINGRESAR";
      }
    } catch (error) {
      //metio mal
    }
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const getSearchTerm = (searchTerm) => {
  return { type: GET_SEARCH_TERM, payload: searchTerm };
};
