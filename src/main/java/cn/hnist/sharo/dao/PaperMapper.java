package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Paper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("paperMapper")
public interface PaperMapper {

    List<Paper>  detail(Paper paper);

    List<Paper> select();
}
