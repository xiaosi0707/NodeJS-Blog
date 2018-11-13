/*
*wyunfei在2018/11/13创建了nodeJS项目文件api.js
*/
let express = require('express');
let router = express.Router();
let User = require('../models/user');

// 接口统一返回格式
let responseData = {};
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next();
})

router.post('/user/register', (req, res, next) => {
    let { username, password, repassword } = req.body
    // 用户名不能为空
    if (username === '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData)
        return;
    }
    // 密码不能为空
    if(password === '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 确认密码
    if(password !== repassword) {
        responseData.code = 3;
        responseData.message = '两次密码不一致';
        res.json(responseData);
        return;
    }
    // 用户名是否注册过
    //用户名是否已经注册
    User.findOne({
        username: username
    }).then(function (userinfo) {
        // 已注册
        if(userinfo) {
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //未注册 - 保存用户信息到数据库中
        let user = new User({
            username: username,
            password: password
        });
        responseData.code = 0;
        responseData.message = '注册成功';
        res.json(responseData);
        return user.save();
    })
})

module.exports = router
