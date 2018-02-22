function sleep(milliseconds) {
  return new Promise((resolve, reject) => {
    if(milliseconds > 0) {
      setTimeout(() => {
        resolve('resolved');
      }, milliseconds);
    } else {
      reject('rejected');
    }
  });
}

sleep(1000)
  .then(() => {
    console.log('one');
    return sleep(1000);
  })
  .then(() => {
    console.log('two');
    return sleep(1000);
  })
  .then(() => {
    console.log('three');
  });

fetchJSON('/user-profile')
  .then(user => {
    return fetchJSON(`/users/${user.id}/friends`);
  })
  .then(friendIDs => {
    let promises = friendIDs.map(id => {
      return fetchJSON(`/users${id}`);
    });
    return Promise.all(promises);
  })
  .then(friends => console.log(friends));