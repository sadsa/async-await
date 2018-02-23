import axios from 'axios';

function handleError(fn) {
  return function(...params) {
    return fn(...params).catch(error => {
      console.log(`Error ocurred: ${error}`);
    });
  };
}

async function getDogs() {
  const dogs = await axios.get("http://cooldogs.org");
}

const safeGetDogs = handleError(getDogs);
safeGetDogs();