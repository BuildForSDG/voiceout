import Axios from "axios";

const PostComment = (id, comment) => {
	let url = 'https://voiceout-api.herokuapp.com/api/reports/'+ id +'/comment';
	
	return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
    let tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const fd = new FormData();
		fd.append('description', comment);
    Axios.post(url, fd, {
      headers: {
				"Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": tok,
        "Authorization" : `Bearer ${token}`
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

export default PostComment;