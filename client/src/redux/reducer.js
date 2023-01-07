const initialState = {
  products: [],
  detail: {},
  categories: [],
  productsByCategory: [],
  filtered: [],
  cart: [],
  favorites: [],
  darkMode: false,
  searchTerm: "",
  // searchResults:[],
  results: [],
  // results2: [],
  resultsComponent: [],
  loggedUser: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_PRODUCT_BY_ID":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_PRODUCTS_BY_CATEGORY":
      return {
        ...state,
        productsByCategory: action.payload,
        filtered: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "FILTER_BY_BRAND":
      const allProductsByCategory = [...state.filtered];
      const filteredProducts =
        action.payload === "none"
          ? allProductsByCategory
          : allProductsByCategory.filter((p) =>
              p.brand.includes(action.payload)
            );
      return {
        ...state,
        productsByCategory: filteredProducts,
      };
    case "SORT_BY_PRICE":
      const orderedProductsByPrice = state.productsByCategory.sort(function (
        a,
        b
      ) {
        if (action.payload === "asc") {
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          } else {
            return 0;
          }
        } else if (action.payload === "desc") {
          if (a.price > b.price) {
            return -1;
          } else if (a.price < b.price) {
            return 1;
          } else {
            return 0;
          }
        }
        return "Ordered";
      });
      return {
        ...state,
        productsByCategory: orderedProductsByPrice,
      };
    // case "ORDER_BY_PRICE":
    //   return {
    //     ...state,
    //     filtered: action.payload,
    //   };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.payload),
      };
    case "ADD_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload),
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    // case 'SET_SEARCH_TERM':
    //     return {
    //         ...state,
    //         searchTerm: action.searchTerm
    //     }
    // case 'SET_SEARCH_RESULTS':
    //     return {
    //         ...state,
    //         searchResults: action.results,
    //     }
    case "GET_SEARCH_RESULTS":
      const backup = [...state.products];
      const searched = backup.filter((p) =>
        p.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        results: searched,
      };
    // case "GET_RESULTS":
    //   return {
    //     ...state,
    //     results2: action.payload,
    //   };
    case "GET_LOGGED_USER":
      return {
        ...state,
        loggedUser: action.payload,
      };
    case "GET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "CLEAN_DETAIL":
      return { ...state, detail: {} };
    default:
      return { ...state };
  }
}
