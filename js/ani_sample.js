var pages = new SpaAni(".section", ".ani", 300);

$(".section").eq(3).mousemove(function(evt){
	var delta = 30;
	var cX = evt.clientX;
	var cY = evt.clientY;
	var iX = $(this).find(".chair").width()/2;
	var iY = $(this).find(".chair").height()/2;
	var mX = (iX - cX)/delta;
	var mY = (iY - cY)/delta;
	console.log(mX, mY);
	$(this).find(".chair").css("transform", "translate("+mX+"px, "+mY+"px)");
});