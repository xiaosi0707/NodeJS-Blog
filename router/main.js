/*
*wyunfei在2018/11/13创建了nodeJS项目文件main.js
*/
let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    // res.send('首页')
    res.render('../views/index', {
        userInfo: req.userInfo // 分配模板数据
    })
})

module.exports = router
