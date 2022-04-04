package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_pwd;
import cn.hnist.sharo.model.User;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userMapper")
@Mapper
public interface UserMapper {
    List< User> login(User user);
    int updatepwd(Update_pwd update_pwd);
    int update(User user);
    List<User> check(User user);
    int register(User user);
    List<JSONObject> all(Filtrate filtrate);
}