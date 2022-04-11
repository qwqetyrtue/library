package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Admin;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import cn.hnist.sharo.service.AdminService;
import cn.hnist.sharo.service.UserService;
import cn.hnist.sharo.unit.ListRes;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;


    @Autowired
    public AdminController(AdminService adminService, UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminLoginHandle(@RequestBody Admin admin, HttpSession session){
        Admin login = adminService.login(admin);
        if(login != null){
            session.setAttribute("admin",login);
            return new Res<>("success","登陆成功");
        }
        return new Res<>("fail","登陆失败");
    }


    // 筛选查询用户
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public @ResponseBody
    ListRes<User> adminUserListHandle(@RequestBody User_filtrate user_filtrate) {
        List<?> res = userService.filter(user_filtrate);
        if(res != null){
            List<User> users = (List<User>)res.get(0);
            int total = ((List<Integer>)res.get(1)).get(0);
            return new ListRes<>(users,total,"success");
        }
        else return new ListRes<>(null,-1,"fail");
    }

}
