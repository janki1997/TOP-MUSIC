/* TOP MUSIC
 * Users
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

async  function GetAllUsers() {
    try {
        let usersCollection = await users();
        let usersList = await usersCollection.find().toArray();
        if (!usersList.length) throw 'There are no users in the system';
        return usersList;
    }
    catch (error) {
        throw new Error(error.message)
    }
};

async function GetUserById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    return user;
};

async function CreateUser(userData) {
    let userCollection = await users();
    let newInsertInfo = await userCollection.insertOne(userData);
    if (newInsertInfo.insertedCount === 0) throw 'Something went wrong.';
    return true;

};
async function CheckUserExist(emailAddress){
    let userCollection = await users();
    let user = await userCollection.findOne({ 'emailAddress': emailAddress, isDeleted : 0 });
    return user;
}

module.exports = {
    CreateUser,
    GetAllUsers,
    GetUserById,
    CheckUserExist
}