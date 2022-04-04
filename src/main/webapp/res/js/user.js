window.onload = function () {
    let app = new Vue({
        el: ".m-container",
        async mounted() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length == 3 ? paths[1] : '';
            console.log(this.BASE_URL);
            // 查询用户信息
            await this.reqUserMsg();
            // 查询书籍列表
            await this.reqBookList();
            // 查询借阅列表
            await this.reqBorrowList();
        },
        data() {
            let validateEmail = (rule, value, callback) => {
                let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (!pattern.test(value)) {
                    return callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };
            let validateCall = (rule, value, callback) => {
                let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                if (!pattern.test(value)) {
                    return callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            }
            // 验证码
            let checkVerifyCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            // 旧密码
            let validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    if (this.updateForm.checkPass !== '') {
                        this.$refs.updateForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            // 新密码
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.updateForm.checkPass !== '') {
                        this.$refs.updateForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            // 重复密码
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.updateForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                BASE_URL: '',
                user: {},
                activeIndex: '1',
                PageTitle: '图书馆,欢迎您!',
                tabIndex1: "预约",
                tabIndex2: "预约座位",
                userUpdateDialogVisible: false,
                bookDetailsDialogVisible: false,
                borrowCreateDialogVisible: false,
                userUpdateForm: {},
                bookDetails: {},
                borrowForm: {
                    time: '',
                    bkid: '',
                    uid: '',
                    remark: ''
                },
                rules_userUpdateForm: {
                    name: [
                        {required: true, message: '昵称不能为空'},
                    ],
                    email: [
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    call: [
                        {validator: validateCall, trigger: 'blur'}
                    ],
                },
                bookList: [],
                bookSearch: {
                    name: "",
                    author: "",
                    filtrate: ""
                },
                borrowList: [],
                bookReserveForm : {
                    isbn: '',
                    remark: ''
                },
                tableData: [],
                formInline: {
                    user: '',
                    region: ''
                },
                selectedFloor: 1,
                updateForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: '',
                    verify_code: ''
                },
                rules: {
                    oldPass: [
                        {validator: validateOldPass, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validateCheckPass, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkVerifyCode, trigger: 'blur'}
                    ]
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            bookState(state) {
              let res;
              switch (state) {
                  case "LEND": res = {state:"借阅中",type: "warning"};break;
                  case "STORE": res = {state:"在库",type: "success"};break
                  case "NOTINCLUDE": res = {state:"未入库",type: "info"};break;
              }
              return  res;
            },
            borrowState(state){
                let res;
                switch (state) {
                    case "BORROW": res = {state:"借阅中",type: ""}; break;
                    case "RETURN": res = {state:"已归还",type: "success"}; break;
                    case "OVERDUE": res = {state:"预期",type: "warning"}; break;
                    case "ACCIDENT": res = {state:"事故",type: "danger"}; break;
                }
                return res;
            },
            genderState(state){
                let res;
                switch (state) {
                    case "MALE": res = {state:"男",type: ""}; break;
                    case "FEMALE": res = {state:"女",type: ""}; break;
                    case "HIDE": res = {state:"隐藏",type: ""}; break;
                }
                return res;
            },
            userCommandHandle(command) {
                let v = this;
                switch (command) {
                    case "outlogin" :
                        $.ajax({
                            url: '/' + this.BASE_URL + '/user/outlogin',
                            type: "post",
                        })
                            .then(res => {
                                if (JSON.parse(res).res == "success") {
                                    v.$message({
                                        message: '退出登录',
                                        type: 'warning',
                                        duration: 1500,
                                        onClose: () => {
                                            location.href = '/' + this.BASE_URL + '/login'
                                        }
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        break;
                    case "changepsw":
                        this.tabIndex1 = "个人信息"
                        this.tabIndex2 = "修改密码"
                        break;
                }
            },
            tabClickHandle(tab) {
                switch (tab.label) {
                    case "预约":
                        this.tabIndex2 = "预约座位";
                        break;
                    case "借书":
                        this.tabIndex2 = "已借书籍";
                        break;
                    case "个人信息":
                        this.tabIndex2 = "基本信息";
                        break;
                }
            },
            reloadUserUpdate() {
                let {
                    uid,
                    gender,
                    birth,
                    homeadd,
                    presentadd,
                    email,
                    call,
                    name,
                    createdate,
                    postcode,
                    bloodtype
                } = this.user;
                this.userUpdateForm = {
                    uid,
                    gender,
                    birth,
                    homeadd,
                    presentadd,
                    email,
                    call,
                    name,
                    createdate,
                    postcode,
                    bloodtype
                }
            },
            userUpdateDialogHideHandle() {
                this.userUpdateDialogVisible = false;
            },
            userUpdateDialogShowHandle() {
                this.userUpdateDialogVisible = true;
            },
            bookDetailsDialogShowHandle() {
                this.bookDetailsDialogVisible = true;
            },
            bookDetailsDialogHideHandle() {
                this.bookDetailsDialogVisible = true;
            },
            borrowCreateDialogShowHandle() {
                this.borrowCreateDialogVisible = true;
            },
            borrowCreateDialogHideHandle() {
                this.borrowCreateDialogVisible = false;
            },
            userUpdateFormSubmitHandle() {
                let v = this;
                this.$refs.userUpdateForm.validate((valid) => {
                    if (valid) {
                        $.ajax({
                            type: 'post',
                            url: '/' + this.BASE_URL + '/user/update',
                            data: JSON.stringify(v.userUpdateForm),
                            contentType: "application/json;charset=UTF-8",
                        })
                            .then(r => {
                                let res = JSON.parse(r)
                                if (res.res == "success") {
                                    v.user = res.data;
                                    v.user.load = true;
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration: 1000,
                                        onClose: () => {

                                            v.reloadUserUpdate();
                                            v.userUpdateDialogHideHandle();
                                        }
                                    });
                                } else {
                                    this.$message({
                                        message: '修改失败',
                                        type: 'error',
                                        duration: 1500,
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$message({
                                    message: '出现未知错误',
                                    type: 'error',
                                    showClose: true,
                                    duration: 0,
                                });
                            })
                    } else {
                        return false;
                    }
                })

            },
            bookReserveFormSubmitHandle() {

            },
            isbnCheckHandle() {
                location.href ="/" + this.BASE_URL + "/book/isbn"
            },
            bookListRowClickHandle(row) {
                if (row.bkid == this.bookDetails.bkid) {
                    this.bookDetailsDialogShowHandle();
                    return;
                }
                $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/book/details',
                    data: JSON.stringify({"bkid": row.bkid}),
                    contentType: "application/json;charset=UTF-8"
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.bookDetailsDialogShowHandle();
                            this.bookDetails = res.data;
                            if (this.bookDetails.imgs != null) {
                                this.bookDetails.imgs = this.bookDetails.imgs.split('|');
                            }
                            this.bookDetails.load = true;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            createBorrowHandle(row) {
                let date = new Date();
                this.borrowForm.createdate = `${date.getFullYear()}-${date.getMonth() + 1 > 10 ? '' : 0}${date.getMonth() + 1}-${date.getDate() > 10 ? '' : 0}${date.getDate()}`
                this.borrowForm.bkname = row.bkname;
                this.borrowForm.atname = row.atname;
                this.borrowForm.binding = row.binding;
                this.borrowForm.bkid = row.bkid;
                this.borrowForm.bkremark = row.remark;
                this.borrowCreateDialogShowHandle();
            },
            createBorrowFormSubmitHandle() {
                let v = this;
                $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/borrow/create',
                    data: JSON.stringify({
                        bkid: v.borrowForm.bkid,
                        uid: v.user.uid,
                        time: v.borrowForm.time,
                        remark: v.borrowForm.remark
                    }),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            v.$message({
                                message: '借阅成功',
                                type: 'success',
                                duration: 1500,
                                onClose: async () => {
                                    await this.reqBookList();
                                    await this.reqBorrowList();
                                }
                            });
                        } else {
                            v.$message({
                                message: '借阅失败',
                                type: 'error',
                                duration: 1500,
                                onClose: () => {

                                }
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            reqUserMsg() {
               return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/user/user',
                })
                    .then(res => {
                        this.user = JSON.parse(res).data
                        this.user.load = true;
                        this.reloadUserUpdate();
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqBookList(){
               return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/book/all',
                    data: JSON.stringify({
                        "limit": 10,
                        "offset": 0,
                        "order": "bkname"
                    }),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(res => {
                        this.bookList = JSON.parse(res).data;
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqBorrowList(){
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/borrow/all',
                    data: JSON.stringify({
                        "uid": this.user.uid
                    }),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(res => {
                        this.borrowList = JSON.parse(res).data;
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            async refreshBookListHandle(ev){
                // 防止按键连点
                let el = ev.target;
                if (!el.disabled) {
                    el.disabled = true
                    el.style.cursor = 'not-allowed'
                    setTimeout(() => {
                        el.style.cursor = 'pointer'
                        el.disabled = false
                    },1500)
                }
               await this.reqBookList();
               this.$message({
                    message: '刷新成功',
                    type: 'success',
                    duration: 1000,
                });
            },
            async refreshBorrowListHandle(ev){
                // 防止按键连点
                let el = ev.target;
                if (!el.disabled) {
                    el.disabled = true
                    el.style.cursor = 'not-allowed'
                    setTimeout(() => {
                        el.style.cursor = 'pointer'
                        el.disabled = false
                    },1500)
                }
                await this.reqBorrowList();
                this.$message({
                    message: '刷新成功',
                    type: 'success',
                    duration: 1000,
                });
            },
            onSubmit() {
                console.log('submit!');
            },
            selectHandle(key, keyPath) {
                console.log(key, keyPath);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重置表单
            formResetHandle(formName) {
                this.$refs[formName].resetFields();
            },
        },
        computed: {

        }
    })
}