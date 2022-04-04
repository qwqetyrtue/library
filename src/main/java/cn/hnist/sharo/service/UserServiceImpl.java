package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.UserMapper;
import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
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
    public User login(User user, HttpSession session) {
        List<User> login = userMapper.login(user);
        if (login != null && login.size() > 0) {
            return (User)login.toArray()[0];
        }
        return null;
    }

    @Override
    public User checkMsg(User user, HttpSession session) {
        List<User> login = userMapper.check(user);
        if (login != null && login.size() > 0) {
            return (User) login.toArray()[0];
        }
        return null;
    }

    @Override
    public boolean updatepwd(Update_pwd update_pwd, HttpSession session) {
        int affect = userMapper.updatepwd(update_pwd);
        if (affect == 1) {
            return true;
        }
        return false;
    }

    @Override
    public User update(User user, HttpSession session) {
        int affect = userMapper.update(user);
        if (affect == 1) {
            return (User) userMapper.check(user).toArray()[0];
        }
        return null;
    }

    @Override
    public User register(User user, HttpSession session) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        user.setCreatedate(sf.format(new Date()));
        int affect;
        affect  = userMapper.register(user);
        if (affect == 1) {
            return (User) userMapper.check(user).toArray()[0];
        }
        return null;
    }

    @Override
    public Res<List<JSONObject>> all(Filtrate filtrate) {
        return new Res<List<JSONObject>>("success",userMapper.all(filtrate));
    }


}
