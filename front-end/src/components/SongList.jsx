import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SongItem from './SongItem';

const SongList = ({ songsArray }) => {
  const [items, setItems] = useState(5);

  const handleToggle = () => {
    if (items >= songsArray.length) {
      setItems(5);
    } else {
      setItems(items + 5);
    }
  };

  const buttonText = items >= songsArray.length ? 'Ver menos' : 'Ver mais';

  return (
    <div className="song-list space-y-4">
      <AnimatePresence>
        {songsArray.slice(0, items).map((currentSongObj, index) => (
          <motion.div
            key={currentSongObj.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <SongItem {...currentSongObj} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>

      {songsArray.length > 5 && (
        <motion.p
          className="song-list__see-more text-blue-500 cursor-pointer select-none"
          onClick={handleToggle}
          whileTap={{ scale: 0.95 }}
          whileHover={{ color: '#1E90FF' }}
        >
          {buttonText}
        </motion.p>
      )}
    </div>
  );
};

export default SongList;
