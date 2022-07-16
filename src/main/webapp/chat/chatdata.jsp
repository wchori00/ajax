<%@page import="wchori.web.chat.chatVO"%>
<%@page import="java.util.List"%>
<%@page import="wchori.web.chat.chatDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
int chat_id=Integer.parseInt(request.getParameter("chat_id"));
String name=request.getParameter("name");
String message=request.getParameter("message");
int count=0;
chatDAO dao=chatDAO.getChatDAO();
dao.insert(chat_id, name, message);
List<chatVO> list=dao.select();
%>
{
"chat":[
<%for(chatVO da:list){ 
//System.out.println(da.getId());
%>
{
"chat_id":"<%= da.getChat_id()%>",
"name":"<%=da.getName()%>",
"message":"<%=da.getMessage()%>"
}<%
if(list.size()-1>count) {
	count++;
%>
,
<%} %>	

<%} %>	
]
}