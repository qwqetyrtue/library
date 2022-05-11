package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.Paper;
import cn.hnist.sharo.service.PaperService;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/paper")
public class PaperController {
    final private PaperService paperService;

    @Autowired
    public PaperController(PaperService paperService) {
        this.paperService = paperService;
    }

    @RequestMapping(value = "/type",method = RequestMethod.POST)
    public @ResponseBody
    Res<List<Paper>> paperTypeHandle(@RequestBody Paper paper){
        List<Paper> res = paperService.selectByClassify(paper);
        if(res != null)
            return new Res<>("success",res);
        return new Res<>("fail",null);
    }

    @RequestMapping(value = "/detail",method = RequestMethod.POST)
    public @ResponseBody
    Res<JSONObject> paperDetailHandle(@RequestBody Paper paper){
        JSONObject res = paperService.detail(paper);
        if(res != null)
            return new Res<>("success",res);
        return new Res<>("fail",null);
    }
}
