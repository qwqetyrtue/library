package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.UserMapper;
import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("UserService")
@Transactional
public class UserServiceImpl implements UserService {
    @Resource
    public UserMapper userMapper;

    @Override
    public User login(User user) {
        List<User> login = userMapper.login(user);
        if (login != null && login.size() > 0) {
            return (User)login.toArray()[0];
        }
        return null;
    }

    @Override
    public User checkMsg(User user) {
        List<User> login = userMapper.check(user);
        if (login != null && login.size() > 0) {
            return (User) login.toArray()[0];
        }
        return null;
    }

    @Override
    public boolean updatepwd(Update_pwd update_pwd) {
        int affect = userMapper.updatepwd(update_pwd);
        if (affect == 1) {
            return true;
        }
        return false;
    }

    @Override
    public User update(User user) {
        int affect = userMapper.update(user);
        if (affect == 1) {
            return (User) userMapper.check(user).toArray()[0];
        }
        return null;
    }

    @Override
    public User register(User user) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        user.setCreatedate(java.sql.Date.valueOf(sf.format(new Date())));
        int affect;
        affect  = userMapper.register(user);
        if (affect == 1) {
            return (User) userMapper.check(user).toArray()[0];
        }
        return null;
    }

    @Override
    public List<?> filter(User_filtrate user_filtrate) {
        try {
            return userMapper.filter(user_filtrate);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


}
