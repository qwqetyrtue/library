package cn.hnist.sharo.aop;

import cn.hnist.sharo.unit.Res;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.time.Instant;


import static cn.hnist.sharo.unit.ColorLog.*;

@Component
@Aspect
@Order(1)
public class ControllerAspect {

    // 验证码路径限制连续访问
    @Pointcut("execution(* cn.hnist.sharo.controller.UserController.userSendVerifyCodeHandle(..))")
    private void executeEmailSend() {
    }
    @Around("executeEmailSend()")
    public Object doEmailSencAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpSession session= sra.getRequest().getSession(true);
        if(session.getAttribute("lastTime") == null){
            Instant instant = Instant.now();
            long currentMilli = instant.getEpochSecond();
            session.setAttribute("lastTime",currentMilli);
        }else{
            Long last = (Long)session.getAttribute("lastTime");
            Instant instant = Instant.now();
            long now = instant.getEpochSecond();;
            if(now - last < 60){
                System.out.println(ANSI_RED + "禁止频繁访问当前路径" + ANSI_RESET);
                return new Res<String>("fail","禁止频繁访问当前路径");
            }else{
                session.setAttribute("lastTime",now);
            }
        }
        Object res = pjp.proceed();
        return res;
    }

    // 登录用户禁止访问
    // userLoginHandle
    @Pointcut("execution(* cn.hnist.sharo.controller.UserController.userLoginHandle(..))")
    private void executeLogin() {
    }
    @Around("executeLogin()")
    public Object doLoginAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpSession session= sra.getRequest().getSession(true);
        if(session.getAttribute("user")!=null) {
            System.out.println(ANSI_RED + "用户已经登录了" + ANSI_RESET);
            return new Res<String>("fail","禁止已登录用户访问该路径");
        }
        Object res = pjp.proceed();
        return res;
    }

    // 需要登录才能访问
    // userOutLoginHandle
    // userUpdateHandle
    // userUpdatePasswordHandle
    // userCheckHandle
    @Pointcut("execution(* cn.hnist.sharo.controller.UserController.userOutLoginHandle(..)) " +
            "|| execution(* cn.hnist.sharo.controller.UserController.userUpdateHandle(..)) " +
            "|| execution(* cn.hnist.sharo.controller.UserController.userUpdatePasswordHandle(..)) " +
            "|| execution(* cn.hnist.sharo.controller.UserController.userCheckHandle(..))")
    private void executeNeedLogin() {
    }
    @Around("executeNeedLogin()")
    public Object doNeedLoginAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpSession session= sra.getRequest().getSession(true);
        if (session.getAttribute("user") == null)
            return new Res<String>("fail","禁止未登录用户访问该路径");
        Object res = pjp.proceed();
        return res;
    }
}
