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
$("#home_save").on('click', function(){
	var title = $("#home_wr .title").val();
	var link = $("#home_wr .link").val();
	if(title == '' || link == '') {
		alert("내용을 적어주세요.");
	}
	else {
		ref = db.ref("root/home");
		ref.push({
			title: title,
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
*/