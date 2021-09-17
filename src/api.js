import axios from 'axios';

// we call this to fetch the data and render it
export const fetchData = (userId) => {
  const userPromise = fetchUser(userId);
  return {
    user: wrapPromise(userPromise)
  };
};

// here we handle the promise for our fetch
const wrapPromise = (promise) => {
  //set initial status
  let status = 'pending';
  //store result
  let result;
  //wait for promise
  let suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    //this will trigger when we fetch for the user in index.js
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
};

const fetchUser = ({ userId }) => {
  console.log('Fetching User...');
  return axios
    .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
