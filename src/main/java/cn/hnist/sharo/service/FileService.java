package cn.hnist.sharo.service;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Repository("fileService")
public interface FileService {
    String avatarUpdate(String name, MultipartFile file,String dir, String uid);
}
