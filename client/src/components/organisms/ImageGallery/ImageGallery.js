import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import "./ImageGallery.css";

function ImageGallery({
    imageList = []
}) {

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    // Convert image list to form used by react-photo-gallery
    const convertToGalleryList = (imageList) => {
        return imageList.map(image => {
            const b64 = Buffer.from(image.img.data).toString('base64');

            return ({
                src: `data:${image.img.contentType};base64,${b64}`,
                width: image.width,
                height: image.height,
                title: image.name + ": " + image.desc
            })
        })
    }

    return (
        <div className="image-gallery">
            <Gallery photos={convertToGalleryList(imageList)} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={convertToGalleryList(imageList).map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title,
                                alt: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}

export default ImageGallery;