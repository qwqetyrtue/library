package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.PaperMapper;
import cn.hnist.sharo.model.Paper;
import cn.hnist.sharo.model.mexpand.Paper_filtrate;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("PaperService")
@Transactional
public class PaperServiceImpl implements PaperService{
    @Resource
    private PaperMapper paperMapper;


    @Override
    public JSONObject detail(Paper paper) {
        List<JSONObject> res = paperMapper.detail(paper);
        if(res != null && res.size() == 1){
            return (JSONObject) res.toArray()[0];
        }
        return null;
    }

    @Override
    public List<Paper> selectByClassify(Paper paper) {
        try{
            return paperMapper.selectbyclassify(paper);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

}
