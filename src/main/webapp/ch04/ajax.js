var ajax = {};
ajax.xhr = {};	// ajax.xhr 패키지 지정
ajax.xhr.Request = function(url, params, callback, method) {
	this.url = url;
	this.params = params;
	this.callback = callback;
	this.method = method;
	this.send();	// Request 클래스 생성자, 생성과 동시에 send() 호출
}
ajax.xhr.Request.prototype = {
	getXMLHttpRequest: function() {
		if(window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e1) {return null;}
			}
		}else if(window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}else {
			return null;
		}
	},
	send: function() {
		this.req = this.getXMLHttpRequest();
		// req 프로퍼티에 XMLHttpREquest 객체를 저장
		var httpMethod = this.method ? this.method : 'GET';
		if(httpMethod != 'GET' && httpMethod != 'POST') {
			httpMethod = 'GET';
		}
		var httpParams = (this.params == null || this.params == '') ? null : this.params;
		var httpUrl = this.url;
		if(httpMethod == 'GET' && httpParams != null) {
			httpUrl = httpUrl + "?" + httpParams;
		}
		this.req.open(httpMethod, httpUrl, true);
		this.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var request = this; // XMLHttpRequest 객체의 readyState 값이
		this.req.onreadystatechange = function() { // 바뀔 때 이 객체의
			request.onStateChange.call(request); // <- 함수 호출
		}
		this.req.send(httpMethod == 'POST' ? httpParams : null);
	},
	onStateChange: function() { // 이 객체의 callback 프로퍼티에 할당된
		this.callback(this.req); // 함수를 호출한다
		}
}