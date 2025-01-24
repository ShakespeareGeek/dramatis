import { useEffect } from "react";

const useAdSense = () => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_ADSENSE_CLIENT; // Dynamic ID

    if (clientId) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);
};

export default useAdSense;
