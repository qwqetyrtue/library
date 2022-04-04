package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.User;

public class Update_pwd {
    private String uid;
    private String password;
    private String old_password;

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

    public String getOld_password() {
        return old_password;
    }

    public void setOld_password(String old_password) {
        this.old_password = old_password;
    }
}
