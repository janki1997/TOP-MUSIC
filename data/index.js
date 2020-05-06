/* TOP MUSIC
 * Data
 * ~
 */

const artistData = require("./artists");
const genreData = require("./genres");
const metricData = require("./metrics");
const threadData = require("./threads");
const userData = require("./users");

module.exports = {
  artists: artistData,
  genres: genreData,
  metrics: metricData,
  threads: threadData,
  users: userData
};
