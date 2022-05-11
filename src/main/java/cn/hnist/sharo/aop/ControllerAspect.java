package cn.hnist.sharo.aop;

import cn.hnist.sharo.unit.ListRes;
import cn.hnist.sharo.unit.Res;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
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
        HttpSession session = sra.getRequest().getSession(true);
        if (session.getAttribute("lastTime") == null) {
            Instant instant = Instant.now();
            long currentMilli = instant.getEpochSecond();
            session.setAttribute("lastTime", currentMilli);
        } else {
            Long last = (Long) session.getAttribute("lastTime");
            Instant instant = Instant.now();
            long now = instant.getEpochSecond();
            ;
            if (now - last < 60) {
                System.out.println(ANSI_RED + "[" + this.getClass().getName() + "]" + "禁止频繁访问当前路径" + ANSI_RESET);
                return new Res<String>("fail", "禁止频繁访问当前路径");
            } else {
                session.setAttribute("lastTime", now);
            }
        }
        Object res = pjp.proceed();
        return res;
    }

    // 登录用户禁止访问
    // userLoginHandle
    @Pointcut("execution(* cn.hnist.sharo.controller.UserController.userLoginHandle(..))")
    private void executeNotLogin() {
    }

    @Around("executeNotLogin()")
    public Object doLoginAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpSession session = sra.getRequest().getSession(true);
        if (session.getAttribute("user") != null) {
            System.out.println(ANSI_RED + "[" + this.getClass().getName() + "]" + "用户已经登录了" + ANSI_RESET);
            return new Res<String>("fail", "禁止已登录用户访问该路径");
        }
        Object res = pjp.proceed();
        return res;
    }

//     需要登录才能访问
//     userOutLoginHandle
//     userUpdateHandle
//     userUpdatePasswordHandle
//     userCheckHandle
    @Pointcut("execution(* cn.hnist.sharo.controller.UserController.userOutLoginHandle(..)) " +
            "|| execution(* cn.hnist.sharo.controller.UserController.userUpdateHandle(..)) " +
            "|| execution(* cn.hnist.sharo.controller.UserController.userUpdatePasswordHandle(..)) " +
            "|| execution(* cn.hnist.sharo.controller.UserController.userCheckHandle(..))" +
            "|| execution(* cn.hnist.sharo.controller.BorrowController.*(..))")
    private void executeNeedLogin() {
    }

    @Around("executeNeedLogin()")
    public Object doNeedLoginAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpSession session = sra.getRequest().getSession(true);
        if (session.getAttribute("user") == null) {
            System.out.println(ANSI_RED + "[" + this.getClass().getName() + "]" + "禁止未登录用户访问该路径" + ANSI_RESET);
            Signature signature = pjp.getSignature();
            MethodSignature methodSignature = (MethodSignature) signature;
            // 被切的方法
            Method method = methodSignature.getMethod();
            // 返回类型
            Class<?> methodReturnType = method.getReturnType();
            // 实例化
            //  Object o = methodReturnType.newInstance();
            if (methodReturnType.getSimpleName().equals("ListRes"))
                return new ListRes<>("fail", "禁止未登录用户访问该路径", null, -1);
            else
                return new Res<>("fail", "禁止未登录用户访问该路径");
        }
        Object res = pjp.proceed();
        return res;
    }
}
