/* TOP MUSIC
 * Auth
 * ~
 */

const bcryptjs = require("bcryptjs");
const users = require("./data/users");
const saltRounds = 16;

const _getIndex = (field, value) => {
  for (let x in users) 
    if (users[x][field] === value) 
        return x;
};


const getPassword = usn => {
  const x = _getIndex("username", usn);
  if (x) return users[x].hashedPassword;
};


const getUserFromSession = sessionId => {
  const x = _getIndex("_id", sessionId);
  if (x) return users[x];
};

const passwordsMatch = (requestPassword, userPassword) => {
  const isMatch = bcryptjs.compareSync(requestPassword, userPassword);
  return isMatch;
};

const setSession = (usn, sessionId) => {
    const x = _getIndex("username", usn);
    if (x) users[x]._id = sessionId;
};

const validSession = sessionId => {
  if (_getIndex("_id", sessionId)) return true;
  return false;
};  

module.exports = {
  getUserFromSession: getUserFromSession,
  getPassword: getPassword,
  passwordsMatch: passwordsMatch,
  setSession: setSession,
  validSession: validSession
};