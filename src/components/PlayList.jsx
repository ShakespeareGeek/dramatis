import { useEffect, useState } from "react";
import AdBlock from "./AdBlock";

const PlayList = () => {
  const [plays, setPlays] = useState([]);

  useEffect(() => {
    fetch(`/data/plays.json`)
      .then((response) => response.json())
      .then((data) => setPlays(data))
      .catch((error) => console.error("Error fetching plays:", error));
  }, []);

  return (
    
    <div className="p-4">
      <h1 className="text-4xl font-bold center mb-4">The Plays of William Shakespeare</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plays.map((play) => (
          <div key={play.id} className="p-4 bg-white rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-2"><em>{play.title}</em></h2>
            <p
              className="text-gray-700 text-sm mb-4"
              dangerouslySetInnerHTML={{
                __html: `${play.summary.slice(0, 120)}...`,
              }}
            ></p>      <a
              href={`/shakespeare_plays/${play.short_name}.html`}
              className="text-blue-500 hover:underline"
            >
              Explore Now
            </a>
          </div>
        ))}
      </div>
      <AdBlock/>
    </div>
  );
};

export default PlayList;
