function userDB() {
  // Constructor
}

userDB.prototype.getUserByEmail = async (userEmail) => {
  // fetch user from database
  return {
    email: userEmail
  };
};

module.exports = userDB;
