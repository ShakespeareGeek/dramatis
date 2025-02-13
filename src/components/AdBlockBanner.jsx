import { useEffect } from 'react';

const AdBlockBanner = () => {
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
    <div class="p-5">
      <ins 
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4716552313955049"
      data-ad-slot="1379720841"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
    </div>
  );
};

export default AdBlockBanner;