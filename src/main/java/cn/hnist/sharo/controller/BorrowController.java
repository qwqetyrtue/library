package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.Borrow_create;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import cn.hnist.sharo.service.BorrowService;
import cn.hnist.sharo.unit.ListRes;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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


    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> borrowCreateHandle(@RequestBody Borrow_create borrow_create){
        try{
            if(borrowService.create(borrow_create)){
                return new Res<>("success","借阅成功");
            }
        }catch (Exception e){
            return new Res<>("fail",e.getMessage());
        }
        return new Res<>("fail","借阅失败");
    }

    @RequestMapping(value = "/filtrate",method = RequestMethod.POST)
    public @ResponseBody
    ListRes<Borrowrecord> borrowFiltrateHandle(@RequestBody Borrow_filtrate borrow_filtrate){
        List<?> res = borrowService.filtrate(borrow_filtrate);
        if(res != null) {
            List<Borrowrecord> borrows = (List<Borrowrecord>) res.get(0);
            int total = ((List<Integer>) res.get(1)).get(0);
            return new ListRes<>("success","查询成功",borrows,total);
        }
        return new ListRes<>("fail","查询失败",null,-1);
    }
}
