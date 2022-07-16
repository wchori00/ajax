package wchori.web.chat;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class chatDAO {
	private static chatDAO chatDAO;
	private chatDAO() {};
	public static chatDAO getChatDAO() {
		if(chatDAO==null) {
			chatDAO=new chatDAO();
		}
		return chatDAO;
	}
	public void insert(int chat_id, String name, String message) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn=Util.getConnection();
			pstmt=conn.prepareStatement("insert into chat_list values(?,?,?)");
			pstmt.setInt(1, chat_id);
			pstmt.setString(2, name);
			pstmt.setString(3, message);
			pstmt.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			if (rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
				}
			if (pstmt != null)
				try {
					pstmt.close();
				} catch (SQLException e) {
				}
			if (conn != null)
				try {
					conn.close();
				} catch (SQLException e) {
				}
		}
	}
	public List<chatVO> select() {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<chatVO> list=new ArrayList<chatVO>();
		try {
			conn=Util.getConnection();
			pstmt=conn.prepareStatement("select * from chat_list");
			rs=pstmt.executeQuery();
			while(rs.next()) {
				chatVO chat=new chatVO(rs.getInt("chat_id"), rs.getString("name"),rs.getString("message"));
				list.add(chat);
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			if (rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
				}
			if (pstmt != null)
				try {
					pstmt.close();
				} catch (SQLException e) {
				}
			if (conn != null)
				try {
					conn.close();
				} catch (SQLException e) {
				}
		}
		return list;
	}

}
