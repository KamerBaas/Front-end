const URL_AUTHENTICATION_SERVICE = 'http://gateway.kamerbaas.nl/auth/';
//const CircularJSON = require('circular-json');
//const URL_AUTHENTICATION_SERVICE = 'http://192.168.99.100:8081/handler.php';

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
        let userId = localStorage.getItem('userId');
        if(userId) signOut();
        else signIn();
    })
});

const signOut = () => {
    $("#loginButton").html("...");
    firebase.auth().signOut().then(function() {
        localStorage.removeItem('userId');
        $("#profile").attr("href", `/profile`);
        $("#loginButton").html("Login");
      }).catch(function(error) {
        $("#loginButton").html("Logout");
      });
}

const signIn = () => {
    $("#loginButton").html("...");
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
                            var userid = firebase.auth().currentUser.uid;
                            localStorage.setItem('userId', userid);
                            $("#profile").attr("href", `/profile/?id=${userid}`);
                            $("#loginButton").html("Logout");
                        });
                    });
            }); 
        }).catch((error) => {
            $("#loginButton").html("Login");
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