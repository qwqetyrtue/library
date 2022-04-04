package cn.hnist.sharo.service;

import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface UserService {
    // 用户登录
    User login(User user, HttpSession session);
    // 查询用户信息
    User checkMsg(User user,HttpSession session);
    // 修改密码
    boolean updatepwd(Update_pwd update_pwd,HttpSession session);
    // 修改用户信息
    User update(User user,HttpSession session);
    // 注册
    User register(User user,HttpSession session);
    // 查询所有用户
    Res<List<JSONObject>> all(Filtrate filtrate);
}
