/*
*wyunfei在2018/11/15创建了nodeJS项目文件categories.js
*/
let mongoose = require('mongoose');
let categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('categories', categoriesSchema);
