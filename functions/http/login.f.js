const functions = require('firebase-functions');
const firebase = require('firebase');
// firebase.initializeApp(functions.config().firebase);
// var database = firebase.database();

exports = module.exports = functions.https.onRequest((request, response) => {
    const { email, password } = request.body;

    const ref = firebase.database().ref("users");
    ref.orderByChild("email").equalTo(email).on("value", (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            const userId = Object.keys(userData)[0];
            const userInfo = userData[userId];

            if (userInfo.password === password) {
                const user = {
                    id: userInfo.id,
                    name: userInfo.name
                };
                const userString = JSON.stringify(user);
                const cookie = "authCookie=" + userString;
                console.log(cookie)
                response.setHeader("Set-Cookie", cookie);
                response.status(200).send({success: true});
            } else {
                response.status(500).send({
                    message: 'Incorrect Email/Password..'
                }); 
            }
        } else {
            response.status(500).send({
                message: 'User does not exist.'
            });
        }
    });
});