/*
*wyunfei在2018/11/13创建了nodeJS项目文件users.js
*/
let mongoose = require('mongoose');

// 用户表结构
module.exports = new mongoose.Schema({
    // 用户名
    username: String,
    // 密码
    password: String,
    // 确认密码
    repassword: String
})
