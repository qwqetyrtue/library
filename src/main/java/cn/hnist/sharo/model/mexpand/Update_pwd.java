package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.User;

public class Update_pwd {
    private String uid;
    private String password;
    private String oldPassword;
    private String verifyCode;

    public User getUser() {
        User user = new User();
        user.setUid(this.getUid());
        return user;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }
}
