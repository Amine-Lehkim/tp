import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../actions';

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

          // Check if the movie is in the wishlist
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
    <div>
      <h2>Movie Details</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <td>{Title}</td>
          </tr>
          <tr>
            <th>Year</th>
            <td>{Year}</td>
          </tr>
          <tr>
            <th>Poster</th>
            <td>
              {Poster && <img src={Poster} alt={Title} style={{ maxWidth: '100px' }} />}
            </td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{Type}</td>
          </tr>
        </tbody>
      </table>
      {isInWishlist ? (
        <button onClick={handleRemoveFromWishlist} disabled>
          Already in Wishlist
        </button>
      ) : (
        <button onClick={handleAddToWishlist}>
          Add to Wishlist
        </button>
      )}
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
