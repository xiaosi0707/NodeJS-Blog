/*
*wyunfei在2018/11/13创建了nodeJS项目文件main.js
*/
let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.send('首页')
})

module.exports = router
