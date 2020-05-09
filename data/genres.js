/* TOP MUSIC
 * Genres
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectId
const artists = mongoCollections.artists;
const genres = mongoCollections.genres;

let exportedMethods = {
  async  GetAllGenres() {
    let genresCollection = await genres();
    let genresList = await genresCollection.find({}).toArray();
    if (!genresList.length) throw 'genre not found';
    return genresList;
  },

  async  GetGenresById(id) {
    let genersCollection = await genres();
    let geners = await genersCollection.findOne({ _id: id });
    if (!geners) throw 'geners not found';
    return genres;
  },

  async  AddGenres(genreData) {
    let genresCollection = await genres();
    let insertGenres = await genresCollection.insertMany(genreData);
    return true;
  },
    async removeGenre(input) {
        if (id === undefined) return Promise.reject('No id provided');
        let currentGenre = await this.getGenre(id);
        const genreCollection = await genres();
    
        const deletedInfo = await genreCollection.removeOne({_id: ObjectId(id)});
        if (deletedInfo.deletedCount === 0) throw `Could not delete genre with id of ${id}`;
    
        let output = {
          "deleted": true,
          "data": {
              "_id": currentGenre._id, 
              "genreName": currentGenre.genreName
        }
      };
      return output;
    },
    async updateGenre(id, genreName) {
        if (id === undefined) return Promise.reject('No id provided');
        if (genreName === undefined) return Promise.reject('No genre name provided');
        const genreCollection = await genres();
        // const userThatPosted = await users.getUserById(posterId);
        let updatedGenre = { genreName: genreName };
        const updateInfo = await genreCollection.updateOne({_id: ObjectId(id)}, {$set: updatedGenre});
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
        return this.getGenre(id);
    },
    async sortGenres() {
        /* TO DO */
        return;
    }

  };
  
  module.exports = exportedMethods;
  