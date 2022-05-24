package cn.hnist.sharo.controller;

import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.ExportGuide;
import cn.hnist.sharo.service.FileService;
import cn.hnist.sharo.service.UserService;
import cn.hnist.sharo.unit.ExcelUtils;
import cn.hnist.sharo.unit.Res;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLEncoder;


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


    @RequestMapping(value = "/export/test",method = RequestMethod.POST)
    public String testExportHandle(HttpServletRequest req,HttpServletResponse res) throws IOException {
        File file = new File("c:/users/86180/desktop/user.xls");
        HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(file));
        res.reset();
        res.setContentType("application/vnd.ms-excel;charset=UTF-8");
        ServletOutputStream os = res.getOutputStream();
        workbook.write(os);
        os.close();
        workbook.close();
        return null;
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

    @RequestMapping(value = "/xls/export",method = RequestMethod.POST)
    public @ResponseBody
    String excelExportHandle(HttpServletRequest req,HttpServletResponse res){
        try {
            ExportGuide guide = (ExportGuide) req.getAttribute("guide");
            JSONArray data = (JSONArray)req.getAttribute("data");
            ServletOutputStream out = res.getOutputStream();
            try {
                res.setHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(guide.getFileName()+guide.getType().getSuffix(), "UTF-8"));
                res.setContentType("application/vnd.ms-excel;charset=utf-8");
                res.setIntHeader("size",data.size());
            } catch (UnsupportedEncodingException e1) {
                e1.printStackTrace();
            }
            Workbook workbook = ExcelUtils.listToXls(guide.getFileName(),data,ExcelUtils.getDictionary(guide.getDictionary()),guide.isHasHeader());
            workbook.write(out);
            out.flush();
            out.close();
            return null;
        }catch (Exception e){
            e.printStackTrace();
            return "fail";
        }
    }
}
