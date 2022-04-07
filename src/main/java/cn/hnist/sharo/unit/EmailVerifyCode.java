package cn.hnist.sharo.unit;


import com.sun.mail.util.MailSSLSocketFactory;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.GeneralSecurityException;
import java.util.Properties;

public class EmailVerifyCode {
    /* 基础参数 */
    final private static String smtpID = "re_wo_ru@qq.com";
    final private static String smtpPasswd = "rfhznjwohlswddff";
    final private static String smtpHost = "smtp.qq.com";

    /* 产生验证码 */
    public static String smsCode(){
        String random=(int)((Math.random()*9+1)*100000)+"";
        return random;
    }

    /* 发送验证码 */
    public static boolean sendCode(String code,String user){
        Properties props = new Properties();
        // 开启debug调试
        props.setProperty("mail.debug", "true");
        // 发送服务器需要身份验证
        props.setProperty("mail.smtp.auth", "true");
        // 设置邮件服务器主机名
        props.setProperty("mail.host", smtpHost);
        // 发送邮件协议名称
        props.setProperty("mail.transport.protocol", "smtp");
        MailSSLSocketFactory sf = null;
        try {
            sf = new MailSSLSocketFactory();
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }
        sf.setTrustAllHosts(true);
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.ssl.socketFactory", sf);
        Session session = Session.getInstance(props);
        try{
            Message msg = new MimeMessage(session);
            msg.setSubject("邮箱验证码");
            StringBuilder builder = new StringBuilder();
            builder.append("\n验证码:");
            builder.append("\n" + code);
            msg.setText(builder.toString());
            msg.setFrom(new InternetAddress(smtpID));
            Transport transport = session.getTransport();
            transport.connect(smtpHost, smtpID, smtpPasswd);
            // 1178389392@qq.com
            transport.sendMessage(msg, new Address[] { new InternetAddress(user) });
            transport.close();
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

     //test
//    public static void main(String[] args){
//        sendCode(smsCode(),"1213564573@qq.com");
//    }
}
