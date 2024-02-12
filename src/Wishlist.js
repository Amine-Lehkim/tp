import React from 'react';
import { connect } from 'react-redux';
import { removeFromWishlist } from './actions';

function Wishlist({ wishlist, removeFromWishlist }) {
  return (
    <div>
      <h2><i className="fas fa-heart"></i> Wishlist</h2>
      <ul>
        {wishlist.map((movie) => (
          <li className='card' key={movie.id}>
            <div> 
              {movie.title} - {movie.year} 
            </div>
              Quantity: {movie.quantity}
            <button onClick={() => removeFromWishlist(movie.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishlist: state.wishlist,
});

const mapDispatchToProps = {
  removeFromWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
