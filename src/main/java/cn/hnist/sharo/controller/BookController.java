package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.service.BookService;
import cn.hnist.sharo.unit.BackEndHttpRequest;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/book")
public class BookController {
    final private BookService bookService;
    final private String ISBN_API = "12320.9d66f9672be6110d62ec660f88f487b4.9e459e85fb4dfd7c7952b9d8dc132de2";

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

//    @CrossOrigin(origins = "*", maxAge = 3600)
    @RequestMapping(value = "/isbn",method = RequestMethod.GET)
    public @ResponseBody
    String isbnCheckHandle(@RequestParam String isbn){
        String res = BackEndHttpRequest.sendGet("https://api.jike.xyz/situ/book/isbn/"+isbn, "apikey="+ISBN_API,"application/json;charset=UTF-8");
        if(res == null) res = "{}";
        return res;
    }

    // 查询所有书籍
    @RequestMapping(value = "/all",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<JSONObject>> bookAllHandle(@RequestBody Filtrate filtrate){
        return new Res<List<JSONObject>>("success",bookService.all(filtrate));
    }

    @RequestMapping(value = "/store", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> bookStoreHandle(@RequestBody Book book){
        int affect = bookService.store(book);
        if(affect == 1){
            return new Res<>("success","添加成功");
        }
        return new Res<>("fail","添加失败");
    }

    @RequestMapping(value = "/details",method = RequestMethod.POST)
    public @ResponseBody
    Res<JSONObject> bookDetailsHandle(@RequestBody Book book){
        JSONObject details = bookService.details(book);
        if(details != null)
            return new Res<>("success",details);
        return new Res<>("fail",null);
    }
}