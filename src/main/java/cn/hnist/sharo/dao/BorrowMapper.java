package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.Borrowrecord;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.Borrow_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("borrowMapper")
@Mapper
public interface BorrowMapper {

    // 创建借阅单
    int create(Borrowrecord borrowrecord);
    // 查询借阅单
    List<?> filtrate(Borrow_filtrate borrow_filtrate);


    // 查询借阅单
    List<?> borrowsfilter(Borrow_filtrate borrow_filtrate);
    //  通过用户名查询用户
    List<User> usersbyname(User user);
    // 通过书名查询书籍
    List<Book> booksbyname(Book book);
    // 删除借阅单
    int borrowdelete(Borrowrecord borrowrecord);
    // 更新借阅单
    int borrowupdate(Borrowrecord borrowrecord);

}
