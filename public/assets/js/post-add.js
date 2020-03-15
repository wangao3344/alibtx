$.ajax({
    type: 'get',
    url: '/article/listCategory',
    success: function(data) {
        var html = template('cateTpl', {
            data: data
        });
        $('#category').html(html);
    }
});
// 文章背景图片上传
$('#feature').on('change', function() {
    var formData = new FormData();
    formData.enctype = "multipart/form-data";
    var pic_content = this.files;
    $(pic_content).each(function(index, value) {
        // console.log(value);
        formData.append('cover' + index, value);

    })

    $.ajax({
        url: '/article/uploads',
        type: 'post',
        processData: false,
        contentType: false,
        data: formData,
        success: function(response) {
            // console.log(response[0]['articlePic']);
            $('#articlePic').val(response[0]['articlePic']);
            $('#bgImg').attr('src', response[0]['articlePic']).show();
        }
    })
});
// 文章添加
$('#articleForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/article/add',
        data: formData,
        success: function(response) {
            location.href = '/admin/posts.html'
        },
    })
    return false;
})