package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("borrowMapper")
@Mapper
public interface BorrowMapper {

    int create(Borrowrecord borrowrecord);

    List<?> filtrate(Borrow_filtrate borrow_filtrate);

    int update(Borrowrecord borrowrecord);
}
