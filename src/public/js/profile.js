// const ProfileSchema = new Schema({
//     isLandlord: { type: Boolean, default: false},
//     name: { type: String, default: '' },
//     title: { type: String, default: ''},
//     description: { type:/**/ String, default: ''},
//     gender: { type: String, default: ''},
//     dateOfBirth: { type: Date, default: ''},
//     spokenLanguages: { type: String, default: ''},
//     livesInCountry: { type: String, default: ''},
//     residence: { type: String, default: ''},
//     status: { type: String, default: ''},
//     smokeInHouse: { type: Boolean, default: false},
//     studentenVereniging: { type: Boolean, default: false},
//     educationLevel: { type: String, default: ''}
// });

const URL_DETAILED_PROFILE_SERVICE = 'http://gateway.kamerbaas.nl/search?term=';
const URL_PROFILE_SERVICE = 'http://gateway.kamerbaas.nl/profile'

$(document)
    .ready(() => {
        $('#profileform').hide();
        // $('.ui.selection.dropdown').dropdown();
        //         // $('#example2').calendar({
        //         //     type: 'date'
        //         // });
        let loggedInUserId = localStorage.getItem('userId');
        if(loggedInUserId !== null) {
            $("#loginButton").html("Logout");
            $("#profile").attr("href", `/profile/?id=${loggedInUserId}`);
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                getUserFromServer(user).then((profile) => {
                    console.log(profile);
                    let loggedInUserId = localStorage.getItem('userId');
                    console.log(loggedInUserId);
                    if(profile !== undefined) {
                        if(loggedInUserId === profile.objectID) {
                            HandleEditableProfileResponse(profile);
                        }
                        else {
                            HandleProfileDetailResponse(profile);
                        }
                    }
                    else {
                        HandleNoProfile();
                    }
                });
            } else {
                window.user = undefined;
                console.log('bla');
            }
        });

        $('#opslaan_button').click((e) => {
            e.preventDefault();
            let profile = formInputObject();
            console.log(profile);
            postUserToServer(profile);
        });


        // fetch(URL_DETAILED_PROFILE_SERVICE + $.urlParam('id'))
        //     .then(function (response) {

        //         if (response.status !== 200) {
        //             SetMessage("Error, status code: " + response.status);
        //             return;
        //         }

        //         //Session ID check with Google user ID.
        //         response.json().then(function (data) {
        //             // Zelfde ID:
        //             //HandleEditableProfileResponse(data.hits);


        //             // Andere ID:
        //             HandleProfileDetailResponse(data.hits);
        //         });
        //     }).catch(function () {
        //     SetMessage('Network error.');
        // });
    })
;

const postUserToServer = (user) => {
    return firebase.auth().currentUser.getIdToken(true).then((idtoken) => {
        var userid = $.urlParam('id');

        if(userid === null) {
            return;
        }
        
        return new Promise((resolve, reject) => {
            console.log(user);
            $.ajax({
                type: "POST",
                url: URL_PROFILE_SERVICE + "/" + userid + "/?idtoken=" + idtoken,
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: (data, text) => {
                    resolve(data);
                },
                error: (req, status, error) => {
                    reject(error);
                }
            });
        }).then((userData) => {
            console.log(userData);
        }).catch((err) => {
            console.error(err.message);
        })
    })
};

const getUserFromServer = (user) => {
    return firebase.auth().currentUser.getIdToken(true).then((idtoken) => {
        var userid = $.urlParam('id');
        if(userid === null) {
            return;
        }
        return new Promise((resolve, reject) => {
            ShowLoadingIcon();
            $.ajax({
                type: "GET",
                url: URL_PROFILE_SERVICE + "/" + userid + "/?idtoken=" + idtoken,
                success: (data, text) => {
                    resolve(data);
                },
                error: (req, status, error) => {
                    reject(error);
                }
            });
        }).then((userData) => {
            return userData.profile;
        }).catch((err) => {
            console.error(err.message);
        })
    })
};

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results !== null) {
        return results[1] || 0;
    }
};

