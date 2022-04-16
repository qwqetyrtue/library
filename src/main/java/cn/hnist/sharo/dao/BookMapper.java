package cn.hnist.sharo.dao;

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
    // 更新基础信息
    int update(Book book);
    // 更新bkid
    int updatebkid(Update_bkid update_bkid);
    // 删除书籍信息
    int delete(Book book);
    // 添加书籍
    int store(Book book);
}
