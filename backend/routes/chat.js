const express = require('express')

const {chatResponse} = require('../controllers/chatController')

const router = express.Router()

// Send a reply to a chat input (POST REQUEST)
router.post('/',chatResponse);

module.exports = router