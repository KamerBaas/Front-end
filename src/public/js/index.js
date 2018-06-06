$(document)
    .ready(() => {
        let userId = localStorage.getItem('userId');
        if(!userId) {
            $("#profile").attr("href", `/profile/?id=${userId}`);
            $("#loginButton").html("Logout");
        }
    });