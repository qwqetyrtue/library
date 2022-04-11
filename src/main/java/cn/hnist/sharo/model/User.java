package cn.hnist.sharo.model;


import cn.hnist.sharo.model.menum.Gender;

public class User {

  private long id;
  private String uid;
  private Gender gender;
  private java.sql.Date birth;
  private String homeadd;
  private String presentadd;
  private String email;
  private String call;
  private String name;
  private java.sql.Date createdate;
  private String password;
  private String postcode;
  private String bloodtype;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }


  public java.sql.Date getBirth() {
    return birth;
  }

  public void setBirth(java.sql.Date birth) {
    this.birth = birth;
  }


  public String getHomeadd() {
    return homeadd;
  }

  public void setHomeadd(String homeadd) {
    this.homeadd = homeadd;
  }


  public String getPresentadd() {
    return presentadd;
  }

  public void setPresentadd(String presentadd) {
    this.presentadd = presentadd;
  }


  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }


  public String getCall() {
    return call;
  }

  public void setCall(String call) {
    this.call = call;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public java.sql.Date getCreatedate() {
    return createdate;
  }

  public void setCreatedate(java.sql.Date createdate) {
    this.createdate = createdate;
  }


  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }


  public String getPostcode() {
    return postcode;
  }

  public void setPostcode(String postcode) {
    this.postcode = postcode;
  }


  public String getBloodtype() {
    return bloodtype;
  }

  public void setBloodtype(String bloodtype) {
    this.bloodtype = bloodtype;
  }

  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }
}
