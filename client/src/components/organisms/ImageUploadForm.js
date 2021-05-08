import React, { useState } from "react";
import axios from 'axios';
import "./css/ImageUploadForm.css";

function ImageUploadForm({
  imageList = [],
  getAllStoredImages
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const uploadImage = (formData) => {
    axios.post('http://localhost:5000/api/upload', formData)
      .then(res => {
        alert("Upload success");
        getAllStoredImages();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('img', file);

    // Getting dimensions of uploaded image
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          formData.append("width", img.naturalWidth);
          formData.append("height", img.naturalHeight);

          // Formdata complete
          uploadImage(formData);
        }
      }
    }
  }

  return (
    <div className="image-upload-form">
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label>
          Image Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          Image Description:
          <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </label>

        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={e => setFile(e.target.files[0])}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ImageUploadForm;