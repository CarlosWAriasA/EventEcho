import { Modal } from "flowbite-react";

function UploadImageModal({
  showModal,
  setShowModal,
  images,
  setImages,
  maxImages = 4,
}) {
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const remainingSlots = maxImages - images.length;
    const toProcess = imageFiles.slice(0, remainingSlots);

    setImages((prevImages) => [...prevImages, ...toProcess]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const remainingSlots = maxImages - images.length;
    const toProcess = imageFiles.slice(0, remainingSlots);

    setImages((prevImages) => [...prevImages, ...toProcess]);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
      <Modal.Header>Cargar Imágenes</Modal.Header>
      <Modal.Body>
        <label
          htmlFor="fileInput"
          className="custom-file-upload"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          Seleccionar o Soltar Imágenes
          <input
            className="p-8 border-4 border-dashed border-gray-500"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            multiple={maxImages > 0 ? true : false}
            id="fileInput"
          />
        </label>
        <div className="ml-7">
          {images.map((imageUrl, index) => (
            <div key={index} className="image-container">
              <img
                src={URL.createObjectURL(imageUrl)}
                alt={`Imagen ${index + 1}`}
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="delete-button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UploadImageModal;
