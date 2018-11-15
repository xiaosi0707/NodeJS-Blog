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
    // 从数据库读取所有用户数据，然后把数据分配给模板展示出来
    /*
    * 分页
    * limit(Number)限制获取数据的条数
    * skip()        忽略的数据条数
    * 每页显示两条
    *   1:1-2   skip:0  (当前页 - 1) * limit
    *   2:3-4   skip:2  (当前页 - 1) * limit
    * */

    let page = Number(req.query.page || 1);
    let limit = 2;
    let pages = 0;

    User.count().then((count) => {
        // 计算总页数
        pages = Math.ceil(count / limit);
        // 取值不能超过pages
        page = Math.min(page, pages);
        // 取值不能小于1
        page = Math.max(page, 1);
        // 跳过的条数
        let skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then(users => {
            res.render('../views/admin/user-index', {
                users,
                page,
                count,
                pages,
                limit
            })
        })
    })
})

// 分类管理
router.get('/category', (req, res, next) => {
    res.render('../views/admin/category-index', {})
})
// 分类添加
router.get('/category/add', (req, res, next) => {
    res.render('../views/admin/category-add', {})
})

module.exports = router
