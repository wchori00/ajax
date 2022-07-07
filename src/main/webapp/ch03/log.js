function log(msg) {
	var console = document.getElementById("debugConsole");
	// id값이 debugConsole에 해당하는 모든 Element 목록 console에 저장
	if(console != null) {	// 만약 console이 null이 아니면
		console.innerHTML += msg + "<br>";
		// console에 innerHTML()메서드를 통해서 text문장 입력
		// text문장: usingDOM.html의 log()값 + 줄바꿈 누적 입력
	}
}
