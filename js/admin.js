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