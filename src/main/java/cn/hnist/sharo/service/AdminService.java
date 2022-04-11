package cn.hnist.sharo.service;

import cn.hnist.sharo.model.Admin;
import org.springframework.stereotype.Repository;

@Repository("adminService")
public interface AdminService {
    Admin login(Admin admin);
}
