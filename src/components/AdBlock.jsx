import { useEffect } from 'react';

const AdBlock = () => {
  useEffect(() => {
    // Load the AdSense script
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4716552313955049";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // Initialize the ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins 
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4716552313955049"
      data-ad-slot="7081633883"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdBlock;