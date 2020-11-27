$(function() {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return "原密码和新密码不能一致!"
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=rePwd]').val()) {
                return "两次输入的不一致!"
            }
        }
    })

    //表单提交
    var layer = layui.layer
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败!')
                }
                layer.msg('修改成功!')
                $('.layui-form')[0].reset()
            }
        })
    })
})