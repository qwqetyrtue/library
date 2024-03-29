package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.mexpand.*;
import cn.hnist.sharo.service.AdminService;
import cn.hnist.sharo.service.UserService;
import cn.hnist.sharo.unit.ExcelUtils;
import cn.hnist.sharo.unit.ListRes;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

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

    /**
     * 管理员登录接口
     * @description <p>
     * 成功: 返回成功,设置session
     * 失败: 返回失败
     * MethodArgumentNotValidException: 账号或密码为空 全局处理
     * 已经登录: aop处理
     * </p>
     * @url /admin/login
     * @param admin {mid,password}
     * @param session session
     * @return Res<String>
     * @author sharo
     * @date 2022/5/8
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminLoginHandle(@Validated(Admin.LoginVi.class) @RequestBody Admin admin, HttpSession session){
        Admin login = adminService.login(admin);
        if(login != null){
            session.setAttribute("admin",login);
            return new Res<>("success","登陆成功");
        }
        return new Res<>("fail","登陆失败");
    }

    /**
     * 查询当前管理员个人信息
     * @description <p>
     * 成功: 返回管理员信息
     * 未登录: aop处理
     * </p>
     * @url /admin/admin
     * @param session session
     * @return Res<Admin>
     * @author sharo
     * @date 2022/5/8
     */
    @RequestMapping(value = "/admin",method = RequestMethod.POST)
    public @ResponseBody
    Res<Admin> adminCheckHandle(HttpSession session){
        Admin login = (Admin) session.getAttribute("admin");
        return new Res<>("success",login);
    }

    /**
     * 管理员退出登录
     * @description <p>
     *  成功: 销毁session中的admin,返回成功
     *  未登录: aop处理
     * </p>
     * @url /admin/outlogin
     * @param session session
     * @return Res<String>
     * @author sharo
     * @date 2022/5/8
     */
    @RequestMapping(value = "/outlogin",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminOutLoginHandle(HttpSession session){
        session.removeAttribute("admin");
        return new Res<>("success","退出登录");
    }

    /**
     * --------------用户管理--------------
     */

    /**
     * 筛选查询用户
     * @description <p>
     * 成功: 返回分页的用户列表
     * 失败: null
     * </p>
     * @url /admin/users
     * @param user_filtrate
     * @return ListRes<User>
     * @author sharo
     * @date 2022/5/8
     */
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public @ResponseBody
    ListRes<JSONObject> adminUsersListHandle(@RequestBody User_filtrate user_filtrate) {
        List<?> res = adminService.usersFilter(user_filtrate);
        if(res != null){
            List<JSONObject> users = (List<JSONObject>)res.get(0);
            int total = ((List<Integer>)res.get(1)).get(0);
            return new ListRes<>("success","查询成功",users,total);
        }
        else return new ListRes<>("fail","查询失败",null,-1);
    }


    @RequestMapping(value = "/users/xls", method = RequestMethod.POST)
    public String adminUsersExportHandle(@RequestBody ExportGuide<User_filtrate> guide, HttpServletRequest req){
        List<?> res = adminService.usersFilter(guide.getFiltrate());
        if(res != null){
            List<JSONObject> users = (List<JSONObject>)res.get(0);
            JSONArray usersJson = new JSONArray();
            usersJson.addAll(users);
            req.setAttribute("data",usersJson);
            req.setAttribute("guide",guide);
        }
        return "forward:/file/xls/export";
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

    // 添加用户信息
    @RequestMapping(value = "/users/add", method = RequestMethod.POST)
    public @ResponseBody
    Res<User> adminUsersAddHandle(@RequestBody User user){
        User res = adminService.usersAdd(user);
        if(res != null){
            return new Res<>("success",res);
        }else{
            return new Res<>("fail",null);
        }
    }

    // 导入用户
    @RequestMapping(value = "/users/add/xls",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminUserImportHandle(@RequestParam("xls") MultipartFile file,@RequestParam("dictionary") String s,@RequestParam("hasHeader") boolean hasHeader){
        try{
            Workbook workbook = ExcelUtils.uploadFileToWorkbook(file);
            JSONArray dic = JSONArray.parseArray(s);
            LinkedHashMap<String,String> dictionary = ExcelUtils.getDictionary(dic);
            System.out.println(dic.toJSONString());
            JSONArray users = ExcelUtils.sheetToList(workbook.getSheetAt(0), dictionary, hasHeader, 0, 100);
            System.out.println(users.toJSONString());
            boolean res = adminService.userImport(users.toJavaList(User.class));
            if (res){
                return new Res<>("success","导入成功");
            }
        }catch (Exception e){
            e.printStackTrace();
            return new Res<>("fail","导入失败");
        }
        return new Res<>("fail","导入失败");
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

    @RequestMapping(value = "/books/xls",method = RequestMethod.POST)
    public String adminBooksExportHandle(@RequestBody ExportGuide<Book_filtrate> guide, HttpServletRequest req){
        List<?>  res = adminService.booksFilter(guide.getFiltrate());
        if(res != null){
            List<JSONObject> books = (List<JSONObject>) res.get(0);
            JSONArray booksJson = new JSONArray();
            booksJson.addAll(books);

            req.setAttribute("data",booksJson);
            req.setAttribute("guide",guide);
        }
        return "forward:/file/xls/export";
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

    // 添加书籍信息
    @RequestMapping(value = "/books/include", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminBooksIncludeHandle(@RequestBody Book book){
        if(adminService.booksInclude(book)){
            return new Res<>("success","添加成功");
        }else{
            return new Res<>("fail","添加失败");
        }
    }

    // 删除书籍
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


    @RequestMapping(value = "/borrows/xls",method = RequestMethod.POST)
    public String adminBorrowsExportHandle(@RequestBody ExportGuide<Borrow_filtrate> guide, HttpServletRequest req) {
        List<?> res = adminService.borrowsFilter(guide.getFiltrate());
        if(res != null){
            List<JSONObject> borrows = (List<JSONObject>)res.get(0);
            JSONArray borrowsJson = new JSONArray();
            borrowsJson.addAll(borrows);
            req.setAttribute("data",borrowsJson);
            req.setAttribute("guide",guide);
        }
        return "forward:/file/xls/export";
    }
    // 修改借阅记录
    @RequestMapping(value = "/borrows/update", method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminBorrowsUpdateHandle(@RequestBody Borrowrecord borrowrecord) {
        if(adminService.borrowUpdate(borrowrecord)){
            return new Res<>("success","修改成功");
        }else{
            return new Res<>("fail","修改失败");
        }
    }

    // 添加借阅记录
    @RequestMapping(value = "/borrows/create", method = RequestMethod.POST)
    public @ResponseBody
    Res<JSONObject> adminBorrowsCreateHandle(@RequestBody Borrowrecord borrowrecord) {
        try{
            JSONObject add =  adminService.borrowCreate(borrowrecord);
            if(add != null){
                return new Res<>("success",add);
            }else{
                return new Res<>("fail",null);
            }
        }catch (Exception e){
            JSONObject res = new JSONObject();
            res.put("error",e.getMessage());
            return new Res<>("fail",res);
        }
    }

    // 借阅书籍归还
    @RequestMapping(value = "/borrows/finish",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminBorrowsFinish(@RequestBody Borrowrecord borrowrecord,HttpSession session){
        try {
            Admin admin = (Admin) session.getAttribute("admin");
            borrowrecord.setMid(admin.getMid());
            if(adminService.borrowFinish(borrowrecord))
                return new Res<>("success","归还成功");
        }catch (Exception e){
            if(e.getClass().equals(RuntimeException.class))
                return new Res<>("fail",e.getMessage());
            else {
                e.printStackTrace();
                return new Res<>("fail","未知错误");
            }
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
    Res<JSONObject> adminPaperHandle(@RequestBody Paper paper){
        JSONObject res = adminService.paperDetail(paper);
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

    @RequestMapping(value = "/papers/create",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> adminPaperCreateHandle(@Validated(Paper.CreateVi.class) @RequestBody Paper paper){
        if(adminService.paperCreate(paper)){
            return new Res<>("success","添加成功");
        }else return new Res<>("fail","添加失败");
    }

}

