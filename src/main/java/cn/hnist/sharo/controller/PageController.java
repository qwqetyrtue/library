package cn.hnist.sharo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class PageController {

    @RequestMapping(value = "/")
    public String indexHandle(HttpSession session) {
        return "index";
    }

    @RequestMapping(value = "/index")
    public String indexHandle2(HttpSession session) {
        return "index";
    }

    @RequestMapping(value = "/login")
    public String loginHandle(HttpSession session) {
        // 登录了
        if(session.getAttribute("user")!=null)
            return "redirect:/user";
        return "login";
    }

    @RequestMapping(value = "/user")
    public String userHandle(HttpSession session){
        // 未登录
        if(session.getAttribute("user") == null)
            return "redirect:/login";
        return "user";
    }

    @RequestMapping(value = "/librarian")
    public String adminLoginHandle(HttpSession session) {
        // 登录了
        if(session.getAttribute("admin")!=null)
            return "redirect:/admin";
        return "librarian";
    }

    @RequestMapping(value = "/admin")
    public String adminHandle(HttpSession session){
        // 未登录
        if(session.getAttribute("admin") == null)
            return "redirect:/librarian";
        return "admin";
    }
}
