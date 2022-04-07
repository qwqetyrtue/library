package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.User;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("borrowMapper")
@Mapper
public interface BorrowMapper {

    int create(Borrowrecord borrowrecord);

    List<JSONObject> all(User user);

    int update(Borrowrecord borrowrecord);
}
