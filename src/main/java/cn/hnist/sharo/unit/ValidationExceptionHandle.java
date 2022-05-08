package cn.hnist.sharo.unit;

import org.hibernate.validator.internal.engine.path.PathImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Set;
import java.util.StringJoiner;

@RestControllerAdvice
public class ValidationExceptionHandle {

    private static final Logger logger = LoggerFactory.getLogger(ValidationExceptionHandle.class);

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Res<String> handlerMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        // 错误信息校验
        boolean fieldErrorUnobtainable = e == null || CollectionUtils.isEmpty(e.getBindingResult().getAllErrors()) || e.getBindingResult().getAllErrors().get(0) == null;
        if (fieldErrorUnobtainable) {
            return new Res<>("fail","未知错误");
        }

        // 获取错误信息
        List<ObjectError> fieldError = e.getBindingResult().getAllErrors();
        StringJoiner stringJoiner = new StringJoiner(",");

        for(ObjectError each : fieldError){
            stringJoiner.add(each.getDefaultMessage());
        }

        // 返回
        return new Res<>("fail",stringJoiner.toString());
    }



    @ExceptionHandler(value = ConstraintViolationException.class)
    public Res<String> handle1(ConstraintViolationException ex){
        StringBuilder msg = new StringBuilder();
        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        for (ConstraintViolation<?> constraintViolation : constraintViolations) {
            PathImpl pathImpl = (PathImpl) constraintViolation.getPropertyPath();
            String paramName = pathImpl.getLeafNode().getName();
            String message = constraintViolation.getMessage();
            msg.append("[").append(message).append("]");
        }
        logger.error(msg.toString(),ex);
        // 注意：Response类必须有get和set方法，不然会报错
        return new Res<>("fail",msg.toString());
    }
}