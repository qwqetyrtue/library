package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Paper;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("paperService")
public interface PaperService {

    JSONObject detail(Paper paper);

    List<Paper> selectByClassify(Paper paper);

}
