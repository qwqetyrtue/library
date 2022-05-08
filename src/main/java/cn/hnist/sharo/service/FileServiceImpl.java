package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.UserMapper;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.unit.ColorLog;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.time.Instant;

@Service("FileService")
@Transactional
public class FileServiceImpl implements FileService{
    @Resource
    UserMapper userMapper;

    public boolean imageUpload(String dir,String fileName,MultipartFile file){
        // 创建文件实例
        File img = new File(dir, fileName);

        if (!img.getParentFile().exists()) {
            if(img.getParentFile().mkdirs())
                System.out.println(ColorLog.ANSI_RED + "创建目录" + img + ColorLog.ANSI_RESET);
            else throw new RuntimeException("目录创建失败");
        }

        // 写入文件
        try{
            file.transferTo(img);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("文件写入失败");
        }
        return true;
    }



    @Override
    public String avatarUpdate(String name, MultipartFile file,String dir, String uid){
        // 文件重命名
        String fileName = imageReName(name);

        imageUpload(dir,fileName,file);

        // 查阅user
        User ob = new User();
        ob.setUid(uid);
        User user = (User) userMapper.check(ob).toArray()[0];
        String avatar = user.getAvatar();
        user.setAvatar("image/"+fileName);
        // 更新头像路径
        userMapper.update(user);

        // 移除旧文件
        if(avatar != null && avatar != "")
            removeOld(dir,avatar);
        return fileName;
    }

    public String imageReName(String originName){
        // 重命名
        Instant instant = Instant.now();
        // 获取秒级时间戳
        long currentMilli = instant.getEpochSecond();
        return currentMilli + "_" + originName;
    }

    public boolean removeOld(String path,String avatar){
        File old = new File(path,avatar.split("/")[1]);
        if(old.exists())
            return old.delete();
        return false;
    }

}
