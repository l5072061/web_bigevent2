$(function() {
    var form = layui.form
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return "昵称长度为1 ~ 6 个字符之间!"
                }
            }
        })
        //用户渲染
    initUserInfo()
    var layer = layui.layer
        //封装函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置按钮
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
            //从新用户渲染
        initUserInfo()
    })

    //修改用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改成功!')
                    //调用父页面的更新用户和头像的方法
                window.parent.getUserInfo()
            }
        })
    })

})