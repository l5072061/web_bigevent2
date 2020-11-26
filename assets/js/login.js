$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义校验规则
    var form = layui.form
    form.verify({
        //密码规则
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //确认密码规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次输入的不一样"
            }
        }
    })

    //注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您,注册成功")
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })

    //登录功能
    $("#form_login").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您,登录成功!')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})