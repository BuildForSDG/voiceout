const PostData = (type, userData) => {
	let url = 'https://voiceout-api.herokuapp.com/api/';
	
	return new Promise((resolve, reject) => {

		let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		if(type === 'login'){
			const { email, password} = userData;
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
		}
		if(type === 'register'){
			const { email, password, first_name, last_name } = userData;
			fetch(url + type, {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					first_name,
					last_name,
					role: 'user'
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
		}
	})
}

export default PostData;