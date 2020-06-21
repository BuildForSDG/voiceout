import Axios from "axios";

export const PostComment = (id, comment) => {
	let url = 'https://voiceout-api.herokuapp.com/api/reports/'+ id +'/comment';
	
	return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
    let tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    //const fd = new FormData();
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        description: comment
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": tok,
        "Authorization" : `Bearer ${token}`
      }

    }).then(
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
    )
	})
}

export const GetComments = (id) => {
  return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
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