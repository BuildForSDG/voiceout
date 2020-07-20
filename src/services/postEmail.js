const PostEmail =  (id, data) => {
  let url = 'https://voiceout-api.herokuapp.com/api/mail/' + id;

  return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const tok = getLocalStorage ? getLocalStorage.token : '';  
		let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const { voice_id } = data;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "recipients": voice_id
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
export default PostEmail;