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
		fetch(url + type,{mode: 'no-cors'}, {
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
				"Content-Type": "application/json",
				"Accept": "application/json, text-plain, */*",
				"X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token,
        "Authorization" : `Bearer ${tok}`
			}
		})
		.then((response) => response.json())
		.then((response) => {
			resolve(response);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

export default PostReportData;