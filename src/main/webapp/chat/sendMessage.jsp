<?xml version="1.0" encoding="utf-8" ?>
<%@ page contentType = "text/xml; charset=utf-8" %>
<%@ page import = "java.sql.*" %>
<%@ page import = "java.util.List" %>
<%@ page import = "util.DB2" %>
<%@ page import = "util.Util2" %>
<%
request.setCharacterEncoding("utf-8");
	String nickName = request.getParameter("nickName");
	String msg = request.getParameter("msg");
	String message = "["+nickName+"] "+msg;
	
	Connection conn = null;
	PreparedStatement pstmt = null;
	
	boolean isSuccess = true;
	
	try {
		conn = DB2.getConnection();
		pstmt = conn.prepareStatement(
	"insert into chat_message (nickname, register_date, message) "+
	"values(?, (select nvl(max(chat_seq), 0)+1 from chat_message), ?)");
		pstmt.setString(1, nickName);
		//pstmt.setTimestamp(2, register_date);
		pstmt.setString(2, message);
		pstmt.executeUpdate();
	} catch(SQLException ex) {
		isSuccess = false;
	} finally {
		if (pstmt != null) try { pstmt.close(); } catch(SQLException ex) {}
		if (conn != null) try { conn.close(); } catch(SQLException ex) {}
	}
%>
<result>
	<code><%= isSuccess ? "success" : "fail" %></code>
</result>
