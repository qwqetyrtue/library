# webee课程设计项目

## 工具

> + IntelliJ IDEA 2021.2 (Ultimate Edition)Build #IU-212.4746.92, built on July 27,2021
> + tomcat: 9.0.38
> + mysql: Server version: 8.0.21 MySQL Community Server - GPL 

## 项目结构

```powershell
# javaee 项目结构
├── javaee.iml
├── pom.xml
├── README.md
└── src
|  └── main
|     ├── java
|     |  └── cn
|     |     └── hnist
|     |        └── sharo
|     |           ├── aop
|     |           |  ├── AdminAspect.java
|     |           |  ├── ControllerAspect.java
|     |           |  └── LogAspect.java
|     |           ├── controller
|     |           |  ├── AdminController.java
|     |           |  ├── BookController.java
|     |           |  ├── BorrowController.java
|     |           |  ├── PageController.java
|     |           |  └── UserController.java
|     |           ├── dao
|     |           |  ├── AdminMapper.java
|     |           |  ├── AdminMapper.xml
|     |           |  ├── BookMapper.java
|     |           |  ├── BookMapper.xml
|     |           |  ├── BorrowMapper.java
|     |           |  ├── BorrowMapper.xml
|     |           |  ├── UserMapper.java
|     |           |  └── UserMapper.xml
|     |           ├── model
|     |           |  ├── Admin.java
|     |           |  ├── Author.java
|     |           |  ├── Book.java
|     |           |  ├── Borrowrecord.java
|     |           |  ├── menum
|     |           |  |  ├── BloodType.java
|     |           |  |  ├── BookState.java
|     |           |  |  ├── BorrowState.java
|     |           |  |  └── Gender.java
|     |           |  ├── mexpand
|     |           |  |  ├── Book_filtrate.java
|     |           |  |  ├── Borrow_create.java
|     |           |  |  ├── Borrow_filtrate.java
|     |           |  |  ├── Filtrate.java
|     |           |  |  ├── Update_bkid.java
|     |           |  |  ├── Update_pwd.java
|     |           |  |  ├── User_filtrate.java
|     |           |  |  └── User_register.java
|     |           |  └── User.java
|     |           ├── service
|     |           |  ├── AdminService.java
|     |           |  ├── AdminServiceImpl.java
|     |           |  ├── BookService.java
|     |           |  ├── BookServiceImpl.java
|     |           |  ├── BorrowService.java
|     |           |  ├── BorrowServiceImpl.java
|     |           |  ├── UserService.java
|     |           |  └── UserServiceImpl.java
|     |           └── unit
|     |              ├── BackEndHttpRequest.java
|     |              ├── ColorLog.java
|     |              ├── CustomContextListener.java
|     |              ├── CustomObjectMapper.java
|     |              ├── EmailVerifyCode.java
|     |              ├── ListRes.java
|     |              └── Res.java
|     └── webapp
|        ├── res
|        |  ├── css
|        |  ├── images
|        |  └── js
|        |     ├── element-ui@2.15.7
|        |     ├── gsap@3.9.1
|        |     ├── jquery
|        |     ├── ribbon
|        |     └── vue
|        └── WEB-INF
|           ├── page
|           |  ├── 404page.html
|           |  ├── admin.html
|           |  ├── index.html
|           |  ├── librarian.html
|           |  ├── login.html
|           |  ├── notice.html
|           |  ├── profile.html
|           |  └── user.html
|           └── web.xml
```

## 功能点

- [ ] 用户
  - [x] 书籍查询
  - [x] 借阅单查询
  - [x] 创建借阅单
  - [x] 个人资料显示
  - [x] 修改个人资料
  - [x] 退出登录
  - [x] 修改密码
  - [ ] 座位查询
  - [ ] 占座
  - [ ] 预约会议室
- [ ] 管理员
  - [x] 个人资料显示
  - [ ] 修改个人资料
  - [x] 退出登录
  - [x] 借阅单列表和查询
  - [x] 借阅单修改
  - [ ] 借阅单添加
  - [x] 书籍列表和查询
  - [x] 书籍修改
  - [ ] 书籍添加
  - [x] 用户列表和查询
  - [x] 用户信息修改
  - [ ] 添加用户
  - [ ] 图片列表和查询
  - [ ] 图片修改
  - [ ] 上传图片
  - [ ] 文章列表和查询
  - [ ] 文章修改

- [ ] 首页

## 路径映射

