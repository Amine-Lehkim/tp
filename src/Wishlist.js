// Wishlist.js
import React from 'react';
import { connect } from 'react-redux';
import { removeFromWishlist } from './actions';

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.year}
            <button onClick={() => removeFromWishlist(movie.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wishlist: state.wishlist,
});

const mapDispatchToProps = {
  removeFromWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
