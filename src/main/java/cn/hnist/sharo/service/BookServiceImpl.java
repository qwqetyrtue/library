package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.BookMapper;
import cn.hnist.sharo.model.Book;
import cn.hnist.sharo.model.mexpand.Filtrate;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("BookService")
@Transactional
public class BookServiceImpl implements BookService{
    @Resource
    public BookMapper bookMapper;

    @Override
    public List<JSONObject> all(Filtrate filtrate) {
        return bookMapper.all(filtrate);
    }

    @Override
    public int store(Book book) {
        return bookMapper.store(book);
    }

    @Override
    public int delete(Book book) {
        return bookMapper.delete(book);
    }

    @Override
    public JSONObject details(Book book) {
        List<JSONObject> res = bookMapper.details(book);
        if(res!=null && res.size() > 0){
            return (JSONObject)res.toArray()[0];
        }
        return null;
    }


}
