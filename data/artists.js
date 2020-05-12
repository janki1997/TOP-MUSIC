/* TOP MUSIC
 * Artists
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectId
const artists = mongoCollections.artists;

let exportedMethods = {
    async  GetAllArtists() {
        try {
            let artistsCollection = await artists();
            let artistsList = await artistsCollection.find().toArray();
            if (!artistsList.length) throw 'Artists is not in System';
            return artistsList;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },
    async  GetArtistsById(id) {
        try {
            let artistsCollection = await artists();
            let artistsList = await artistsCollection.findOne({ _id: id, isDeleted: 0 });
            if (!artistsList) throw 'artists not found ';
            return artistsList;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },
    async  AddArtists(artistData) {
        try {
            let artistsCollection = await artists();
            let insertArtist = await artistsCollection.insertMany(artistData);
            return true;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },
    async removeArtist(id) {
        try {
            if (id === undefined) return Promise.reject('No id provided');
            let currentArtist = await this.getArtist(id);
            const artistCollection = await artists();

            const deletedInfo = await artistCollection.removeOne({ _id: ObjectId(id) });
            if (deletedInfo.deletedCount === 0) throw `Could not delete artist with id of ${id}`;

            let output = {
                "deleted": true,
                "data": {
                    "_id": currentArtist._id,
                    "artistName": currentArtist.artistName,
                    "artistMembers": currentArtist.artistMembers,
                    "yearFormed": currentArtist.yearFormed,
                    "genres": currentArtist.genres,
                    "recordLabel": currentArtist.recordLabel,
                    "albums": currentArtist.albums
                }
            };
            return output;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },
    async updateArtist(id, artistName, artistMembers, yearFormed, genres, recordLabel, albums) {
        try{
            if (id === undefined) return Promise.reject('No id provided');
            if (artistName === undefined) return Promise.reject('No artist name provided');
            if (artistMembers === undefined) return Promise.reject('No artist members provided');
            if (yearFormed === undefined) return Promise.reject('No year formed provided');
            if (genres === undefined) return Promise.reject('No genres provided');
            if (recordLabel === undefined) return Promise.reject('No record label provided');

            const artistCollection = await artists();
            // const userThatPosted = await users.getUserById(posterId);

            let updatedArtist = {
                artistName: artistName,
                artistMembers: artistMembers,
                yearFormed: yearFormed,
                genres: genres,
                recordLabel: recordLabel,
                alubms: albums
            };

            const updateInfo = await artistCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedArtist });
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
            return this.GetArtistsById(id);
        }
    catch (e) {
            throw new Error(e.message)
        }
    },

};

module.exports = exportedMethods;
