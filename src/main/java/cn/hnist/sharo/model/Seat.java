package cn.hnist.sharo.model;


public class Seat {

  private long id;
  private String seatid;
  private String state;
  private java.sql.Date createdate;
  private String roomid;
  private long number;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getSeatid() {
    return seatid;
  }

  public void setSeatid(String seatid) {
    this.seatid = seatid;
  }


  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }


  public java.sql.Date getCreatedate() {
    return createdate;
  }

  public void setCreatedate(java.sql.Date createdate) {
    this.createdate = createdate;
  }


  public String getRoomid() {
    return roomid;
  }

  public void setRoomid(String roomid) {
    this.roomid = roomid;
  }


  public long getNumber() {
    return number;
  }

  public void setNumber(long number) {
    this.number = number;
  }

}
