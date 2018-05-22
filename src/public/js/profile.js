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
    .ready(() => {
        $('.ui.selection.dropdown').dropdown();
        $('#example2').calendar({
            type: 'date'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                getUserFromServer(user);
            } else {
                window.user = undefined;
            }
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
}
