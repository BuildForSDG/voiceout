
export const getSectors = () => {
  return new Promise((resolve, reject) => {
    fetch('https://voiceout-api.herokuapp.com/api/sectors')
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


/*
export const getSectors = [
  {
      "id": 1,
      "created_at": "2020-06-04T13:03:09.000000Z",
      "updated_at": "2020-06-04T13:03:09.000000Z",
      "name": "Security"
  },
  {
      "id": 2,
      "created_at": "2020-06-04T13:03:10.000000Z",
      "updated_at": "2020-06-04T13:03:10.000000Z",
      "name": "Others"
  },
  {
      "id": 3,
      "created_at": "2020-06-04T13:03:11.000000Z",
      "updated_at": "2020-06-04T13:03:11.000000Z",
      "name": "Oil and Gas"
  },
  {
      "id": 4,
      "created_at": "2020-06-04T13:03:11.000000Z",
      "updated_at": "2020-06-04T13:03:11.000000Z",
      "name": "Energy"
  },
  {
      "id": 5,
      "created_at": "2020-06-04T13:03:12.000000Z",
      "updated_at": "2020-06-04T13:03:12.000000Z",
      "name": "Science and Technology"
  },
  {
      "id": 6,
      "created_at": "2020-06-04T13:03:12.000000Z",
      "updated_at": "2020-06-04T13:03:12.000000Z",
      "name": "Education"
  },
  {
      "id": 7,
      "created_at": "2020-06-04T13:03:13.000000Z",
      "updated_at": "2020-06-04T13:03:13.000000Z",
      "name": "Government"
  },
  {
      "id": 8,
      "created_at": "2020-06-04T13:03:13.000000Z",
      "updated_at": "2020-06-04T13:03:13.000000Z",
      "name": "Finance"
  },
  {
      "id": 9,
      "created_at": "2020-06-04T13:03:14.000000Z",
      "updated_at": "2020-06-04T13:03:14.000000Z",
      "name": "Agriculture"
  }
]*/