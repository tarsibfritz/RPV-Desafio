import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const PhotoUploader = ({ onPhotoUpload }) => {
  const [photo, setPhoto] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setPhoto(compressedFile);
      onPhotoUpload(compressedFile);
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Erro ao compactar a imagem:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {photo && <p>Foto selecionada: {photo.name}</p>}
    </div>
  );
};

export default PhotoUploader;
