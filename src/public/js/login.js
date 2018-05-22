const URL_AUTHENTICATION_SERVICE = 'http://gateway.kamerbaas.nl/auth/';

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
    firebase.auth().signInWithPopup(provider).then(() => {
        window.location = "/profile";
    }).catch((error) => {
        console.error(error.message);
    });
}

const getIdToken = () => {
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
}