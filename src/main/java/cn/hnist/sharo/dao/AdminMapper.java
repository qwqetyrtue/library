package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.*;
import cn.hnist.sharo.model.mexpand.*;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("adminMapper")
@Mapper
public interface AdminMapper {
    List<Admin> login(Admin admin);
    List<?> usersfilter(User_filtrate user_filtrate);
    int usersupdate(User user);
    int usersdelete(User user);

    List<?> booksfilter(Book_filtrate book_filtrate);
    int booksupdate(Book book);
    int booksdelete(Book book);
    List<Author> authorsbyname(Author author);

    List<?> borrowsfilter(Borrow_filtrate borrow_filtrate);
    List<User> usersbyname(User user);
    List<Book> booksbyname(Book book);
    int borrowdelete(Borrowrecord borrowrecord);
    int borrowupdate(Borrowrecord borrowrecord);
}
