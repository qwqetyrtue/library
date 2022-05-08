package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.User;

import javax.validation.constraints.NotBlank;


public class Update_pwd {
    @NotBlank(message = "uid不能为空")
    private String uid;
    @NotBlank(message = "新密码不能为空")
    private String password;
    @NotBlank(message = "旧密码不能为空")
    private String oldPassword;
    @NotBlank(message = "验证码不能为空")
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
