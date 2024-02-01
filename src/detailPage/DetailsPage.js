import React, { useEffect, useState } from 'react';

function DetailsPage({ selectedMovieId }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?apikey=4d94a812&i=${selectedMovieId}` );
        const data = await response.json();

        if (data.Response === 'True') {
          setMovieDetails(data);
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
  }, [selectedMovieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { Title, Year, Poster, Type } = movieDetails;

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
    </div>
  );
}

export default DetailsPage;
