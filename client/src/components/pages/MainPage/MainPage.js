import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MainPage.css';
import ImageUploadForm from '../../organisms/ImageUploadForm/ImageUploadForm';
import SearchBar from "../../molecules/SearchBar/SearchBar";
import ImageGallery from '../../organisms/ImageGallery/ImageGallery';


function MainPage({

}) {
    const [imageListAll, setImageListAll] = useState([]); // A complete list of stored images
    const [imageList, setImageList] = useState([]); // List of images to display based on user search
    const [searchKeyword, setSearchKeyword] = useState('');

    const baseUrl = process.env.baseURL || "http://localhost:5000"

    const getAllStoredImages = () => {
        axios.get(`${baseUrl}/api/all`)
            .then(res => {
                if (res.data) {
                    setImageListAll(res.data);
                    setImageList(res.data);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllStoredImages();
    }, []);


    const updateSearch = async (input) => {
        const filtered = imageListAll.filter(image => {
            return image.name.toLowerCase().includes(input.toLowerCase()) ||
                image.desc.toLowerCase().includes(input.toLowerCase())
        })
        setSearchKeyword(input);
        setImageList(filtered);
    }

    return (
        <div className="main-page">
            <ImageUploadForm
                imageList={imageList}
                getAllStoredImages={() => getAllStoredImages()}
            />
            <h1 style={{ fontSize: '40px', marginTop: '90px', marginBottom: '30px' }}>Image Repository</h1>
            <SearchBar
                keyword={searchKeyword}
                setKeyword={updateSearch}
            />
            <ImageGallery
                imageList={imageList}
                searchKeyword={searchKeyword}
            />
        </div>
    );
}

export default MainPage;