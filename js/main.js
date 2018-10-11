$(".searchs .hand").click(function () {
	$(".search_catelist").stop().slideToggle(100);
});

$(".menu > ul > li").hover(function () {
	$(".menu_modal").stop().fadeOut(0);
	$(this).children(".menu_modal").stop().fadeIn(100);
}, function () {
	$(".menu_modal").stop().fadeOut(0);
});

function goUrl(url) {
	location.href = url;
}

/*****카테고리0 ******/
$.ajax({
	url: "../json/cate0.json",
	type: "get",
	dataType: "json",
	data: {},
	success: function(data){
		var html;
		for(var i=0; i<data.result.length; i++) {
			var html = '<ul>';
			html += '<li><img src="'+data.result[i].img+'" class="img" onclick="goUrl(\''+data.result[i].link+'\');">'+data.result[i].title+'</li>';
			html += '</ul>';
			$("#modal0").append(html);
		}
	},
	error: function(xhr, status, error) {
		console.log(shr, status, error);
	}
});

/***** 카테고리 1 ******/
$.ajax({
	url: "../json/cate1.json",
	type: "get",
	dataType: "json",
	data: {},
	success: function(data){
		var cnt = data.result.length;
		var style = 'style="width:'+(100/cnt+'%')+';"';
		var html;
		for(var i=0; i<cnt; i++) {
			//console.log(data.result[i].main.title);
			html  = '<ul '+style+'>';
			html += '<li class="title">';
			html += '<a href="'+data.result[i].main.link+'">';
			html += data.result[i].main.title;
			html += '</a>';
			html += '<div class="tooltip" style="background:'+data.result[i].main.color+'">';
			html += data.result[i].main.icon;
			html += '<div style="background:'+data.result[i].main.color+'"></div>';
			html += '</div>';
			html += '</li>';
			for(var j=0; j<data.result[i].sub.length; j++) {
				//console.log(data.result[i].sub[j].title);
				html += '<li class="cont">';
				html += '<a href="'+data.result[i].sub[j].link+'">';
				html += data.result[i].sub[j].title;
				html += '</a>';
				html += '<div class="tooltip" style="background:'+data.result[i].sub[j].color+'">';
				html += data.result[i].sub[j].icon;
				html += '<div style="background:'+data.result[i].sub[j].color+'"></div>';
				html += '</div>';
				html += '</li>';
			}
			html += '</ul>';
			$("#modal1").append(html);
		}
	},
	error: function(xhr, status, error) {
		console.log(xhr, status, error);
	} 
});





/*
function modalMake1() {
	var html = '';
	var wid = 100/cates.length + "%";
	for(var i=0; i<cates.length; i++) {
		html = '<ul style="width:'+wid+'">';
		html+= '<li class="title">';
		html+= '<a href="'+cates[i].main.link+'">'+cates[i].main.title+'</a>';
		if(cates[i].main.icon != "") {
			html+= '<div class="tooltip" style="background:'+cates[i].main.color+'">';
			html+= cates[i].main.icon;
			html+= '<div style="background:'+cates[i].main.color+'"></div>';
			html+= '</div>';
		}
		html+= '</li>';
		for(var j=0; j<cates[i].sub.length; j++) {
			html+= '<li class="cont">';
			html+= '<a href="'+cates[i].sub[j].link+'">'+cates[i].sub[j].title+'</a>';
			if(cates[i].sub[j].icon != "") {
				html+= '<div class="tooltip" style="background:'+cates[i].sub[j].color+'">';
				html+= cates[i].sub[j].icon;
				html+= '<div style="background:'+cates[i].sub[j].color+'"></div>';
				html+= '</div>';
			}
			html+= '</li>';
		}    
		html+= '</ul>';
		$("#modal1").append(html);
	}
	$("#modal1 .tooltip").each(function(){
		var n = $(this).prev().html().length;
		$(this).css({"left": n*5+"px"});
	});
}
modalMake1();

function goSite(url) {
	location.href = url;
}
$("footer > div").click(function(){
	goSite('http://daum.net');
});
*/