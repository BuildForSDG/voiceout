
export const getVoices = () => {
  return new Promise((resolve, reject) => {
    fetch('https://voiceout-api.herokuapp.com/api/voices')
    .then( data => {
      return data.json()
    })
    .then( response => {
      resolve(response);
    })
    .catch(err => {
      reject(err);
    })
  })     
}
