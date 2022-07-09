var ajax = {};
ajax.xhr = {};	// ajax.xhr 패키지 지정
ajax.xhr.Request = function(url, params, callback, method) { // ajax.xhr.Request클래스 안에 function()메소드 정의
	this.url = url;
	this.params = params;
	this.callback = callback;
	this.method = method;
	this.send();	// Request 클래스 생성자, 생성과 동시에 send() 호출
}
function log(msg) {
	var console = document.getElementById("debugConsole");
	if(console!=null) {
		console.innerHTML += msg + "<br>";
	}
}
var req = null;
ajax.xhr.Request.prototype = {
	getXMLHttpRequest: function() {
		if(window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e) {
				try {
					return new ActiveXObject("Microsoft.XMLDOM");
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
		var httpMethod = this.method ? this.method : 'GET'; // 값이 있으면 트루(this.method) 값 없으면 펄스(get)
		if(httpMethod != 'GET' && httpMethod != 'POST') { // 값이 GET, POST 둘 다 아니면
			httpMethod = 'GET'; // 위에서 받은값 GET으로
		}
		var httpParams = (this.params == null || this.params == '') ? null : this.params; // 빈공간은 오류(null은 빈공간 아님)
		// this.params가 null 이거나 빈공간이면 null, 값 있으면 thid.params
		var httpUrl = this.url;
		if(httpMethod == 'GET' && httpParams != null) { // httpMethod값이 GET이고 httpParams가 null아니면
			httpUrl = httpUrl + "?" + httpParams; // 함수 추가해서 주소만들기
		}
		this.req.open(httpMethod, httpUrl, true); // this.getXMLHttpRequest.open() 동기/비동기
		this.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // HTML에서 js로 넘겨주기위해 
		var request = this; // XMLHttpRequest 객체의 readyState 값이 // this: 다른객체에서 접근해서 데이터(ex.URL)가져갈수있도록
		// this=ajax.xhr.Request
		this.req.onreadystatechange = function() { // 바뀔 때 이 객체의 (등록만)
			request.onStateChange.call(request); // <- 함수 호출
		}
		this.req.send(httpMethod == 'POST' ? httpParams : null); // 빈공간도 값이 있는걸로?
	},
	onStateChange: function() { // 이 객체의 callback 프로퍼티에 할당된
		this.callback(this.req); // 함수를 호출한다
		}
}