const axios = require('axios');
(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/register', {
    name: 'test',
    email: 'test@gmail.com',
    password: '12345',
  });
})();

// (async () => {
//   const { data } = await axios.post('http://localhost:3000/auth/login', {
//     email: 'test@gmail.com',
//     password: '12345',
//   });
// })();
