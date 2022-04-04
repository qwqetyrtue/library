package cn.hnist.sharo.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Aspect
public class ControllerAspect {

    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_BLUE = "\u001B[34m";

    @Pointcut("execution(* cn.hnist.sharo.controller.*.*(..))")
    private void execute() {
    }


    @Before("execute()")
    public void doBefore() {
//        System.out.println(ANSI_GREEN + "执行前" + ANSI_RESET);
    }

    @After("execute()")
    public void doAfter() {
//        System.out.println(ANSI_GREEN + "执行后" + ANSI_RESET);
    }

    @AfterReturning("execute()")
    public void doAfterReturn() {
//        System.out.println(ANSI_GREEN + "返回后" + ANSI_RESET);
    }

    @AfterThrowing("execute()")
    public void doAfterThrowing() {
//        System.out.println(ANSI_GREEN + "抛出" + ANSI_RESET);
    }

    @Around("execute()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        // result的值就是被拦截方法的返回值

        System.out.println(ANSI_GREEN + "around 前" + ANSI_RESET);
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpServletRequest request = sra.getRequest();

        String url = request.getRequestURL().toString();
        String method = request.getMethod();
        String uri = request.getRequestURI();
        String queryString = request.getQueryString();

        //这里可以获取到get请求的参数和其他信息
        System.out.format(ANSI_GREEN + "%s" + ANSI_RESET + ANSI_BLUE + " ==> Url: %s, Uri: %s,\n Params: %s \n" + ANSI_RESET, method, url, uri, queryString );
        //重点 这里就是获取@RequestBody参数的关键  调试的情况下 可以看到o变量已经获取到了请求的参数
        System.out.println(ANSI_GREEN + "around 后" + ANSI_RESET);
        Object result = pjp.proceed();
        return result;
    }
}