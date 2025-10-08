import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import SongList from '../../components/SongList';
import { artistArray } from '../database/artists';
import { songsArray } from '../database/songs';

const Artist = () => {
  const { id } = useParams();

  const { name, banner } = artistArray.filter(
    (currentArtistObj) => currentArtistObj._id === id
  )[0];

  const songsArrayFromArtist = songsArray.filter(
    (currentSongObj) => currentSongObj.artist === name
  );

  const randomIndex = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );
  const randomIdFromArtist = songsArrayFromArtist[randomIndex]._id;

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)),url(${banner})`,
        }}
      >
        <h2 className="artist__title">{name}</h2>
      </div>
      <div className="artist__body">
        <h2>Populares</h2>
        <SongList songsArray={songsArrayFromArtist} />
      </div>
      <Link to={`/song/${randomIdFromArtist}`}>
        <FaPlayCircle className="single-item__icon single-item__icon--artist" />
      </Link>
    </div>
  );
};

export default Artist;
