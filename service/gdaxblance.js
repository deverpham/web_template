const request = require('request');
const CryptoJS = require('crypto-js')
function getBalance() {
    var key = '66dc8bcddec8e3d7fec94291d9d42711';
    var secret = 'tN8qQC6oZg3AcTv6Qv2tThUD71UTgZtShGTxRgNXZbRubg/x4hcpte6iriRgbbGUIvCRXWJhgkSHMKe42b+12g==';
    var passphrase = 'c7k9d7ao98p';
    var baseUrl = 'https://api-public.sandbox.gdax.com';
    var nonce = Date.now()/1000;
    console.log(nonce)
    var requestPath = "/accounts/c4f14fc9-0a3e-41da-9a84-fdf06abfa91e";
    var method = 'GET';
    var body = '';
    
    var base64secret = CryptoJS.enc.Base64.parse(secret);
    
    var signaturePlaintext = nonce + method + requestPath + body;
    var signatureHash = CryptoJS.HmacSHA256(signaturePlaintext, base64secret);
    var signatureBase64 = signatureHash.toString(CryptoJS.enc.Base64);
    console.log(signatureBase64)
    var requestUrl = baseUrl + requestPath;
    console.log(requestUrl)
    var params = {
      'headers': {
        'CB-ACCESS-KEY': key, 
        'CB-ACCESS-SIGN': signatureBase64, 
        'CB-ACCESS-PASSPHRASE': passphrase,
        'User-Agent': 'test',
        'CB-ACCESS-TIMESTAMP': nonce
      }
    };
    console.log(params.headers)
    request.get({
        url: requestUrl,
        headers: params.headers
    }, (err, response, body) => {
        console.log(body)
    })

}
function getKey(timestamp) {
    var crypto = require('crypto');

var secret = 'tN8qQC6oZg3AcTv6Qv2tThUD71UTgZtShGTxRgNXZbRubg/x4hcpte6iriRgbbGUIvCRXWJhgkSHMKe42b 12g==';
var requestPath = '/accounts';

var body = '';

var method = 'GET';

// create the prehash string by concatenating required parts
var what = timestamp + method + requestPath + body;

// decode the base64 secret
var key = Buffer(secret, 'base64');

// create a sha256 hmac with the secret
var hmac = crypto.createHmac('sha256', key);

// sign the require message with the hmac
// and finally base64 encode the result
return hmac.update(what).digest('base64');
}

getBalance()
