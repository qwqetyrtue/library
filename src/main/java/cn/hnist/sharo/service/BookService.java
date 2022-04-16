package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.mexpand.Book_filtrate;
import cn.hnist.sharo.model.mexpand.Filtrate;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("bookService")
public interface BookService {

    List<?> filtrate(Book_filtrate book_filtrate);

    int store(Book book);

    int delete(Book book);

    JSONObject details(Book book);
}
