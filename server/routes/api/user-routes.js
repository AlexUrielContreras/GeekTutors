const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveTutor,
  deleteTutor,
  login,
} = require('../../controllers/user-controllers');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveTutor);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/tutor/:tutorId').delete(authMiddleware, deleteTutor);

module.exports = router;