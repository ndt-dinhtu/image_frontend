const ImageCard = ({ image }) => {
    return (
      <div className="border rounded overflow-hidden">
        <img
          src={`http://localhost:5000/${image.imageUrl}`}
          alt={image.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-2">
          <h3 className="text-md font-medium">{image.name}</h3>
          <h3 className="text-md font-medium">{image.category.name}</h3>
          <p className="text-sm text-gray-600">{image.shortDescription}</p>
          <p className="text-sm text-gray-600">{image.descriptionLink}</p>
        </div>
      </div>
    );
  };
  
  export default ImageCard;
  