const axios = require('axios');

axios.get('https://vk.com')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });