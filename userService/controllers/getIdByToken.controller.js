const { getIdByTokenApi } = require('../apis/authApis');

const getIdByToken = async (req, res) => {
    getIdByTokenApi(req.params.token)
        .then(response => {
          // console.log(response.data);
          res.status(200).json( response.data );
        })
        .catch(error => {
          if (error.response) {
            // console.log(error.response.data);
            res.status(error.response.status).json(error.response.data);
          } else {
            console.log('Error', error.message);
          }
        });
}

module.exports = getIdByToken;