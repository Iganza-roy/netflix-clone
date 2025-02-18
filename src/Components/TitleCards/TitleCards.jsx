import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();

  const [apiData, setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjBmYzNhODQxNGI3YmRhYzQ2M2NlNDBmYmU5NDQyZiIsIm5iZiI6MTczOTg3NTY3My41Niwic3ViIjoiNjdiNDY1NTk2MTEzYzQ5M2RjNmUwMDNkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qgxT1N26iQNb4-hFDY4eCryzfCZUJhfF9u7NF6RQnvc',
    },
  };

  const handleWheel = (e) => {
    e.preventDefault();

    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel);

    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : 'now_playing'
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netlix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className='card' key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
