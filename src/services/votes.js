export const upvote = (id) => {
  const url = "https://voiceout-api.herokuapp.com/api/reports/"+ id +"/upvote";

  return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
    let tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": tok,
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })    
}

export const downvote = (id) => {
  const url = "https://voiceout-api.herokuapp.com/api/reports/"+ id +"/downvote";

  return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
    let tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": tok,
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })    
}