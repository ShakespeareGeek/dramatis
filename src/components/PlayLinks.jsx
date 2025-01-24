import React, { useState, useEffect } from "react";

const PlayLinks = ({ play, short_name }) => {
  const [fetchedPlay, setFetchedPlay] = useState(null);
  const siteName = import.meta.env.VITE_SITE_NAME || 'Your Site Name';

  useEffect(() => {
    if (!play && short_name) {
      // Fetch the play dynamically if short_name is provided
      fetch("/data/plays.json")
        .then((response) => response.json())
        .then((data) => {
          const foundPlay = data.find((p) => p.short_name === short_name);
          setFetchedPlay(foundPlay);
        })
        .catch((error) => console.error("Error fetching play:", error));
    }
  }, [play, short_name]);

  // Use the passed-in play or the fetched play
  const currentPlay = play || fetchedPlay;

  // Return null if no play is available yet
  if (!currentPlay) {
    return null;
  }

  return (
    (currentPlay.category || currentPlay.merchandise) && (
      <div className="mb-4 text-lg">
        {/* Link to category */}
        {currentPlay.category && (
          <a
            href={`https://www.shakespearegeek.com/category/${currentPlay.category}`}
            className="text-blue-500 hover:underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentPlay.title} Posts on Shakespeare Geek
          </a>
        )}

        {/* Separator if both category and merchandise exist */}
        {currentPlay.category && currentPlay.merchandise && (
          <>&nbsp; | &nbsp;</>
        )}

        {/* Link to merchandise */}
        {currentPlay.merchandise && (
          <a
            href={currentPlay.merchandise}
            className="text-blue-500 hover:underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentPlay.title} Merchandise
          </a>
        )}
      </div>
    )
  );
};

export default PlayLinks;
