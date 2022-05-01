package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Paper;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("paperMapper")
public interface PaperMapper {

    List<Paper>  detail(Paper paper);

    List<Paper> select();

    List<Paper> papersfilter(Paper_filtrate paper_filtrate);

    int papersupdate(Paper paper);
}
