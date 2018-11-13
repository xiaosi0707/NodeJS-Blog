/*
*wyunfei在2018/11/13创建了nodeJS项目文件index.js
*/
$(function () {
    let $loginBox = $('#loginBox');
    let $registerBox = $('#registerBox');

    // 切换到登录
    $registerBox.find('a').on('click', () => {
        $registerBox.hide();
        $loginBox.show();
    })

    // 切换到注册
    $loginBox.find('a').on('click', () => {
        $registerBox.show();
        $loginBox.hide();
    })

    // 注册
    $registerBox.find('button').on('click', () => {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="password"]').val(),
                repassword: $registerBox.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success(result) {
                console.log(result)
            }
        })
    })

})