function formInputObject() {
    var profile = {};
    profile.name = document.getElementById('nameText').value;
    profile.description = document.getElementById('descriptionText').value;
    profile.gender = document.getElementById('geslachtDropdown').value;
    profile.dateOfBirth = document.getElementById('dateOfBirthText').value;
    profile.spokenLanguages = document.getElementById('languagesText').value;
    profile.livesInCountry = document.getElementById('countryText').value;
    profile.status = document.getElementById('statusDropdown').value;
    profile.smokeInHouse = document.getElementById('rokerDropdown').value;
    profile.studentenVereniging = document.getElementById('verenigingText').value;
    profile.educationLevel = document.getElementById('opleidingsniveauText').value;

    return profile;
}


function HandleEditableProfileResponse(profile_list){
    $('#profileform').show();
    document.getElementById('temp_filler').innerHTML = '';
    document.getElementById('nameText').value = profile_list.name;
    document.getElementById('descriptionText').value = profile_list.description;
    document.getElementById('geslachtDropdown').value = profile_list.gender;
    document.getElementById('dateOfBirthText').value = profile_list.dateOfBirth;
    document.getElementById('languagesText').value = profile_list.spokenLanguages;
    document.getElementById('countryText').value = profile_list.livesInCountry;
    document.getElementById('statusDropdown').value = profile_list.status;
    document.getElementById('rokerDropdown').value = profile_list.smokeInHouse;
    document.getElementById('verenigingText').value = profile_list.studentenVereniging;
    document.getElementById('opleidingsniveauText').value = profile_list.educationLevel;
}




function HandleProfileDetailResponse(profile_list){
    document.getElementById('profileform').innerHTML = '';
    var to_show_object = {
        isLandlord: profile_list.isLandlord,
        name: profile_list.name,
        title: profile_list.title,
        description: profile_list.description,
        gender: profile_list.gender,
        dateOfBirth: profile_list.dateOfBirth,
        spokenLanguages: profile_list.spokenLanguages,
        livesInCountry: profile_list.livesInCountry,
        residence: profile_list.residence,
        status: profile_list.status,
        smokeInHouse: profile_list.smokeInHouse,
        studentenVereniging: profile_list.studentenVereniging,
        educationLevel: profile_list.educationLevel
        };
    AddProfile(to_show_object);
}


function AddProfile(object){
    document.getElementById('temp_filler').innerHTML = '';
    var div = document.createElement('div');
    div.innerHTML =
        '       <h4 class="ui attached top block header">Volledige naam</h4>\n' +
        '       <div class="ui attached segment">' + object.name + '</div>\n' +
        '       <h4 class="ui attached block header">Beschrijving</h4>\n' +
        '       <div class="ui attached segment">' + object.description + '</div>\n' +
        '       <h4 class="ui attached block header">Geslacht</h4> \n' +
        '       <div class="ui attached segment">' + object.gender + '</div>\n' +
        '       <h4 class="ui attached block header">Geboortedatum</h4>\n' +
        '       <div class="ui attached segment">' + object.dateOfBirth + '</div>\n' +
        '       <h4 class="ui attached block header">Gesproken talen</h4>\n'  +
        '       <div class="ui attached segment">' + object.spokenLanguages + '</div>\n' +
        '       <h4 class="ui attached block header">Land</h4>\n' +
        '       <div class="ui attached segment">' + object.livesInCountry + '</div>\n' +
        '       <h4 class="ui attached block header">Status</h4>\n' +
        '       <div class="ui attached segment">' + object.status + '</div>\n' +
        '       <h4 class="ui attached block header">Roker</h4>\n' +
        '       <div class="ui attached segment">' + object.smokeInHouse + '</div>\n' +
        '       <h4 class="ui attached block header">Studentenvereniging</h4>\n' +
        '       <div class="ui attached segment">' + object.Studentenvereniging + '</div>\n' +
        '       <h4 class="ui attached block header">Opleidingsniveau</h4>\n' +
        '       <div class="ui attached segment">' + object.educationLevel + '</div>\n'

    document.getElementById('profileform').appendChild(div);
}

function HandleNoProfile() {
    document.getElementById('temp_filler').innerHTML = '';
    $('#profileform').hide();
    
    var div = document.createElement('div');
    div.innerHTML = 'No Profile to be found.';

    document.getElementById('temp_filler').appendChild(div);
}


function ShowLoadingIcon(){
    document.getElementById('temp_filler').innerHTML = '';
    $('#profileform').hide();
    var div = document.createElement('div');
    div.className = 'loader';

    document.getElementById('temp_filler').appendChild(div);
}
