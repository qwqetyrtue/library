package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Author;
import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.mexpand.Book_filtrate;
import cn.hnist.sharo.model.mexpand.Filtrate;
import cn.hnist.sharo.model.mexpand.Update_bkid;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("bookMapper")
@Mapper
public interface BookMapper {
    // 筛选
    List<JSONObject> filtrate(Book_filtrate book_filtrate);
    // 查询所有书籍
    List<JSONObject> all(Filtrate filtrate);
    // 查询书籍详情
    List<JSONObject> details(Book book);
    // 书籍借出
    int lend(Book book);

    // 查询书籍
    List<?> booksfilter(Book_filtrate book_filtrate);
    // 更新书籍
    int booksupdate(Book book);
    // 移除书籍
    int booksdelete(Book book);
    // 根据作者名称查询作者
    List<Author> authorsbyname(Author author);
}
