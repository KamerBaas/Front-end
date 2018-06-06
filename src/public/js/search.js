const URL_SEARCH_SERVICE = 'http://gateway.kamerbaas.nl/search?term=';

$(document)
    .ready(function() {
        let userId = localStorage.getItem('userId');
        if(userId !== null) {
            $("#profile").attr("href", `/profile/?id=${userId}`);
            $("#loginButton").html("Logout");
        }
        document.getElementById('btn-search').onclick = function(e){
            e.preventDefault();
            if(document.getElementById('search-input').value !== ''){
                fetch(URL_SEARCH_SERVICE + document.getElementById('search-input').value)
                    .then(ShowLoadingIcon())
                    .then(function(response) {
                        if (response.status !== 200) {
                            SetMessage("Error, status code: " + response.status);
                            return;
                        }
                        response.json().then(function(data) {
                            console.log(data.hits);
                            HandleResponse(data.hits);
                        });
                    }).catch(function() {
                        SetMessage('Network error.');
                    });
            } else {
                HandleFalseInput();
            }
        }
    })
;

$('#btn-search').keyup(function(event) {
    if (event.keyCode === 13) {
        $('#btn-search').click();
    }
});

function AddCard(object){
    var div = document.createElement('div');
    div.className = 'col-md-4 col-sm-6 col-xs-12';
    div.innerHTML =
        '        <article class=\'material-card Blue\'>\n' +
        '            <h2>\n' +
        '                <span>' + object.name + '</span>\n' +
        '                <strong>\n' +
        '                    <i class=\'fa fa-fw fa-star\'></i>\n' +
        '                    ' + object.bio + '\n' +
        '                </strong>\n' +
        '            </h2>\n' +
        '            <div class=\'mc-content\'>\n' +
        '                <div class=\'img-container\'>\n' +
        '                    <img class=\'img-responsive\' src=' + object.url+ '>\n' +
        '                </div>\n' +
        '                <div class=\'mc-description\'>\n' +
        '                    ' + object.description +
        '                    <p><a href="/profile?id=' + object.objectID + '">Details</a></p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <a class=\'mc-btn-action\'>\n' +
        '                <i class=\'fa fa-bars\'></i>\n' +
        '            </a>\n' +
        '            <div class=\'mc-footer\'>\n' +
        '                <a class=\'fa fa-fw fa-envelope\'></a>\n' +
        '            </div>\n' +
        '        </article>\n';

    document.getElementById('result-cards').appendChild(div);
}

function SetMessage(message){
    document.getElementById('result-cards').innerHTML = '';
    var div = document.createElement('div');
    div.className = 'user_message';
    div.innerHTML = '<h1>' + message + '</h1>';

    document.getElementById('result-cards').appendChild(div);
}

function HandleResponse(profile_list){
    if(profile_list.length > 0){
        document.getElementById('result-cards').innerHTML = '';
        for(var i = 0; i < profile_list.length; i++)
        {
            var to_show_object = {
                objectID: profile_list[i].objectID,
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

function HandleCardEvents() {
    $('.material-card > .mc-btn-action').click(function () {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        icon.addClass('fa-spin-fast');

        if (card.hasClass('mc-active')) {
            card.removeClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-arrow-left')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-bars');

            }, 800);
        } else {
            card.addClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-bars')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-arrow-left');

            }, 800);
        }
    });
}

function HandleFalseInput(){
    document.getElementById('search-input').style.borderColor = 'red';
}

function ShowLoadingIcon(){
    document.getElementById('result-cards').innerHTML = '';
    var div = document.createElement('div');
    div.className = 'loader';

    document.getElementById('result-cards').appendChild(div);
}

