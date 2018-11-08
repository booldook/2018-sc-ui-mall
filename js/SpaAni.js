var SpaAni = (function(){
	function SpaAni(_page, _elem, _gap) {
		var obj = this;
		this.page = $(_page);
		this.elem = _elem;
		this.scTop = 0;
		this.pos = [];
		this.now = 0;
		this.gap = _gap;
		$(window).resize(function(){
			for(var i=0; i<obj.page.length; i++) {
				obj.pos[i] = $(obj.page[i]).position().top;
			}
		}).trigger("resize");
		$(window).scroll(function(){
			obj.scTop = $(this).scrollTop();
			obj.init(obj);
		}).trigger("scroll");
	};
	SpaAni.prototype.init = function(obj){
		for(var i=0; i<obj.page.length; i++) {
			if(obj.scTop+obj.gap > obj.pos[i]) obj.now = i;
		}
		$(obj.page[obj.now]).find(obj.elem).each(function(){
			var cls = $(this).data("ani");
			$(this).addClass("card");
		});
	};
	return SpaAni;
}());