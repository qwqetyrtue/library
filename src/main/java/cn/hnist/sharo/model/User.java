package cn.hnist.sharo.model;


import cn.hnist.sharo.model.menum.Gender;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.sql.Date;

public class User {

  // 登录验证组
  public interface LoginVi {};
  // 注册验证组
  public interface RegisterVi {};

  private long id;

  @Pattern(regexp = "/^[a-zA-Z][a-zA-Z0-9_]{8,10}$/",groups = RegisterVi.class)
  @NotNull(groups = {LoginVi.class},message = "登录账号不能为空")
  private String uid;

  private Gender gender;

  private java.sql.Date birth;

  private String homeadd;

  private String presentadd;

  @Pattern(regexp = "/^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/",groups = RegisterVi.class)
  private String email;

  private String call;

  private String name;

  private java.sql.Date createdate;


  @Pattern(regexp = "/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/",groups = RegisterVi.class)
  @NotNull(groups = {LoginVi.class},message = "登录密码不能为空")
  private String password;

  private String postcode;

  private String bloodtype;

  private java.sql.Date logout;

  private String avatar;


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

  public Date getLogout() {
    return logout;
  }

  public void setLogout(Date logout) {
    this.logout = logout;
  }

  public String getAvatar() {
    return avatar;
  }

  public void setAvatar(String avatar) {
    this.avatar = avatar;
  }
}
