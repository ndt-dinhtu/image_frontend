import PropTypes from "prop-types";

const ImageCard = ({ image }) => {
  const handleCopyLink = () => {
    if (image.descriptionLink) {
      navigator.clipboard.writeText(image.descriptionLink).then(() => alert("Link copied!")).catch(err => console.error("Error copying link", err));
    }
  };

  return (
    <div className="border rounded overflow-hidden dark:bg-gray-800">
      <img
        src={`http://localhost:5000/${image.imageUrl}`}
        alt={image.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-2">
        <h3 className="text-md font-medium text-gray-900 dark:text-white">{image.name}</h3>
        <h3 className="text-md font-medium text-gray-900 dark:text-white">{image.category.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{image.shortDescription}</p>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">{image.descriptionLink}</p>
          {image.descriptionLink && (
            <button
              onClick={handleCopyLink}
              className="px-2 py-1 bg-blue-500 text-white rounded shadow"
            >
              Copy Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


ImageCard.propTypes = {
  image: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    shortDescription: PropTypes.string,
    descriptionLink: PropTypes.string,
  }).isRequired,
};

export default ImageCard;
