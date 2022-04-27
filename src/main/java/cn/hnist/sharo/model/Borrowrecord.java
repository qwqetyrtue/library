package cn.hnist.sharo.model;


import cn.hnist.sharo.model.menum.BorrowState;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Borrowrecord {

  private long id;
  private String borrowid;
  private String uid;
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
  private java.sql.Timestamp createtime;
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
  private java.sql.Timestamp returntime;
  private BorrowState state;
  private String bkid;
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
  private java.sql.Timestamp limittime;
  private String remark;
  private String mid;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getBorrowid() {
    return borrowid;
  }

  public void setBorrowid(String borrowid) {
    this.borrowid = borrowid;
  }


  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }


  public java.sql.Timestamp getCreatetime() {
    return createtime;
  }

  public void setCreatetime(java.sql.Timestamp createtime) {
    this.createtime = createtime;
  }


  public java.sql.Timestamp getReturntime() {
    return returntime;
  }

  public void setReturntime(java.sql.Timestamp returntime) {
    this.returntime = returntime;
  }


  public BorrowState getState() {
    return state;
  }

  public void setState(BorrowState state) {
    this.state = state;
  }


  public String getBkid() {
    return bkid;
  }

  public void setBkid(String bkid) {
    this.bkid = bkid;
  }


  public java.sql.Timestamp getLimittime() {
    return limittime;
  }

  public void setLimittime(java.sql.Timestamp limittime) {
    this.limittime = limittime;
  }


  public String getRemark() {
    return remark;
  }

  public void setRemark(String remark) {
    this.remark = remark;
  }

  public String getMid() {
    return mid;
  }

  public void setMid(String mid) {
    this.mid = mid;
  }
}
