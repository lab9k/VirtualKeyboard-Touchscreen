const jQueryUrl = "http://code.jquery.com/jquery-1.11.0.min.js";
const keyboardStylesheet = "/css/jquery.ml-keyboard.css";
const keyboardScriptUrl = "/js/jquery.ml-keyboard.min.js"

/* Inladen van JQuery, benodigd voor andere scripts */
window.onload = function () {
        var script = document.createElement("script");
        script.src = jQueryUrl;
        script.type = 'text/javascript';
        script.onload = function () {
            initialize();
        }
        document.head.appendChild(script);
    }
    /* Keyboard initialisatie en inladen stylesheet */
function initialize() {
    /* Keyboard css inladen */
    $('head').append(`<link rel="stylesheet" type="text/css" href="${keyboardStylesheet}">`);

    $.getScript(keyboardScriptUrl, function () {

        $('input').mlKeyboard({
            layout: 'en_US',
            enabled: true,
            trigger: '#closebutton' /* Trigger niet nodig, demonstratie enkel */
        });
    });



    /* Benodigde script inladen in document
    $.getScript(keyboardScriptUrl,
        function () {
            /*Keyboard activeren op mogelijke inputtypes
     

        }) */


}


/*! jquery.ml-keyboard (http://mbut.github.io/jquery.mlkeyboard/) 2016-08-30 */
