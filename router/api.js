/*
*wyunfei在2018/11/13创建了nodeJS项目文件api.js
*/
let express = require('express');
let router = express.Router();
let User = require('../models/User');

// 接口统一返回格式
let responseData = {};
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next();
})

// 注册
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

// 登录
router.post('/user/login', (req, res, next) => {
    let { username, password } = req.body
    if(username === '' || password === '') {
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }
    // 查询用户和密码是否注册
    User.findOne({
        username: username,
        password: password
    }).then(userInfo => {
        let { username, _id } =userInfo
        if(!userInfo) {
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        // 用户名和密码正确
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id,
            username
        }
        req.cookies.set('userCookies', JSON.stringify(responseData.userInfo)) // 保存cookie
        res.json(responseData);
        return;
    })
})

// 退出
router.get('/user/logout', (req, res, next) => {
    req.cookies.set('userCookies', null)
    responseData = {
        code: 0,
        message: '退出成功'
    }
    res.json(responseData)
})

//

module.exports = router