```powershell
	# c.h.s.c.AdminController:
{POST [/admin/login]}: adminLoginHandle(Admin,HttpSession)
{POST [/admin/admin]}: adminCheckHandle(HttpSession)
{POST [/admin/outlogin]}: adminOutLoginHandle(HttpSession)
{POST [/admin/users]}: adminUsersListHandle(User_filtrate)
{POST [/admin/users/update]}: adminUsersUpdateHandle(User)
{POST [/admin/users/delete]}: adminUsersDeleteHandle(User)
{POST [/admin/books]}: adminBooksListHandle(Book_filtrate)
{POST [/admin/books/delete]}: adminBooksDeleteHandle(Book)
{POST [/admin/books/authors]}: adminBooksAuthorHandle(Author)
{POST [/admin/books/update]}: adminBooksUpdateHandle(Book)
{POST [/admin/borrows]}: adminBorrowsListHandle(Borrow_filtrate)
{POST [/admin/borrows/update]}: adminBorrowsUpdateHandle(Borrowrecord)
{POST [/admin/borrows/finish]}: adminBorrowsFinish(Borrowrecord,HttpSession)
{POST [/admin/borrows/users]}: adminBorrowUserHandle(User)
{POST [/admin/borrows/books]}: adminBorrowBookHandle(Book)
	# c.h.s.c.BookController:
{POST [/book/filtrate]}: bookAllHandle(Book_filtrate)
{POST [/book/isbn]}: isbnCheckHandle(JSONObject)
{POST [/book/details]}: bookDetailsHandle(Book)
	# c.h.s.c.BorrowController:
{POST [/borrow/filtrate]}: borrowFiltrateHandle(Borrow_filtrate)
{POST [/borrow/create]}: borrowCreateHandle(Borrow_create)
	# c.h.s.c.PageController:
{ [/user]}: userHandle(HttpSession)
{ [/login]}: loginHandle(HttpSession)
{ [/librarian]}: adminLoginHandle(HttpSession)
{ [/ || /index]}: indexHandle(HttpSession)
{ [/admin]}: adminHandle(HttpSession)
	# c.h.s.c.RoomController:
{POST [/room/room]}: roomMsgHandle(Room)
{POST [/room/rooms]}: roomsMsgByLocalHandle(Room)
	# c.h.s.c.SeatController:
{POST [/seat/room]}: seatMsgByRoomHandle(Room)
{POST [/seat/seat]}: seatMsgBySeatHandle(Seat)
	# c.h.s.c.UserController:
{POST [/user/user]}: userCheckHandle(HttpSession)
{POST [/user/update]}: userUpdateHandle(User,HttpSession)
{POST [/user/login]}: userLoginHandle(User,HttpSession)
{POST [/user/register]}: userRegisterHandle(User_register,HttpSession)
{POST [/user/outlogin]}: userOutLoginHandle(HttpSession)
{POST [/user/updatepwd]}: userUpdatePasswordHandle(Update_pwd,HttpSession)
{POST [/user/sendverifycode]}: userSendVerifyCodeHandle(User_register,HttpSession)
{POST [/user/checkuid]}: userCheckUidHandle(User,HttpSession)
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

[java实体类序列化和反序列化的时候时间字段格式化@DateTimeFormat和@JsonFormat](https://blog.csdn.net/weixin_43944305/article/details/111387262)

+ 理解(大概,......没搞懂)~update:2022-04-26~

> Serializer和DesSerializer对应的是数据库的读写
>
> JsonFormat和DateTimeFormat对应的是返回数据和接收数据
>
> + 写了Serializer能让访问数据库时查询到的时间格式化
>
> + 写了JsonFormat能让返回给页面的数据时间格式化

+ 解决

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
>+ type：用于说明commit的类别，规定为如下几种
>	+ feat：新增功能；
>	+ fix：修复bug；
>	+ docs：修改文档；
>	+ refactor：代码重构，未新增任何功能和修复任何bug；
>	+ build：改变构建流程，新增依赖库、工具等（例如webpack修改）；
>	+ style：仅仅修改了空格、缩进等，不改变代码逻辑；
>	+ perf：改善性能和体验的修改；
>	+ chore：非src和test的修改；
>	+ test：测试用例的修改；
>	+ ci：自动化流程配置修改；
>	+ revert：回滚到上一个版本；
>+ scope：【可选】用于说明commit的影响范围
>+ subject：commit的简要说明，尽量简短
>
>### Body
>
>对本次commit的详细描述，可分多行
>
>### Footer
>
>+ 不兼容变动：需要描述相关信息
>
>+ 关闭指定Issue：输入Issue信息



### 16. `elemntUI`中在`el-table`自定义表头中使用`el-table`无法disabled

<font color="gray">~~`elmentUI` 中的`el-button`当类型为`text`时不能通过获取点击目标并`disabled`来实现防止重复点击~~</font> 

[csdn上我的记录](https://blog.csdn.net/reol44/article/details/124053518)

> 最终解决方法: 直接使用`v-loading`,或者`el-button`的`loading`选项,这是`elementUI`提供的加载,在点击按钮后会有加载样式,实用又方便

### 17. mysql筛选查询时,分页后如何获取总查询条数

[SQL_CALC_FOUND_ROWS的使用](https://blog.csdn.net/qq_37171353/article/details/107824749)

[mybatis的mapper文件中的一个标签是否可以写多条SQL语句？是否存在事物？](https://www.jianshu.com/p/37fc30bcec8a)

+ mysql

```sql
select SQL_CALC_FOUND_ROWS 
    *
