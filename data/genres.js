/* TOP MUSIC
 * Genres
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectId
const artists = mongoCollections.albums;
const genres = mongoCollections.genres;

let exportedMethods = {
    async addGenre(genreName) {
        const genreCollection = await genres();
        let newGenre = { genreName: genreName };
        const newInsertInformation = await genreCollection.insertOne(newGenre);
        if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
        return this.getGenre(newInsertInformation.insertedId);
    },
    async getGenre(id) {
        if (id === undefined) throw 'You must provide an ID';
        const genreCollection = await genres();
        const genre = await genreCollection.findOne({_id: ObjectId(id)});
        if (!genre) throw 'Genre not found';
        return genre;
      },
    async getAll() {
        const genreCollection = await genres();
        return await genreCollection.find({}).toArray();
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
  