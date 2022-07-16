package wchori.web.chat;

public class chatVO {
	
	public int chat_id;
	public String name;
	public String message;
	
	public chatVO(int chat_id, String name, String message) {
		this.chat_id = chat_id;
		this.name = name;
		this.message = message;
	}
	
	public int getChat_id() {
		return chat_id;
	}
	public void setChat_id(int chat_id) {
		this.chat_id = chat_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
