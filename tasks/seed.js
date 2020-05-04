/* TOP MUSIC
 * Seed
 * ~
 */

 /* _dB */
const connection = require('../config/mongoConnection');

/* data */
const artists = require('../data/artists');
const genres = require('../data/genres');
const users = require('../data/users');


async function main() {
    const db = await connection();

    try {
        await db.collection('artists').drop();
        await db.collection('genres').drop();
        await db.collection('users').drop();
    } catch (error) {
        console.error(error);
    }

    // Test to create an artist, add a genre and some threads
    try {
        let createdArtist1 = await artists.addArtist("Pink Floyd", ["Roger Waters","David Gilmour", "Richard Wright", "Nick Mason"], 1965, ["Psychedelic rock", "Classic Rock", "Rock"],"Columbia Records", []);
        console.log(`Created Artist: \n`, createdArtist1);
        let createdArtist2 = await artists.addArtist("Led Zeppelin", ["Robert Plant","Jimmy Page", "John Paul Jones", "John Bonham"], 1968, ["Hard rock", "Blues Rock", "Heavy metal"],"Atlantic Records", []);
        console.log(`Created Artist: \n`, createdArtist2);
        let createdGenre1 = await genres.addGenre("Classic Rock");
        console.log(`Created Genre: \n`, createdGenre1);
        createdArtist1 = await artists.getArtist(createdArtist1._id);
        console.log(`Updated Artist: \n`, createdArtist1);
        // let removedBand1 = await bands.removeBand(createdArtist1._id);
        // console.log(`Removed Band: \n`, removedBand1);
    } catch (error) {
        console.error(error);
    }

}

main();