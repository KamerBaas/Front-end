const URL_AUTHENTICATION_SERVICE = 'http://gateway.kamerbaas.nl/auth/';

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL_AUTHENTICATION_SERVICE);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        //console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send(JSON.stringify({idtoken: id_token}));
}