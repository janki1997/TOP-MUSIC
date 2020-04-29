const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/signUpPage', async (req, res) => {
	try {
        let artist_data = await data.accessData.GetAllArtists();
        let genre_data = await data.accessData.GetAllGeners();
        res.render(("signUpPage", {layout : "main", artist_data : artist_data, genre_data : genre_data}));
	
	} catch (e) {
        res.status(404).render(("signUpPage", {layout : "main"}));
	}
});



module.exports = router;