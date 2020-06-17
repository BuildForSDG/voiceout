export const getVotes = (id) => {
  const url = "https://voiceout-api.herokuapp.com/api/reports/"+ id;

  return new Promise((resolve, reject) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
    let tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(url, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": tok,
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(res => {
      return {
        "upvoted": res.upvoted,
        "downvoted": res.downvoted
      }
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })    
}