/*
*wyunfei在2018/11/13创建了nodeJS项目文件user.js
*/
let mongoose = require('mongoose');
let usersSchema = require('../schemas/users');
module.exports = mongoose.model('User', usersSchema)
