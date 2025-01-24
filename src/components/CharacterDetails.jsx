import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Disclaimer from './Disclaimer';
import AdBlock from "./AdBlock.jsx";
import PlayLinks from "./PlayLinks.jsx";

const CharacterDetails = () => {
  const { slug } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    if (character) {
      // Set the document title and meta description
      document.title = `${character.name} - ${character.play.title}`;
      const metaTag = document.querySelector("meta[name='description']");
      if (metaTag) {
        metaTag.setAttribute("content", character.meta_description);
      } else {
        // If the <meta> tag doesn't exist, create it
        const newMetaTag = document.createElement("meta");
        newMetaTag.name = "description";
        newMetaTag.content = character.meta_description;
        document.head.appendChild(newMetaTag);
      }
    }
  }, [character]);

  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`/data/characters.json`)
      .then((response) => response.json())
      .then((data) => {
        const foundCharacter = data.find((c) => c.slug === slug);
        setCharacter(foundCharacter);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching character:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold">Character not found</h1>
        <Link to="/shakespeare_plays" className="text-blue-500 underline">
          Go back to list
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {character.name}
          </h1>
          <PlayLinks short_name={character.play.short_name} />

          <div className="hidden md:block float-right w-1/4 p-4 ">
            <AdBlock />
          </div>
          <div
            className="prose prose-lg mx-auto text-center text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: character.body }}
          ></div>
          <div className="block md:hidden p-4 ">
            <AdBlock />
          </div>
          <Link
            to={`/shakespeare_plays/${character.play.short_name}.html`}
            className="text-blue-500 hover:underline"
          >
            Back to {character.play.title}
          </Link>
        </div>
      </div>
      <Disclaimer />
    </>
  );
};

export default CharacterDetails;
