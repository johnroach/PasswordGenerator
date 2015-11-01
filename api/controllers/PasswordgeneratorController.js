/**
 * PasswordgeneratorController
 *
 * @description :: Server-side logic for managing passwordgenerators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	generator:
		function (req, res) {

			var allowNumbers = req.param('allowNumbers');
			var allowSymbols = req.param('allowSymbols');
			var wordLimit = req.param('wordLimit');

			var validator = require('validator');
			var errors = [];

			if (!validator.isBoolean(allowNumbers)) {
				errors.push("allowNumbers must be boolean and is required.");
			}

			if (!validator.isBoolean(allowSymbols)) {
				errors.push("allowSymbols must be boolean and is required.");
			}

			if (!validator.isInt(wordLimit, {min:1, max:100})) {
				errors.push("wordLimit must be a integer of minimum 1 and is required.");
			}

			if (errors.length > 0) {
				return res.send( {"errors" : errors} );
			}

			var foundPerfectPassword = false;
			var perfectPassword = "";
			var basePasswordResult = "";

			while (!foundPerfectPassword) {
				basePasswordResult = sails.controllers.passwordgenerator.basePassword(validator.toInt(wordLimit));
				foundPerfectPassword = true;
				if (!validator.toBoolean(allowNumbers)) {
					var regexSymbolAndChar = /^[A-Za-z-\s-!$%^&*()_+|~=`{}\[\]:";'<>?,@#.\/]+$/;
					if(!regexSymbolAndChar.test(basePasswordResult)){
						foundPerfectPassword = false;
					} else {
						foundPerfectPassword = true;
					}
				}

				if (foundPerfectPassword && !validator.toBoolean(allowSymbols)) {
					var regexNumberAndChar = /^[A-Za-z-\s-1234567890]+$/;
					if(!regexNumberAndChar.test(basePasswordResult)){
						foundPerfectPassword = false;
					} else {
						foundPerfectPassword = true;
					}
				}

				if (foundPerfectPassword) {
					perfectPassword = basePasswordResult;
				}
			}

			var password = {
				"generated_password": perfectPassword
			};
	    	return res.send(password);
		},
	basePassword:
		function (wordLimit) {
			var dictionary = require('../models/dictionary.json');
			var crypto = require('crypto');

			var dieSides = "123456";
			var numberOfThrows = 5;

        	var value = new Array(numberOfThrows);
            var len = dieSides.length;

			var wordIndex;
			var password = "";
			for (wordIndex = 0; wordIndex < (wordLimit); wordIndex++) {
				var rnd = crypto.randomBytes(numberOfThrows)
				for (var i = 0; i < numberOfThrows; i++) {
			          value[i] = dieSides[rnd[i] % len];
			     };
				 var key = value.join('');

				 //wanted to add more complexity
				 var firstOrLastRandomNumber = crypto.randomBytes(1);
				 if (firstOrLastRandomNumber[0] % 2){
				     password = dictionary[key] + " " + password;
				 } else {
					 password = password + " " + dictionary[key] ;
				 }
			}
			return password.trim();
		}
};
