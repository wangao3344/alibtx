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
    alert(id);
});