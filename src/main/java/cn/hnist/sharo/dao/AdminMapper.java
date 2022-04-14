package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Admin;
import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.Book_filtrate;
import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_bkid;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("adminMapper")
@Mapper
public interface AdminMapper {
    List<Admin> login(Admin admin);
    List<?> usersfilter(User_filtrate user_filtrate);
    int usersupdate(User user);
    int usersdelete(User user);
}
