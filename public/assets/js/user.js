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
// $('#photo').on('change', function() {

// });
// 添加头像和修改头像（修改头像是动态生成的）,所以我们只能通过事件委托来处理
$('#modifyBox').on('change', '#photo', function() {
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
            console.log(response);

            var html = template('userTpl', {
                data: response,
            });
            $('#userBox').html(html);
        }
    })
    //事件委托给编辑按钮
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/admin/user/' + id,
        success: function(response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        },
        error: function() {
            console.log('查询数据失败！');

        }
    })
});
// 由于修改表单是渲染生成的我们还需要用事件 委托
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 我们要根据用户id修改数据，
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/admin/user/' + id,
        data: formData,
        success: function(response) {
            location.reload();
        },
        error: function() {
            console.log('修改失败');

        }
    })
    return false;
});
// 删除用户的事件委托
$('#userBox').on('click', '.delete', function() {
    var result = confirm('确定要删除吗?');
    if (result) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/admin/user/' + id,
            success: function(response) {
                location.reload();
            },
            error: function() {
                alert('删除失败')
            }

        })
    }
});
// 全选按钮
var checkedAll = $('#checkedAll');
// 批量删除按钮
var deleteMany = $('#deleteMany');
checkedAll.on('change', function() {
    var status = $(this).prop('checked');
    $('#userBox').find('input').prop('checked', status);
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});
// 事件委托
$('#userBox').on('change', '.userStatus', function() {
    var input = $('#userBox').find('input');
    var checked_box = $('.userStatus').filter(':checked');
    if (input.length == checked_box.length) {
        checkedAll.prop('checked', true);
    } else {
        checkedAll.prop('checked', false);
    }
    if (checked_box.length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});
// 批量删除
deleteMany.on('click', function() {
    var flag = confirm('你确定批量删除吗？');
    if (flag) {
        // 获取已选中的复选框
        var user_checked = $('#userBox').find('input').filter(':checked');
        var ids = [];
        user_checked.each(function(index, element) {
            var id = $(element).attr('data-id');
            ids.push(id);
        });
        var result = ids.length > 1 ? ids.join('-') : ids[0];

        console.log(result);

        $.ajax({
            type: 'delete',
            url: '/admin/user/' + result,
            success: function(response) {
                location.reload();
            },
            error: function(error) {
                console.log(JSON.parse(error.responseText)['message']);

            }
        })
    }
})