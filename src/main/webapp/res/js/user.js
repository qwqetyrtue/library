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
            this.UserPageLoading = false;
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
                if (value == '')
                    callback();
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
                callback();
            };
            // 旧密码
            let validateOldPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else
                    callback();
            };
            // 新密码
            let validatePassword = (rule, value, callback) => {
                let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!pattern.test(value)) {
                    callback(new Error('须含大小写字母,数字，可使用特殊字符，长度:8-10'));
                } else {
                    if (this.passwordUpdateForm.checkPassword !== '') {
                        this.$refs.passwordUpdateForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            // 重复密码
            let validateCheckPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordUpdateForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                BASE_URL: '',
                UserPageLoading: true,
                user: {load:false},
                activeIndex: '1',
                PageTitle: '图书馆,欢迎您!',
                tabIndex1: "预约",
                tabIndex2: "预约座位",
                // dialog
                userUpdateDialogVisible: false,
                bookDetailsDialogVisible: false,
                borrowCreateDialogVisible: false,
                // 验证码按钮
                showSendButton: true,
                count: 0,
                timer: null,
                // 表单
                userUpdateForm: {},
                bookDetails: {},
                isbnCheckForm: {load: false},
                borrowForm: {
                    time: null,
                    bkid: '',
                    uid: '',
                    remark: ''
                },
                passwordUpdateForm: {
                    oldPassword: '',
                    password: '',
                    checkPassword: '',
                    verifyCode: ''
                },
                bookSearch: {
                    name: "",
                    author: "",
                    filtrate: ""
                },
                bookReserveForm: {
                    isbn: '',
                    remark: ''
                },
                // 表单验证
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
                rules_passwordUpdateForm: {
                    oldPassword: [
                        {validator: validateOldPassword, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: validateCheckPassword, trigger: 'blur'}
                    ],
                    verifyCode: [
                        {validator: checkVerifyCode, trigger: 'blur'}
                    ]
                },
                // 列表
                bookList: [],
                bookListLoading: false,
                bookListCurrentPage: 1,
                bookListPageSizes: [10, 20, 50, 100],
                bookListPageSize: 10,
                bookListPageHideWhenSingle: true,
                bookListTotalSize: 400,
                borrowList: [],
                borrowListLoading: false,
                borrowListCurrentPage: 1,
                borrowListPageSizes: [10, 20, 50, 100],
                borrowListPageSize: 10,
                borrowListPageHideWhenSingle: true,
                borrowListTotalSize: 400,
                // 防止按键连击
                isbnCheckBTLoading: false,
                refreshBorrowBTLoading: false,
                refreshBookBTLoading: false,
                refreshUserBTLoading: false,
                verifySendBTLoading: false,
                passwordUpdateBTLoading: false,
                // ------------------------------
                tableData: [],
                formInline: {
                    user: '',
                    region: ''
                },
                selectedFloor: 1,

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
            // state
            bookState(state) {
                let res;
                switch (state) {
                    case "LEND":
                        res = {state: "借阅中", type: "warning"};
                        break;
                    case "STORE":
                        res = {state: "在库", type: "success"};
                        break
                    case "NOTINCLUDE":
                        res = {state: "未入库", type: "info"};
                        break;
                    default:
                        res = {state: "信息缺失", type: "info"};
                        break;
                }
                return res;
            },
            borrowState(state) {
                let res;
                switch (state) {
                    case "BORROW":
                        res = {state: "借阅中", type: ""};
                        break;
                    case "RETURN":
                        res = {state: "已归还", type: "success"};
                        break;
                    case "OVERDUE":
                        res = {state: "预期", type: "warning"};
                        break;
                    case "ACCIDENT":
                        res = {state: "事故", type: "danger"};
                        break;
                    default:
                        res = {state: "信息缺失", type: "danger"};
                        break;
                }
                return res;
            },
            genderState(state) {
                let res;
                switch (state) {
                    case "MALE":
                        res = {state: "男", type: ""};
                        break;
                    case "FEMALE":
                        res = {state: "女", type: ""};
                        break;
                    case "HIDE":
                        res = {state: "隐藏", type: ""};
                        break;
                    default :
                        res = {state: "隐藏", type: ""};
                        break;
                }
                return res;
            },
            // tab变化
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
            // dialog 隐藏和显现
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
                this.bookDetailsDialogVisible = false;
            },
            borrowCreateDialogShowHandle() {
                this.borrowCreateDialogVisible = true;
            },
            borrowCreateDialogHideHandle() {
                this.borrowCreateDialogVisible = false;
            },
            // 提交表单
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
            bookReserveFormSubmitHandle(ev) {

            },
            passwordUpdateFormSubmitHandle() {
                this.passwordUpdateBTLoading = true;
                let v = this;
                this.$refs.passwordUpdateForm.validate((valid) => {
                    if (valid) {
                        $.ajax({
                            type: 'post',
                            url: '/' + this.BASE_URL + '/user/updatepwd',
                            data: JSON.stringify({
                                uid: this.user.uid,
                                password: this.passwordUpdateForm.password,
                                oldPassword: this.passwordUpdateForm.oldPassword,
                                verifyCode: this.passwordUpdateForm.verifyCode
                            }),
                            contentType: "application/json;charset=UTF-8",
                        })
                            .then(r => {
                                let res = JSON.parse(r)
                                this.passwordUpdateBTLoading = false;
                                if (res.res == "success") {
                                    v.user = res.data;
                                    v.user.load = true;
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            $.ajax({
                                                url: '/' + this.BASE_URL + '/user/outlogin',
                                                type: "post",
                                            })
                                                .then(res => {
                                                    if (JSON.parse(res).res == "success") {
                                                        location.href = '/' + this.BASE_URL + '/login'
                                                    }
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })
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
                        this.passwordUpdateBTLoading = false;
                        return false
                    }
                });
            },
            passwordVerifyCodeSendHandle(ev) {
                this.verifySendBTLoading = true;
                $.ajax({
                    url: '/' + this.BASE_URL + '/user/sendverifycode',
                    type: "post",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify({
                        'email': this.user.email,
                    }),
                })
                    .then(r => {
                        this.verifySendBTLoading = false;
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.$message({
                                message: '验证码发送成功',
                                type: 'success',
                                duration: 1500,
                            })

                            const TIME_COUNT = 60;
                            if (!this.timer) {
                                this.count = TIME_COUNT;
                                this.showSendButton = false;
                                this.timer = setInterval(() => {
                                    if (this.count > 0 && this.count <= TIME_COUNT) {
                                        this.count--;
                                    } else {
                                        this.showSendButton = true;
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000)
                            }
                        } else {
                            this.$message({
                                message: res.data,
                                type: 'error',
                                duration: 1500,
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.$message({
                            message: '验证码发送失败',
                            type: 'error',
                            duration: 0,
                            showClose: true,
                        })
                    })
            },
            isbnCheckHandle() {
                if (this.bookReserveForm.isbn == null || this.bookReserveForm.isbn.length != 13) {
                    this.$message({
                        type: 'warn',
                        message: '请输入13位的ISBN码!',
                        duration: 1500,
                    });
                }
                this.isbnCheckBTLoading = true;
                setTimeout(() => {
                    this.isbnCheckBTLoading = false;
                }, 3000)
                $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/book/isbn',
                    data: JSON.stringify({"isbn": this.bookReserveForm.isbn}),
                    contentType: "application/json;charset=UTF-8"
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        Vue.set(this.isbnCheckForm, "data", res.data == null ? {load: false} : res.data)
                        this.isbnCheckForm.load = true;
                        // this.$forceUpdate();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            bookListRowClickHandle(row) {
                console.log(row.bkid, this.bookDetails.bkid)
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
            bookRestoreHandle(row) {
                this.$confirm('是否确认要归还选中书籍?', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: 'post',
                        url: '/' + this.BASE_URL + '/borrow/finish',
                        data: JSON.stringify({
                            bkid: row.bkid,
                            borrowid: row.borrowid
                        }),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                this.$message({
                                    type: 'success',
                                    message: '归还成功!',
                                    duration: 1500,
                                    onClose: async () => {
                                        await this.reqBookList();
                                        await this.reqBorrowList();
                                    }
                                });
                            } else {
                                this.$message({
                                    message: res.data,
                                    type: 'error',
                                    duration: 1500,
                                });
                            }
                        })
                })
                    .catch(err => {
                        this.$message({
                            message: "归还失败",
                            type: 'error',
                            duration: 1500,
                        });
                    })
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
                        v.borrowCreateDialogHideHandle();
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
                                message: res.data,
                                type: 'error',
                                duration: 1500,
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 处理数据
            reloadUserUpdate(formName) {
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
                if (formName != null)
                    this.$refs[formName].clearValidate();
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
            bookListSizeChangeHandle(val) {
                console.log(`每页 ${val} 条`);
            },
            bookListCurrentChangeHandle(val) {
                console.log(`当前页: ${val}`);
            },
            borrowListSizeChangeHandle(val) {
                console.log(`每页 ${val} 条`);
            },
            borrowListCurrentChangeHandle(val) {
                console.log(`当前页: ${val}`);
            },
            // 滚动条回到顶部
            backupHandle(name) {
                this.$refs[name].wrap.scrollTop = 0
            },
            // 刷新数据
            refreshBookListHandle(ev) {
                // 防止按键连点
                this.refreshBookBTLoading = true;
                console.log(this);
                setTimeout(() => {
                    this.refreshBookBTLoading = false;
                }, 3000);

                this.reqBookList()
                    .then((res) => {
                        if (res) {
                            this.$message({
                                message: '刷新成功',
                                type: 'success',
                                duration: 1000,
                            });
                        }
                    })

            },
            refreshUserMsgHandle(ev) {
                // 防止按键连点
                this.refreshUserBTLoading = true;
                setTimeout(() => {
                    this.refreshUserBTLoading = false;
                }, 1500)
                this.reqUserMsg()
                    .then((res) => {
                        if (res) {
                            this.$message({
                                message: '刷新成功',
                                type: 'success',
                                duration: 1000,
                            });
                        }
                    })
            },
            refreshBorrowListHandle() {
                // 防止按键连点
                this.refreshBorrowBTLoading = true;
                setTimeout(() => {
                    this.refreshBorrowBTLoading = false;
                }, 1500)
                this.reqBorrowList()
                    .then((r) => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.$message({
                                message: '刷新成功',
                                type: 'success',
                                duration: 1000,
                            });
                        }else throw new Error(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: err,
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 请求数据
            reqUserMsg() {
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/user/user',
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.user = res.data;
                            this.reloadUserUpdate()
                            this.user.load = true;
                            return true
                        } else throw new Error(res.data);
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: err,
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqBookList() {
                this.bookListLoading = true;
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
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.bookList = res.data;
                            this.bookListLoading = false;
                            return true
                        } else throw new Error(res.data);

                    })
                    .catch(err => {
                        this.bookListLoading = false;
                        console.log(err)
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqBorrowList() {
                this.borrowListLoading = true;
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/borrow/all',
                    data: JSON.stringify({
                        "uid": this.user.uid
                    }),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.borrowList = res.data;
                            this.borrowListLoading = false;
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.borrowListLoading = false;
                        console.log(err)
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
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
                this.$refs[formName].clearValidate();

            },
        },
        computed: {}
    })
}