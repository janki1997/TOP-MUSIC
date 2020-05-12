var dbConnection = require('../config/mongoConnection');
var data = require("../data")
var moment = require('moment');
var uuid = require('uuid');

async function AddDataToDatabase() {
    try {
        const db = await dbConnection();
        await db.dropDatabase();

        var genres_array = [{
            _id: uuid.v4(),
            genreName: "Jazz",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0
        }, {
            _id: uuid.v4(),
            genreName: "Rock",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0
        }, {
            _id: uuid.v4(),
            genreName: "Pop",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0
        }, {
            _id: uuid.v4(),
            genreName: "Hip-Hop",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0
        }, {
            _id: uuid.v4(),
            genreName: "Folk",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0
        }, {
            _id: uuid.v4(),
            genreName: "Classic",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0
        }];

        var insertGenre = await data.genres.AddGenres(genres_array);
        var getGenreData = await data.genres.GetAllGenres();

        var artist_array = [{
            _id: uuid.v4(),
            artistName: "Astrud Gilberto",
            profileLogo: "Astrud_Gilberto.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Jazz"]
        }, {
            _id: uuid.v4(),
            artistName: "Audioslave",
            profileLogo: "Audioslave.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock"]
        }, {
            _id: uuid.v4(),
            artistName: "Bill Evans",
            profileLogo: "Bill_Evans.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Jazz"]
        }, {
            _id: uuid.v4(),
            artistName: "Lady Gaga",
            profileLogo: "Lady_Gaga.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop"]
        }, {
            _id: uuid.v4(),
            artistName: "Alicia Keys",
            profileLogo: "Alicia_Keys.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop", "Pop"]
        }, {
            _id: uuid.v4(),
            artistName: "David Bowie",
            profileLogo: "David_Bowie.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock", "Pop"]
        }, {
            _id: uuid.v4(),
            artistName: "Madonna",
            profileLogo: "Madonna.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop"]
        }, {
            _id: uuid.v4(),
            artistName: "Young Jeezy",
            profileLogo: "Young_Jeezy.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop"]
        }, {
            _id: uuid.v4(),
            artistName: "Frank Zappa",
            profileLogo: "Frank_Zappa.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock", "Jazz", "Classic"]
        }, {
            _id: uuid.v4(),
            artistName: "Lana Del Rey",
            profileLogo: "Lana_Del_Rey.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop", "Rock"]
        }, {
            _id: uuid.v4(),
            artistName: "Leon Russell",
            profileLogo: "Leon_Russell.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop", "Rock", "Folk"]
        }, {
            _id: uuid.v4(),
            artistName: "Young Jeezy",
            profileLogo: "Young_Jeezy.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop"]
        }, {
            _id: uuid.v4(),
            artistName: "Frida Lyngstad",
            profileLogo: "Frida_Lyngstad.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop", "Jazz"]
        }, {
            _id: uuid.v4(),
            artistName: "Eric B. & Rakim",
            profileLogo: "Eric_Rakim.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop"]
        }, {
            _id: uuid.v4(),
            artistName: "Elvis Costello",
            profileLogo: "Elvis_Costello.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock", "Pop"]
        }];

        artist_array.forEach(ele1 => {
            getGenreData.forEach(ele2 => {
                if (ele1.genres.includes(ele2.genreName)) {
                    ele1.genres = ele1.genres.map(dt => {
                        if (dt == ele2.genreName) {
                            return dt = ele2._id;
                        } else {
                            return dt
                        }
                    });
                }
            });
        });
        var insertArtist = await data.artists.AddArtists(artist_array);
        console.log("genre and artist data inserted successfully");
        await db.serverConfig.close();
    }
    catch (e) {
        console.log(e.message)
    }
}


AddDataToDatabase();