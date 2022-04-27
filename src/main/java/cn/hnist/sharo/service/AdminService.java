package cn.hnist.sharo.service;

import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.mexpand.Book_filtrate;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import cn.hnist.sharo.model.mexpand.User_filtrate;
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


    // 查询书籍
    List<?> booksFilter(Book_filtrate book_filtrate);
    // 移出书籍
    String booksDelete(Book book);
    // 更新书籍信息
    boolean booksUpdate(Book book);
    // 根据名字模糊查询作者
    List<Author> authorsByName(Author author);


    // 查询借阅单
    List<?> borrowsFilter(Borrow_filtrate borrow_filtrate);
    // 根据名字查询用户
    List<User> usersByName(User user);
    // 根据名字查询书籍
    List<Book> booksByName(Book book);
    // 删除借阅单
    boolean borrowDelete(Borrowrecord borrowrecord);
    // 修改借阅单
    boolean borrowUpdate(Borrowrecord borrowrecord);
    // 归还书籍
    boolean borrowsFinish(Borrowrecord borrowrecord);
}
