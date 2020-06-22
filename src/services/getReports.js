
export const getReports = (data) => {
  let stateAndSectorData;
  let stateData;
  let sectorData;
  if(data){
    const {state, sector_id} = data;
    console.log(data)
    if(state === "" && sector_id.length === 0){
    console.log(sector_id);
      
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
    else if(state !== "" && sector_id.length !== 0){
      return new Promise((resolve, reject) => {
        fetch('https://voiceout-api.herokuapp.com/api/reports',
          { credentials: 'include'}
        )
        .then( data => data.json())
        .then( data => {
          stateAndSectorData = data.filter(data => {
            return data.state == state
          })
          .filter(eachData => {
            return (
              eachData.sector.length !== 0 ? 
              eachData.sector[0].id == sector_id[0] : 
              ""
            )
          })
          return stateAndSectorData
        })
        .then( response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
      })
    }
    else if(state !== ""){
      return new Promise((resolve, reject) => {
        fetch('https://voiceout-api.herokuapp.com/api/reports',
          { credentials: 'include'}
        )
        .then( data => data.json())
        .then( data => {
          stateData = data.filter(data => {
            return data.state == state
          })
          return stateData
        })
        .then( response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
      })
    }
    else if(sector_id.length !== 0){
      console.log(sector_id)
      return new Promise((resolve, reject) => {
        fetch('https://voiceout-api.herokuapp.com/api/reports',
          { credentials: 'include'}
        )
        .then( data => data.json())
        .then( data => {
          console.log(data[80].sector[0].id)
          sectorData = data.filter(eachData => {
            return (
              eachData.sector.length !== 0 ? 
              eachData.sector[0].id == sector_id[0] : 
              ""
            )
          })
          return sectorData
        })
        .then( response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
      })
    }
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

export const getSingleReport = (id) => {
  const getLocalStorage = JSON.parse(localStorage.getItem('response'));
  if(getLocalStorage && getLocalStorage.token){
    const token = getLocalStorage.token;
    return new Promise((resolve, reject) => {
      fetch('https://voiceout-api.herokuapp.com/api/reports/' + id,
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