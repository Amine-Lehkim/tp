import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../actions';
import './style.css'; 

function DetailsPage({ selectedMovieId, addToWishlist, removeFromWishlist, wishlist }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?apikey=4d94a812&i=${selectedMovieId}`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovieDetails(data);

          const movieInWishlist = wishlist.some(movie => movie.id === selectedMovieId);
          setIsInWishlist(movieInWishlist);
        } else {
          console.error('Error fetching movie details:', data.Error);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMovieId) {
      fetchMovieDetails();
    }
  }, [selectedMovieId, wishlist]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { Title, Year, Poster, Type } = movieDetails;

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist({ id: selectedMovieId, title: Title, year: Year });
      setIsInWishlist(true);
    }
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(selectedMovieId);
    setIsInWishlist(false);
  };

  return (
    <div className="details-container">
      <div className="details-image">
        {Poster && <img src={Poster} alt={Title} className="details-poster" />}
      </div>
      <div className="details-info">
        <h2>{Title}</h2>
        <table>
          <tbody>
            <tr>
              <th>Year</th>
              <td>{Year}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{Type}</td>
            </tr>
          </tbody>
        </table>
        {isInWishlist ? (
          <button className="wishlist-btn" onClick={handleRemoveFromWishlist} disabled>
            <i className="fas fa-heart"></i> Already in Wishlist
          </button>
        ) : (
          <button className="wishlist-btn" onClick={handleAddToWishlist}>
            <i className="fas fa-heart"></i> Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishlist: state.wishlist,
});

const mapDispatchToProps = {
  addToWishlist,
  removeFromWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
