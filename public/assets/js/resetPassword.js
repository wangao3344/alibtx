$('#reset').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: 'put',
        url: '/admin/pwd',
        data: formData,
        success: function(response) {
            location.href = "login.html";

        },


    });
    return false;
});