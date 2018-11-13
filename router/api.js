/*
*wyunfei在2018/11/13创建了nodeJS项目文件api.js
*/
let express = require('express');
let router = express.Router();

router.post('/user/register', (req, res, next) => {
    console.log(req.body)
})

module.exports = router
