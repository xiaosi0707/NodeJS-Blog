/*
*wyunfei在2018/11/13创建了nodeJS项目文件index.js
*/
$(function () {
    let $loginBox = $('#loginBox');
    let $registerBox = $('#registerBox');
    let $userInfo = $('#userInfo')

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
            success(res) {
                let { code, message } = res
                $registerBox.find('.colWarning').html(message);
                if (!code) {
                    alert('注册成功！');
                    $registerBox.hide();
                    $loginBox.show();
                }
            }
        })
    })

    // 登录
    $loginBox.find('button').on('click', () => {
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success (res) {
                let {code, message} = res
                if (!code) {
                    $loginBox.find('.colWarning').html(message);
                    $loginBox.hide();
                    $userInfo.show();
                }
            }
        })
    })

})
