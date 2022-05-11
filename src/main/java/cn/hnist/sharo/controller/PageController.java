package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Paper;
import cn.hnist.sharo.service.PaperService;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
public class PageController {
    final private PaperService paperService;

    @Autowired
    public PageController(PaperService paperService) {
        this.paperService = paperService;
    }

    @RequestMapping(value = {"","/","index.html"},method = RequestMethod.GET)
    public String indexReHandle(HttpSession session) {
        return "redirect:/index";
    }

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String indexHandle(){
        return "index";
    }

    @RequestMapping(value = "/profile",method = RequestMethod.GET)
    public String profileHandle() {
        return "profile";
    }

    @RequestMapping(value = "/notice",method = RequestMethod.GET)
    public String noticeHandle() {
        return "notice";
    }

    @RequestMapping(value = "/resource",method = RequestMethod.GET)
    public String resourceHandle() {
        return "resource";
    }

    @RequestMapping(value = "/paper/{pid}",method = RequestMethod.GET)
    public String paperHandle(@PathVariable String pid, Model model){
        return "paper";
    }


    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String loginHandle(HttpSession session) {
        // 登录了
        if(session.getAttribute("user")!=null)
            return "redirect:/user";
        return "login";
    }

    @RequestMapping(value = "/user",method = RequestMethod.GET)
    public String userHandle(HttpSession session){
        // 未登录
        if(session.getAttribute("user") == null)
            return "redirect:/login";
        return "user";
    }

    @RequestMapping(value = "/librarian",method = RequestMethod.GET)
    public String adminLoginHandle(HttpSession session) {
        // 登录了
        if(session.getAttribute("admin")!=null)
            return "redirect:/admin";
        return "librarian";
    }

    @RequestMapping(value = "/admin",method = RequestMethod.GET)
    public String adminHandle(HttpSession session){
        // 未登录
        if(session.getAttribute("admin") == null)
            return "redirect:/librarian";
        return "admin";
    }


    @RequestMapping(value = "/404notfound",method = RequestMethod.GET)
    public String notFoundGetHandle(){
        return "404page";
    }

    @RequestMapping(value = "/404notfound",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> notFoundPostHandle(){
        return new Res<>("fail","错误的请求地址 code:404");
    }
}
