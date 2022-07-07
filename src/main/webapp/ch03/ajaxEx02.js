var xhrObject;	// XMLHttpRequest객체를 저장할 변수를 전역 변수로 선언
function createXHR() {	// XMLHttpRequest객체를 생성하는 메소드
	if(window.ActiveXObject) {	// 웹브라우저가 IE5.0, IE6.0인 경우
		xhrObject = new ActiveXObject("Microsoft.XMLHTTP");
		
	}
}