from student 
WHERE id < 1000
LIMIT 10,10;
SELECT FOUND_ROWS() as total_count;
```

+ mybatis

```sql
<select id="getStudentInfo2" resultMap="BaseResultMap,ExtCountResultMap">
        select
        SQL_CALC_FOUND_ROWS
        * from student where id in
        <foreach collection="ids" item="id" index="i" open="(" close=")" separator=",">
            #{id}
        </foreach>
        <if test="limit != null">
            <if test="offset != null">
                limit ${offset}, ${limit}
            </if>
        </if>
        ;SELECT FOUND_ROWS() as total_count;
</select>
```

+ **记得修改连接配置配置** `allowMultiQueries=true`

```java
 <property name="url"
                  value="jdbc:mysql://localhost:3306/library_database?characterEncoding=utf8&amp;useAffectedRows=true&amp;useSSL=false&amp;allowMultiQueries=true
"/>
```

### 18. vue自定义drag和zoom指令

[vue.js 自定义指令（拖拽、拖动、移动） 指令 v-drag](https://blog.csdn.net/qq_37237495/article/details/104689452)

```js
directives: {
            drag: {
                // 指令的定义
                bind: function(el) {
                    let oDiv = el;  // 获取当前元素
                    oDiv.onmousedown = (e) => {
                        console.log('onmousedown')
                        // 算出鼠标相对元素的位置
                        let disX = e.clientX - oDiv.offsetLeft;
                        let disY = e.clientY - oDiv.offsetTop;

                        document.onmousemove = (e) => {
                            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                            let left = e.clientX - disX;
                            let top = e.clientY - disY;
                            oDiv.style.left = left + 'px';
                            oDiv.style.top = top + 'px';
                            oDiv.style.cursor = "pointer";
                        };
                        document.onmouseup = (e) => {
                            document.onmousemove = null;
                            document.onmouseup = null;
                            oDiv.style.cursor = "auto";
                        }
                    }
                }
            },
            zoom: {
                bind: function (el) {
                    let oDiv = el;
                    oDiv.style.zoom = 1;
                    oDiv.onwheel = (e)=>{
                        console.log(e)
                        let zoom = parseFloat(oDiv.style.zoom);
                        let tZoom = zoom + (e.wheelDelta>0 ? 0.05 : -0.05);
                        if( tZoom > 2 || tZoom<0.5 ) return true;
                        oDiv.style.zoom=tZoom;
                    }
                }
            }
        },
