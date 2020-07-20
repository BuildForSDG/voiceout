import React from 'react';
import LoaderImage from '../../images/Ring-Preloader.gif';
import '../../style/Loading.css';
import Image from 'react-bootstrap/Image'

export default function Loading() {
	return (
		<div className="loading text-center">
			<div className="image-div">
				<Image className="loadingImage" src={LoaderImage} fluid alt="Image Loading" />
			</div>
		</div>
	)
}
