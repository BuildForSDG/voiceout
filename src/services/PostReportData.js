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
			anonymous
		 } = userData;
		 let anonym = (anonymous) ? 1 : 0;
		 console.log(anonym);
		 
		 const fd = new FormData();
		 fd.append('title', title);
		 fd.append('institution_name', institution);
		 fd.append('description', report);
		 fd.append('address', address);
		 fd.append('state', state);
		 fd.append('sector_id', sector_id);
		 fd.append('image', image);
		 fd.append('video', video);
		 fd.append('anonymous', anonym);

		 Axios.post(url + type, fd, {
			headers: {
				"Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": token,
        "Authorization" : `Bearer ${tok}`
			}
		 })
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