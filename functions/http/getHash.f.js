// Functions implemented for generating hash for PayUMoney app
const functions = require('firebase-functions');
const sha512 = require('js-sha512');
const key = 'Yor merchant key';
const salt = 'Your merchant salt';
const amount = '5.00';
const productinfo = 'entryFee';
const surl = '/success';
const furl = '/failure';

exports = module.exports = functions.https.onRequest((request, response) => {
    const { txnid, firstname, email, phone } = request.body;
    const hashSequence = key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|||||||||||' + salt;
    const hash = sha512(hashSequence);
    const data = {
        key,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        surl,
        furl,
        hash
    };
    response.send(data);
});