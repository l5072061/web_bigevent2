$(function() {
    //获取用户信息
    getUserInfo()
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
var layer = layui.layer

function getUserInfo(params) {
    $.ajax({

        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //请求成功,渲染头像
            renderAvatar(res.data)
        }

    })
}

function renderAvatar(user) {
    //渲染昵称(nickname优先,如果没有就用username)
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}