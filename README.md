# webee课程设计项目

## 工具

> + IntelliJ IDEA 2021.2 (Ultimate Edition)Build #IU-212.4746.92, built on July 27,2021
> + tomcat: 9.0.38
> + mysql: Server version: 8.0.21 MySQL Community Server - GPL 

## 项目结构

```
# javaee 项目结构
├── META-INF
|  └── application.xml
├── pom.xml
└── src
|  └── main
|     ├── java
|     |  └── cn
|     |     └── hnist
|     |        └── sharo
|     |           ├── controller
|     |           |  └── TestController.java
|     |           ├── dao
|     |           |  ├── UserMapper.java
|     |           |  └── UserMapper.xml
|     |           ├── model
|     |           |  └── User.java
|     |           └── service
|     |              ├── UserService.java
|     |              └── UserServiceImpl.java
|     ├── resources
|     |  ├── applicationContext.xml
|     |  ├── mybatis-config.xml
|     |  └── springMVC.xml
|     └── webapp
|        ├── index.jsp
|        └── WEB-INF
|           ├── tp
|           |  ├── index.html
|           |  └── yes.html
|           └── web.xml

```

## 问题

### 1. 解决xml配置文件没有编译到target文件夹的问题

> 在项目maven配置文件中build标签中添加以下语句

```xml
<resources>
    <!-- mapper.xml文件 -->
    <resource>
    	<directory>src/main/java</directory>
        <!-- 引入映射文件 -->
        <includes>
        	<include>**/*.xml</include>
          	<include>**/*.properties</include>
        </includes>
    </resource>
     <!-- resources文件 -->
     <resource>
    	<directory>src/main/resources</directory>
        <!-- 引入映射文件 -->
        <includes>
        	<include>**/*.xml</include>
          	<include>**/*.properties</include>
        </includes>
    </resource>
</resources>
```

