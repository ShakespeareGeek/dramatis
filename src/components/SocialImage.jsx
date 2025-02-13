const siteName = import.meta.env.VITE_SITE_NAME || 'Your Site Name';
const SocialImage = () => {
  return (
    <div className="flex mt-8 justify-center pb-8">
      <img
        src="/assets/images/pointing-shakespeare.png"
        alt={siteName}
        className="w-1/4 max-w-xs rounded"
      />
    </div>
  );
};

export default SocialImage;
