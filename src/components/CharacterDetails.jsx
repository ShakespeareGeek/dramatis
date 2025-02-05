import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Disclaimer from './Disclaimer';
import AdBlock from "./AdBlock.jsx";
import PlayLinks from "./PlayLinks.jsx";
import ShareButtons from "./ShareButtons.jsx";
import SocialImage from "./SocialImage.jsx";
const siteUrl = import.meta.env.VITE_HOMEPAGE_URL || 'Your Site Ur';

const CharacterDetails = () => {
  const { slug } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    if (character) {
      // Set the document title and meta description
      document.title = `${character.name} in ${character.play.title} | Shakespeare Character Analysis`;
      const metaTag = document.querySelector("meta[name='description']");
      if (metaTag) {
        metaTag.setAttribute("content", character.meta_description);
      } else {
        // If the <meta> tag doesn't exist, create it
        const newMetaTag = document.createElement("meta");
        newMetaTag.name = "description";
        newMetaTag.content = character.meta_description;

        // og:title - The title of your page
        newMetaTag.setAttribute("property", "og:title");
        newMetaTag.content = `${character.name} in ${character.play.title}`;

        // og:type - Most appropriate for your content would be "article"
        newMetaTag.setAttribute("property", "og:type");
        newMetaTag.content = "article";

        // og:url - The canonical URL
        newMetaTag.setAttribute("property", "og:url");
        newMetaTag.content = `${siteUrl}/shakespeare_characters/${character.slug}.html`;

        // og:description
        newMetaTag.setAttribute("property", "og:description");
        newMetaTag.content = character.meta_description;
        document.head.appendChild(newMetaTag);
      }

      // Twitter title
      const twitterTitle = document.querySelector("meta[name='twitter:title']");
      if (twitterTitle) {
        twitterTitle.setAttribute("content", `${character.name} in ${character.play.title}`);
      } else {
        const newTwitterTitle = document.createElement("meta");
        newTwitterTitle.name = "twitter:title";
        newTwitterTitle.content = `${character.name} in ${character.play.title}`;
        document.head.appendChild(newTwitterTitle);
      }

      // Twitter description
      const twitterDesc = document.querySelector("meta[name='twitter:description']");
      if (twitterDesc) {
        twitterDesc.setAttribute("content", character.meta_description);
      } else {
        const newTwitterDesc = document.createElement("meta");
        newTwitterDesc.name = "twitter:description";
        newTwitterDesc.content = character.meta_description;
        document.head.appendChild(newTwitterDesc);
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
          <ShareButtons title={ `All About ${character.name}` } />
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
            Return to {character.play.title} Play Analysis
          </Link>
        </div>
      </div>
      <Disclaimer />
      <SocialImage />
      </>
  );
};

export default CharacterDetails;
