const Disclaimer = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@emailhere.com';
  const adminName = import.meta.env.VITE_ADMIN_NAME || 'admin name';
  const siteName = import.meta.env.VITE_SITE_NAME || 'Your Site Name';
  console.log(contactEmail);
  return (
    <div className="p-8 mx-auto text-center">
      <p className="text-sm text-gray-400">
        The content on most of these pages was originally created using Generative AI, and 
        such may contain inaccuracies or hallucinations. We are steadily going through all 
        of the pages to correct mistakes as we find them. If you find any mistakes, please 
        reach out to <a className="text-blue-600 hover:text-blue-800 hover:underline" 
        href={`mailto:${contactEmail}`}
        >
          {adminName}
        </a> with a link to the offending page and we will prioritize getting it fixed. Thank you so much for supporting {siteName}!
      </p>
    </div>
  );
};

export default Disclaimer;
