/*
*wyunfei在2018/11/13创建了nodeJS项目文件app.js
*/
let express = require('express');
let swig = require('swig'); // 模板处理
let app = express() // 创建应用
let mongoose = require('mongoose')
var bodyParser = require('body-parser'); //处理Post提交 过来的数据
var Cookies=require('cookies')

app.use(function (req,res,next) {
    req.cookies=new Cookies(req,res)
    let cookiesUserInfo=req.cookies.get('userCookies');
    req.userInfo = {}
    if(cookiesUserInfo) req.userInfo = JSON.parse(cookiesUserInfo)
    // console.log(req.userInfo)
    next();
})

/* Swig - Start */
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀；第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)
// 设置模板文件的存放目录：第一个参数必须是views；第二个参数是目录
app.set('views', './views');
// 注册所使用的模板引擎：第一个参数必须是view engine；第二个参数和app.engine方法中定义的模板引擎（第一个参数）的名称一致
app.set('view engine', 'html');
// 在开发中需要取消模板缓存机制
swig.setDefaults({
    cache: false
})
/* Swig - End */

app.use(bodyParser.urlencoded({extended: true}));

/* 静态资源托管 - Start */
app.use('/public', express.static(__dirname + '/public'));
/* 静态资源托管 - End */

//根据不同功能划分模块
app.use('/admin', require('./router/admin')); // 后台
app.use('/api', require('./router/api')); // 接口
app.use('/', require('./router/main')); // 前端

// 监听
mongoose.connect('mongodb://localhost:27018/blog', function (err) {
    if(err) {
        console.log('数据库连接失败');
    }  else{
        console.log('数据库连接成功');
        //监听http请求
        app.listen(8081, () => {
            console.log('running at http://localhost:8081/')
        });
    }
});
// app.listen(8081, () => {
//     console.log('running at http://localhost:8081/')
// })

