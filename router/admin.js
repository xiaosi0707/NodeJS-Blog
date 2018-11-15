/*
*wyunfei在2018/11/13创建了nodeJS项目文件admin.js
*/
let express = require('express');
let router = express.Router();

// router.get('/user', (req, res, next) => {
//     console.log(req.userInfo)
//     if(!req.userInfo.isAdmin) {
//         res.send('对不起，只有管理员才能进入后台管理系统');
//         return;
//     }
//     next();
// })

router.get('/', (req, res, next) => {
    res.render('../views/admin/index')
})

module.exports = router
