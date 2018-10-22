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
function initHome() {
	$(".list:not(#home_wr)").remove();
	ref = db.ref("root/home");
	ref.on("child_added", homeAdd);
	ref.on("child_removed", homeRev);
	ref.on("child_changed", homeChg);
}
initHome();
function homeAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/main/'+img;
	var title = data.val().title;
	var link = data.val().link;
	var html = '';
	html += '<ul class="list clear row" id="'+id+'">';
	html += '<li class="col-xs-4 col-sm-3 col-md-2 col-lg-2">';
	html += '<div>';
	html += '<img src="'+src+'">';
	html += '<input type="text" class="tit_img form-control" placeholder="이미지" value="'+img+'">';
	html += '</div>';
	html += '</li>';
	html += '<li class="col-xs-4 col-sm-6 col-md-7 col-lg-8">';
	html += '<div>';
	html += '<input type="text" class="title form-control" placeholder="타이틀" value="'+title+'">';
	html += '<input type="text" class="link form-control" style="margin-top:5px;" placeholder="링크주소" value="'+link+'">';
	html += '</div>';
	html += '</li>';
	html += '<li class="col-xs-4 col-sm-3 col-md-3 col-lg-2">';
	html += '<div>';
	html += '<button class="btn btn-danger" onclick="homeDel(this);">삭제</button> ';
	html += '<button class="btn btn-warning" onclick="homeUp(this);">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '</ul>';
	$("#home_wrap").append(html);
}

function homeRev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function homeChg(data) {
	var id = data.key;
	var ul = $("#"+id);
	$("img", ul).attr("src", "../img/main/"+data.val().img);
	alert("수정되었습니다.");
}


$("#home_save").on('click', function(){
	var img = $("#home_wr .tit_img").val();
	var title = $("#home_wr .title").val();
	var link = $("#home_wr .link").val();
	if(title == '' || link == '' || img == '') {
		alert("내용을 적어주세요.");
	}
	else {
		ref = db.ref("root/home");
		ref.push({
			img: img,
			title: title,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
});
function homeUp(obj){
	var ul = $(obj).parent().parent().parent();	
	var id = ul.attr("id");
	var img = $(".tit_img", ul).val();
	var title = $(".title", ul).val();
	var link = $(".link", ul).val();
	if(title == '' || link == '' || img == '') {
		alert("내용을 적어주세요.");
	}
	else {
		ref = db.ref("root/home/"+id);
		ref.update({
			img: img,
			title: title,
			link: link
		});
	}
}
function homeDel(obj){
	if(confirm("정말로 삭제하시겠습니까?")){
		//var id = obj.parentNode.parentNode.parentNode.id;
		var id = $(obj).parent().parent().parent().attr("id");
		if(id != "") {
			db.ref("root/home/"+id).remove();
		}
	}
}

/***** SHOP ******/
function initShop() {
	$("#shop_wrap > ul").remove();
	ref = db.ref("root/shop");
	ref.on("child_added", shopAdd);
	ref.on("child_removed", shopRev);
	ref.on("child_changed", shopChg);
}
initShop();
function shopAdd(data) {
	console.log("ADD");
	var html = '';	
	html += '<ul>';
	html += '<li class="shop_li1 clear">';
	html += '<div>';
	html += '<input type="text" class="title form-control" placeholder="제목">';
	html += '<input type="text" class="icon form-control" placeholder="아이콘">';
	html += '<input type="text" class="color form-control" placeholder="아이콘컬러">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger shop_del1">삭제</button>';
	html += '<button class="btn btn-warning shop_up1">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '<li class="shop_li2 clear">';
	html += '<div>';
	html += '<input type="text" class="title form-control" placeholder="제목">';
	html += '<input type="text" class="icon form-control" placeholder="아이콘">';
	html += '<input type="text" class="color form-control" placeholder="아이콘컬러">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger shop_del2">삭제</button>';
	html += '<button class="btn btn-warning shop_up2">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '<li class="shop_li2 clear">';
	html += '<div>';
	html += '<input type="text" class="title form-control" placeholder="제목">';
	html += '<input type="text" class="icon form-control" placeholder="아이콘">';
	html += '<input type="text" class="color form-control" placeholder="아이콘컬러">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger">삭제</button>';
	html += '<button class="btn btn-warning">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '</ul>';
	$("#shop_wrap").append(html);
}
function shopRev(data) {
	console.log("REMOVE");	
	console.log(data);	
}
function shopChg(data) {
	console.log("CHANGE");	
	console.log(data);	
}
$(".shop_wr").click(function(){
	var title = $(".shop_li0 .title").val();
	var icon = $(".shop_li0 .icon").val();
	var color = $(".shop_li0 .color").val();
	var link = $(".shop_li0 .link").val();
	if(title == "") {
		alert("제목을 입력하세요.");
		$(".shop_li0 .title").focus();
	}
	else {
		ref = db.ref("root/shop");
		ref.push({
			title: title,
			icon: icon,
			color: color,
			link: link
		}).key;
	}
});


/***** UI ******/
$(".nav").on("click", function(){
	var n = $(this).index();
	$(".nav").css({"background-color":"", "color":""});
	$(this).css({"background-color":"rgb(29, 58, 102)", "color":"#fff"});
	$(".section").hide();
	$(".section").eq(n).show();
});
$(".nav").eq(0).trigger("click");


/***** 참조사항 ******/
/*
|| : or 연산자  (이거나) 	=> true||true(true) / true||false(true)  / false||false (false)
&& : and 연산자 (그리고) 	=> true||true(true) / true||false(false) / false||false (false)

var img = $("#home_wr .tit_img").val();
var img = $(".tit_img", "#home_wr").val();
var img = $("#home_wr").find(".tit_img").val();
var img = $("#home_wr").children(".tit_img").val();
*/