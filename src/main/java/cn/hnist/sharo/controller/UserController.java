package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.unit.Res;
import cn.hnist.sharo.service.UserService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

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
    Res<String> userLoginHandle(@RequestBody User user, HttpSession session) {
        User login = userService.login(user, session);
        if(user != null){
            // 保存到session
            session.setAttribute("user", login);
            return new Res<>("success","登陆成功");
        }
        return new Res<>("fail","登录失败");
    }

    // 查询用户信息
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public @ResponseBody
    Res<User> userCheckHandle(HttpSession session) {
        if (session.getAttribute("user") != null)
            return new Res<User>("success", (User) session.getAttribute("user"));
        else return new Res<User>("fail", null);
    }

    // 修改密码
    @RequestMapping(value = "/updatepwd", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userUpdatePasswordHandle(@RequestBody Update_pwd update_pwd, HttpSession session) {
        if(userService.updatepwd(update_pwd, session))
            return new Res<String>("success", "修改成功");
        return new Res<String>("fail", "修改失败功");
    }

    // 修改个人资料
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    Res<User> userUpdateHandle(@RequestBody User user, HttpSession session) {
        User update = userService.update(user, session);
        if(update != null) {
            session.setAttribute("user", update);
            return new Res<>("success", update);
        }
        return new Res<>("fail", null);
    }

    // 注册用户
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userRegisterHandle(@RequestBody User user, HttpSession session) {
        User newUser;
        try {
           newUser = userService.register(user, session);
        }
        catch(Exception e){
            return new Res<>("success","注册失败");
        }
        if(newUser != null){
            session.setAttribute("user", newUser);
            return new Res<>("success","注册成功");
        }
        return new Res<>("success","注册失败");
    }


    // 退出登录
    @RequestMapping(value = "/outlogin",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> userOutLoginHandle(HttpSession session) {
        if (session.getAttribute("user") != null)
            session.removeAttribute("user");
        return new Res<>("success","退出登录");
    }

    // 查询所有用户
    @RequestMapping(value = "/all",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<JSONObject>> userAllHandle(@RequestBody Filtrate filtrate){
        return userService.all(filtrate);
    }
}
