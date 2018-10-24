var config = {
	apiKey: "AIzaSyAmJXF4xCHexyq0ofjmfBS1HCvnlbeOwJM",
	authDomain: "booldook-mall.firebaseapp.com",
	databaseURL: "https://booldook-mall.firebaseio.com",
	projectId: "booldook-mall",
	storageBucket: "booldook-mall.appspot.com",
	messagingSenderId: "726805469501"
};
firebase.initializeApp(config);

var db = firebase.database();
var ref;
var key;

/***** HOME ******/
(function initHome() {
	ref = db.ref("root/home");
	ref.on("child_added", homeAdd);
	ref.on("child_removed", homeRev);
	ref.on("child_changed", homeChg);
})();
function homeAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/main/'+img;
	var title = data.val().title;
	var link = data.val().link;
	var html = '';
	html += '<ul id="'+id+'">';
	html += '<li>';
	html += '<img src="'+src+'" class="img" onclick="goUrl(\''+link+'\');">';
	html += '<span>'+title+'</span>';
	html += '</li>';
	html += '</ul>';
	$("#modal0").append(html);
}
function homeRev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function homeChg(data) {
	var id = data.key;
	var ul = $("#"+id);
	$("img", ul).attr("src", "../img/main/"+data.val().img);
	$("span", ul).html(data.val().title);
}

/***** SHOP ******/
(function initShop() {
	ref = db.ref("root/shop");
	ref.on("child_added", shopAdd);
	ref.on("child_removed", shopRev);
	ref.on("child_changed", shopChg);
})();
function shopAdd(data) {
	shopMake("C", data);
}
function shopRev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function shopChg(data) {
	shopMake("U", data);
}
function shopMake(chk, data) {
	var id = data.key;
	var v = data.val();
	var cnt = 0;
	var wid = 0;
	var html = '';
	if(chk == "C") html = '<ul id="'+id+'">';
	html += '<li class="title">';
	html += '<a href="'+v.link+'">'+v.title+'</a>';
	if(v.icon) {
		html += '<div class="tooltip" style="background:'+v.color+'">';
		html += v.icon;
		html += '<div style="background:'+v.color+'"></div>';
		html += '</div>';
	}
	html += '</li>';
	if(chk == "C") {
		html += '</ul>';
		$("#modal1").append(html);
	}
	else {
		$("#"+id).html(html);
	}
	//ul의 개수에 따른 width 변화 
	cnt = $("#modal1 > ul").length;
	wid = 100/cnt + "%";
	$("#modal1 > ul").css("width", wid);
	
	//2차 카테고리 생성
	$("#modal1 > ul").each(function(i){
		var id = $(this).attr("id");
		db.ref("root/shop/"+id+"/sub/").once("value").then(function(snapshot){
			$("#"+id).find(".cont").remove();
			snapshot.forEach(function(item){
				var id2 = item.key;
				var v = item.val();
				var html  = '<li class="cont" id="'+id2+'">';
				html += '<a href="'+v.link+'">'+v.title+'</a>';
				if(v.icon) {
					html += '<div class="tooltip" style="background:'+v.color+'">';
					html += v.icon;
					html += '<div style="background:'+v.color+'"></div>';
					html += '</div>';
				}
				html += '</li>';
				$("#"+id).append(html);
			});
		});
	});
}
/***** UI *****/
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



/***** 카테고리 2 ******/
$.ajax({
	url: "../json/cate2.json",
	type: "get",
	dataType: "json",
	success: function (data) {
		var html;
		var blogs = data.result.blog;
		var posts = data.result.recent;
		//Blog 생성
		for (var i = 0; i < blogs.length; i++) {
			html = '<ul>';
			html += '<li class="title">';
			html += '<a href="' + blogs[i].main.link + '">' + blogs[i].main.title + '</a>';
			if(blogs[i].main.icon != "") {
				html += '<div class="tooltip" style="background:' + blogs[i].main.color + '">';
				html += blogs[i].main.icon;
				html += '<div style="background:' + blogs[i].main.color + '"></div>';
				html += '</div>';
			}
			html += '</li>';
			for (var j = 0; j < blogs[i].sub.length; j++) {
				html += '<li class="sub">';
				html += '<a href="' + blogs[i].sub[j].link + '">' + blogs[i].sub[j].title + '</a>';
				if(blogs[i].sub[j].icon != "") {
					html += '<div class="tooltip" style="background:' + blogs[i].sub[j].color + '">';
					html += blogs[i].sub[j].icon;
					html += '<div style="background:' + blogs[i].sub[j].color + '"></div>';
					html += '</div>';
				}
				html += '</li>';
			}
			html += '</ul>';
			$("#modal2 > .blogs").append(html);
		}
		//Recent 생성
		for (var i = 0; i < posts.length; i++) {
			html = '<ul>';
			html += '<li class="post clear" onclick="goPost(\'' + posts[i].link + '\');">';
			html += '<img src="' + posts[i].img + '" class="img post_img hover">';
			html += '<div>';
			html += '<div class="post_title">' + posts[i].title + '</div>';
			html += '<span class="post_date">' + posts[i].date + '</span>';
			html += '<span class="post_cnt">' + posts[i].comment + '</span>';
			html += '<span class="post_comment">Comment</span>';
			html += '</div>';
			html += '</li>';
			html += '</ul>';
			$("#modal2 > .recents").append(html);
		}
	},
	error: function (xhr, status, error) {
		alert("통신이 원할하지 않습니다.\n잠시 후 다시 시도해 주세요.");
		console.log(xhr, status, error);
	}
});

/*

	<ul>
		<li class="title"><a href="#">BLOG TYPES</a></li>
		<li class="sub"><a href="#">Alternative</a></li>
	</ul>
	<ul>
		<li class="title"><a href="#">BLOG TYPES</a></li>
		<li class="sub"><a href="#">Alternative</a></li>
	</ul>


	<ul>
		<li class="post" onclick="goPost('#');">
			<img src="../img/main/blog-11-75x65.jpg" class="img post_img">
			<div>
				<div class="post_title">A companion for extra sleeping</div>
				<span class="post_date">July 23, 2016</span>
				<span class="post_cnt">1</span>
				<span class="post_comment">Comment</span>
			</div>
		</li>
	</ul>
</div>
*/





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