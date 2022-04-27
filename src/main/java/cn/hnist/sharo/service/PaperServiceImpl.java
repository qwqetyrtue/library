package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.PaperMapper;
import cn.hnist.sharo.model.Paper;
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
    public Paper detail(Paper paper) {
        List<Paper> res = paperMapper.detail(paper);
        if(res != null && res.size() == 1){
            return (Paper) res.toArray()[0];
        }
        return null;
    }

    @Override
    public List<Paper> select() {
        try{
            return paperMapper.select();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
