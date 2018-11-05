/*
$.ajax({
	url:"../json/cate_test2.json",
	type:"post",
	dataType:"json",
	data:{},
	success: function(data){
		var rs = data.result.cates;
		for(var i=0, html=''; i<rs.length; i++) {
			html = '<li>';
			html+= '<span class="'+rs[i].icon+'"></span>';
			html+= '<a href="'+rs[i].link+'"><span>'+rs[i].title+'</span></a>';
			html+= '<span class="fa fa-arrow-right"></span>';
			html+= '</li>';
			$(".cates").append(html);
		}
	},
	error: function(xhr) {
		console.log(xhr);
	}
});
*/

var cateFn = function(data){
	var rs = data.result.cates;
	for(var i=0, html=''; i<rs.length; i++) {
		html = '<li>';
		html+= '<span class="'+rs[i].icon+'"></span>';
		html+= '<a href="'+rs[i].link+'"><span>'+rs[i].title+'</span></a>';
		html+= '<span class="fa fa-arrow-right"></span>';
		html+= '</li>';
		$(".cates").append(html);
	}
};
var cate = new Ajax("../json/cate_test2.json");
cate.send(cateFn);

