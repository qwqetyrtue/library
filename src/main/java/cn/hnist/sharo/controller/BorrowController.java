package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.Borrow_create;
import cn.hnist.sharo.service.BorrowService;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/borrow")
public class BorrowController {
    final private BorrowService borrowService;

    @Autowired
    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }


    @RequestMapping("/create")
    public @ResponseBody
    Res<String> borrowCreateHandle(@RequestBody Borrow_create borrow_create){
        boolean res = borrowService.create(borrow_create);
        if(res){
            return new Res<>("success","借阅成功");
        }
        return new Res<>("fail","借阅失败");
    }

    @RequestMapping("/all")
    public @ResponseBody
    Res<List<JSONObject>> borrowAllHandle(@RequestBody User user){
        return new Res<>("success",borrowService.all(user));
    }
}
