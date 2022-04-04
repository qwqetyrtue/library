package cn.hnist.sharo.service;

import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.Borrow_create;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("borrowService")
public interface BorrowService {
    boolean create(Borrow_create borrow_create);
    List<JSONObject> all(User user);
}
