/*
*wyunfei在2018/11/20创建了nodeJS项目文件contents.js
*/
let mongoose = require('mongoose');
let contentsSchema = require('../schemas/contents');
module.exports = mongoose.model('contents', contentsSchema);
