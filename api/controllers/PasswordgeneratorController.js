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
			var allowUppercase = req.param('allowUppercase');
			var allowSymbols = req.param('allowSymbols');
			var wordLimit = req.param('wordLimit');
			var limitCharacter = req.param('limitCharacter');
			var characterLimit = req.param('CharacterLimit');

	    	return res.send(allowUppercase);
		}
};
