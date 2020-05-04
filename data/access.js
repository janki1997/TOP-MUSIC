var mongoCollections = require('../config/mongoCollections');
var users = mongoCollections.user;
var artists = mongoCollections.artists;
var genres = mongoCollections.genres;
var uuid = require('uuid');



const GetAllArtists = async function GetAllArtists() {
  let artistsCollection = await artists();
  let artistsList = await artistsCollection.find({}).toArray();
  if (!artistsList.length) throw 'Artists is not in System';
  return artistsList;

};

const GetArtistsById = async function GetArtistsById(id) {
  let artistsCollection = await artists();
  let artists = await artistsCollection.findOne({ _id: id });
  if (!artists) throw 'artists not found ';
  return artists;
};



const GetAllGenres = async function GetAllGenres() {
  let genresCollection = await genres();
  let genresList = await genresCollection.find({}).toArray();
  if (!artistsList.length) throw 'genre not found';
  return genresList;
};



const GetGenresById = async function GetGenresById(id) {
  let genersCollection = await genres();
  let geners = await genersCollection.findOne({ _id: id });
  if (!geners) throw 'geners not found';
  return genres;
};
 
const AddGenres = async function AddGenres(genreData) {
  let genresCollection = await genres();
  let insertGenres = await genresCollection.insertMany(genreData);
  return true;
}

const AddArtists = async function AddArtists(artistData) {
  let artistsCollection = await artists();
  let insertArtist = await artistsCollection.insertMany(artistData);
  return true;
}



module.exports = {
  GetAllArtists,
  GetAllGenres,
  GetArtistsById,
  GetGenresById,
  AddArtists,
  AddGenres

}
