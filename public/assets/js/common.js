$('#loginOut').on('click', function() {
    var flag = confirm('你确定退出登陆吗?');
    // 如果返回值返回true代表点击了确定选项
    if (flag) {
        $.ajax({
            url: '/admin/loginOut',
            type: 'post',
            success: function(response) {
                location.href = 'login.html';
            },
            error: function(error) {
                alert(JSON.parse(error.responseText)['msg']);
            }
        });
    }
});
// 反序列化成对象jq中的方法
function serializeToObj(obj) {
    var arr = obj.serializeArray();
    var result = {};
    $.each(arr, function(index, value) {
        result[value.name] = value['value'];
    });
    return result;
}