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
// 删除操作
$('#cateBox').on('click', '.delete', function() {
    var flag = confirm('你确定要删除吗？');
    if (flag) {
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/article/category/' + id,
            type: 'delete',
            success: function() {
                location.reload();
            },
            error: function() {
                console.log('删除失败');

            }
        })
    }
});
// 批量删除
var removeAll = $('#removeAll');
// 全选按钮
var checkedAll = $('#checkedAll');
checkedAll.on('change', function() {
    var status = $(this).prop('checked');
    $('.item').prop('checked', status);
    if (status) {
        removeAll.show();
    } else {
        removeAll.hide();
    }
});
// 渲染出来的复选框
$('#cateBox').on('change', '.item', function() {
    var total = $('.item').length;
    var checkedTotal = $('.item').filter(':checked').length
    if (total == checkedTotal) {
        checkedAll.prop('checked', true);
    } else {
        checkedAll.prop('checked', false);
    }
    if (checkedTotal > 0) {
        removeAll.show();
    } else {
        removeAll.hide();
    }
});
removeAll.on('click', function() {
    var checkedBoxes = $('.item').filter(':checked');
    var ids = [];
    checkedBoxes.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    var params = ids.length == 1 ? ids[0] : ids.join('-');
    $.ajax({
        url: '/article/category/' + params,
        type: 'delete',
        success: function() {
            location.reload();
        }
    })
});