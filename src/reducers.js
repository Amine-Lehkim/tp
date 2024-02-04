import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './actions';

const initialState = {
  wishlist: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((movie) => movie.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
