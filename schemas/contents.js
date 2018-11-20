/*
*wyunfei在2018/11/20创建了nodeJS项目文件contents.js
*/
let mongoose = require('mongoose');
// 内容表结构
module.exports = new mongoose.Schema({
    // 关联字段 - 内容分类的id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'categories'
    },
    // 分类标题
    title: String,
    // 简介
    description: String,
    // 内容
    content: {
        type: String,
        default: ''
    }
})
