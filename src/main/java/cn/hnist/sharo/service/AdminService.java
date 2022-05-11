package cn.hnist.sharo.service;

import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.mexpand.Book_filtrate;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpSession;
import java.util.List;

@Repository("adminService")
public interface AdminService {
    // 管理员登录
    Admin login(Admin admin);


    // 查询用户
    List<?> usersFilter(User_filtrate user_filtrate);
    // 注销用户
    String usersDelete(User user);
    // 更新用户信息
    boolean usersUpdate(User user);
    // 添加用户信息
    User usersAdd(User user);


    // 查询书籍
    List<?> booksFilter(Book_filtrate book_filtrate);
    // 移出书籍
    String booksDelete(Book book);
    // 更新书籍信息
    boolean booksUpdate(Book book);
    // 添加书籍信息
    boolean booksInclude(Book book);
    // 根据名字模糊查询作者
    List<Author> authorsByName(Author author);


    // 查询借阅单
    List<?> borrowsFilter(Borrow_filtrate borrow_filtrate);
    // 根据名字查询用户
    List<User> usersByName(User user);
    // 根据名字查询书籍
    List<Book> booksByName(Book book);
    // 修改借阅单
    boolean borrowUpdate(Borrowrecord borrowrecord);
    // 归还书籍
    boolean borrowFinish(Borrowrecord borrowrecord);
    // 添加借阅单
    JSONObject borrowCreate(Borrowrecord borrowrecord);


    // 查询文章
    List<?> papersFilter(Paper_filtrate paper_filtrate);

    JSONObject paperDetail(Paper paper);

    boolean paperUpdate(Paper paper);

    boolean paperCreate(Paper paper);
}
