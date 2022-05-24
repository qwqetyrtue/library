package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.menum.BloodType;
import cn.hnist.sharo.model.menum.Gender;

import java.sql.Date;

public class User_filtrate extends Filtrate{
    private String uid;
    private Gender gender;
    private java.sql.Date birth;
    private java.sql.Date birth_upper;
    private java.sql.Date birth_lower;
    private String homeadd;
    private String presentadd;
    private String email;
    private String call;
    private String name;
    private java.sql.Date createdate;
    private java.sql.Date createdate_upper;
    private java.sql.Date createdate_lower;
    private String postcode;
    private BloodType bloodtype;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
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

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public BloodType getBloodtype() {
        return bloodtype;
    }

    public void setBloodtype(BloodType bloodtype) {
        this.bloodtype = bloodtype;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Date getBirth_upper() {
        return birth_upper;
    }

    public void setBirth_upper(Date birth_upper) {
        this.birth_upper = birth_upper;
    }

    public Date getBirth_lower() {
        return birth_lower;
    }

    public void setBirth_lower(Date birth_lower) {
        this.birth_lower = birth_lower;
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Date getCreatedate_upper() {
        return createdate_upper;
    }

    public void setCreatedate_upper(Date createdate_upper) {
        this.createdate_upper = createdate_upper;
    }

    public Date getCreatedate_lower() {
        return createdate_lower;
    }

    public void setCreatedate_lower(Date createdate_lower) {
        this.createdate_lower = createdate_lower;
    }
}
