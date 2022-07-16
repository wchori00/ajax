package wchori.web.chat;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Util {
	static {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	public static Connection getConnection() {
		Connection conn=null;
		try {
			conn=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521/XEPDB1", "mytest","mytest");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}

}