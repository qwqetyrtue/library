package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository("userMapper")
@Mapper
public interface UserMapper {
    // 用户登录
    List< User> login(User user);
    // 修改密码
    int updatepwd(Update_pwd update_pwd);
    // 更新用户信息
    int update(User user);
    // 查询用信息
    List<User> check(User user);
    // 注册
    int register(User user);

    // 查询用户列表
    List<?> usersfilter(User_filtrate user_filtrate);
    // 更新用户信息
    int usersupdate(User user);
    // 注销用户
    int usersdelete(User user);
    // 添加用户
    int usersadd(User user);
    // 导入用户
    int usersimport(List<User> users);
}