### 2. mybatis的update语句返回值问题

 [参考](https://blog.csdn.net/u010675669/article/details/114082932)

```xml
jdbc:mysql://${jdbc.host}/${jdbc.db}?useAffectedRows=true
```

### 3. IDEA 设置 SQL 格式化

> 设置idea实现sql语句关键字大写

[设置教程](https://blog.csdn.net/weixin_36001063/article/details/93709995)

### 4. MyBatisupdate空值判断

[MyBatis中update的使用](https://www.cnblogs.com/zhoubohao/p/6047973.html)

```xml
<update id="updateMember" parameterType="com.zbh.entity.Member">
        update Member
        <set>
            <if test="memberName != null">memberName=#{memberName},</if>
            <if test="memberAccount != null">memberAccount=#{memberAccount},</if>
            <if test="address != null">address=#{address},</if>
            <if test="sex != null">sex=#{sex}</if>
        </set>
        where memberId=#{memberId}
</update>
```

### 5. idea中使用注释快捷键的问题及解决办法

[idea中使用注释快捷键](https://blog.csdn.net/qq_31180919/article/details/119615404)

> 使用块注释替代行注释
>
>  <kbd>shift</kbd>+<kbd>ctrl</kbd>+<kbd>l</kbd>

### 6. Idea使用系统应用打开md文件

[Idea使用系统应用打开md文件](https://blog.csdn.net/u013926181/article/details/114362132)

[设置IntelliJ使用第三方应用打开文件](https://blog.csdn.net/android_cai_niao/article/details/108285394)

### 7. `Could not resolve type alias`

> 出现以下错误
>
> ```java
>  Could not resolve type alias 'Update_pwd'.  Cause: java.lang.ClassNotFoundException: Cannot find class: Update_pwd
> ```
>
> + 原因
>
>   是`alias Type`没有注册
>
> + 解决
>
>   到**`mybatis.xml`**中的**`typeAliases`**标签中添加对应的**`typeAlias`**标签

### 8. Tomcat Reply的时候强制关闭mysql连接导致报错

[Tomcat停止时为了防止内存泄漏，JDBC驱动程序被强制取消注册(Tomcat启动久关闭报错问题)](https://blog.csdn.net/qq_44758515/article/details/106935615)

> 解决方法:
>
> 自定义一个`listener`在程序结束时手动关闭连接
>
> ```java
> public class CustomContextListener implements ServletContextListener {
> 	<!-- 实现彩色打印 -->
>     public static final String ANSI_RESET = "\u001B[0m";
>     public static final String ANSI_RED = "\u001B[31m";
>     public static final String ANSI_GREEN = "\u001B[32m";
> 
>     @Override
>     public void contextInitialized(ServletContextEvent arg0) {
>         // 服务器开始运行
>         System.out.println(ANSI_GREEN + "webService start" + ANSI_RESET);
>     }
> 
>     @Override
>     public void contextDestroyed(ServletContextEvent arg0) {
>         // 服务器结束运行,关闭mysql连接
>         System.out.println(ANSI_RED + "WebService Stop" + ANSI_RESET);
>         try {
>             while(DriverManager.getDrivers().hasMoreElements()) {
>                 DriverManager.deregisterDriver(DriverManager.getDrivers().nextElement());
>             }
>             // 连接关闭成功
>             System.out.println(ANSI_RED +"JDBC Driver Close"+ ANSI_RESET);
>             AbandonedConnectionCleanupThread.checkedShutdown();
>             System.out.println(ANSI_RED +"Clean Thread Success"+ ANSI_RESET);
>         } catch (SQLException e) {
>             e.printStackTrace();
>         }
>     }
> }
> ```
>
> 在web.xml中添加监听器
>
> ```xml
>   <!-- 监听程序 关闭时断开mysql连接 -->
>   <listener>
>     <listener-class>cn.hnist.sharo.unit.CustomContextListener</listener-class>
>   </listener>
> ```

### 9. `System.out.println`彩色输出

[如何使用System.out.println在控制台中打印颜色？](https://blog.csdn.net/xfxf996/article/details/107744592)

>```java
>   public static final String ANSI_RESET = "\u001B[0m";
>    public static final String ANSI_RED = "\u001B[31m";
>    public static final String ANSI_GREEN = "\u001B[32m";
>
>   public static void main(String[] args){
>        System.out.println(ANSI_GREEN + "绿色的字" + ANSI_RESET);
>    }
>```

### 10. 不使用`@RequestBody `获取表单json发方法

[传递JSON数据有没有必要用RequestBody？](https://www.cnblogs.com/NJM-F/p/10407763.html)

> ajax
>
> ```javascript
> //此时请求的ContentType默认是application/x-www-form-urlencoded：
> var user= {
>                 "username" : username,
>                 "password" : password,
>                 "rememberMe":rememberMe
>           };
> $.ajax({
>     url : "http://...../jsontest.do",
>     type : "POST",
>     async : true,
>     data : user,
>     dataType : 'json',
>     success : function(data) {
>     }
> });
> ```
>
> controller
>
> ```java
> @RequestMapping("/jsontest.do")
> public void test(User user,String username,String password,Boolean rememberMe){
>     System.out.println(user);
>     System.out.println("username: " + username);
>     System.out.println("password: " + password);
>     System.out.println("rememberMe: " + rememberMe);
>     
> }
> ```

### 11. `org.apache.catalina.startup.Catalina.stopServer未配置关闭端口。通过OS信号关闭服务器。服务器未关闭。`

[解决“org.apache.catalina.startup.Catalina.stopServer未配置关闭端口。通过OS信号关闭服务器。服务器未关闭。”问题](https://blog.csdn.net/qq_46365857/article/details/109212518)

>修改`Tomcat\conf`里的`server.xml`文件,设置一个关闭服务器的通信端口,由报错信息可以知道`tomcat`是通过端口通信关闭服务器的,默认关闭服务器端口位`-1`,将`-1`改为一个`可用端口`就不会报错了
>
>```xml
><Server port="8005" shutdown="SHUTDOWN">

### 12. 如何为`typore`配置图床

[Typora如何配置gitee图床？超详细教程！](https://blog.csdn.net/qq_36547531/article/details/114985742)

### 13. Java `Date`类大部分方法弃用后 如何使用新的 `Calendar(日历)` 类

[Java Calendar 日历类的时间操作 Timestamp Date Calendar 相互转换](https://blog.csdn.net/joyous/article/details/9630893)

>+ Calender 如何转 Timestamp
>
> ```java
> // 创建 Calendar 对象，也同时获取了当前时间
> Calendar calendar = Calendar.getInstance();
>
> // 转换为 Timestamp 类型对象
> Timestamp timestamp = new Timestamp(calendar.getTimeInMillis());
>
> ```

**由于calender不是线程安全的推荐使用下面的`java8` 提供的新时间api `LocalDataTime`**

[calendar.getinstance()获取的是什么时间_为什么建议使用 LocalDateTime 而不是 Date](https://blog.csdn.net/weixin_33682804/article/details/113050640)

>+ 新写法
>
>```java
>// 当前时间 上海时间 (= 北京时间,在一个时区)
>LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT")));
>// 去掉毫秒
>create.withNano(0);
>// 获取时间戳
>Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).toEpochMilli();
>
>Instant instant = Instant.now();
>// 获取秒级时间戳
>long currentSecond = instant.getEpochSecond();
>// 获取毫秒级时间戳
>long currentMilli = instant.toEpochMilli();
>Timestamp timestamp = new Timestamp(currentMilli);
>```
>
>

### 14. 偷懒不想写实体类,用`fastjson中的JSONObject`序列化,结果数据库类型为`datetime`的数据返回的时间中间带了个`t`

> 自定义的`ObjectMapper`
>
> ```java
> SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
>      setDateFormat(sdf);
>      setTimeZone(TimeZone.getTimeZone("GMT+8"));
>      JavaTimeModule javaTimeModule = new JavaTimeModule();
>      javaTimeModule.addSerializer(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
>      this.registerModule(javaTimeModule);
>      this.setLocale(Locale.getDefault());
> ```
>
> 最关键的是这句: **`javaTimeModule.addSerializer(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));`**
>
> springmvc配置文件`springmvc.xml`
>
> ```xml
> <mvc:annotation-driven>
>      <mvc:message-converters>
>          <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
>              <!-- 自定义Jackson的objectMapper -->
>              <property name="objectMapper" ref="customObjectMapper" />
>              <property name="supportedMediaTypes">
>                  <list>
>                      <value>text/plain;charset=UTF-8</value>
>                      <value>application/json;charset=UTF-8</value>
>                  </list>
>              </property>
>          </bean>
>      </mvc:message-converters>
>  </mvc:annotation-driven>
> ```
>
> 最后记得添加依赖
>
> ```xml
> <dependency>
> 	<groupId>com.fasterxml.jackson.datatype</groupId>
> 	<artifactId>jackson-datatype-jsr310</artifactId>
>     <version>2.13.2</version>
> </dependency>
> ```
>



### 15. git 提交记录的规范写法

[关于Git提交规范 ](https://www.cnblogs.com/youcong/p/9470585.html)

[Git提交信息规范化](https://zhuanlan.zhihu.com/p/114001464)

>## Git版本规范
>
>### 分支
>
>- master分支为主分支(保护分支)，不能直接在master上进行修改代码和提交；
>- develop分支为测试分支，所以开发完成需要提交测试的功能合并到该分支；
>- feature分支为开发分支，大家根据不同需求创建独立的功能分支，开发完成后合并到develop分支；
>- fix分支为bug修复分支，需要根据实际情况对已发布的版本进行漏洞修复；
>
>### Tag
>
>采用三段式，v版本.里程碑.序号，如`v1.2.1`
>
>- 架构升级或架构重大调整，修改第2位
>- 新功能上线或者模块大的调整，修改第2位
>- bug修复上线，修改第3位
>
>具体操作，可参见：[Git标签](https://link.zhihu.com/?target=https%3A//blog.csdn.net/ligang2585116/article/details/46468709)、[Git基础-打标签](https://link.zhihu.com/?target=https%3A//git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)
>
>### changelog
>
>版本正式发布后，需要生产changelog文档，便于后续问题追溯。
>
>## Git提交信息
>
>### commit message格式说明
>
>Commit message一般包括三部分：Header、Body 和 Footer。
>
>### Header
>
>```
>type(scope):subject
>```
>
>- type：用于说明commit的类别，规定为如下几种
>  - feat：新增功能；
>  - fix：修复bug；
>  - docs：修改文档；
>  - refactor：代码重构，未新增任何功能和修复任何bug；
>  - build：改变构建流程，新增依赖库、工具等（例如webpack修改）；
>  - style：仅仅修改了空格、缩进等，不改变代码逻辑；
>  - perf：改善性能和体现的修改；
>  - chore：非src和test的修改；
>  - test：测试用例的修改；
>  - ci：自动化流程配置修改；
>  - revert：回滚到上一个版本；
>
>- scope：【可选】用于说明commit的影响范围
>- subject：commit的简要说明，尽量简短
>
>
>### Body
>
>对本次commit的详细描述，可分多行
>
>### Footer
>
>- 不兼容变动：需要描述相关信息
>- 关闭指定Issue：输入Issue信息



### `elmentUI` 中的`el-button`当类型为`text`时不能通过获取点击目标并`disabled`来实现防止重复点击

> + 一般防止重复点击
>
> ```js
> let el = ev.target;
> if (!el.disabled) {
>     el.disabled = true
> }
> ```
>
> + 当`el-button` `type='text'`时
>
>   根据`console`才知道 `el` 为`span`标签而不是`button`标签
>
> + 建议使用 `:disable` 绑定的方式来禁止按键点击
