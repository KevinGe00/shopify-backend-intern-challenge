import React from "react";
import "./css/ImageGallery.css";

function ImageGallery({
    imageList = []
}) {
    return (
        <div className="image-gallery">

            {imageList.map((image, index) => {
                const b64 = Buffer.from(image.img.data).toString('base64');
                return (<>
                    <h1>{image.name}</h1>
                    <p>{image.desc}</p>
                    <img key={index} src={`data:${image.img.contentType};base64,${b64}`}></img>
                </>)
            })}

        </div>
    );
}

export default ImageGallery;