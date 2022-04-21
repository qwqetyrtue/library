package cn.hnist.sharo.service;

import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpSession;
import java.util.List;

@Repository("userService")
public interface UserService {
    // 用户登录
    User login(User user);
    // 查询用户信息
    User checkMsg(User user);
    // 修改密码
    boolean updatepwd(Update_pwd update_pwd);
    // 修改用户信息
    User update(User user);
    // 注册
    User register(User user);
}
