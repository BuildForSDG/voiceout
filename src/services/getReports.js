
export const getReports = (data) => {
  
  if(data){
    const state = data.state.toLowerCase();
    return new Promise((resolve, reject) => {
      fetch('https://voiceout-api.herokuapp.com/api/reports?state=' + state,
        { credentials: 'include'}
      )
      .then( data => data.json())
      .then( response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
  else{
    return new Promise((resolve, reject) => {
      fetch('https://voiceout-api.herokuapp.com/api/reports', 
        { credentials: 'include'}
      )
      .then( data => data.json())
      .then( response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
    }) 
  }
}

export const getUserReports = () => {
  const getLocalStorage = JSON.parse(localStorage.getItem('response'));
  if(getLocalStorage && getLocalStorage.token){
    const token = getLocalStorage.token;
    return new Promise((resolve, reject) => {
      fetch('https://voiceout-api.herokuapp.com/api/reports',
        { credentials: 'include'},
        {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        }
      )
      .then( data => data.json())
      .then( response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
   
}