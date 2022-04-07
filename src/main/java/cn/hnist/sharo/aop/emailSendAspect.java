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
public class emailSendAspect {

    @Pointcut("execution(* cn.hnist.sharo.controller.UserController.userSendVerifyCodeHandle(..))")
    private void execute() {
    }

    @Before("execute()")
    public void doBefore() throws RuntimeException{
    }

    @Around("execute()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
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

}
