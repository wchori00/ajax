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
		var httpMethod = this.method ? this.method : 'GET'; // 값 없으면 get
		if(httpMethod != 'GET' && httpMethod != 'POST') {
			httpMethod = 'GET'; // 위에서 받은값 get으로
		}
		var httpParams = (this.params == null || this.params == '') ? null : this.params; // 빈공간은 오류
		var httpUrl = this.url;
		if(httpMethod == 'GET' && httpParams != null) { // 겟이고 파람 null아니면
			httpUrl = httpUrl + "?" + httpParams; // 주소만들기
		}
		this.req.open(httpMethod, httpUrl, true);
		this.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // HTML에서 js로 넘겨주기위해 
		var request = this; // XMLHttpRequest 객체의 readyState 값이 // this: 예)다른객체에서 접근해서 url가져갈수있도록
		this.req.onreadystatechange = function() { // 바뀔 때 이 객체의 (등록만)
			request.onStateChange.call(request); // <- 함수 호출
		}
		this.req.send(httpMethod == 'POST' ? httpParams : null); // 빈공간도 값이 있는걸로?
	},
	onStateChange: function() { // 이 객체의 callback 프로퍼티에 할당된
		this.callback(this.req); // 함수를 호출한다
		}
}