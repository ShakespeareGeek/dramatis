import { useEffect } from "react";

const useGoogleAnalytics = () => {
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID; // Dynamic ID

    if (trackingId) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", trackingId);
    }
  }, []);
};

export default useGoogleAnalytics;
