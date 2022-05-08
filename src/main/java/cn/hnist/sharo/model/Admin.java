package cn.hnist.sharo.model;


import cn.hnist.sharo.model.menum.Gender;

import javax.validation.constraints.NotBlank;

public class Admin {

  public interface LoginVi {};

  private long id;
  @NotBlank(message = "管理员账户不能为空",groups = {LoginVi.class})
  private String mid;
  @NotBlank(message = "密码不能为空",groups = {LoginVi.class})
  private String password;
  private String name;
  private String email;
  private Gender gender;
  private String call;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getMid() {
    return mid;
  }

  public void setMid(String mid) {
    this.mid = mid;
  }


  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }


  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public String getCall() {
    return call;
  }

  public void setCall(String call) {
    this.call = call;
  }
}
