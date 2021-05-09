import React, { useState, useCallback, useMemo } from 'react'
import axios from 'axios';
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import './ImageUploadForm.css';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from './ImageUploadFormStyling';

function ImageUploadForm({
  imageList = [],
  getAllStoredImages
}) {

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    // Create payload to be sent to server
    var formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append("width", width);
    formData.append("height", height);
    formData.append('img', file);

    axios.post('http://localhost:5000/api/upload', formData)
      .then(res => {
        alert("Upload success. Image added to gallery.");
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFile(file)

      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          // Image is opened and processed here
          setWidth(img.naturalWidth);
          setHeight(img.naturalHeight);
        }
      }
      reader.readAsDataURL(file);
    })
  }, [])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 })

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

  const files = acceptedFiles.map(file => (
    <p key={file.path}>
      {file.path} - {Math.round(file.size / 1000)} kb
    </p>
  ));

  return (
    <div className="image-upload-form container">
      <form id="contact">
        <h2>File Upload</h2>
        <fieldset>
          <input
            placeholder="Image name"
            type="text"
            tabIndex="1"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus />
        </fieldset>

        <fieldset>
          <input
            placeholder="Image description"
            type="text"
            tabI ndex="2"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            required
            autoFocus
          />
        </fieldset>

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

        <aside>
          <h4>Uploaded File:</h4>
          {file ?
            files :
            "None"
          }
        </aside>

        <button
          id="contact-submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ImageUploadForm;
