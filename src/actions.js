// actions.js
export const addToWishlist = (movie) => ({
    type: 'ADD_TO_WISHLIST',
    payload: movie,
  });
  
  export const removeFromWishlist = (movieId) => ({
    type: 'REMOVE_FROM_WISHLIST',
    payload: movieId,
  });
  