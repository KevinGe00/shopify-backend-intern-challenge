import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./css/ImageUploadForm.css";

function ImageUploadForm({

}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('img', file);
    axios.post('http://localhost:5000/api/upload', formData)
      .then(res => {
        alert("Upload success");
        getAllStoredImages();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getAllStoredImages = () => {
    axios.get('http://localhost:5000/api/all')
      .then(res => {
        if (res.data) {
          console.log(res.data);
          setImageList(res.data);
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllStoredImages();
  }, []);

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

      <div>
        {imageList.map((image, index) => {
          const b64 = Buffer.from(image.img.data).toString('base64');
          return (<>
            <h1>{image.name}</h1>
            <p>{image.desc}</p>
            <img key={index} src={`data:${image.img.contentType};base64,${b64}`}></img>
          </>)
        })}
      </div>
    </div>
  );
}

export default ImageUploadForm;