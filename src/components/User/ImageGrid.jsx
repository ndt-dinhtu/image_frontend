import ImageCard from "./ImageCard";

const ImageGrid = ({ images, loading, searchQuery }) => {
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

export default ImageGrid;
