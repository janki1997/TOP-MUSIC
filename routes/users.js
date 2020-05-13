const express = require('express');
const router = express.Router();
const data = require('../data');
const moment = require('moment');
const jwt = require('jsonwebtoken');

router.get("/userProfile", async (req, res) => {
  try {
    if (req.session.auth) {
      let user_id = await jwt.verify(req.session.auth, 'secret').userid;
      let artist_data = await data.artists.GetAllArtists();
      let genre_data = await data.genres.GetAllGenres();
     
      if (user_id) {
        var user_data = await data.users.GetUserById(user_id);
       user_data["password"] = data.encryption.decrypt(user_data.password);
       genre_data.forEach(element=>{
         if( user_data.genres ){

           user_data.genres.forEach(gelement=>{
             if(element._id == gelement){
               element["selected"] = 1;
             }
           });
         }
      })

      artist_data.forEach(element=>{
        if(user_data.artist){

          user_data.artist.forEach(gelement=>{
            if(element._id == gelement){
              element["selected"] = 1;
            }
          });
        }
      })
        res.render("profile/userProfile", { 
          layout: "main",
           user_data: user_data,
           artist_data : artist_data,
           genre_data : genre_data,
           auth : req.session.auth
          });
      } else {
        res.redirect('/');
      }
    } else {
      res.redirect('/');
    }
  } catch (e) {
    res.redirect('/');
  }
});

router.post("/profileUpdate", async (req, res) => {
  try {
    if(!req.body.user_id){
      res.redirect('/');
    }else{
      let update_data = {
        fullName: req.body.full_name,
        password: data.encryption.encrypt(req.body.password),
        genres: (req.body.genres_ids) ? req.body.genres_ids : [], 
        artist: (req.body.artist_ids) ? req.body.artist_ids : [],
        isDeleted: 0,
        lastUpdatedDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        profileLogo: req.body.profileLogo,
        contactNo : req.body.contact
      };
      let update_user_data = await data.users.updateUserProfile(update_data, req.body.user_id);
      let artist_data = await data.artists.GetAllArtists();
      let genre_data = await data.genres.GetAllGenres();
      let user_data = {
        fullName : req.body.full_name,
        password : req.body.password,
        contactNo : req.body.contact,
        emailAddress : req.body.email_address,
        genres: (req.body.genres_ids) ? req.body.genres_ids : [], 
        artist: (req.body.artist_ids) ? req.body.artist_ids : [],
        _id :  req.body.user_id
      }

      genre_data.forEach(element=>{
        user_data.genres.forEach(gelement=>{
          if(element._id == gelement){
            element["selected"] = 1;
          }
        });
      })

      artist_data.forEach(element=>{
        user_data.artist.forEach(gelement=>{
          if(element._id == gelement){
            element["selected"] = 1;
          }
        });
      })
       res.render("profile/userProfile", { 
         layout: "main",
          user_data:user_data,
          artist_data : artist_data,
          genre_data : genre_data,
          auth : req.session.auth,
          message : "User profile updated successfully"
         });
    }
  } catch (e) {
    res.redirect('/');
  }
});

module.exports = router;