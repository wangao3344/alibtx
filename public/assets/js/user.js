// 阻止表单的默认提交
$('#userForm').on('submit', function() {
    // 后台通过formidable框架来接收数据
    // var result = serializeToObj($(this));
    var result = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/admin/user',
        // contentType: 'application/json',
        data: result,
        success: function(response) {
            location.reload();
        },
        error: function() {
            alert('添加失败！')
        }
    });
    return false;
});
// 监听头像图片的变化
$('#photo').on('change', function() {
    var formData = new FormData();
    // 文件内容
    var file = this.files[0];
    console.log(file);
    formData.append('icon', file);
    $.ajax({
        type: 'post',
        url: '/admin/uploads',
        data: formData,
        // 不对参数进行解析
        processData: false,
        // 不设置请求头
        contentType: false,
        success: function(response) {
            var data = JSON.parse(response);
            // 头像图片回显
            $('#preview').attr('src', data.url);
            // 隐藏表单域添加value属性
            $('#hiddenIcon').val(data.url);
        }
    })
});
$.ajax({
    type: 'get',
    url: '/admin/showUsers',
    success: function(response) {
        var html = template('userTpl', {
            data: response,
        });
        $('#userBox').html(html);
    }
})