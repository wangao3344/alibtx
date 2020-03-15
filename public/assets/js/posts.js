function dateFormate(date) {
    var times = new Date(date);
    return times.getFullYear() + '-' + (times.getMonth() + 1) + '-' + times.getDate()
}
$.ajax({
    type: 'get',
    url: '/article/showArticles',
    success: function(response) {
        console.log(response);
        // 自定义扩展方法，必须写在template()的后面
        template.defaults.imports.dateFormate = dateFormate;
        var html = template('tplArticle', response);
        $('#articleBox').html(html);
        var page = template('tplPage', response);
        $('#page').html(page);

    }
});

function pageShow(page) {
    $.ajax({
        type: 'get',
        url: '/article/showArticles',
        data: { page: page },
        success: function(response) {
            console.log(response);
            // 自定义扩展方法，必须写在template()的后面
            template.defaults.imports.dateFormate = dateFormate;
            var html = template('tplArticle', response);
            $('#articleBox').html(html);
            var page = template('tplPage', response);
            $('#page').html(page);

        }
    });
}