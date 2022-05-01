package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.User;
import cn.hnist.sharo.service.UserService;
import cn.hnist.sharo.unit.ColorLog;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.time.Instant;


@Controller
@RequestMapping(value = "/file")
public class FileController {
    final private UserService userService;

    @Autowired
    public FileController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(value = "/image/upload",method = RequestMethod.POST)
    public @ResponseBody
    Res<JSONObject> imageUploadHandle(@RequestParam("name") String name, @RequestParam("img") MultipartFile file,
                                      HttpServletRequest req, HttpSession session){

        // 判断文件是否为空，空则返回失败页面
        if (file.isEmpty()) {
            return new Res<>("fail",null);
        }
        // 获取文件存储路径（绝对路径）
        String path = req.getServletContext().getRealPath("/WEB-INF/file/image");
        // 获取原文件名
        String fileName = name;
        // 文件重命名
        fileName = imageReName(fileName);

        // 创建文件实例
        File img = new File(path, fileName);

        if (!img.getParentFile().exists()) {
            if(img.getParentFile().mkdirs())
                System.out.println(ColorLog.ANSI_RED + "创建目录" + img + ColorLog.ANSI_RESET);
            else return new Res<>("fail",null);
        }

        // 写入文件
        try{
            file.transferTo(img);
        }catch (Exception e){
            e.printStackTrace();
            return new Res<>("fail",null);
        }

        User user = (User)session.getAttribute("user");
        String avatar = user.getAvatar();
        removeOld(path,avatar);

        user.setAvatar("image/"+fileName);
        userService.update(user);
        session.setAttribute("user",user);


        JSONObject res = new JSONObject();
        res.put("name",fileName);
        res.put("url","image/"+fileName);

        return new Res<>("success",res);
    }

    public String imageReName(String originName){
        // 重命名
        Instant instant = Instant.now();
        // 获取秒级时间戳
        long currentMilli = instant.toEpochMilli();
        return String.valueOf(currentMilli) + "_" + originName;
    }

    public boolean removeOld(String path,String avatar){
        File old = new File(path,avatar.split("/")[1]);
        if(old.exists())
            return old.delete();
        return false;
    }
}
