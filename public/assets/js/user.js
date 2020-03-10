// 阻止表单的默认提交
$('#userForm').on('submit', function() {
    var result = serializeToObj($(this));
    $.ajax({
        type: 'post',
        url: '/admin/user',
        contentType: 'application/json',
        data: JSON.stringify(result),
        success: function(response) {
            location.reload();
        },
        error: function() {
            alert('添加失败！')
        }
    });
    return false;
})