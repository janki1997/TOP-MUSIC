var mongoCollections = require('../config/mongoCollections');
var artists = mongoCollections.artists;
var genres = mongoCollections.genres;


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


module.exports = {
  GetAllArtists: GetAllArtists,
  GetAllGenres: GetAllGenres,
  GetArtistsById: GetArtistsById,
  GetGenresById: GetGenresById
}
