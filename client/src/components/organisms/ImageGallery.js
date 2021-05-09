import React from "react";
import Gallery from "react-photo-gallery";
import "./css/ImageGallery.css";

function ImageGallery({
    imageList = []
}) {

    // Convert image list to form used by react-photo-gallery
    const convertToGalleryList = (imageList) => {
        return imageList.map(image => {
            const b64 = Buffer.from(image.img.data).toString('base64');

            return ({
                src: `data:${image.img.contentType};base64,${b64}`,
                width: image.width,
                height: image.height
            })
        })
    }

    return (
        <div className="image-gallery">
            <h1>Image Repository</h1>
            <Gallery photos={convertToGalleryList(imageList)} />
        </div>
    );
}

export default ImageGallery;