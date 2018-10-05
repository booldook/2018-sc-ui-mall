$(".searchs .hand").click(function(){
	$(".search_catelist").stop().slideToggle(100);
});

$(".menu li").hover(function(){
	$(".menu_modal").stop().fadeOut(0);
	$(this).children(".menu_modal").stop().fadeIn(100);
}, function(){
	$(".menu_modal").stop().fadeOut(0);
});

function modalMake0() {
	var html = '';
	var sites = [];
	for(var i=0; i<10; i++) {
		sites[i] = [];
		sites[i][2] = '#';
		sites[i][0] = '<li><img src="../img/main/site'+i+'.jpg" class="img" onclick="goUrl('+i+');"></li>';
	}
	sites[0][1] = '<li>Demo Default</li>';
	sites[1][1] = '<li>Demo Decor</li>';
	sites[2][1] = '<li>Demo Retail</li>';
	sites[3][1] = '<li>Demo Books</li>';
	sites[4][1] = '<li>Demo Fashion Color</li>';
	sites[5][1] = '<li>Demo Lingerie</li>';
	sites[6][1] = '<li>Demo Handmade</li>';
	sites[7][1] = '<li>Demo Fashion</li>';
	sites[8][1] = '<li>Demo Fashion Flat</li>';
	sites[9][1] = '<li>Demo Electronics</li>';

	for(i=0; i<sites.length; i++) {
		html = '<ul>'+sites[i][0]+sites[i][1]+'</ul>';
		$("#modal0").append(html);
	}
}
modalMake0();

function goUrl(n) {
	location.href = sites[n][2];
}
