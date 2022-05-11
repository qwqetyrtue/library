package cn.hnist.sharo.dao;

import cn.hnist.sharo.model.Paper;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("paperMapper")
public interface PaperMapper {

    List<JSONObject>  detail(Paper paper);

    List<Paper> selectbyclassify(Paper paper);



    List<Paper> papersfilter(Paper_filtrate paper_filtrate);

    int papersupdate(Paper paper);
}
