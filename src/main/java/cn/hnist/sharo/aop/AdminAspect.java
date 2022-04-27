package cn.hnist.sharo.aop;

import cn.hnist.sharo.unit.Res;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

import static cn.hnist.sharo.unit.ColorLog.ANSI_RED;
import static cn.hnist.sharo.unit.ColorLog.ANSI_RESET;

@Component
@Aspect
@Order(1)
public class AdminAspect {
    // 登录用户禁止访问
    // userLoginHandle
    @Pointcut("execution(* cn.hnist.sharo.controller.AdminController.adminLoginHandle(..))")
    private void executeNotLogin() {
    }

    @Around("executeNotLogin()")
    public Object doNotLoginAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpSession session = sra.getRequest().getSession(true);
        if (session.getAttribute("admin") != null) {
            System.out.println(ANSI_RED + "[" + this.getClass().getName() + "]" + "用户已经登录了" + ANSI_RESET);
            return new Res<String>("fail", "禁止已登录用户访问该路径");
        }
        Object res = pjp.proceed();
        return res;
    }


    // 未登录用户禁止访问
//    @Pointcut("execution(* cn.hnist.sharo.controller.AdminController.adminUserListHandle(..))")
//    private void executeNeedLogin() {
//    }
//    @Around("executeNeedLogin()")
//    public Object doLoginAround(ProceedingJoinPoint pjp) throws Throwable {
//        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
//        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
//        HttpSession session = sra.getRequest().getSession(true);
//        if (session.getAttribute("admin") == null) {
//            System.out.println(ANSI_RED + "[" + this.getClass().getName() + "]" + "用户未登录" + ANSI_RESET);
//            return new Res<String>("fail", "禁止未登录用户访问该路径");
//        }
//        Object res = pjp.proceed();
//        return res;
//    }
}
