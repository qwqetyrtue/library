package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.User;
import cn.hnist.sharo.service.FileService;
import cn.hnist.sharo.service.UserService;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
@RequestMapping(value = "/file")
public class FileController {
    final private UserService userService;
    final private FileService fileService;

    @Autowired
    public FileController(UserService userService, FileService fileService) {
        this.userService = userService;
        this.fileService = fileService;
    }


    @RequestMapping(value = "/image/upload",method = RequestMethod.POST)
    public @ResponseBody
    Res<JSONObject> imageUploadHandle(@RequestParam("name") String name, @RequestParam("img") MultipartFile file,
                                      HttpServletRequest req, HttpSession session){

        // 判断文件是否为空，空则返回失败页面
        if (file.isEmpty()) {
            return new Res<>("fail",null);
        }
        String uid = ((User) session.getAttribute("user")).getUid();
        // 获取文件存储路径（绝对路径）
        String dir = req.getServletContext().getRealPath("/WEB-INF/file/image");
        try {
            String fileName = fileService.avatarUpdate(name, file,dir,uid);

            // 更新session
            User u = new User();
            u.setUid(uid);
            session.setAttribute("user",userService.checkMsg(u));

            JSONObject res = new JSONObject();
            res.put("name",fileName);
            res.put("url","image/"+fileName);

            return new Res<>("success",res);
        }catch (Exception e){
            e.printStackTrace();
            return new Res<>("fail",null);
        }
    }

}
