window.onload = function () {
    let app = new Vue({
        el: ".m-container",
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length == 3 ? paths[1] : '';
        },
        async mounted() {
            this.AdminPageLoading = true;
            await this.reqAdminMsg()
                .catch(err => {
                    this.$message({
                        message: '出现未知错误,请重新登陆',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.adminOutLoginHandle();
                        }
                    });
                })
            await this.reqUserList({
                limit: this.userListPageSize,
                offset: 0
            }, true)
                .catch(err => {
                    this.$message({
                        message: '出现未知错误',
                        type: 'error',
                        showClose: true,
                        duration: 0,
                    });
                })
            this.AdminPageLoading = false;
            await this.reqBookList({
                limit: this.bookListPageSize,
                offset: 0
            }, true)
                .catch(err => {
                    this.$message({
                        message: '出现未知错误',
                        type: 'error',
                        showClose: true,
                        duration: 0,
                    });
                })
            await this.reqBorrowList({
                limit: this.borrowListPageSize,
                offset: 0
            }, true)
                .catch(err => {
                    this.$message({
                        message: '出现未知错误',
                        type: 'error',
                        showClose: true,
                        duration: 0,
                    });
                })
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
            return {
                BASE_URL: "",
                admin: {},
                menuValue: "1",
                AdminPageLoading: false,
                /** --------------用户列表源数据-------------- **/
                userList: [],
                userListBg: 0,
                userListEnd: 0,
                userListLoading: false,
                userListCurrentPage: 1,
                userListPageSizes: [5, 10, 20, 50, 100],
                userListPageSize: 5,
                userListPageHideWhenSingle: false,
                userListTotalSize: 0,
                // 按键防止连点
                refreshUserBTLoading: false,
                submitUserSearchBTLoading: false,
                // drawer显示
                userMsgDrawerVisible: false,
                // 修改用户表单
                userUpdateForm: {},
                userUpdateForm_cp: {},
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
                // 搜索表单
                userSearchConfigForm: {
                    uid: "",
                    name: "",
                    gender: "",
                    homeadd: "",
                    presentadd: "",
                    email: "",
                    call: "",
                    postcode: "",
                    bloodtype: ""
                },
                userSearchConfigChecked: {
                    base: false,
                    gender: false,
                    homeadd: false,
                    presentadd: false,
                    email: false,
                    call: false,
                    postcode: false,
                    bloodtype: false
                },
                /** --------------书籍列表源数据-------------- **/
                bookList: [],
                bookListBg: 0,
                bookListEnd: 0,
                bookListLoading: false,
                bookListCurrentPage: 1,
                bookListPageSizes: [5, 10, 20, 50, 100],
                bookListPageSize: 5,
                bookListPageHideWhenSingle: false,
                bookListTotalSize: 0,
                // 按键防止连点
                refreshBookBTLoading: false,
                submitBookSearchBTLoading: false,
                // drawer显示
                bookMsgDrawerVisible: false,
                // 修改用户表单
                bookUpdateForm: {},
                bookUpdateForm_cp: {},
                rules_bookUpdateForm: {},
                // 搜索表单
                bookSearchConfigForm: {
                    bkname: "",
                    atname: "",
                    bkid: "",
                    isbn: "",
                    isbn10: "",
                    language: "",
                    binding: "",
                    chinaclass: "",
                    state: "",
                },
                bookSearchConfigChecked: {
                    base: false,
                    bkid: false,
                    isbn: false,
                    isbn10: false,
                    language: false,
                    binding: false,
                    chinaclass: false,
                    state: false,
                },
                // 远程搜索
                bookAuthorSelectLoading: false,
                bookAuthorSelectOption: [],
                /** --------------借阅列表源数据-------------- **/
                borrowList: [],
                borrowListBg: 0,
                borrowListEnd: 0,
                borrowListLoading: false,
                borrowListCurrentPage: 1,
                borrowListPageSizes: [5, 10, 20, 50, 100],
                borrowListPageSize: 5,
                borrowListPageHideWhenSingle: false,
                borrowListTotalSize: 0,
                // 按键防止连点
                refreshBorrowBTLoading: false,
                submitBorrowSearchBTLoading: false,
                // drawer显示
                borrowMsgDrawerVisible: false,
                // 修改用户表单
                borrowUpdateForm: {},
                borrowUpdateForm_cp: {},
                rules_borrowUpdateForm: {},
                // 搜索表单
                borrowSearchConfigForm: {
                    borrowid: "",
                    bkid: "",
                    uid: ""
                },
                borrowSearchConfigChecked: {
                    base: false,
                },
                // 远程搜索
                borrowUserSelectLoading: false,
                borrowUserSelectOption: [],
                borrowBookSelectLoading: false,
                borrowBookSelectOption: [],


            }
        },
        methods: {
            /*禁选菜单栏第一个*/
            tabsMsgHandle(activeName, oldActiveName) {
                console.log(activeName)
                if (activeName == "0")
                    return false;
            },
            // state
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
            // 滚动条回到顶部
            backupHandle(name) {
                this.$refs[name].wrap.scrollTop = 0
            },
            // 重置表单
            formResetHandle(formName) {
                this.$refs[formName].resetFields();
                this.$refs[formName].clearValidate();
            },
            // 请求管理员信息
            reqAdminMsg() {
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/admin',
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.admin = res.data;
                            return true;
                        } else throw new Error();
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
            // 管理员退出登录
            adminOutLoginHandle() {
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/outlogin',
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.$message({
                                message: '退出登录',
                                type: 'success',
                                showClose: true,
                                duration: 1500,
                                onClose: () => {
                                    location.href = "/" + this.BASE_URL + "/librarian"
                                }
                            });
                            return true;
                        } else throw new Error();
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
            // 菜单选项
            menuChoseHandle(command) {
                switch (command) {
                    case "changepsw":
                        break;
                    case "changeavatar":
                        break;
                    case "outlogin":
                        this.adminOutLoginHandle();
                        break;
                }
            },
            /** --------------用户列表-------------- **/
            // 请求用户数据 flag为真不启用筛选
            reqUserList(paging, flag) {
                this.userListBg = paging.offset;
                this.userListEnd = paging.offset + paging.limit;
                let filtrate = null
                if (!flag) {
                    filtrate = {}
                    for (let each in this.userSearchConfigChecked) {
                        if (each === "base") {
                            if (this.userSearchConfigChecked[each]) {
                                filtrate.uid = this.userSearchConfigForm.uid;
                                filtrate.name = this.userSearchConfigForm.name;
                            }
                        } else if (this.userSearchConfigChecked[each]) {
                            filtrate[each] = this.userSearchConfigForm[each];
                        }
                    }
                    console.log(filtrate)
                }
                this.userListLoading = true;
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/users',
                    data: JSON.stringify({...paging, ...filtrate}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.userList = res.data
                            this.userListTotalSize = res.total;
                            this.userListLoading = false;
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.userListLoading = false;
                        console.log(err)
                        throw  err;
                    })
            },
            // 刷新用户表格
            refreshUserListHandle() {
                // 防止按键连点
                this.refreshUserBTLoading = true;
                setTimeout(() => {
                    this.refreshUserBTLoading = false;
                }, 1500)
                this.reqUserList({
                    limit: this.userListPageSize,
                    offset: this.userListPageSize * (this.userListCurrentPage - 1)
                })
                    .then(res => {
                        this.$message({
                            message: '刷新成功',
                            type: 'success',
                            duration: 1000,
                        });
                    })
                    .catch(err => {
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 提交用户查询
            submitUserSearchHandle() {
                this.submitUserSearchBTLoading = true;
                setTimeout(() => {
                    this.submitUserSearchBTLoading = false;
                }, 1500)
                this.reqUserList({
                    limit: this.userListPageSizes[0],
                    offset: 0
                })
                    .then(res => {
                        this.userListPageSize = this.userListPageSizes[0];
                        this.userListCurrentPage = 1;
                        this.$message({
                            message: '查询成功',
                            type: 'success',
                            duration: 1000,
                        });
                    })
                    .catch(err => {
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 分页修改
            userListSizeChangeHandle(val) {
                // 单页数减小
                // 原来单页数量比总条数大 -> 只有一页,在加大单页数,不查询
                if (this.userListTotalSize <= this.userListPageSize) {
                    this.userListPageSize = val;
                } else if (this.userListPageSize > val) {
                    this.userListPageSize = val;
                } else {
                    let page = this.userListCurrentPage;
                    let bg = (page - 1) * val;
                    let end = bg + val;
                    // 判断当前页在切换单页显示数目后还是否存在
                    while (bg > this.userListTotalSize) {
                        bg -= val;
                        page--;
                        end = bg + val;
                    }
                    // 判断显示的这页数据是否包含在已经获取到的数据中
                    if (bg < this.userListBg || end > this.userListEnd) {
                        this.userListPageSize = val;
                        this.reqUserList({
                            limit: val,
                            offset: bg
                        }).then(() => {
                            this.userListCurrentPage = page;
                        })
                            .catch(err => {
                                this.$message({
                                    message: '出现未知错误',
                                    type: 'error',
                                    showClose: true,
                                    duration: 0,
                                });
                            })
                    }
                    this.userListPageSize = val;
                }
            },
            userListCurrentChangeHandle(val) {
                // 判断显示的这页数据是否包含在已经获取到的数据中
                let bg = (val - 1) * this.userListPageSize;
                let end = bg + this.userListPageSize;
                if (bg < this.userListBg || end > this.userListEnd) {
                    this.reqUserList({
                        limit: this.userListPageSize,
                        offset: bg
                    }).then(() => {
                        console.log("2:page=>", val)
                        this.userListCurrentPage = val;
                    })
                        .catch(err => {
                            this.$message({
                                message: '出现未知错误',
                                type: 'error',
                                showClose: true,
                                duration: 0,
                            });
                        })
                } else this.userListCurrentPage = val;
            },
            userMsgUpdateHandle(row) {
                this.userUpdateForm = JSON.parse(JSON.stringify(row));
                this.userUpdateForm_cp = row;
                this.userMsgDrawerShowHandle();
            },
            // drawer显示/隐藏
            userMsgDrawerHideHandle() {
                this.userMsgDrawerVisible = false;
            },
            userMsgDrawerShowHandle() {
                this.userMsgDrawerVisible = true;
            },
            // drawer关闭前触发
            userMsgBeforeCloseHandle(done) {
                done();
            },
            // 表单提交
            userUpdateFormSubmitHandle() {
                this.$confirm('是否提交修改信息?', '提示', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("修改")
                    this.reqUserUpdateSubmit()
                        .then(res => {
                            if (res) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            } else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error',
                                    duration: 1500,
                                });
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            // 删除提交
            userMsgDeleteHandle(row) {
                this.$confirm('是否确认删除选中用户的信息?', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reqUserDeleteSubmit(row)
                        .then(res => {
                            if (res) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error',
                                    duration: 1500,
                                });
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            // 重置用户更新表单
            userUpdateFormResetHandle() {
                this.userUpdateForm = JSON.parse(JSON.stringify(this.userUpdateForm_cp))
            },
            // 提交修改请求
            reqUserUpdateSubmit() {
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/users/update',
                    data: JSON.stringify(this.userUpdateForm),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            let i = this.userList.indexOf(this.userUpdateForm_cp)
                            for (let each in this.userUpdateForm) {
                                this.userList[i][each] = this.userUpdateForm[each];
                            }
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.userListLoading = false;
                        console.log(err)
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            reqUserDeleteSubmit(row) {
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/users/delete',
                    data: JSON.stringify(row),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            let i = this.userList.indexOf(this.userUpdateForm_cp)
                            this.userList[i].logout = res.data;
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.userListLoading = false;
                        console.log(err)
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            /** --------------书籍列表-------------- **/
            // 请求用户数据 flag为真不启用筛选
            reqBookList(paging, flag) {
                this.bookListBg = paging.offset;
                this.bookListEnd = paging.offset + paging.limit;
                let filtrate = null
                if (!flag) {
                    filtrate = {}
                    for (let each in this.bookSearchConfigChecked) {
                        if (each === "base") {
                            if (this.bookSearchConfigChecked[each]) {
                                filtrate.bkname = this.bookSearchConfigForm.bkname;
                                filtrate.atname = this.bookSearchConfigForm.atname;
                            }
                        } else if (this.bookSearchConfigChecked[each]) {
                            filtrate[each] = this.bookSearchConfigForm[each];
                        }
                    }
                    console.log(filtrate)
                }
                this.bookListLoading = true;
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/books',
                    data: JSON.stringify({...paging, ...filtrate}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.bookList = res.data
                            this.bookListTotalSize = res.total;
                            this.bookListLoading = false;
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.bookListLoading = false;
                        console.log(err)
                        throw err;
                    })
            },
            // 刷新用户表格
            refreshBookListHandle() {
                // 防止按键连点
                this.refreshBookBTLoading = true;
                setTimeout(() => {
                    this.refreshBookBTLoading = false;
                }, 1500)
                this.reqBookList({
                    limit: this.bookListPageSize,
                    offset: this.bookListPageSize * (this.bookListCurrentPage - 1)
                })
                    .then(res => {
                        this.$message({
                            message: '刷新成功',
                            type: 'success',
                            duration: 1000,
                        });
                    })
                    .catch(err => {
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 提交用户查询
            submitBookSearchHandle() {
                this.submitBookSearchBTLoading = true;
                setTimeout(() => {
                    this.submitBookSearchBTLoading = false;
                }, 1500)
                this.reqBookList({
                    limit: this.bookListPageSizes[0],
                    offset: 0
                })
                    .then(res => {
                        this.bookListPageSize = this.bookListPageSizes[0];
                        this.bookListCurrentPage = 1;
                        this.$message({
                            message: '查询成功',
                            type: 'success',
                            duration: 1000,
                        });
                    })
                    .catch(err => {
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 分页修改
            bookListSizeChangeHandle(val) {
                // 单页数减小
                // 原来单页数量比总条数大 -> 只有一页,在加大单页数,不查询
                if (this.bookListTotalSize <= this.bookListPageSize) {
                    this.bookListPageSize = val;
                } else if (this.bookListPageSize > val) {
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
                            .catch(err => {
                                this.$message({
                                    message: '出现未知错误',
                                    type: 'error',
                                    showClose: true,
                                    duration: 0,
                                });
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
                        .catch(err => {
                            this.$message({
                                message: '出现未知错误',
                                type: 'error',
                                showClose: true,
                                duration: 0,
                            });
                        })
                } else this.bookListCurrentPage = val;
            },
            bookMsgUpdateHandle(row) {
                this.bookUpdateForm_cp = row;
                this.bookUpdateFormResetHandle();
                this.bookMsgDrawerShowHandle();
            },
            // drawer显示/隐藏
            bookMsgDrawerHideHandle() {
                this.bookMsgDrawerVisible = false;
            },
            bookMsgDrawerShowHandle() {
                this.bookMsgDrawerVisible = true;
            },
            // drawer关闭前触发
            bookMsgBeforeCloseHandle(done) {
                done();
            },
            // 表单提交
            bookUpdateFormSubmitHandle() {
                this.$confirm('是否提交修改信息?', '提示', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("修改")
                    this.reqBookUpdateSubmit()
                        .then(res => {
                            if (res) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            } else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error',
                                    duration: 1500,
                                });
                            }
                        })
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            // 删除提交
            bookMsgDeleteHandle(row) {
                this.$confirm('是否确认删除选中用户的信息?', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reqBookDeleteSubmit(row)
                        .then(res => {
                            if (res) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error',
                                    duration: 1500,
                                });
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            // 重置用户更新表单
            bookUpdateFormResetHandle() {
                this.bookUpdateForm = JSON.parse(JSON.stringify(this.bookUpdateForm_cp))
                this.resetBookImgsHandle();
                this.bookAuthorSelectOption = []
                this.bookAuthorSelectOption.push({atid: this.bookUpdateForm.atid, name: this.bookUpdateForm.atname})
                this.$set(this.bookUpdateForm, "author", this.bookUpdateForm.atid);
            },
            // 重置图片列表
            resetBookImgsHandle() {
                let arr = this.bookUpdateForm_cp.imgs.split("|");
                this.$set(this.bookUpdateForm, "imgsArr", arr)
            },
            // 添加新图片项
            addBookImgsHandle() {
                this.bookUpdateForm.imgsArr.push("");
            },
            // 移除图片项
            removeBookImgsHandle(i) {
                this.bookUpdateForm.imgsArr.splice(i, 1)
            },
            // 提交修改请求
            reqBookUpdateSubmit() {
                let data = JSON.parse(JSON.stringify(this.bookUpdateForm))
                delete data.atname;
                data.atid = data.author;
                delete data.author;
                data.name = data.bkname;
                delete data.bkname;
                data.imgs = "";
                for (let i in data.imgsArr) {
                    if (data.imgsArr[i].trim() !== '')
                        data.imgs += (data.imgsArr[i].trim() + '|');
                }
                data.imgs = data.imgs.substring(0, data.imgs.length - 1)
                delete data.imgsArr;
                console.log(data);
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/books/update',
                    data: JSON.stringify(data),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.reqBookList({
                                limit: this.userListPageSize,
                                offset: this.userListPageSize * (this.userListCurrentPage - 1)
                            }, true)
                            return true;
                        } else throw new Error();
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
            reqBookDeleteSubmit(row) {
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/books/delete',
                    data: JSON.stringify(row),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            let i = this.bookList.indexOf(this.bookUpdateForm_cp)
                            this.bookList[i].logout = res.data;
                            return true;
                        } else throw new Error();
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
            // 查询作者
            bookAuthorRemoteHandle(query) {
                if (query !== '') {
                    this.bookAuthorSelectLoading = true;
                    $.ajax({
                        type: 'post',
                        url: '/' + this.BASE_URL + '/admin/books/authors',
                        data: JSON.stringify({name: query}),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                this.bookAuthorSelectOption = [];
                                this.bookAuthorSelectOption.push({atid: this.bookUpdateForm.atid, name: this.bookUpdateForm.atname})
                                let options = res.data.filter(item => {
                                    return item.atid !== this.bookAuthorSelectOption[0].atid;
                                });
                                this.bookAuthorSelectOption = [...this.bookAuthorSelectOption, ...options];
                                console.log(this.bookAuthorSelectOption)
                                this.bookAuthorSelectLoading = false;
                                return true;
                            } else throw new Error();
                        })
                        .catch(err => {
                            console.log(err)
                            throw err;
                        })
                } else {
                    this.bookAuthorSelectOption = [];
                }
            },
            /** --------------借阅列表-------------- **/
            // 请求用户数据 flag为真不启用筛选
            reqBorrowList(paging, flag) {
                this.borrowListBg = paging.offset;
                this.borrowListEnd = paging.offset + paging.limit;
                let filtrate = null
                if (!flag) {
                    filtrate = {}
                    for (let each in this.borrowSearchConfigChecked) {
                        if (each === "base") {
                            if (this.borrowSearchConfigChecked[each]) {
                                filtrate.borrowid = this.borrowSearchConfigForm.borrowid;
                                filtrate.uid = this.borrowSearchConfigForm.uid;
                                filtrate.bkid = this.borrowSearchConfigForm.bkid;
                            }
                        } else if (this.borrowSearchConfigChecked[each]) {
                            filtrate[each] = this.borrowSearchConfigForm[each];
                        }
                    }
                    console.log(filtrate)
                }
                this.borrowListLoading = true;
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/borrows',
                    data: JSON.stringify({...paging, ...filtrate}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.borrowList = res.data
                            this.borrowListTotalSize = res.total;
                            this.borrowListLoading = false;
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.borrowListLoading = false;
                        console.log(err)
                        throw  err;
                    })
            },
            // 刷新用户表格
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
                    .then(res => {
                        this.$message({
                            message: '刷新成功',
                            type: 'success',
                            duration: 1000,
                        });
                    })
                    .catch(err => {
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 提交用户查询
            submitBorrowSearchHandle() {
                this.submitBorrowSearchBTLoading = true;
                setTimeout(() => {
                    this.submitBorrowSearchBTLoading = false;
                }, 1500)
                this.reqBorrowList({
                    limit: this.borrowListPageSizes[0],
                    offset: 0
                })
                    .then(res => {
                        this.borrowListPageSize = this.borrowListPageSizes[0];
                        this.borrowListCurrentPage = 1;
                        this.$message({
                            message: '查询成功',
                            type: 'success',
                            duration: 1000,
                        });
                    })
                    .catch(err => {
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 分页修改
            borrowListSizeChangeHandle(val) {
                // 单页数减小
                // 原来单页数量比总条数大 -> 只有一页,在加大单页数,不查询
                if (this.borrowListTotalSize <= this.borrowListPageSize) {
                    this.borrowListPageSize = val;
                } else if (this.borrowListPageSize > val) {
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
                            .catch(err => {
                                this.$message({
                                    message: '出现未知错误',
                                    type: 'error',
                                    showClose: true,
                                    duration: 0,
                                });
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
                        .catch(err => {
                            this.$message({
                                message: '出现未知错误',
                                type: 'error',
                                showClose: true,
                                duration: 0,
                            });
                        })
                } else this.borrowListCurrentPage = val;
            },
            borrowMsgUpdateHandle(row) {
                this.borrowUpdateForm_cp = row;
                this.borrowUpdateFormResetHandle();
                this.borrowMsgDrawerShowHandle();
            },
            // drawer显示/隐藏
            borrowMsgDrawerHideHandle() {
                this.borrowMsgDrawerVisible = false;
            },
            borrowMsgDrawerShowHandle() {
                this.borrowMsgDrawerVisible = true;
            },
            // drawer关闭前触发
            borrowMsgBeforeCloseHandle(done) {
                done();
            },
            // 表单提交
            borrowUpdateFormSubmitHandle() {
                this.$confirm('是否提交修改信息?', '提示', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("修改")
                    this.reqBorrowUpdateSubmit()
                        .then(res => {
                            if (res) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            } else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error',
                                    duration: 1500,
                                });
                            }
                        })
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            // 删除提交
            borrowMsgDeleteHandle(row) {
                this.$confirm('是否确认删除选中用户的信息?', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reqBorrowDeleteSubmit(row)
                        .then(res => {
                            if (res) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error',
                                    duration: 1500,
                                });
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作取消'
                    });
                });
            },
            // 重置用户更新表单
            borrowUpdateFormResetHandle() {
                this.borrowUpdateForm = JSON.parse(JSON.stringify(this.borrowUpdateForm_cp))
                this.borrowBookSelectOption = []
                this.borrowBookSelectOption.push({bkid: this.borrowUpdateForm.bkid, name: this.borrowUpdateForm.bkname})
                this.$set(this.borrowUpdateForm, "book", this.borrowUpdateForm.bkid);

                this.borrowUserSelectOption = []
                this.borrowUserSelectOption.push({uid: this.borrowUpdateForm.uid, name: this.borrowUpdateForm.uname})
                this.$set(this.borrowUpdateForm, "user", this.borrowUpdateForm.uid);
            },
            // 提交修改请求
            reqBorrowUpdateSubmit() {
                let data = JSON.parse(JSON.stringify(this.borrowUpdateForm));
                data.uid = data.user;
                data.bkid = data.book;
                if(data.createtime != '')
                    data.createtime = new Date(data.createtime).valueOf();
                if(data.returntime != '')
                    data.returntime = new Date(data.returntime).valueOf();
                if(data.limittime != '')
                    data.limittime = new Date(data.limittime).valueOf();
                delete data.user;
                delete data.book;
                delete data.uname;
                delete data.bkname;
                delete data.time;
                delete data.timeleft;
                console.log(data)
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/borrows/update',
                    data: JSON.stringify(data),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            let i = this.borrowList.indexOf(this.borrowUpdateForm_cp)
                            for (let each in this.borrowUpdateForm) {
                                this.borrowList[i][each] = this.borrowUpdateForm[each];
                            }
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
            reqBorrowDeleteSubmit(row) {
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/borrows/delete',
                    data: JSON.stringify(row),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            let i = this.borrowList.indexOf(this.borrowUpdateForm_cp)
                            this.borrowList[i].logout = res.data;
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
            borrowUserRemoteHandle(query) {
                if (query !== '') {
                    this.borrowUserSelectLoading = true;
                    $.ajax({
                        type: 'post',
                        url: '/' + this.BASE_URL + '/admin/borrows/users',
                        data: JSON.stringify({name: query}),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                this.borrowUserSelectOption = [];
                                this.borrowUserSelectOption.push({uid: this.borrowUpdateForm.uid, name: this.borrowUpdateForm.uname})
                                let options = res.data.filter(item => {
                                    return item.uid!== this.borrowUserSelectOption[0].uid;
                                });
                                this.borrowUserSelectOption = [...this.borrowUserSelectOption, ...options];
                                console.log(this.borrowUserSelectOption)
                                this.borrowUserSelectLoading = false;
                                return true;
                            } else throw new Error();
                        })
                        .catch(err => {
                            console.log(err)
                            throw err;
                        })
                } else {
                    this.borrowUserSelectOption = [];
                }
            },
            borrowBookRemoteHandle(query) {
                if (query !== '') {
                    this.borrowBookSelectLoading = true;
                    $.ajax({
                        type: 'post',
                        url: '/' + this.BASE_URL + '/admin/borrows/books',
                        data: JSON.stringify({name: query}),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                this.borrowBookSelectOption = []
                                this.borrowBookSelectOption.push({bkid: this.borrowUpdateForm.bkid, name: this.borrowUpdateForm.bkname})
                                let options = res.data.filter(item => {
                                    return item.bkid !== this.borrowBookSelectOption[0].bkid;
                                });
                                this.borrowBookSelectOption = [...this.borrowBookSelectOption, ...options];
                                this.borrowBookSelectLoading = false;
                                return true;
                            } else throw new Error();
                        })
                        .catch(err => {
                            console.log(err)
                            throw err;
                        })
                } else {
                    this.borrowBookSelectOption = [];
                }
            },
            /** ------------------------------ **/
            // 归还书籍操作
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
                                        await this.reqBookList({
                                            limit: this.bookListPageSize,
                                            offset: this.bookListPageSize * (this.bookListCurrentPage - 1)
                                        })
                                            .catch(err => {
                                                this.$message({
                                                    message: '出现未知错误',
                                                    type: 'error',
                                                    showClose: true,
                                                    duration: 0,
                                                });
                                            })
                                        await this.reqBorrowList({
                                            limit: this.borrowListPageSize,
                                            offset: this.borrowListPageSize * (this.borrowListCurrentPage - 1)
                                        });
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
        },
        computed: {
            // 渲染在页面中的分页数据
            userListPaging() {
                let bg = (this.userListCurrentPage - 1) * this.userListPageSize;
                let end = bg + this.userListPageSize;
                return this.userList.slice(bg - this.userListBg, bg - this.userListBg + this.userListPageSize);
            },
            bookListPaging() {
                let bg = (this.bookListCurrentPage - 1) * this.bookListPageSize;
                let end = bg + this.bookListPageSize;
                return this.bookList.slice(bg - this.bookListBg, bg - this.bookListBg + this.bookListPageSize);
            },
            borrowListPaging() {
                let bg = (this.borrowListCurrentPage - 1) * this.borrowListPageSize;
                let end = bg + this.borrowListPageSize;
                return this.borrowList.slice(bg - this.borrowListBg, bg - this.borrowListBg + this.borrowListPageSize);
            },
        }
    })
}