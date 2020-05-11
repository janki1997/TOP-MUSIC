/* TOP MUSIC
 * Threads
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const threads = mongoCollections.threads;
const threadLikes = mongoCollections.threadLikes;
const users = mongoCollections.users;

let exportedMethods = {
    async GetAllThreads() {
        try {
            let threadsCollection = await threads();
            let threadList = await threadsCollection.find({ }).sort({ createdDate: -1 }).toArray();
            let user_ids =  threadList.map(x=> x.userId);
            let usersCollection = await users();
            let userData = await usersCollection.find({ _id : {$in :user_ids } }).project({}).toArray();
            threadList.forEach(element=>{
                userData.forEach(uelement => {
                    if(element.userId == uelement._id){
                        element["fullName"] = uelement.fullName,
                        element["profileLogo"] = uelement.profileLogo
                    }
                })
            })
            return threadList;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },

    async AddThread(threadData) {
        try {
            let threadsCollection = await threads();
            await threadsCollection.insertOne(threadData);
            return true;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },

    async GetThread(id) {
        try {
            let threadsCollection = await threads();
            let threadList = await threadsCollection.findOne(
                { _id: id },
                { _id: 1, title: 1, comment: 1, media: 1, likeCount: 1, parentComment: 1 }
            );
            return threadList;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },

    async GetAllUserThreads(user_id) {
        try {
            let threadsCollection = await threads();
            let threadList = await threadsCollection.find({ $query: { userId: user_id } }).sort({ createdDate: -1 }).toArray();
            return threadList;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },

    async getThreadByLike(thread_id, user_id) {
        try {
            let likeCollection = await threadLikes();
            let likeData = await likeCollection.findOne({ userId: user_id, threadId: thread_id });
            return likeData;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },

    async addThreadLike(likeData) {
        try {
            let likeCollection = await threadLikes();
            let addLike = await likeCollection.insertOne(likeData);
            let getThread = await GetThread(likeData.thread_id);
            let threadsCollection = await threads();
            let updateLikeCount = threadsCollection.updateOne({ _id: likeData.thread_id }, { $set: { likeCount: getThread.likeCount + 1 } })
            return addLike;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },

    async removeThreadLike(thread_id, user_id) {
        try {
            let likeCollection = await threadLikes();
            let removeLike = await likeCollection.removeOne({ threadId: thread_id, userId: user_id });
            let getThread = await GetThread(likeData.thread_id);
            let threadsCollection = await threads();
            if (getThread.likeCount != 0) {
                let updateLikeCount = threadsCollection.updateOne({ _id: likeData.thread_id }, { $set: { likeCount: getThread.likeCount - 1 } })
            }
            return true;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },
    async getThreadLikeWise(thread_id, user_id) {
        try {
            let likeCollection = await threadLikes();
            let likeData = await likeCollection.find({ $query: { userId: user_id, $in: { threadId: thread_id } } }).toArray();
            return likeData;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },

    async UpdateThread(threadData, thread_id) {
        try {
            let threadsCollection = await threads();
            let updateLikeCount = threadsCollection.updateOne({ thread_id }, { $set: threadData });
            return true;
        }
        catch (e) {
            throw new Error(e.message)
        }
    },
    async DeleteThread( thread_id) {
        try {
            let threadsCollection = await threads();
            let updateLikeCount = await threadsCollection.deleteOne({ _id : thread_id });
            return true;
        }
        catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = exportedMethods;