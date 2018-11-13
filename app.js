/*
*wyunfei在2018/11/13创建了nodeJS项目文件app.js
*/
let express = require('express');
let app = express()

app.get('/', (req, res, next) => {
    res.send('Hello World!')
})

app.listen(8081, () => {
    console.log('running at http://localhost:8081/')
})

