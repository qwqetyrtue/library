package cn.hnist.sharo.service;

import cn.hnist.sharo.dao.AdminMapper;
import cn.hnist.sharo.model.Admin;
import cn.hnist.sharo.model.User;
import cn.hnist.sharo.model.mexpand.User_filtrate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("AdminService")
@Transactional
public class AdminServiceImpl implements AdminService{
    @Resource
    AdminMapper adminMapper;


    @Override
    public Admin login(Admin admin) {
        List<Admin> res = adminMapper.login(admin);
        if(res != null && res.size() > 0){
            return (Admin) res.toArray()[0];
        }
        return null;
    }

    @Override
    public List<?> usersFilter(User_filtrate user_filtrate) {
        try {
            return adminMapper.usersfilter(user_filtrate);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String usersDelete(User user) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sf.format(new Date());
        user.setLogout(java.sql.Date.valueOf(time));
        int affect = adminMapper.usersdelete(user);
        if(affect == 1){
            return time;
        }
        return null;
    }

    @Override
    public boolean usersUpdate(User user) {
        int affect = adminMapper.usersupdate(user);
        if(affect == 1){
            return true;
        }
        return false;
    }
}
