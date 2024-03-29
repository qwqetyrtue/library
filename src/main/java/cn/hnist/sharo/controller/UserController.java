package cn.hnist.sharo.controller;


import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.User_register;
import cn.hnist.sharo.unit.EmailUtils;
import cn.hnist.sharo.unit.Res;
import cn.hnist.sharo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;


@Controller
@RequestMapping("/user")
public class UserController {
    final private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 提交登录请求
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userLoginHandle(@RequestBody @Validated(value = User.LoginVi.class) User user, HttpSession session) {
        User login = userService.login(user);
        if (login != null) {
            System.out.println(login.getLogout());
            if(login.getLogout() != null){
                return new Res<>("fail", "账号已经注销");
            }
            // 保存到session
            session.setAttribute("user", login);
            return new Res<>("success", "登陆成功");
        }
        return new Res<>("fail", "账号或密码错误");
    }

    // 查询用户信息
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public @ResponseBody
    Res<User> userCheckHandle(HttpSession session) {
        return new Res<User>("success", (User) session.getAttribute("user"));
    }

    // 修改密码
    @RequestMapping(value = "/updatepwd", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userUpdatePasswordHandle(@Valid @RequestBody Update_pwd update_pwd, HttpSession session) {
        String verifyCode;
        try{
            verifyCode = session.getAttribute("verifyCode").toString();
        }catch (Exception e){
            e.printStackTrace();
            return new Res<String>("fail", "未发送验证码");
        }
        if(!verifyCode.equals(update_pwd.getVerifyCode()))
            return new Res<>("fail", "验证码错误");
        if (userService.updatepwd(update_pwd))
            return new Res<>("success", "修改成功");
        return new Res<>("fail", "修改失败功");
    }

    // 修改个人资料
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    Res<User> userUpdateHandle(@RequestBody User user, HttpSession session) {
        User update = userService.update(user);
        if (update != null) {
            session.setAttribute("user", update);
            return new Res<>("success", update);
        }
        return new Res<>("fail", null);
    }

    // 发送验证码
    @RequestMapping(value = "/sendverifycode", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userSendVerifyCodeHandle(@RequestBody User_register user_register, HttpSession session) {
        String verifyCode = EmailUtils.smsCode();
        if (EmailUtils.sendCode(verifyCode, user_register.getEmail())) {
            session.setAttribute("verifyCode", verifyCode);
            session.setAttribute("email", user_register.getEmail());
            return new Res<>("success", "发送成功");
        }else{
            session.removeAttribute("verifyCode");
            session.removeAttribute("email");
        }
        return new Res<>("fail", "发送失败");
    }

    // 检测uid是否可用
    @RequestMapping(value = "/checkuid", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userCheckUidHandle(@RequestBody User user, HttpSession session) {
        if (userService.checkMsg(user) == null)
            return new Res<>("success", "账号可用");
        return new Res<>("fail", "账号重复");
    }

    // 注册用户
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userRegisterHandle(@Valid @RequestBody User_register user_register, HttpSession session) {
        String verifyCode,email;
        try {
            verifyCode = session.getAttribute("verifyCode").toString();
            email = session.getAttribute("email").toString();
        }catch (Exception e){
            e.printStackTrace();
            return new Res<>("fail", "未发送验证码");
        }
        if (!user_register.getEmail().equals(email) || !user_register.getVerifyCode().equalsIgnoreCase(verifyCode))
            return new Res<>("fail", "注册失败,邮箱错误或验证码错误");
        User user = new User();
        user.setEmail(user_register.getEmail());
        user.setPassword(user_register.getPassword());
        user.setUid(user_register.getUid());
        try {
            user = userService.register(user);
        } catch (Exception e) {
            return new Res<>("fail", "注册失败");
        }
        if (user != null) {
            session.setAttribute("user", user);
            return new Res<>("success", "注册成功");
        }
        return new Res<>("fail", "注册失败");
    }


    // 退出登录
    @RequestMapping(value = "/outlogin", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userOutLoginHandle(HttpSession session) {
        session.removeAttribute("user");
        return new Res<>("success", "退出登录");
    }

}
