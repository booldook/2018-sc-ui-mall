//자동 높이 계산 함수
(function autoHeight() {
	$(".hei-wrap").imagesLoaded().done(heiCalc);
	$(window).resize(heiCalc);
	function heiCalc() {
		$(".hei-wrap").each(function(){
			$(this).height($(this).find(".hei-elem").height());
		});	
	}
})();