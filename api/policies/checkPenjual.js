/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function(req, res, ok) {

	var isPenjual = req.session.User.title==="Penjual";


	// The requested id does not match the user's id,
	// and this is not an admin
	if (isPenjual) {
		console.log(req.session.User.shopname+ " "+req.session.User.shopaddr+" "+req.session.User.shopphone+" "+req.session.User.shopdtl+" "+req.session.User.shopcity+" "+req.session.User.shopprovince+" "+req.session.User.shopcountry);
    	if(typeof req.session.User.shopname=="undefined" || typeof req.session.User.shopaddr=="undefined" || typeof req.session.User.shopphone=="undefined" || typeof req.session.User.shopdtl=="undefined" || typeof req.session.User.shopcity=="undefined" || typeof req.session.User.shopprovince=="undefined" || typeof req.session.User.shopcountry=="undefined"){
    		var noRightsError = [{message : 'Isi Formulir terlebih dahulu'}]
			req.session.flash = {
				err: noRightsError
			}
    		return res.redirect('/user/open/'+req.session.User.id);
    	}
	}

	ok();

};