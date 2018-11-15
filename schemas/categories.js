/*
*wyunfei在2018/11/15创建了nodeJS项目文件categories.js
*/
let mongoose = require('mongoose');

// 分类表结构
module.exports = new mongoose.Schema({
    // 分类名
    name: String
})
