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

$(document)
    .ready(function() {

        let id = $.url.attr('id');
        
        if(id === null) {
            getPersonalProfile();
        }
        else {
            getProfile(id);
        }

        /*$('.ui.selection.dropdown').dropdown();
        $('#example2').calendar({
            type: 'date'
        });*/
    })
;

function getPersonalProfile() {
    // Find cookie id
    // let cookie_id = getCookieId();

    if(cookie_id === null) {
        console.log('No cookie id found.')
    }
    else {
        $.ajax({
            type: "GET",
            url: `/profile/${cookie_id}`,
            //data: id_token,
            success: (data, text) => {
                // .. call function to set html fields to returned data
                fillPersonalProfilePage(data);
            },
            error: (request, status, error) => {
                // .. show fallback html page to ask the person to log in.
            }
        });
    }
}

function fillPersonalProfilePage(data) {
    // Find elements en fill them with data.
}

function getProfile(id = undefined) {

    // No Cookie found and no Id given.
    if(id === undefined) {
        console.log('No user to be found, no id.');
    }
    // Cookie or Id given, search for profile.
    else {
        $.ajax({
            type: "GET",
            url: `/profile/${id}`,
            //data: id_token,
            success: (data, text) => {
                // .. call function to set html fields to returned data
                fillProfilePage(data);
            },
            error: (request, status, error) => {
                // .. show fallback html page to ask the person to log in.
            }
        });
    }  
}

function fillProfilePage(data) {
    // Find elements en fill them with data.
}