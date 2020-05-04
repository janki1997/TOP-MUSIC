/* TOP MUSIC
 * Threads
 * ~
 */

/* _dB */
const mongoCollections = require('../config/mongoCollections');
const uuid = require('uuid/v4');

/* collections */
const artists = mongoCollections.artists;
const metrics = mongoCollections.metrics;
const threads = mongoCollections.threads;
const users = mongoCollections.users;

const exportedMethods = {
    async addThread(title, body, tags, posterId) {
        if (typeof title !== 'string') throw 'No title provided';
        if (typeof body !== 'string') throw 'I aint got nobody!';
    
        if (!Array.isArray(tags)) {
          tags = [];
        }
    
        const threadCollection = await threads();
    
        const userThatPosted = await users.getUserById(posterId);
    
        const newThread = {
          title: title,
          body: body,
          poster: {
            id: posterId,
            name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
          },
          tags: tags,
          _id: uuid()
        };
    
        const newInsertInformation = await threadCollection.insertOne(newThread);
        const newId = newInsertInformation.insertedId;
    
        await users.addThreadToUser(posterId, newId, title);
    
        return await this.getThreadById(newId);
    },
  async getAll() {
    const threadCollection = await threads();
    return await threadCollection.find({}).toArray();
  },
  async getThreadsByTag(tag) {
    if (!tag) throw 'No tag provided';

    const threadCollection = await threads();
    return await threadCollection.find({tags: tag}).toArray();
  },
  async getThreadById(id) {
    const threadCollection = await threads();
    const thread = await threadCollection.findOne({_id: id});

    if (!thread) throw 'Thread not found';
    return thread;
  },
  async removeThread(id) {
    const threadCollection = await threads();
    let thread = null;
    try {
      thread = await this.getThreadById(id);
    } catch (error) {
      console.log(error);
      return;
    }
    const deletionInfo = await threadCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete thread with id of ${id}`;
    }
    await users.removeThreadFromUser(thread.poster.id, id);
    return true;
  },
  async updateThread(id, updatedThread) {
    const threadCollection = await threads();

    const updatedThreadData = {};

    if (updatedThread.tags) {
      updatedThreadData.tags = updatedThread.tags;
    }

    if (updatedThread.title) {
      updatedThreadData.title = updatedThread.title;
    }

    if (updatedThread.body) {
      updatedThreadData.body = updatedThread.body;
    }

    await threadCollection.updateOne({_id: id}, {$set: updatedThreadData});

    return await this.getThreadById(id);
  },
  async renameTag(oldTag, newTag) {
    if (oldTag === newTag) throw 'tags are the same';
    let findDocuments = {
      tags: oldTag
    };

    let firstUpdate = {
      $addToSet: {tags: newTag}
    };

    let secondUpdate = {
      $pull: {tags: oldTag}
    };

    const threadCollection = await threads();
    await threadCollection.updateMany(findDocuments, firstUpdate);
    await threadCollection.updateMany(findDocuments, secondUpdate);

    return await this.getThreadsByTag(newTag);
  }
};

module.exports = exportedMethods;
