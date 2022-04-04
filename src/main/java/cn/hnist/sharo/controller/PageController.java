package cn.hnist.sharo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class PageController {

    @RequestMapping(value = "/")
    public String indexHandle(Model model, HttpSession session) {
        return "index";
    }

    @RequestMapping(value = "/index")
    public String indexHandle2(Model model, HttpSession session) {
        return "index";
    }

    @RequestMapping(value = "/login")
    public String loginHandle(Model model, HttpSession session) {
        // 登录了
        if(session.getAttribute("user")!=null)
            return "redirect:/user";
        return "login";
    }

    @RequestMapping(value = "/user")
    public String userHandle(Model model, HttpSession session){
        // 未登录
        if(session.getAttribute("user") == null)
            return "redirect:/login";
        return "user";
    }
}
