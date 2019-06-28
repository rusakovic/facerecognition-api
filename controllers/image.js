const Clarifai = require('clarifai');

// Clarifai App API start
const app = new Clarifai.App({
    // API key in Heroku
    apiKey: process.env.API_CLARIFAI
   });
  // Clarifai App API END

// Clarifai App start
const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
        .then(data => {
            res.json(data);
            console.log(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
 }

const handleImage = (req, res, db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entris'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}