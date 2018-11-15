/*
*wyunfei在2018/11/13创建了nodeJS项目文件main.js
*/
let express = require('express');
let router = express.Router();
let Category = require('../models/categories');

router.get('/', (req, res, next) => {
    // res.send('首页')
    Category.find().then(categories => {
        console.log(categories)
        res.render('../views/main/index', {
            userInfo: req.userInfo, // 分配模板数据
            categories
        })
    })

})

module.exports = router
