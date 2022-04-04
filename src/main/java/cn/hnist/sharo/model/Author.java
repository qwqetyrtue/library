package cn.hnist.sharo.model;


import cn.hnist.sharo.model.menum.Gender;

public class Author {

  private long id;
  private String atid;
  private String name;
  private String introduce;
  private String birth;
  private Gender gender;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getAtid() {
    return atid;
  }

  public void setAtid(String atid) {
    this.atid = atid;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getIntroduce() {
    return introduce;
  }

  public void setIntroduce(String introduce) {
    this.introduce = introduce;
  }


  public String getBirth() {
    return birth;
  }

  public void setBirth(String birth) {
    this.birth = birth;
  }


  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

}
