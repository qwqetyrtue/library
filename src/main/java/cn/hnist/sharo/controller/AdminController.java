package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.mexpand.*;
import cn.hnist.sharo.service.AdminService;
import cn.hnist.sharo.service.UserService;
import cn.hnist.sharo.unit.ListRes;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;


    @Autowired
    public AdminController(AdminService adminService, UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminLoginHandle(@RequestBody Admin admin, HttpSession session){
        Admin login = adminService.login(admin);
        if(login != null){
            session.setAttribute("admin",login);
            return new Res<>("success","登陆成功");
        }
        return new Res<>("fail","登陆失败");
    }

    @RequestMapping(value = "/admin",method = RequestMethod.POST)
    public @ResponseBody
    Res<Admin> adminCheckHandle(HttpSession session){
        Admin login = (Admin) session.getAttribute("admin");
        return new Res<>("success",login);
    }

    @RequestMapping(value = "/outlogin",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminOutLoginHandle(HttpSession session){
        session.removeAttribute("admin");
        return new Res<>("success","退出登录");
    }

    /** --------------用户管理-------------- **/
    // 筛选查询用户
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public @ResponseBody
    ListRes<User> adminUsersListHandle(@RequestBody User_filtrate user_filtrate) {
        List<?> res = adminService.usersFilter(user_filtrate);
        if(res != null){
            List<User> users = (List<User>)res.get(0);
            int total = ((List<Integer>)res.get(1)).get(0);
            return new ListRes<>("success","查询成功",users,total);
        }
        else return new ListRes<>("fail","查询失败",null,-1);
    }

    // 更新用户信息
    @RequestMapping(value = "/users/update", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminUsersUpdateHandle(@RequestBody User user){
        if(adminService.usersUpdate(user)){
            return new Res<>("success","修改成功");
        }else{
            return new Res<>("fail","修改失败");
        }
    }

    // 更新用户信息
    @RequestMapping(value = "/users/delete", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminUsersDeleteHandle(@RequestBody User user){
        String res = adminService.usersDelete(user);
        if(res != null){
            return new Res<>("success","res");
        }else{
            return new Res<>("fail",null);
        }
    }

    /** --------------书籍管理-------------- **/
    // 筛选查询书籍
    @RequestMapping(value = "/books", method = RequestMethod.POST)
    public @ResponseBody
    ListRes<Book> adminBooksListHandle(@RequestBody Book_filtrate book_filtrate) {
        List<?> res = adminService.booksFilter(book_filtrate);
        if(res != null){
            List<Book> books = (List<Book>)res.get(0);
            int total = ((List<Integer>)res.get(1)).get(0);
            return new ListRes<>("success","查询成功",books,total);
        }
        else return new ListRes<>("fail","查询失败",null,-1);
    }

    // 更新书籍信息
    @RequestMapping(value = "/books/update", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminBooksUpdateHandle(@RequestBody Book book){
        if(adminService.booksUpdate(book)){
            return new Res<>("success","修改成功");
        }else{
            return new Res<>("fail","修改失败");
        }
    }

    // 更新书籍信息
    @RequestMapping(value = "/books/delete", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminBooksDeleteHandle(@RequestBody Book book){
        String res = adminService.booksDelete(book);
        if(res != null){
            return new Res<>("success","res");
        }else{
            return new Res<>("fail",null);
        }
    }

    @RequestMapping(value = "/books/authors",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<Author>> adminBooksAuthorHandle(@RequestBody Author author){
        List<Author> res = adminService.authorsByName(author);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }

    /** --------------借阅单管理-------------- **/
    // 筛选查询借阅
    @RequestMapping(value = "/borrows", method = RequestMethod.POST)
    public @ResponseBody
    ListRes<JSONObject> adminBorrowsListHandle(@RequestBody Borrow_filtrate borrow_filtrate) {
        List<?> res = adminService.borrowsFilter(borrow_filtrate);
        if(res != null){
            List<JSONObject> borrows = (List<JSONObject>)res.get(0);
            int total = ((List<Integer>)res.get(1)).get(0);
            return new ListRes<>("success","查询成功",borrows,total);
        }
        else return new ListRes<>("fail","查询失败",null,-1);
    }

    // 筛选查询借阅
    @RequestMapping(value = "/borrows/update", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminBorrowsUpdateHandle(@RequestBody Borrowrecord borrowrecord) {
        if(adminService.borrowUpdate(borrowrecord)){
            return new Res<>("success","修改成功");
        }else{
            return new Res<>("fail","修改失败");
        }
    }

    // 借阅书籍归还
    @RequestMapping(value = "/borrows/finish",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminBorrowsFinish(@RequestBody Borrowrecord borrowrecord,HttpSession session){
        try {
            Admin admin = (Admin) session.getAttribute("admin");
            borrowrecord.setMid(admin.getMid());
            if(adminService.borrowsFinish(borrowrecord))
                return new Res<>("success","归还成功");
        }catch (Exception e){
            return new Res<>("fail",e.getMessage());
        }
        return new Res<>("fail","归还失败");
    }

    // 根据名称查询用户
    @RequestMapping(value = "/borrows/users",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<User>> adminBorrowUserHandle(@RequestBody User user){
        List<User> res = adminService.usersByName(user);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }

    // 根据书名查询书籍
    @RequestMapping(value = "/borrows/books",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<Book>> adminBorrowBookHandle(@RequestBody Book book){
        List<Book> res = adminService.booksByName(book);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }


    /** --------------文章管理-------------- **/
    // 筛选查询借阅
    @RequestMapping(value = "/papers", method = RequestMethod.POST)
    public @ResponseBody
    ListRes<JSONObject> adminPaperListHandle(@RequestBody Paper_filtrate paper_filtrate) {
        List<?> res = adminService.papersFilter(paper_filtrate);
        if(res != null){
            List<JSONObject> papers = (List<JSONObject>)res.get(0);
            int total = ((List<Integer>)res.get(1)).get(0);
            return new ListRes<>("success","查询成功",papers,total);
        }
        else return new ListRes<>("fail","查询失败",null,-1);
    }

    @RequestMapping(value = "/papers/paper",method = RequestMethod.POST)
    public @ResponseBody
    Res<Paper> adminPaperHandle(@RequestBody Paper paper){
        Paper res = adminService.paperDetail(paper);
        if(res != null){
            return new Res<>("success",res);
        }else return new Res<>("fail",null);
    }

    @RequestMapping(value = "/papers/update",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminPaperUpdateHandle(@RequestBody Paper paper){
        if(adminService.paperUpdate(paper)){
            return new Res<>("success","修改成功");
        }else return new Res<>("fail","修改失败");
    }

}

