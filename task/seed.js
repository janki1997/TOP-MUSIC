var dbConnection = require('../config/mongoConnection');
var accessFunction = require("../data/access")
var moment = require('moment');
var uuid = require('uuid');

async function AddDataToDatabase() {
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

    var insertGenre = await accessFunction.AddGenres(genres_array);
    var getGenreData = await accessFunction.GetAllGenres();

    var artist_array = [{
        _id: uuid.v4(),
        artistNname: "Astrud Gilberto",
        profileLogo: "Astrud_Gilberto.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Jazz"]
    }, {
        _id: uuid.v4(),
        artistNname: "Audioslave",
        profileLogo: "Audioslave.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Rock"]
    }, {
        _id: uuid.v4(),
        artistNname: "Bill Evans",
        profileLogo: "Bill_Evans.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Jazz"]
    }, {
        _id: uuid.v4(),
        artistNname: "Lady Gaga",
        profileLogo: "Lady_Gaga.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Pop"]
    }, {
        _id: uuid.v4(),
        artistNname: "Alicia Keys",
        profileLogo: "Alicia_Keys.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Hip-Hop", "Pop"]
    }, {
        _id: uuid.v4(),
        artistNname: "David Bowie",
        profileLogo: "David_Bowie.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Rock", "Pop"]
    }, {
        _id: uuid.v4(),
        artistNname: "Madonna",
        profileLogo: "Madonna.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Pop"]
    }, {
        _id: uuid.v4(),
        artistNname: "Young Jeezy",
        profileLogo: "Young_Jeezy.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Hip-Hop"]
    }, {
        _id: uuid.v4(),
        artistNname: "Frank Zappa",
        profileLogo: "Frank_Zappa.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Rock", "Jazz", "Classic"]
    }, {
        _id: uuid.v4(),
        artistNname: "Lana Del Rey",
        profileLogo: "Lana_Del_Rey.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Pop", "Rock"]
    }, {
        _id: uuid.v4(),
        artistNname: "Leon Russell",
        profileLogo: "Leon_Russell.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Pop", "Rock", "Folk"]
    }, {
        _id: uuid.v4(),
        artistNname: "Young Jeezy",
        profileLogo: "Young_Jeezy.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Hip-Hop"]
    }, {
        _id: uuid.v4(),
        artistNname: "Frida Lyngstad",
        profileLogo: "Frida_Lyngstad.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Pop", "Jazz"]
    }, {
        _id: uuid.v4(),
        artistNname: "Eric B. & Rakim",
        profileLogo: "Eric_Rakim.jpg",
        createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
        isDeleted: 0,
        genres: ["Hip-Hop"]
    }, {
        _id: uuid.v4(),
        artistNname: "Elvis Costello",
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
                    } else{
                        return dt
                    }
                });
            }
        });
    });
    var insertArtist = await accessFunction.AddArtists(artist_array);
    console.log("genre data inserted successfully");
    await db.serverConfig.close();
}


AddDataToDatabase();