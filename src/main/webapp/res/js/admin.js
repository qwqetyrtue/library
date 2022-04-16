window.onload = function () {
    let app = new Vue({
        el: ".m-container",
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length == 3 ? paths[1] : '';
        },
        async mounted() {
            await this.reqUserList({
                limit: this.userListPageSize,
                offset: this.userListPageSize * (this.userListCurrentPage - 1)
            }, true);
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
                // 搜索表单
                searchConfigForm: {
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
                searchConfigChecked: {
                    base: false,
                    gender: false,
                    homeadd: false,
                    presentadd: false,
                    email: false,
                    call: false,
                    postcode: false,
                    bloodtype: false
                },
                // 用户列表源数据
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
            // 请求数据 flag为真不启用筛选
            reqUserList(paging, flag) {
                this.userListBg = paging.offset;
                this.userListEnd = paging.offset + paging.limit;
                let filtrate = null
                if (!flag) {
                    filtrate = {}
                    for (let each in this.searchConfigChecked) {
                        if (each === "base") {
                            if (this.searchConfigChecked[each]) {
                                filtrate.uid = this.searchConfigForm.uid;
                                filtrate.name = this.searchConfigForm.name;
                            }
                        } else if (this.searchConfigChecked[each]) {
                            filtrate[each] = this.searchConfigForm[each];
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
                        this.$message({
                            message: '出现未知错误',
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    })
            },
            // 刷新表格
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
            },
            // 提交查询
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
            },
            // 滚动条回到顶部
            backupHandle(name) {
                this.$refs[name].wrap.scrollTop = 0
            },
            // 分页修改
            userListSizeChangeHandle(val) {
                // 单页数减小
                if (this.userListPageSize > val) {
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
            // 重置表单
            formResetHandle(formName) {
                this.$refs[formName].resetFields();
                this.$refs[formName].clearValidate();
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
                                        });
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
        }
    })
}