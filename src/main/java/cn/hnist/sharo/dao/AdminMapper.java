package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.mexpand.*;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("adminMapper")
@Mapper
public interface AdminMapper {

    // 管理员登录
    List<Admin> login(Admin admin);
}
