$(window).scroll(function(){
	var gap = $("html, body").scrollTop();
	if(gap > 150) {
		if($(".navs").hasClass("dn_bg") == false) {
			$(".navs").css({"top":"-60px"}).addClass("dn_bg");
			$(".navs").stop().animate({"top":"0px"}, 500);
		}
	}
	else {
		$(".navs").css({"top":"-60px"}).removeClass("dn_bg");
		$(".navs").stop().animate({"top":"0px"}, 500);
	}
});

$(".fa-bars").click(function(){
	$(".navs_sub").stop().slideToggle(100);
});