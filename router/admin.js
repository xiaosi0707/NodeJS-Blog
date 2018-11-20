/*
*wyunfei在2018/11/13创建了nodeJS项目文件admin.js
*/
let express = require('express');
let router = express.Router();
let User = require('../models/User');
let Category = require('../models/Category');
let Content = require('../models/Content');

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
    Category.find().then(categories => {
        res.render('../views/admin/category-index', {
            categories
        })
    })

})
// 分类添加
router.get('/category/add', (req, res, next) => {
    res.render('../views/admin/category-add', {})
})
// 分类保存
router.post('/category/add', (req, res, next) => {
    let name = req.body.name || ''; // 接收name
    if(name === '') {
        res.render('admin/error', {
            message: '名称不能为空'
        })
    }
    // 数据库中是否已存在此分类
    Category.findOne({
        name: name
    }).then(rs => {
        if (rs) {
            res.render('admin/error', {
                message: '分类已存在'
            })
        } else {
            res.render('admin/success', {
                message: '分类保存成功'
            })
            return new Category({ // 存到数据库
                name: name
            }).save();
        }
    })
})
// 分类修改
router.get('/category/edit', (req, res, next) => {
    let id = req.query.id || '';
    Category.findOne({
        _id: id
    }).then((rs) => {
        if(!rs) {
            res.render('admin/error', {
                message: '分类信息不存在'
            })
        } else {
            res.render('admin/category-edit', {
                category: rs
            })
        }
    })
})
// 分类修改保存
router.post('/category/edit', (req, res, next) => {
    // 获取post过来的分类名称
    let name = req.body.name || '';
    let id = req.query.id || '';
    Category.findOne({
        _id: id
    }).then(rs => {
        return Category.updateOne({
            name
        })
    }).then(() => {
        res.render('admin/success', {
            message: '分类名称修改成功'
        })
    })
})
// 分类删除
router.get('/category/delete', (req, res, next) => {
    let id = req.query.id;
    Category.findOne({
        _id: id
    }).then(rs => {
        return Category.remove({
            _id: id
        }).then(rs => {
            res.render('admin/success', {
                message: '删除成功'
            })
        })
    })
})

// 内容首页
router.get('/content', (req, res, next) => {
    Content.find().then(contents => {
        res.render('../views/admin/content-index', {
            contents
        })
    })

})
// 内容添加
router.get('/content/add', (req, res, next) => {
    Category.find().then(categories => {
        res.render('admin/content-add', {
            categories
        })
    })
    // res.render('../views/admin/content-add')
})
// 内容保存
router.post('/content/add', (req, res) => {
    let { title, description, content, category } = req.body
    if (title === '') {
        res.render('admin/error', {
            message: '标题不能为空'
        })
        return;
    }
    if (description === '') {
        res.render('admin/error', {
            message: '简介不能为空'
        })
        return;
    }
    if (content === '') {
        res.render('admin/error', {
            message: '内容不能为空'
        })
        return;
    }
    // 保存到数据库
    new Content({
        title,
        description,
        content,
        category
    }).save().then(rs => {
        res.render('admin/success', {
            message: '内容保存成功'
        })
    })
})
// 内容编辑
router.get('/content/edit', (req, res, next) => {
    let id = req.query.id || '';
    Content.findOne({
        _id: id
    }).then(content => {
        console.log(content)
        res.render('../views/admin/content-edit', {
            content
        })
    })

})
module.exports = router
