$('#category').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: 'post',
        url: '/article/category',
        data: formData,
        success: function(response) {
            location.reload();
        }
    });
    return false;
});
// 分类展示
$.ajax({
    url: '/article/listCategory',
    method: 'get',
    success: function(response) {
        var html = template('cateTpl', {
            data: response
        });
        $('#cateBox').html(html);

    }
});
// 分类信息的修改功能
$('#cateBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        url: '/article/category/' + id,
        method: 'get',
        success: function(response) {
            var html = template('editTpl', response);
            $('#edit-box').html(html);

        }
    });
});
// 修改分类信息的提交事件委托
$('#edit-box').on('submit', '#edit-form', function() {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();
    $.ajax({
        url: '/article/category/' + id,
        type: 'put',
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            console.log('修改失败');

        }

    })
    return false;
});