```


### 19. 如何终止Promise的运行

```js
function reqData(data){
    return new $.ajax({
        url: "url",
        data: JSON.stringify(data)
    })
    .then(r=>{
        let res = JSON.parase(r)
        // 如果返回中代表结果的参数为真
        if(res.res == "success"){
            let data = res.data;
            // 处理数据
            // ...
            return true;
        }else{
            // 返回错误
            throw new Error("错误信息")
        }
    })
    .catch(err=>{
        //底层错误处理
        console.log(err);
        throw new Error("向下抛出的错误信息")
    })
}
// 提交搜索的时间触发函数
function submitSearch(){
    // 传入的参数
    let data = {}
    // 调用函数
    reqData(data)
    .then(res=>{
        if(res == true){
            // 跳出弹框等相应给用户的操作
        }
    })
    // 如果reqData报错了,可以拿到reqData的catch中抛出的错误
    .catch(err=>{
        // 跳出错误弹框等...
    })
}
```

### 20. springMVC项目怎么配置404页面

我的配置

+ web.xml

>```xml
><!-- 配置当出现404代码时跳转到 /404notfound -->
><error-page>
>   <error-code>404</error-code>
>   <location>/404notfound</location>
></error-page>
>
><servlet-mapping>
>  <servlet-name>springMVC</servlet-name>
>  <!--
>      设置springMVC的核心控制器所能处理的请求的请求路径
>      /所匹配的请求可以是/login或.html或.js或.css方式的请求路径
>      但是/不能匹配.jsp请求路径的请求
>  -->
>  <url-pattern>/*</url-pattern>
></servlet-mapping>
>```

+ controller: pageController

  在controller里面对 post和get方法的404分别处理,get返回页面,post返回json

```java
    @RequestMapping(value = "/404notfound",method = RequestMethod.GET)
    public String notFoundGetHandle(){
        return "404page";
    }

    @RequestMapping(value = "/404notfound",method = RequestMethod.POST)
    public @ResponseBody
    Res<String> notFoundPostHandle(){
        return new Res<>("fail","错误的请求地址 code:404");
    }
```

### 21. CDN引入的vue怎么创建和使用模板

[vue CDN 模板挂载操作](https://blog.csdn.net/laow1314/article/details/109323527)


### 22. 富文本编辑器 wangEditor

[Document](https://www.wangeditor.com/v5/for-frame.html#%E4%BD%BF%E7%94%A8)

+ 怎么自定义菜单项

  [官方案例](https://github.com/wangeditor-team/wangEditor/blob/master/packages/editor/demo/extend-menu.html)

  ```js
  // 定义菜单类
  class saveMenu {
      constructor() {
          this.title = '保存'
          this.tag = 'button'
          this.iconSvg = '图标svg'
      }
      getValue(editor) {
          return null;
      }
      isActive(editor) {
          return false // or false
      }
      isDisabled(editor) {
          return false // or true
      }
      exec(editor, value) {
          app.editorSaveHandle(editor.getHtml());
      }
  }
  // 定义菜单配置方式
  const saveMenuConf = {
      key: 'saveMenu',
      factory() {
          return new saveMenu()
      }
  }
  // 注册菜单
  wangEditor.Boot.registerMenu(saveMenuConf)
  // 使用
  toolbar = wangEditor.createToolbar({
      editor: editor,
      selector: '#toolbar-container',
      mode: 'default', // 或 'simple' 参考下文
      config: {
          insertKeys: {
              index: 0,
              keys: ['saveMenu'], // show menu in toolbar
          }
      }
  })
  ```

### 23. JWT

[JWT详解](https://blog.csdn.net/weixin_45070175/article/details/118559272)


### 24. springMvc 文件上传

[Spring MVC，文件上传](https://www.cnblogs.com/nayitian/p/15378399.html)

### 25. cropper.js的使用 图片裁剪

[5分钟搞定图片裁剪，上传](https://cloud.tencent.com/developer/article/1592623?from=15425)

### 26. 后台数据验证 JSR-303 规范

[Hibernate Validator进行优雅的数据验证](https://blog.csdn.net/meser88/article/details/116450450)

### 27. 解决`/user` 和`/user/` 根路径不同导致`静态资源`和`ajax请求路径`错误问题

1. 方法一 设置`controller`,将 `/user/` 重定向到`/user`

   ```java
     @RequestMapping(value = "/index",method = RequestMethod.GET)
       public String indexHandle(){
           return "index";
       }
    @RequestMapping(value = "/index/",method = RequestMethod.GET)
       public String indexReHandle(){
           return "redirect:/index";
       }
   ```

   

2. 在页面加载时,设置`window.BASE_URL`,设置`base标签`,后台路径使用`window.BASE_URL + path`

   ```html
   <!-- 项目前缀 -->
   <script th:inline="javascript">
      window.BASE_URL = [[${#request.getContextPath()}]] + '/';
   </script>
   <base th:href="${#request.getContextPath()}+'/'">
   ```

   ```js
   $.ajax({
       type: 'post',
       url: window.BASE_URL + 'api/test',
       data: JSON.stringify({data:data}),
       contentType: "application/json;charset=UTF-8",
   })
   ```




### 28. 使用`getEpochSecond()` 导致`datatiem`时间错误

+ 错误

  ```java
  LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT"))).withNano(0);
  Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).getEpochSecond()
  new Timestamp(creatTimestamp)
  // 这样出来的Timestamp存储错误的,new Timestamp(creatTimestamp) 需要的精度较高应该使用 .toEpochMilli();      
  ```

+ 正确

  ```java
  LocalDateTime create = LocalDateTime.now(ZoneId.of(ZoneId.SHORT_IDS.get("CTT"))).withNano(0);
  Long creatTimestamp = create.toInstant(ZoneOffset.of("+8")).toEpochMilli();
  new Timestamp(creatTimestamp)
  ```

  

