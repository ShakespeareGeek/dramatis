import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Disclaimer from './Disclaimer';
import PlayLinks from './PlayLinks';
import AdBlock from "./AdBlock";
import ShareButtons
 from "./ShareButtons";
const PlayDetails = () => {
  const { short_name } = useParams();
  const [play, setPlay] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const siteName = import.meta.env.VITE_SITE_NAME || 'Your Site Name';

  useEffect(() => {
    if (play) {
      // Set the document title and meta description
      document.title = `${play.title} Summary - ${siteName}`;
      const metaTag = document.querySelector("meta[name='description']");
      if (metaTag) {
        metaTag.setAttribute("content", play.metaDescription);
      } else {
        // If the <meta> tag doesn't exist, create it
        const newMetaTag = document.createElement("meta");
        newMetaTag.name = "description";
        newMetaTag.content = play.metaDescription;
        document.head.appendChild(newMetaTag);
      }
    }
  }, [play]);

  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`/data/plays.json`)
      .then((response) => response.json())
      .then((data) => {
        const foundPlay = data.find((p) => p.short_name === short_name);
        if (foundPlay) {
          // Fetch characters for the play
          fetch(`/data/characters.json`)
            .then((response) => response.json())
            .then((data) => {
              // Filter characters for the current play
              const filteredCharacters = data.filter(
                (character) => character.play.id === foundPlay.id
              );
  
              setCharacters(filteredCharacters);
              // Sort characters by name length (longest first)
              const sortedCharacters = [...filteredCharacters].sort(
                (a, b) => b.name.length - a.name.length
              );
  
              // Link each character name only the first time it appears
              let summary = foundPlay.summary;
  
              sortedCharacters.forEach((character) => {
                const nameRegex = new RegExp(`\\b${character.name}\\b`, 'gi');
  
                summary = summary.replace(
                  nameRegex,
                  (match, offset, originalText) => {
                    const before = originalText.slice(0, offset);
                    const after = originalText.slice(offset + match.length);
  
                    // Check if the match is inside <em> tags
                    const isInEmTag =
                      /<em[^>]*>[^<]*$/.test(before) &&
                      /^[^<]*<\/em>/.test(after);
  
                    if (isInEmTag) {
                      return match; // Skip linking if inside <em>
                    }
  
                    const url = `/shakespeare_characters/${character.slug}.html`;
                    return `<a href="${url}" class="text-blue-500 hover:underline">${match}</a>`;
                  }
                );
              });
  
              setPlay({ ...foundPlay, summary });
              setLoading(false); // Stop loading
            })
            .catch((error) => {
              console.error("Error fetching characters:", error);
              setLoading(false); // Stop loading
            });
        } else {
          setPlay(null);
          setLoading(false); // Stop loading
        }
      })
      .catch((error) => {
        console.error("Error fetching play:", error);
        setLoading(false); // Stop loading
      });
  }, [short_name]);
  
  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!play) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold">Play Not Found</h1>
        <Link to="/shakespeare_plays" className="text-blue-500 underline">
          Go back to list
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{play.title}</h1>
        <PlayLinks play={play} />
                {/* Jump to Characters Link */}
        <a
          href="#characters"
          className="text-blue-500 hover:underline text-sm"
        >
          Jump to Character List
        </a>
        <ShareButtons title={ `All About ${play.title}` } />
          
        <div
          className="prose prose-lg mx-auto text-center text-gray-700 mb-8"
          dangerouslySetInnerHTML={{ __html: play.summary }}
        ></div>
        <AdBlock />

        <h2 id="characters" className="text-2xl font-semibold text-gray-800 mb-4">Characters</h2>
        <a
          href="#"
          className="text-blue-500 hover:underline text-md"
        >
          Back to top
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <Link
                to={`/shakespeare_characters/${character.slug}.html`}
                className="text-lg font-bold text-gray-800 mb-2 hover:underline hover:text-xl"
              >
                <h3>{character.name}</h3>
              </Link>
            </div>
          ))}
        </div>

        <Link to="/shakespeare_plays" className="text-blue-500 underline mt-8 block">
          Back to Plays
        </Link>
      </div>
      <Disclaimer />
    </>
  );
};

export default PlayDetails;
