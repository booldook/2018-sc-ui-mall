var Ajax = (function(){
	function Ajax(_file) {
		this.file = _file;
		this.data = {};
	}
	Ajax.prototype.addData = function(_data) {
		this.data = _data;
	}
	Ajax.prototype.send = function(_fn) {
		$.ajax({
			url: this.file,
			type: "post",
			dataType: "json",
			data: this.data,
			success: _fn,
			error: function (xhr, status, error) {
				alert("통신이 원할하지 않습니다.\n잠시 후 다시 시도해 주세요.");
				console.log(xhr, status, error);
			}
		});
	}
	return Ajax;
}());