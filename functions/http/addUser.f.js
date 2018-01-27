const functions = require('firebase-functions');
const firebase = require('firebase');
// firebase.initializeApp(functions.config().firebase);
// var database = firebase.database();
const uuidv4 = require('uuid/v4');

exports = module.exports = functions.https.onRequest((request, response) => {
    const { name, email, phonenumber, password } = request.body;
    const id = uuidv4();

    firebase.database().ref('users/' + id).set({
        name,
        email,
        phonenumber,
        password,
        id,
        addedon: new Date(),
        verified: false
    }).then((results) => {
        response.send({success: true});
    }).catch((err) => {
        response.status(500).send(err);
    });
});