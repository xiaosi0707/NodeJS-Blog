/*
*wyunfei在2018/11/13创建了nodeJS项目文件api.js
*/
let express = require('express');
let router = express.Router();

router.get('/user', (req, res, next) => {
    res.send('API')
})

module.exports = router
