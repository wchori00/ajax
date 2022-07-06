<%@ page contentType="text/plain; charset=UTF-8"%>
<%@ page import = "java.util.List" %>
<%!
	String[] keywords = {										// keywords 배열		
			"AJAX",
			"AJAX 실전 프로그래밍",
			"자바",
			"자바 프로그래밍",
			"자바 서버 페이지",
			"자바스터디",
			"자바서비스",
			"자바캔"
	};
	public List search(String keyword) {
		if(keyword == null || keyword.equals(""))				// 키워드가 없거나 ""과 같으면
			return java.util.Collections.EMPTY_LIST;			// 빈리스트 리턴
		keyword = keyword.toUpperCase();						// 키워드 전부 대문자로
		List result = new java.util.ArrayList(8);				// result = 8칸짜리 리스트
		for(int i = 0; i < keywords.length; i++) {				// keywords배열 길이만큼 반복문
			if(((String)keywords[i]).startsWith(keyword)) {		// keyword의 시작 글자와 keywords배열의 값을 비교해서 true/false 반환
				result.add(keywords[i]);						// 반환값이 true면 result에 keywords배열값 입력
			}
		}
		return result;											// result 반환
	}
%>
<%
	request.setCharacterEncoding("utf-8");						// 인코딩
	String keyword = request.getParameter("keyword");			// 키워드 얻어와서
	List keywordList = search(keyword);							// keywordList리스트
	out.print(keywordList.size());								// keywordList리스트 전체 크기 작성
	out.print("|");												// | 작성
	for(int i = 0; i < keywordList.size(); i++) {				// keywordList리스트 길이만큼 반복문
		String key = (String)keywordList.get(i);				// key = keywordList리스트의 값
		out.print(key);											// key 전부 작성
		if(i < keywordList.size() - 1) {						// keywordList리스트 길이 -1 만큼 반복문
			out.print(",");										// , 작성
		}
	}
%>