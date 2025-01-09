import PropTypes from "prop-types";
import ImageCard from "./ImageCard";

const ImageGrid = ({ images, loading }) => {
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {(images || []).map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      shortDescription: PropTypes.string,
      descriptionLink: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGrid;
