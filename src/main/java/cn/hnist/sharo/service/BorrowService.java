package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("borrowService")
public interface BorrowService {

    boolean create(Borrowrecord borrowrecord);

    List<?> filtrate(Borrow_filtrate borrow_filtrate);

    JSONObject detail(Borrowrecord borrowrecord);
}
