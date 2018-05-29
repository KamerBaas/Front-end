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

$(document)
    .ready(() => {
        // $('.ui.selection.dropdown').dropdown();
        //         // $('#example2').calendar({
        //         //     type: 'date'
        //         // });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                getUserFromServer(user);
            } else {
                window.user = undefined;
            }
        });


        fetch(URL_DETAILED_PROFILE_SERVICE + $.urlParam('id'))
            .then(function (response) {

                if (response.status !== 200) {
                    SetMessage("Error, status code: " + response.status);
                    return;
                }

                //Session ID check with Google user ID.
                response.json().then(function (data) {
                    // Zelfde ID:
                    //HandleEditableProfileResponse(data.hits);


                    // Andere ID:
                    HandleProfileDetailResponse(data.hits);
                });
            }).catch(function () {
            SetMessage('Network error.');
        });
    })
;

const getUserFromServer = (user) => {
    return getIdToken().then((idtoken) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://gateway.kamerbaas.nl/profile/" + user.uid + "/?idtoken=" + idtoken,
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

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};


function HandleEditableProfileResponse(profile_list){
    document.getElementById('nameText').value = profile_list[0].name;
    document.getElementById('descriptionText').value = profile_list[0].description;
    document.getElementById('geslachtDropdown').value = profile_list[0].gender;
    document.getElementById('dateOfBirthText').value = profile_list[0].dateOfBirth;
    document.getElementById('languagesText').value = profile_list[0].spokenLanguages;
    document.getElementById('countryText').value = profile_list[0].livesInCountry;
    document.getElementById('statusDropdown').value = profile_list[0].status;
    document.getElementById('rokerDropdown').value = profile_list[0].smokeInHouse;
    document.getElementById('verenigingText').value = profile_list[0].studentenVereniging;
    document.getElementById('opleidingsniveauText').value = profile_list[0].educationLevel;
}




function HandleProfileDetailResponse(profile_list){
    document.getElementById('profileform').innerHTML = '';
    var to_show_object = {
        isLandlord: profile_list[0].isLandlord,
        name: profile_list[0].name,
        title: profile_list[0].title,
        description: profile_list[0].description,
        gender: profile_list[0].gender,
        dateOfBirth: profile_list[0].dateOfBirth,
        spokenLanguages: profile_list[0].spokenLanguages,
        livesInCountry: profile_list[0].livesInCountry,
        residence: profile_list[0].residence,
        status: profile_list[0].status,
        smokeInHouse: profile_list[0].smokeInHouse,
        studentenVereniging: profile_list[0].studentenVereniging,
        educationLevel: profile_list[0].educationLevel
        };
    AddProfile(to_show_object);
}


function AddProfile(object){
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


function ShowLoadingIcon(){
    document.getElementById('profileform').innerHTML = '';
    var div = document.createElement('div');
    div.className = 'loader';

    document.getElementById('profileform').appendChild(div);
}
