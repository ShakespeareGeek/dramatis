import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [sortedCharacters, setSortedCharacters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Fetch characters dynamically
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`/data/characters.json`); // Adjust the path as needed
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Group characters alphabetically when data is fetched
  useEffect(() => {
    if (characters.length > 0) {
      const grouped = alphabet.reduce((acc, letter) => {
        acc[letter] = characters.filter((char) =>
          char.name.toUpperCase().startsWith(letter)
        );
        return acc;
      }, {});
      setSortedCharacters(grouped);
    }
  }, [characters]);

  if (loading) {
    return <div>Loading characters...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
 {/* Navigation */}
<div className="flex flex-wrap gap-2 mb-4">
  {alphabet.map((letter) => (
    sortedCharacters[letter] && sortedCharacters[letter].length > 0 ? (
      <a
        key={letter}
        href={`#${letter}`}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        {letter}
      </a>
    ) : (
      <span
        key={letter}
        className="px-2 py-1 bg-gray-100 text-gray-400 rounded cursor-not-allowed"
      >
        {letter}
      </span>
    )
  ))}
</div>

      {/* Character List */}
      {alphabet.map((letter) => (
        <div key={letter} id={letter} className="mb-8">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 mb-4">
            {letter}
          </h2>
          {sortedCharacters[letter] && sortedCharacters[letter].length > 0 ? (
            <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {sortedCharacters[letter].map((char) => (
    <li key={char.id} className="p-4 bg-white rounded shadow">
      <p>
        {/* Link to CharacterDetails */}
        <Link
          to={`/shakespeare_characters/${char.slug}.html`}
          className="text-blue-600 hover:underline"
        >
          {char.name}
        </Link>{" "}
        –{" "}
        {/* Link to PlayDetails */}
        <Link
          to={`/shakespeare_plays/${char.play.short_name}.html`}
          className="text-green-600 hover:underline"
        >
          {char.play.title}
        </Link>
      </p>
    </li>
  ))}
</ul>
 {/* Back to Top Link */}
 <div className="mt-4">
 <a
   href="#"
   className="text-sm text-blue-500 hover:underline"
   aria-label={`Back to top from ${letter}`}
 >
   Back to top
 </a>
</div>
</>
          ) : (
            <p className="text-gray-500">No Characters Found</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
