import Axios from "axios";

const PostReportData = (type, userData, tok) => {
	let url = 'https://voiceout-api.herokuapp.com/api/';
	
	return new Promise((resolve, reject) => {

		let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		const { 
      title,
			institution,
			report,
			address,
			sector_id,
			state,
			image,
			video,
		 } = userData;
		 
		 const fd = new FormData();
		 fd.append('title', title);
		 fd.append('institution_name', institution);
		 fd.append('description', report);
		 fd.append('address', address);
		 fd.append('state', state);
		 fd.append('sector', sector_id);
		 fd.append('image', image);
		 fd.append('video', video);

		 Axios.post(url + type, fd, {
			headers: {
				"Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": token,
        "Authorization" : `Bearer ${tok}`
			}
		 })
		/*fetch(url + type,{mode: 'no-cors'}, {
			method: 'POST',
			body: JSON.stringify({
				title,
        institution_name: institution,
				description: report,
				address,
        sector_id,
        state,
        image: image.name,
        video: video.name
			}),
			headers: {
        "X-CSRF-TOKEN": token,
        "Authorization" : `Bearer ${tok}`
			}
		})*/
		.then((response) => response.data)
		//.then((response) => response.data.json())
		.then((response) => {
			resolve(response);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

export default PostReportData;