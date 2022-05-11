package cn.hnist.sharo.unit;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

public class BackEndHttpRequest {
    /**
     * 向指定的URL发送GET方法的请求
     * @param url    发送请求的URL
     * @param param  请求参数，请求参数应该是 name1=value1&name2=value2 的形式
     * @return  远程资源的响应结果
     */
    public static String sendGet(String url, String param,String resType) {
        String result = null;
        BufferedReader bufferedReader = null;
        try {
            //1、读取初始URL
            String urlNameString = url + "?" + param;
            //2、将url转变为URL类对象
            URL realUrl = new URL(urlNameString);

            //3、打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            //4、设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
//            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");

            //5、建立实际的连接
            connection.connect();

            System.out.println(connection.getHeaderField("Content-Type"));
            //获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();

            //遍历所有的响应头字段
            System.out.println("----------响应头字段----------");
            for(String key : map.keySet()) {
                System.out.println(key + "---->" + map.get(key));
            }
            System.out.println("-------------------------");

            if(map.get("Content-Type")==null || !String.valueOf(map.get("Content-Type")).equalsIgnoreCase("[" + resType + "]")){
                return null;
            }
            //6、定义BufferedReader输入流来读取URL的响应内容 ，UTF-8是后续自己加的设置编码格式，也可以去掉这个参数
            bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"UTF-8"));
            result = "";
            String line = "";
            while(null != (line = bufferedReader.readLine())) {
                result += line;
            }
//            int tmp;
//            while((tmp = bufferedReader.read()) != -1){
//                result += (char)tmp;
//            }

        }catch (Exception e) {
            System.out.println("发送GET请求出现异常！！！"  + e);
            e.printStackTrace();
        }finally {        //使用finally块来关闭输入流
            try {
                if(null != bufferedReader) {
                    bufferedReader.close();
                }
            }catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }
    /**
     * 向指定的URL发送POST方法的请求
     * @param url    发送请求的URL
     * @param param  请求参数，请求参数应该是 name1=value1&name2=value2 的形式
     * @return       远程资源的响应结果
     */
    public static String sendPost(String url, String param) {
        String result = "";
        BufferedReader bufferedReader = null;
        PrintWriter out = null;
        try {
            //1、2、读取并将url转变为URL类对象
            URL realUrl = new URL(url);

            //3、打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            //4、设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");


            // 发送POST请求必须设置如下两行
            connection.setDoInput(true);
            connection.setDoOutput(true);
            //5、建立实际的连接
            //connection.connect();
            //获取URLConnection对象对应的输出流
            out = new PrintWriter(connection.getOutputStream());
            //发送请求参数
            out.print(param);
            //flush输出流的缓冲
            out.flush();


            //6、定义BufferedReader输入流来读取URL的响应内容
            bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"UTF-8"));
            String line;
            while(null != (line = bufferedReader.readLine())) {
                result += line;
            }
        }catch (Exception e) {
            System.out.println("发送POST请求出现异常！！！"  + e);
            e.printStackTrace();
        }finally {        //使用finally块来关闭输出流、输入流
            try {
                if(null != out) {
                    out.close();
                }
                if(null != bufferedReader) {
                    bufferedReader.close();
                }
            }catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }
}