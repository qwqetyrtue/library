window.onload = function () {
    let cropper = null;

    let app = new Vue({
        el: ".m-container",
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length >= 3 ? '/' + paths[1] + '/' : '';
        },
        async mounted() {
            this.UserPageLoading = true;
            // 查询用户信息
            await this.reqUserMsg();
            // 查询书籍列表
            await this.reqBookList({
                limit: this.bookListPageSize,
                offset: this.bookListPageSize * (this.bookListCurrentPage - 1)
            });
            // 查询借阅列表
            await this.reqBorrowList({
                limit: this.borrowListPageSize,
                offset: this.borrowListPageSize * (this.borrowListCurrentPage - 1)
            });
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
                UserPageLoading: false,
                user: {load: false},
                activeIndex: '1',
                PageTitle: '图书馆,欢迎您!',
                tabIndex1: "预约",
                tabIndex2: "预约座位",
                // dialog
                userUpdateDialogVisible: false,
                bookDetailsDialogVisible: false,
                borrowCreateDialogVisible: false,
                avatarUploadDialogVisible: false,
                seatPickDialogVisible: false,
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

                // 书籍列表
                bookList: [],
                bookListSearch: {
                    bkname: "",
                    atname: "",
                    state: ""
                },
                bookListSearchBTLoading: false,
                bookSearchBTLoading: false,
                bookListLoading: false,
                bookListCurrentPage: 1,
                bookListPageSizes: [5, 10, 20, 50, 100],
                bookListPageSize: 5,
                bookListPageHideWhenSingle: false,
                bookListTotalSize: 0,
                bookListBg: 0,
                bookListEnd: 0,
                // 借阅列表
                borrowList: [],
                borrowListSearch: {
                    state: ""
                },
                borrowSearchStateBTLoading: false,
                borrowListLoading: false,
                borrowListCurrentPage: 1,
                borrowListPageSizes: [5, 10, 20, 50, 100],
                borrowListPageSize: 5,
                borrowListPageHideWhenSingle: false,
                borrowListTotalSize: 0,
                borrowListBg: 0,
                borrowListEnd: 0,

                // 座位
                roomList: [],
                room: {},
                seats: [],
                libraryFloorSelect: "",

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
                },

                scaleFloor: 1,
                scaleStep: 0.1,
                preDownPos: {}
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
            seatState(state) {
                let res;
                switch (state) {
                    case "FREE":
                        res = {state: "空闲", type: "success"};
                        break;
                    case "OCCUPIED":
                        res = {state: "被占", type: "danger"};
                        break;
                    case "ACCIDENT":
                        res = {state: "事故", type: "info"};
                        break;
                    case "OFFLINE":
                        res = {state: "不可用", type: "warning"};
                        break;
                    default:
                        res = {state: "不可用", type: "warning"};
                        break;
                }
                return res;
            },
            // 座位
            seatsToArray(list) {
                if (list.length == 0)
                    return null
                let arr = new Array(this.room.seats).fill(null);
                for (let each in list) {
                    arr[list[each].number - 1] = list[each];
                }
                return arr;
            },
            // tab变化
            userCommandHandle(command) {
                let v = this;
                switch (command) {
                    case "outlogin" :
                        $.ajax({
                            url: window.BASE_URL + window.paths.userOutLogin,
                            type: "post",
                        })
                            .then(res => {
                                if (JSON.parse(res).res == "success") {
                                    v.$message({
                                        message: '退出登录',
                                        type: 'warning',
                                        duration: 1500,
                                        onClose: () => {
                                            location.href = this.BASE_URL + 'login'
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
            seatPickDialogHideHandle() {
                this.seatPickDialogVisible = false;
            },
            seatPickDialogShowHandle() {
                this.seatPickDialogVisible = true;
            },
            avatarUploadDialogHideHandle() {
                this.avatarUploadDialogVisible = false;
            },
            avatarUploadDialogShowHandle() {
                this.avatarUploadDialogVisible = true;
            },
            // 提交表单
            userUpdateFormSubmitHandle() {
                let v = this;
                this.$refs.userUpdateForm.validate((valid) => {
                    if (valid) {
                        $.ajax({
                            type: 'post',
                            url: window.BASE_URL + window.paths.userUpdate,
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
                            url: window.BASE_URL + window.paths.userUpdatePwd,
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
                                                url: window.BASE_URL + window.paths.userOutLogin,
                                                type: "post",
                                            })
                                                .then(res => {
                                                    if (JSON.parse(res).res == "success") {
                                                        location.href = this.BASE_URL + '/login'
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
                    url: window.BASE_URL + window.paths.userSendVerifyCode,
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
                    url: window.BASE_URL + window.paths.bookISBN,
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
                    url: window.BASE_URL + window.paths.bookDetails,
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
            createBorrowFormSubmitHandle() {
                let v = this;
                $.ajax({
                    type: 'post',
                    url: window.BASE_URL + window.paths.borrowCreate,
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
                                    await this.reqBookList({
                                        limit: this.bookListPageSize,
                                        offset: this.bookListPageSize * (this.bookListCurrentPage - 1)
                                    });
                                    await this.reqBorrowList({
                                        limit: this.borrowListPageSize,
                                        offset: this.borrowListPageSize * (this.borrowListCurrentPage - 1)
                                    });
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
            // 处理用更新表单的数据
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
            // 创建借阅表单按点击事件
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
            // 显示座位选择页面点击事件
            async showSeatPickHandle(row) {
                this.room = JSON.parse(JSON.stringify(row));
                this.room.seat = JSON.parse(this.room.seat);
                await this.reqSeats(row);
                this.seatPickDialogShowHandle();
            },
            // 书籍列表分页变化事件
            bookListSizeChangeHandle(val) {
                // 单页数减小
                if (this.bookListPageSize > val) {
                    this.bookListPageSize = val;
                } else {
                    let page = this.bookListCurrentPage;
                    let bg = (page - 1) * val;
                    let end = bg + val;
                    // 判断当前页在切换单页显示数目后还是否存在
                    while (bg > this.bookListTotalSize) {
                        bg -= val;
                        page--;
                        end = bg + val;
                    }
                    // 判断显示的这页数据是否包含在已经获取到的数据中
                    if (bg < this.bookListBg || end > this.bookListEnd) {
                        this.bookListPageSize = val;
                        this.reqBookList({
                            limit: val,
                            offset: bg
                        }).then(() => {
                            this.bookListCurrentPage = page;
                        })
                    }
                    this.bookListPageSize = val;
                }
            },
            bookListCurrentChangeHandle(val) {
                // 判断显示的这页数据是否包含在已经获取到的数据中
                let bg = (val - 1) * this.bookListPageSize;
                let end = bg + this.bookListPageSize;
                if (bg < this.bookListBg || end > this.bookListEnd) {
                    this.reqBookList({
                        limit: this.bookListPageSize,
                        offset: bg
                    }).then(() => {
                        console.log("2:page=>", val)
                        this.bookListCurrentPage = val;
                    })
                } else this.bookListCurrentPage = val;
            },
            // 借阅列表分页变化事件
            borrowListSizeChangeHandle(val) {
                // 单页数减小
                if (this.borrowListPageSize > val) {
                    this.borrowListPageSize = val;
                } else {
                    let page = this.borrowListCurrentPage;
                    let bg = (page - 1) * val;
                    let end = bg + val;
                    // 判断当前页在切换单页显示数目后还是否存在
                    while (bg > this.borrowListTotalSize) {
                        bg -= val;
                        page--;
                        end = bg + val;
                    }
                    // 判断显示的这页数据是否包含在已经获取到的数据中
                    if (bg < this.borrowListBg || end > this.borrowListEnd) {
                        this.borrowListPageSize = val;
                        this.reqBorrowList({
                            limit: val,
                            offset: bg
                        }).then(() => {
                            this.borrowListCurrentPage = page;
                        })
                    }
                    this.borrowListPageSize = val;
                }
            },
            borrowListCurrentChangeHandle(val) {
                // 判断显示的这页数据是否包含在已经获取到的数据中
                let bg = (val - 1) * this.borrowListPageSize;
                let end = bg + this.borrowListPageSize;
                if (bg < this.borrowListBg || end > this.borrowListEnd) {
                    this.reqBorrowList({
                        limit: this.borrowListPageSize,
                        offset: bg
                    }).then(() => {
                        console.log("2:page=>", val)
                        this.borrowListCurrentPage = val;
                    })
                } else this.borrowListCurrentPage = val;
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

                this.reqBookList({
                    limit: this.bookListPageSize,
                    offset: this.bookListPageSize * (this.bookListCurrentPage - 1)
                })
                    .then(r => {
                        if (r) {
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
                this.reqBorrowList({
                    limit: this.borrowListPageSize,
                    offset: this.borrowListPageSize * (this.borrowListCurrentPage - 1)
                })
                    .then(r => {
                        if (r) {
                            this.$message({
                                message: '刷新成功',
                                type: 'success',
                                duration: 1000,
                            });
                        }
                    })
            },
            // 请求数据
            reqUserMsg() {
                return $.ajax({
                    type: 'post',
                    url: window.BASE_URL + window.paths.user,
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
                            message: "error",
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqBookList(paging) {
                this.bookListBg = paging.offset;
                this.bookListEnd = paging.offset + paging.limit;
                this.bookListLoading = true;
                let filtrate = {atname: this.bookListSearch.atname, bkname: this.bookListSearch.bkname}
                if (this.bookListSearch.state != "") {
                    filtrate.state = this.bookListSearch.state;
                }
                return $.ajax({
                    type: 'post',
                    url: window.BASE_URL + window.paths.bookFiltrate,
                    data: JSON.stringify({...filtrate, ...paging}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            console.log(res)
                            this.bookList = res.data;
                            this.bookListTotalSize = res.total;
                            this.bookListLoading = false;
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.bookListLoading = false;
                        console.log(err)
                        this.$message({
                            message: "error",
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqBorrowList(paging) {
                this.borrowListBg = paging.offset;
                this.borrowListEnd = paging.offset + paging.limit;
                this.userListLoading = true;
                let filtrate;
                if (this.borrowListSearch.state != '') {
                    filtrate = {uid: this.user.uid, state: this.borrowListSearch.state};
                } else filtrate = {uid: this.user.uid};
                return $.ajax({
                    type: 'post',
                    url: window.BASE_URL + window.paths.borrowFiltrate,
                    data: JSON.stringify({...filtrate, ...paging}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            console.log(res)
                            this.borrowList = res.data;
                            this.borrowListTotalSize = res.total;
                            this.borrowListLoading = false;
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.borrowListLoading = false;
                        console.log(err)
                        this.$message({
                            message: "error",
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqRoomList() {
                let filtrate = {};
                if (this.libraryFloorSelect != '') {
                    filtrate.location = this.libraryFloorSelect;
                }
                return $.ajax({
                    type: 'post',
                    url: window.BASE_URL + window.paths.rooms,
                    data: JSON.stringify({...filtrate}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.roomList = res.data;
                            return true
                        } else throw new Error(res.data);
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: "error",
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqSeats(row) {
                return $.ajax({
                    type: 'post',
                    url: window.BASE_URL + window.paths.seats,
                    data: JSON.stringify({roomid: row.roomid}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r)
                        if (res.res == "success") {
                            this.seats = this.seatsToArray(res.data);
                            if (this.seats == null)
                                this.seats = [];
                            return true
                        } else throw new Error(res.data);
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: "error",
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 借阅列表选择框筛选
            borrowSearchStateChangeHandle() {
                this.borrowSearchStateBTLoading = true;
                setTimeout(() => {
                    this.borrowSearchStateBTLoading = false;
                }, 2500)
                this.refreshBorrowListHandle();
            },
            // 楼层筛选
            libraryFloorChangeHandle() {
                this.reqRoomList();
            },
            // 书籍搜索按钮点击事件
            submitBookSearchHandle() {
                this.bookListSearchBTLoading = true;
                setTimeout(() => {
                    this.bookListSearchBTLoading = false;
                }, 2000)
                this.reqBookList({
                    limit: this.bookListPageSize,
                    offset: this.bookListPageSize * (this.bookListCurrentPage - 1)
                })
            },
            // 预约座位
            reserveSeatHandle(row) {
                this.$confirm('是否预约这个座位', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '预约成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消'
                    });
                })
            },
            // 重置表单
            formResetHandle(formName) {
                this.$refs[formName].resetFields();
                this.$refs[formName].clearValidate();

            },
            // 选择文件
            selectFileHandle() {
                if (cropper) {
                    cropper.destroy()
                }
                document.querySelector('.m-file-select-bt').value = null;
                document.querySelector('.m-file-select-bt').click()
            },
            fileSelectChangeHandle(eve) {
                console.log(eve.target.files)
                let reader = new FileReader();
                if (eve.target.files[0]) {
                    //readAsDataURL方法可以将File对象转化为data:URL格式的字符串（base64编码）
                    reader.readAsDataURL(eve.target.files[0]);
                    reader.onload = (e) => {
                        let dataURL = reader.result;
                        //将img的src改为刚上传的文件的转换格式
                        document.querySelector('#image').src = dataURL;
                        this.initCropper("#image")
                    }
                    this.avatarUploadDialogShowHandle();
                }
            },
            initCropper(selectors) {
                cropper = new Cropper(document.querySelector(selectors), {
                    aspectRatio: 1,
                    viewMode: 1,
                    minContainerWidth: 500,
                    minContainerHeight: 500,
                    minCanvasWidth: 200,
                    minCanvasHeight: 200,
                    dragMode: 'move',
                    minCropBoxWidth: 100,
                    minCropBoxHeight: 100,
                    movable: true,
                    preview: [document.querySelector(".m-avatar-preview>div:nth-child(1)"),
                        document.querySelector(".m-avatar-preview>div:nth-child(2)")],
                });
                window.cropper = cropper;
            },
            imageRotateHandle(deg) {
                console.log(1)
                if (cropper)
                    cropper.rotate(deg);
            },
            imageScaleXHandle() {
                if (cropper) {
                    if (cropper.sx == -1) {
                        cropper.scaleX(1)
                        cropper.sx = 1;
                    } else {
                        cropper.scaleX(-1)
                        cropper.sx = -1;
                    }
                }
            },
            imageScaleYHandle() {
                if (cropper) {
                    if (cropper.sy == -1) {
                        cropper.scaleY(1)
                        cropper.sy = 1;
                    } else {
                        cropper.scaleY(-1)
                        cropper.sy = -1;
                    }
                }
            },
            imageResetHandle() {
                if (cropper)
                    cropper.reset();
            },
            imageCropHandle() {
                if (cropper) {
                    this.getCroppedImage(cropper)
                        .then(res => {
                            if (res) {
                                let data = new FormData();
                                data.append('name', this.user.uid + '_avatar.jpg');
                                data.append('img', res);
                                return $.ajax({
                                    type: 'post',
                                    url: window.BASE_URL + window.paths.imageUpdate,
                                    data: data,
                                    contentType: false,
                                    processData: false
                                })
                            }
                        })
                        .then(r => {
                            let res = JSON.parse(r);
                            if(res.res == "success"){
                                this.user.avatar = res.data.url;
                                this.$message({
                                    message: '头像上传成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: ()=>{
                                        this.avatarUploadDialogHideHandle();
                                    }
                                });
                            }else {
                                this.avatarUploadDialogHideHandle();
                                this.$message({
                                    message: "头像上传失败",
                                    type: 'error',
                                    showClose: true,
                                    duration: 0,
                                });
                            }
                        })

                }
            },
            getCroppedImage(cropper) {
                return new Promise((resolve, reject) => {
                    if (cropper) {
                        cropper.getCroppedCanvas({
                            maxWidth: 4096,
                            maxHeight: 4096,
                            fillColor: '#fff',
                            imageSmoothingEnabled: true,
                            imageSmoothingQuality: 'high',
                        }).toBlob(blob => {
                            resolve(blob);
                        }, 'image/jpeg', 1)
                    } else {
                        resolve(null);
                    }
                })
            }
        },
        computed: {
            // 渲染在页面中的分页数据
            borrowListPaging() {
                let bg = (this.borrowListCurrentPage - 1) * this.borrowListPageSize;
                let end = bg + this.borrowListPageSize;
                return this.borrowList.slice(bg - this.borrowListBg, bg - this.borrowListBg + this.borrowListPageSize);
            },
            bookListPaging() {
                let bg = (this.bookListCurrentPage - 1) * this.bookListPageSize;
                let end = bg + this.bookListPageSize;
                return this.bookList.slice(bg - this.bookListBg, bg - this.bookListBg + this.bookListPageSize);
            },
        },
        //自定义指令
        directives: {
            drag: {
                // 指令的定义
                bind: function (el) {
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
                    oDiv.onwheel = (e) => {
                        console.log(e)
                        let zoom = parseFloat(oDiv.style.zoom);
                        let tZoom = zoom + (e.wheelDelta > 0 ? 0.05 : -0.05);
                        if (tZoom > 2 || tZoom < 0.5) return true;
                        oDiv.style.zoom = tZoom;
                    }
                }
            }
        },
    })
}

window.paths = {
    userOutLogin : 'user/outlogin',
    userUpdate: 'user/update',
    userUpdatePwd: 'user/updatepwd',
    userSendVerifyCode: 'user/sendverifycode',
    bookISBN: 'book/isbn',
    bookDetails: 'book/details',
    borrowCreate: 'borrow/create',
    user: 'user/user',
    bookFiltrate: 'book/filtrate',
    borrowFiltrate: 'borrow/filtrate',
    rooms: 'room/rooms',
    seats: 'seat/room',
    imageUpdate: 'file/image/upload',
}