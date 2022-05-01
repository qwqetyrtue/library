package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Paper;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("paperService")
public interface PaperService {

    Paper detail(Paper paper);

    List<Paper> select();

}
