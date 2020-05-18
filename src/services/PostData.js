const PostData = (type, userData) => {
	let url = 'https://voiceout-api.herokuapp.com/api/';
	
	return new Promise((resolve, reject) => {

		let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		const { email, password } = userData;
		fetch(url + type, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			}),
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json, text-plain, */*",
				"X-Requested-With": "XMLHttpRequest",
				"X-CSRF-TOKEN": token
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

export default PostData;