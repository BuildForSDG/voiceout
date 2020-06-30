import Axios from "axios";

export const PostComment = async (id, comment) => {
	let url = 'https://voiceout-api.herokuapp.com/api/reports/'+ id +'/comment';
	
  const getLocalStorage = JSON.parse(localStorage.getItem('response'));
  const token = getLocalStorage ? getLocalStorage.token : ''
  let tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const fd = new FormData();
  fd.append('description', comment);
  await Axios.post(url, fd, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text-plain, */*",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": tok,
      "Authorization" : `Bearer ${token}`
    }

  });
  try {
    let res = await fetch('https://voiceout-api.herokuapp.com/api/reports/'+id+'/comments', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": tok,
        "Authorization" : `Bearer ${token}`
      }
    });
    let json = await res.json();
    
    return json; 
  } catch (error) {
    return error
  }
}

export const GetComments = (id) => {
  return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage ? getLocalStorage.token : ''
    let tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
    fetch('https://voiceout-api.herokuapp.com/api/reports/'+id+'/comments', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
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
