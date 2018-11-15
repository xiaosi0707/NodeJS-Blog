/*
*wyunfei在2018/11/13创建了nodeJS项目文件admin.js
*/
let express = require('express');
let router = express.Router();
let User = require('../models/user');

// router.get('/user', (req, res, next) => {
//     console.log(req.userInfo)
//     if(!req.userInfo.isAdmin) {
//         res.send('对不起，只有管理员才能进入后台管理系统');
//         return;
//     }
//     next();
// })

router.get('/', (req, res, next) => {
    res.render('../views/admin/index', {
        userInfo: req.userInfo
    })
})

// 用户管理
router.get('/user', (req, res, next) => {
    User.find().then(users => {
        console.log(users)
        res.render('../views/admin/user-index', {
            users
        })
    })
})

module.exports = router
