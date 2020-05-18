import React from 'react';
import LoaderImage from '../../images/Ring-Preloader.gif';
import '../../style/Loading.css';

export default function Loading() {
    return (
        <div className="loading">
            <img className="loadingImage" src={LoaderImage} alt="Image Loading" />
        </div>
    )
}
