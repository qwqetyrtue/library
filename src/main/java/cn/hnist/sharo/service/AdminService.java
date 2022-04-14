package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Admin;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("adminService")
public interface AdminService {
    // 管理员登录
    Admin login(Admin admin);
    // 查询所有用户
    List<?> usersFilter(User_filtrate user_filtrate);
    // 注销用户
    String usersDelete(User user);
    // 更新用户信息
    boolean usersUpdate(User user);
}
