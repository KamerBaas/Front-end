//const URL_AUTHENTICATION_SERVICE = 'http://gateway.kamerbaas.nl/auth/';
//const CircularJSON = require('circular-json');
const URL_AUTHENTICATION_SERVICE = 'http://192.168.99.100:8081/handler.php';

//let user;
var config = {
    apiKey: "AIzaSyDgW1UpBaT4XQ8Cq81ztyi3StPsVQaGwO4",
    authDomain: "kamerbaas-nots.firebaseapp.com",
    databaseURL: "https://kamerbaas-nots.firebaseio.com",
    projectId: "kamerbaas-nots",
    storageBucket: "",
    messagingSenderId: "833496987505"
};
firebase.initializeApp(config);

$(document).ready(() => {
    $('#loginButton').click((e) => {
        e.preventDefault();
        signIn();
    })
});

const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        //window.location = "/profile";
        // var idToken = getIdToken();
        // console.log(getIdToken());
        // var jsonToken = { "token": idToken }
        // var token = firebase.auth().currentUser.getIdToken(false);
        // //var token = result.credential.accessToken;
        // console.log(token);

        // var tokenId = {
        //     "tokenid": token
        // };
        firebase.auth().currentUser.getIdToken(true).then(result => {
            
            fetch(URL_AUTHENTICATION_SERVICE, { 
                method: 'POST', 
                headers: { 'content-type': 'application/json' }, 
                mode: 'cors',
                body: JSON.stringify(result)
            })
            .then(data => {
                data.json()
                    .then(json => {
                        console.log(json);
                        
                        });
                        // 
                        // $("#profile").attr("href", `/profile/${userid}`);
                    });
            }); 
        });
        var userid = firebase.auth().currentUser.uid;
        firebase.auth().currentUser.getIdToken(true).then(result => {
            console.log(result);
            fetch(`http://localhost:3000/profile/?idtoken=${result}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    userid: userid
                })
            }).then(data => console.log(data));
    }).catch((error) => {
        console.error(error.message);
    });
    
}

const getIdToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idtoken => {
        console.log(idtoken);
        return idtoken;
    })
    .catch(function(error) {
        console.log(error);
    });
}