import React, { useState, useCallback, useMemo } from 'react'
import axios from 'axios';
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import './css/ImageUploadForm.css';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from './css/ImageUploadFormStyling';

function ImageUploadForm({
  imageList = [],
  getAllStoredImages
}) {

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const uploadImage = (formData) => {
    axios.post('http://localhost:5000/api/upload', formData)
      .then(res => {
        alert("Upload success. Image added to gallery.");
        getAllStoredImages();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      // Create payload to be sent to server
      var formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('img', file);

      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          // Image is opened and processed here
          formData.append("width", img.naturalWidth);
          formData.append("height", img.naturalHeight);

          // Formdata complete
          uploadImage(formData);
        }
      }
    })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: 'image/*' })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="image-upload-form">
      <h2>File Upload</h2>
      <div {...getRootProps({ style })} className='dropzone-div'>
        <FontAwesomeIcon icon={faUpload} size='3x' />
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag and drop an image here, or click to select images</p>
        }
        <em>(Only *.jpg, *.jpeg and *.png files will be accepted)</em>
      </div>
    </div>
  )
}

export default ImageUploadForm;
