# PasswordGenerator

A [Sails](http://sailsjs.org) application meant to generate cryptologically sound and human friendly passwords.

You can use the api which is hosted right now here: [https://bloodcurdling-fangs-2095.herokuapp.com](https://bloodcurdling-fangs-2095.herokuapp.com)

You can use the API like the following:

    //using jQuery
    var url = "https://bloodcurdling-fangs-2095.herokuapp.com/passwordgenerator/generator";
    var getValues = {
        wordLimit : "100",
        allowNumbers : true,
        allowSymbols : true
    };
    $.get( url , getValues, function (data) {
        if (typeof(data.generated_password) !== 'undefined') {
            console.log(data.generated_password);
        } else {
            console.log(data.errors);
        }
    });


Please note that the hosting for the API is a free hosting by [Heroku](http://heroku.com). I don't know how long they will allow me to use a free account. So please consider donating. For any donations simply contact me via Twitter: @johnroach

Start application in your local box simply run:

    sails lift

Thank you for using my API.

_Visit my website @ [johnroach.info](http://johnroach.info)_


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/JohnRoach/passwordgenerator/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

