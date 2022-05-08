package cn.hnist.sharo.model.mexpand;

import cn.hnist.sharo.model.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class User_register {
    @NotBlank(message = "uid不能为空")
    @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_]{8,10}$",message = "uid格式错误")
    private String uid;
    @NotBlank(message = "密码不能为空")
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$",message = "密码格式错误")
    private String password;
    @NotBlank(message = "邮箱不能为空")
    @Pattern(regexp = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",message = "邮箱格式错误")
    private String email;
    @NotBlank(message = "验证码不能为空")
    private String verifyCode;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }
}
