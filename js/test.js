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
(function initTest() {
	ref = db.ref("root/test/");
	ref.on("child_added", testAdd);
	ref.on("child_removed", testRev);
	ref.on("child_changed", testChg);
})();
function testAdd(data) {
	var html = '<li id="'+data.key+'" onclick="dataRemove(this);">';
	html += '<span>'+data.val().title+'</span><br>';
	html += '<span>'+data.val().username+'</span>';
	html += '</li>';
	$(".datas").append(html);
}
function testRev(data) {
	$("#"+data.key).remove();
}
function testChg(data) {

}
function dataRemove(obj) {
	var id = obj.id;
	db.ref("root/test/"+id).remove();
}

$("#bt_add").on("click", function () {
	var title = $("#title").val();
	var username = $("#username").val();
	ref = db.ref("root/test");
	ref.push({
		title: title,
		username:username
	}).key;
});

