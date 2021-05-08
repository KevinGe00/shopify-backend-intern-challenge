import React, { useState, useEffect } from "react";
import axios from 'axios';
import './css/MainPage.css';
import ImageUploadForm from '../organisms/ImageUploadForm';
import ImageGallery from '../organisms/ImageGallery';


function MainPage({

}) {
    const [imageList, setImageList] = useState([]);

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
        <div className="main-page">
            <ImageUploadForm
                imageList={imageList}
                getAllStoredImages={() => getAllStoredImages()}
            />
            <ImageGallery imageList={imageList} />
        </div>
    );
}

export default MainPage;