/*
*wyunfei在2018/11/13创建了nodeJS项目文件admin.js
*/
let express = require('express');
let router = express.Router();

router.get('/user', (req, res, next) => {
    res.send('Admin')
})

module.exports = router
