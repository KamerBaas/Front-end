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

const URL_DETAILED_PROFILE_SERVICE = 'http://gateway.kamerbaas.nl/profile/';

$(document)
    .ready(function() {
            fetch(URL_SEARCH_SERVICE + $.urlParam('id'))
                .then(ShowLoadingIcon())
                .then(function (response) {
                    if (response.status !== 200) {
                        SetMessage("Error, status code: " + response.status);
                        return;
                    }
                    response.json().then(function (data) {
                        HandleResponse(data.hits);
                    });
                }).catch(function () {
                SetMessage('Network error.');
            });
    })
;

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

function HandleResponse(profile_list){
    if(profile_list.length > 0){
        document.getElementById('result-cards').innerHTML = '';
        for(var i = 0; i < profile_list.length; i++)
        {
            var to_show_object = {
                name: profile_list[i].name,
                bio: profile_list[i].bio,
                url: 'https://christianlifecoachnow.com/wp-content/uploads/2016/12/Blank-Photo-768x768.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            };
            AddCard(to_show_object);
        }
    } else {
        SetMessage('Geen resultaten.')
    }
    HandleCardEvents();
}


function ShowLoadingIcon(){
    document.getElementById('result-cards').innerHTML = '';
    var div = document.createElement('div');
    div.className = 'loader';

    document.getElementById('result-cards').appendChild(div);
}