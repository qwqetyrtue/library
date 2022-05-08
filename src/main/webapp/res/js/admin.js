window.onload = function () {
    let wangEditor = window.wangEditor;
    let origin = "";

    class saveMenu {
        constructor() {
            this.title = '保存'
            this.tag = 'button'
            this.iconSvg = '<svg t="1651396808300" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1287" width="1024" height="1024"><path d="M925.248 356.928l-258.176-258.176a64 64 0 0 0-45.248-18.752H144a64 64 0 0 0-64 64v736a64 64 0 0 0 64 64h736a64 64 0 0 0 64-64V402.176a64 64 0 0 0-18.752-45.248zM288 144h192V256H288V144z m448 736H288V736h448v144z m144 0H800V704a32 32 0 0 0-32-32H256a32 32 0 0 0-32 32v176H144v-736H224V288a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V144h77.824l258.176 258.176V880z" p-id="1288"></path></svg>'
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

    class clearMenu {
        constructor() {
            this.title = '清空'
            this.tag = 'button'
            this.iconSvg = '<svg t="1651396863506" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2196" width="1024" height="1024"><path d="M861.184 192.512q30.72 0 50.688 10.24t31.744 25.6 16.384 33.28 4.608 33.28q0 7.168-0.512 11.264t-0.512 7.168l0 6.144-67.584 0 0 537.6q0 20.48-8.192 39.424t-23.552 33.28-37.376 23.04-50.688 8.704l-456.704 0q-26.624 0-50.176-8.192t-40.448-23.04-26.624-35.84-9.728-47.616l0-527.36-63.488 0q-1.024-1.024-1.024-5.12-1.024-5.12-1.024-31.744 0-13.312 6.144-29.696t18.432-30.208 31.744-23.04 46.08-9.216l91.136 0 0-62.464q0-26.624 18.432-45.568t45.056-18.944l320.512 0q35.84 0 49.664 18.944t13.824 45.568l0 63.488q21.504 1.024 46.08 1.024l47.104 0zM384 192.512l320.512 0 0-64.512-320.512 0 0 64.512zM352.256 840.704q32.768 0 32.768-41.984l0-475.136-63.488 0 0 475.136q0 21.504 6.656 31.744t24.064 10.24zM545.792 839.68q17.408 0 23.552-9.728t6.144-31.232l0-475.136-63.488 0 0 475.136q0 40.96 33.792 40.96zM738.304 837.632q18.432 0 24.576-9.728t6.144-31.232l0-473.088-64.512 0 0 473.088q0 40.96 33.792 40.96z" p-id="2197"></path></svg>'
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
            editor.clear();
        }
    }

    class resetMenu {
        constructor() {
            this.title = '重置'
            this.tag = 'button'
            this.iconSvg = '<svg t="1651405803498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9081" width="1024" height="1024"><path d="M347.648 841.376c42.24 19.392 89.248 30.208 138.752 30.208 183.808 0 332.8-148.992 332.8-332.8 0-68.096-20.448-131.424-55.552-184.16l73.504-73.504C890.24 353.248 921.6 442.368 921.6 538.784c0 240.352-194.848 435.2-435.2 435.2-67.424 0-131.264-15.328-188.224-42.688l7.328 27.392c7.328 27.328-8.896 55.392-36.192 62.72s-55.392-8.896-62.72-36.192l-39.744-148.352c-7.328-27.328 8.896-55.392 36.192-62.72L351.392 734.4c27.328-7.328 55.392 8.896 62.72 36.192s-8.896 55.392-36.192 62.72l-30.272 8.128zM589.28 115.84l-21.056-36.448c-14.144-24.48-5.76-55.808 18.752-69.952s55.808-5.76 69.952 18.752l76.8 133.024c14.144 24.48 5.76 55.808-18.752 69.952l-133.024 76.8c-24.48 14.144-55.808 5.76-69.952-18.752s-5.76-55.808 18.752-69.952l14.08-8.128a334.88 334.88 0 0 0-58.432-5.12c-183.808 0-332.8 148.992-332.8 332.8 0 40.64 7.296 79.616 20.64 115.616l-77.792 77.792C67.488 673.952 51.2 608.288 51.2 538.816c0-240.352 194.848-435.2 435.2-435.2 35.424 0 69.888 4.224 102.88 12.224z" p-id="9082"></path></svg>'
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
            editor.clear();
            editor.dangerouslyInsertHtml(origin);
        }
    }

    // 菜单项
    const saveMenuConf = {
        key: 'saveMenu',
        factory() {
            return new saveMenu()
        }
    }
    const clearMenuConf = {
        key: 'clearMenu',
        iconSvg: "",
        factory() {
            return new clearMenu()
        }
    }
    const resetMenuConf = {
        key: 'resetMenu',
        iconSvg: "",
        factory() {
            return new resetMenu()
        }
    }

    // 注册菜单
    wangEditor.Boot.registerMenu(saveMenuConf)
    wangEditor.Boot.registerMenu(clearMenuConf)
    wangEditor.Boot.registerMenu(resetMenuConf)


    const editorConfig = {
        placeholder: '请输入内容',
        MENU_CONF: {}
    }
    editorConfig.MENU_CONF['uploadImage'] = {
        server: '/image/upload'
    }
    // 编辑器
    let editor = null;
    // 工具栏
    let toolbar = null;

    function initWangEditor() {
        editor = wangEditor.createEditor({
            selector: '#editor-container',
            config: editorConfig,
            mode: 'default' // 或 'simple' 参考下文
        })
        toolbar = wangEditor.createToolbar({
            editor: editor,
            selector: '#toolbar-container',
            mode: 'default', // 或 'simple' 参考下文
            config: {
                insertKeys: {
                    index: 0,
                    keys: ['saveMenu', 'clearMenu', 'resetMenu'], // show menu in toolbar
                }
            }
        })
    }

    let app = new Vue({
            el: ".m-container",
            created() {
                let paths = document.location.pathname.split('/');
                this.BASE_URL = paths.length == 3 ? '/' + paths[1] + '/' : '';
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
                await this.reqPaperList({
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
                initWangEditor()
                window.editor = editor;
                window.toolbar = toolbar;
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
                    if (value == '' || value == null)
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
                    menuValue: "userM",
                    resourceValue: "paperM",
                    AdminPageLoading: false,
                    borrowTimeMax: 60,
                    borrowTimeMin: 1,
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
                        pid: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        email: [
                            {validator: validateEmail, trigger: 'blur'}
                        ],
                        call: [
                            {validator: validateCall, trigger: 'blur'}
                        ],
                    },
                    // 添加用户表单
                    userAddDrawerVisible: false,
                    userAddForm: {},
                    rules_userAddForm: {
                        uid: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        password: [
                            {required: true, message: '密码不能为空'},
                        ],
                        gender: [
                            {required: true, message: '性别不能为空'},
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
                    bookAddDrawerVisible: false,
                    // 修改用户表单
                    bookUpdateForm: {},
                    bookUpdateForm_cp: {},
                    rules_bookUpdateForm: {
                        bkid: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        name: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        atid: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        price: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        state: [
                            {required: true, message: '昵称不能为空'},
                        ],
                    },
                    bookAddForm: {},
                    rules_bookAddForm: {
                        bkid: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        name: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        atid: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        price: [
                            {required: true, message: '昵称不能为空'},
                        ],
                        state: [
                            {required: true, message: '昵称不能为空'},
                        ],
                    },
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
                    addBookAuthorSelectLoading: false,
                    addBookAuthorSelectOption: [],
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
                    borrowAddMsgDrawerVisible: false,
                    // 修改用户表单
                    borrowUpdateForm: {},
                    borrowUpdateForm_cp: {},
                    rules_borrowUpdateForm: {},
                    // 添加用户表单
                    borrowAddForm: {},
                    rules_borrowAddForm: {},
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
                    addBorrowUserSelectLoading: false,
                    addBorrowUserSelectOption: [],
                    addBorrowBookSelectLoading: false,
                    addBorrowBookSelectOption: [],
                    /** --------------文章列表源数据-------------- **/
                    paperList: [],
                    paperListBg: 0,
                    paperListEnd: 0,
                    paperListLoading: false,
                    paperListCurrentPage: 1,
                    paperListPageSizes: [5, 10, 20, 50, 100],
                    paperListPageSize: 5,
                    paperListPageHideWhenSingle: false,
                    paperListTotalSize: 0,
                    // 按键防止连点
                    refreshPaperBTLoading: false,
                    submitPaperSearchBTLoading: false,
                    paperSlide: false,
                    editorShow: false,
                    paperEditNow: "",

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
                            res = {state: "逾期", type: "warning"};
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
                        url: this.BASE_URL + 'admin/admin',
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
                        url: this.BASE_URL + 'admin/outlogin',
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
                                        location.href = this.BASE_URL + "librarian"
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
                        url: this.BASE_URL + 'admin/users',
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
                userMsgAddHandle() {
                    this.userAddFormResetHandle()
                    this.userAddDrawerShowHandle();
                },
                // drawer显示/隐藏
                userMsgDrawerHideHandle() {
                    this.userMsgDrawerVisible = false;
                },
                userMsgDrawerShowHandle() {
                    this.userMsgDrawerVisible = true;
                },
                userAddDrawerHideHandle() {
                    this.userAddDrawerVisible = false;
                },
                userAddDrawerShowHandle() {
                    this.userAddDrawerVisible = true;
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
                    }).catch((err) => {
                        console.log(err)
                        this.$message({
                            type: 'info',
                            message: '操作取消'
                        });
                    });
                },
                userAddFormSubmitHandle() {
                    this.$refs['userAddForm1'].validate((valid) => {
                        if (valid) {
                            this.$refs['userAddForm2'].validate((valid2) => {
                                if (valid2) {
                                    this.$confirm('是提交添加?', '提示', {
                                        confirmButtonText: '提交',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.reqUserAddSubmit()
                                            .then(res => {
                                                if (res) {
                                                    this.$message({
                                                        type: 'success',
                                                        message: '添加成功!'
                                                    });
                                                } else {
                                                    this.$message({
                                                        message: '添加失败',
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
                                } else {
                                    return false;
                                }
                            })
                        } else {
                            return false;
                        }
                    })
                },
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
                // 重置用户表单
                userUpdateFormResetHandle() {
                    this.userUpdateForm = JSON.parse(JSON.stringify(this.userUpdateForm_cp))
                },
                userAddFormResetHandle() {
                    this.userAddForm = {}
                    if(this.$refs["userAddForm1"])
                        this.$refs["userAddForm1"].clearValidate();
                    if(this.$refs["userAddForm2"])
                    this.$refs["userAddForm2"].clearValidate();
                },
                // 提交修改请求
                reqUserUpdateSubmit() {
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/users/update',
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
                            console.log(err)
                            this.$message({
                                message: '出现未知错误',
                                type: 'error',
                                showClose: true,
                                duration: 0,
                            });
                        })
                },
                reqUserAddSubmit() {
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/users/add',
                        data: JSON.stringify(this.userAddForm),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                this.userList.push(res.data);
                                this.userListPageSize += 1;
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
                reqUserDeleteSubmit(row) {
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/users/delete',
                        data: JSON.stringify(row),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                let i = 0
                                for (; i < this.userList.length; i++)
                                    if (this.userList[i].uid == row.uid)
                                        break;
                                this.$set(this.userList[i], "logout", res.data);
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
                        url: this.BASE_URL + 'admin/books',
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
                bookMsgAddHandle() {
                    this.bookAddFormResetHandle();
                    this.bookAddDrawerShowHandle();
                },
                // drawer显示/隐藏
                bookMsgDrawerHideHandle() {
                    this.bookMsgDrawerVisible = false;
                },
                bookMsgDrawerShowHandle() {
                    this.bookMsgDrawerVisible = true;
                },
                bookAddDrawerHideHandle() {
                    this.bookAddDrawerVisible = false;
                },
                bookAddDrawerShowHandle() {
                    this.bookAddDrawerVisible = true;
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
                bookAddFormSubmitHandle() {
                    this.$refs['bookAddForm1'].validate((valid) => {
                        if (valid) {
                            this.$confirm('是否提交添加信息?', '提示', {
                                confirmButtonText: '添加',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.reqBookAddSubmit()
                                    .then(res => {
                                        if (res) {
                                            this.$message({
                                                type: 'success',
                                                message: '添加成功!'
                                            });
                                        } else {
                                            this.$message({
                                                message: '添加失败',
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
                        } else return false;
                    })
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
                bookAddFormResetHandle() {
                    this.bookAddForm = {
                        imgsArr: [],
                        state: 'NOTINCLUDE'
                    };
                    if(this.$refs["bookAddForm1"])
                        this.$refs["bookAddForm1"].clearValidate();
                },
                // 重置图片列表
                resetBookImgsHandle() {
                    let arr = this.bookUpdateForm_cp.imgs.split("|");
                    this.$set(this.bookUpdateForm, "imgsArr", arr)
                },
                resetAddBookImgsHandle() {
                    this.$set(this.bookAddForm, "imgsArr", [])

                },
                // 添加新图片项
                addBookImgsHandle() {
                    this.bookUpdateForm.imgsArr.push("");
                },
                addAddBookImgsHandle() {
                    this.bookAddForm.imgsArr.push("");
                },
                // 移除图片项
                removeBookImgsHandle(i) {
                    this.bookUpdateForm.imgsArr.splice(i, 1)
                },
                removeAddBookImgsHandle(i) {
                    this.bookAddForm.imgsArr.splice(i, 1)
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
                        url: this.BASE_URL + 'admin/books/update',
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
                reqBookAddSubmit() {
                    let book = JSON.parse(JSON.stringify(this.bookAddForm));
                    book.atid = book.author;
                    delete book.author;
                    book.imgs = "";
                    for (let i in book.imgsArr) {
                        if (book.imgsArr[i].trim() !== '')
                            book.imgs += (book.imgsArr[i].trim() + '|');
                    }
                    book.imgs = book.imgs.substring(0, book.imgs.length - 1)
                    delete book.imgsArr;
                    if (book.state != 'STORE') {
                        delete book.storedate;
                    }
                    console.log(book);
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/books/include',
                        data: JSON.stringify(book),
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
                        url: this.BASE_URL + 'admin/books/delete',
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
                reqBookAuthor(name) {
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/books/authors',
                        data: JSON.stringify({name: name}),
                        contentType: "application/json;charset=UTF-8",
                    })
                },
                // 查询作者
                bookAuthorRemoteHandle(query) {
                    if (query !== '') {
                        this.bookAuthorSelectLoading = true;
                        this.reqBookAuthor(query)
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.bookAuthorSelectOption = [];
                                    this.bookAuthorSelectOption.push({
                                        atid: this.bookUpdateForm.atid,
                                        name: this.bookUpdateForm.atname
                                    })
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
                addBookAuthorRemoteHandle(query) {
                    if (query !== '') {
                        this.addBookAuthorSelectLoading = true;
                        this.reqBookAuthor(query)
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.addBookAuthorSelectOption = res.data;
                                    this.addBookAuthorSelectLoading = false;
                                    return true;
                                } else throw new Error();
                            })
                            .catch(err => {
                                console.log(err)
                                throw err;
                            })
                    } else {
                        this.addBookAuthorSelectOption = [];
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
                        url: this.BASE_URL + 'admin/borrows',
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
                // 修改按键handle
                borrowMsgUpdateHandle(row) {
                    this.borrowUpdateForm_cp = row;
                    console.log(this.borrowUpdateForm_cp)
                    this.borrowUpdateFormResetHandle();
                    this.borrowMsgDrawerShowHandle();
                },
                // 添加借阅按键handle
                borrowMsgAddHandle(){
                    this.borrowAddFormResetHandle();
                    this.borrowAddMsgDrawerShowHandle();
                },
                // drawer显示/隐藏
                borrowMsgDrawerHideHandle() {
                    this.borrowMsgDrawerVisible = false;
                },
                borrowMsgDrawerShowHandle() {
                    this.borrowMsgDrawerVisible = true;
                },
                borrowAddMsgDrawerHideHandle() {
                    this.borrowAddMsgDrawerVisible = false;
                },
                borrowAddMsgDrawerShowHandle() {
                    this.borrowAddMsgDrawerVisible = true;
                },
                // drawer关闭前触发
                borrowMsgBeforeCloseHandle(done) {
                    done();
                },
                // 更新提交
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
                // 添加提交
                borrowAddFormSubmitHandle() {
                    this.$confirm('是否提交修改信息?', '提示', {
                        confirmButtonText: '提交',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log("修改")
                        this.reqBorrowAddSubmit()
                            .then(res => {
                                if (res) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功!'
                                    });
                                } else {
                                    this.$message({
                                        message: '添加失败',
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
                // 重置借阅记录更新表单
                borrowUpdateFormResetHandle() {
                    let {borrowid,uid,bkid,createtime,returntime,time,remark} = this.borrowUpdateForm_cp;
                    this.borrowUpdateForm = {borrowid,uid,bkid,createtime,returntime,time,remark};
                    this.borrowBookSelectOption = []
                    this.borrowBookSelectOption.push({bkid: this.borrowUpdateForm.bkid, name: this.borrowUpdateForm.bkname})
                    this.$set(this.borrowUpdateForm, "book", this.borrowUpdateForm.bkid);

                    this.borrowUserSelectOption = []
                    this.borrowUserSelectOption.push({uid: this.borrowUpdateForm.uid, name: this.borrowUpdateForm.uname})
                    this.$set(this.borrowUpdateForm, "user", this.borrowUpdateForm.uid);
                },
                // 重置借阅记录添加表单
                borrowAddFormResetHandle() {
                    this.borrowAddForm = {
                        time: 0,
                        state: "BORROW"
                    };
                },
                // 提交修改请求
                reqBorrowUpdateSubmit() {
                    let data = JSON.parse(JSON.stringify(this.borrowUpdateForm));
                    data.uid = data.user;
                    data.bkid = data.book;
                    delete data.user;
                    delete data.book;
                    if (data.createtime != '')
                        data.createtime = new Date(data.createtime).valueOf();
                    if (data.returntime != '')
                        data.returntime = new Date(data.returntime).valueOf();
                    console.log(data)
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/borrows/update',
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
                // 提交添加请求
                reqBorrowAddSubmit(){
                    let data = JSON.parse(JSON.stringify(this.borrowAddForm));
                    data.uid = data.user;
                    data.bkid = data.book;
                    delete data.user;
                    delete data.book;
                    if (data.createtime != '')
                        data.createtime = new Date(data.createtime).valueOf();
                    console.log(data)
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/borrows/create',
                        data: JSON.stringify(data),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                this.borrowList.push(res.data);
                                this.borrowListTotalSize += 1;
                                return true;
                            } else this.$message({
                                message: res.data.error,
                                type: 'error',
                                showClose: true,
                                duration: 0,
                            });
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
                        url: this.BASE_URL + 'admin/borrows/delete',
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
                            url: this.BASE_URL + 'admin/borrows/users',
                            data: JSON.stringify({name: query}),
                            contentType: "application/json;charset=UTF-8",
                        })
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.borrowUserSelectOption = [];
                                    this.borrowUserSelectOption.push({
                                        uid: this.borrowUpdateForm.uid,
                                        name: this.borrowUpdateForm.uname
                                    })
                                    let options = res.data.filter(item => {
                                        return item.uid !== this.borrowUserSelectOption[0].uid;
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
                            url: this.BASE_URL + 'admin/borrows/books',
                            data: JSON.stringify({name: query}),
                            contentType: "application/json;charset=UTF-8",
                        })
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.borrowBookSelectOption = []
                                    this.borrowBookSelectOption.push({
                                        bkid: this.borrowUpdateForm.bkid,
                                        name: this.borrowUpdateForm.bkname
                                    })
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
                addBorrowUserRemoteHandle(query) {
                    if (query !== '') {
                        this.addBorrowUserSelectLoading = true;
                        $.ajax({
                            type: 'post',
                            url: this.BASE_URL + 'admin/borrows/users',
                            data: JSON.stringify({name: query}),
                            contentType: "application/json;charset=UTF-8",
                        })
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.addBorrowUserSelectOption = res.data;
                                    this.addBorrowUserSelectLoading = false;
                                    return true;
                                } else throw new Error();
                            })
                            .catch(err => {
                                console.log(err)
                                throw err;
                            })
                    } else {
                        this.addBorrowUserSelectOption = [];
                    }
                },
                addBorrowBookRemoteHandle(query) {
                    if (query !== '') {
                        this.borrowBookSelectLoading = true;
                        $.ajax({
                            type: 'post',
                            url: this.BASE_URL + 'admin/borrows/books',
                            data: JSON.stringify({name: query}),
                            contentType: "application/json;charset=UTF-8",
                        })
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.addBorrowBookSelectOption = res.data;
                                    this.addBorrowBookSelectLoading = false;
                                    return true;
                                } else throw new Error();
                            })
                            .catch(err => {
                                console.log(err)
                                throw err;
                            })
                    } else {
                        this.addBorrowBookSelectOption = [];
                    }
                },
                /** --------------文章列表-------------- **/
                // 分页修改
                reqPaperList(paging, flag) {
                    this.paperListBg = paging.offset;
                    this.paperListEnd = paging.offset + paging.limit;
                    let filtrate = null
                    this.paperListLoading = true;
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/papers',
                        data: JSON.stringify({...paging, ...filtrate}),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                this.paperList = res.data
                                this.paperListTotalSize = res.total;
                                this.paperListLoading = false;
                                return true;
                            } else throw new Error();
                        })
                        .catch(err => {
                            this.paperListLoading = false;
                            console.log(err)
                            throw  err;
                        })
                },
                // 分页修改
                paperListSizeChangeHandle(val) {
                    // 单页数减小
                    // 原来单页数量比总条数大 -> 只有一页,在加大单页数,不查询
                    if (this.paperListTotalSize <= this.paperListPageSize) {
                        this.paperListPageSize = val;
                    } else if (this.paperListPageSize > val) {
                        this.paperListPageSize = val;
                    } else {
                        let page = this.paperListCurrentPage;
                        let bg = (page - 1) * val;
                        let end = bg + val;
                        // 判断当前页在切换单页显示数目后还是否存在
                        while (bg > this.paperListTotalSize) {
                            bg -= val;
                            page--;
                            end = bg + val;
                        }
                        // 判断显示的这页数据是否包含在已经获取到的数据中
                        if (bg < this.paperListBg || end > this.paperListEnd) {
                            this.paperListPageSize = val;
                            this.reqPaperList({
                                limit: val,
                                offset: bg
                            }).then(() => {
                                this.paperListCurrentPage = page;
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
                        this.paperListPageSize = val;
                    }
                },
                paperListCurrentChangeHandle(val) {
                    // 判断显示的这页数据是否包含在已经获取到的数据中
                    let bg = (val - 1) * this.paperListPageSize;
                    let end = bg + this.paperListPageSize;
                    if (bg < this.paperListBg || end > this.paperListEnd) {
                        this.reqPaperList({
                            limit: this.paperListPageSize,
                            offset: bg
                        }).then(() => {
                            console.log("2:page=>", val)
                            this.paperListCurrentPage = val;
                        })
                            .catch(err => {
                                this.$message({
                                    message: '出现未知错误',
                                    type: 'error',
                                    showClose: true,
                                    duration: 0,
                                });
                            })
                    } else this.paperListCurrentPage = val;
                },
                reqPaper(value) {
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/papers/paper',
                        data: JSON.stringify({pid: value}),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                origin = res.data;
                                editor.clear();
                                origin = res.data.content;
                                editor.dangerouslyInsertHtml(res.data.content);
                                return true;
                            } else throw new Error();
                        })
                        .catch(err => {
                            console.log(err)
                            throw  err;
                        })
                },
                reqPaperSave(value) {
                    if (this.paperEditNow.length === 0)
                        return new Promise((resolve, reject) => {
                            reject(new Error("未选择文章"));
                        })
                    return $.ajax({
                        type: 'post',
                        url: this.BASE_URL + 'admin/papers/update',
                        data: JSON.stringify({pid: this.paperEditNow, content: value}),
                        contentType: "application/json;charset=UTF-8",
                    })
                        .then(r => {
                            let res = JSON.parse(r);
                            if (res.res == "success") {
                                origin = editor.getHtml();
                                return true;
                            } else throw new Error();
                        })
                        .catch(err => {
                            console.log(err)
                            throw  err;
                        })
                },
                // 刷新文章表格
                refreshPaperListHandle() {
                    // 防止按键连点
                    this.refreshPaperBTLoading = true;
                    setTimeout(() => {
                        this.refreshPaperBTLoading = false;
                    }, 1500)
                    this.reqPaperList({
                        limit: this.paperListPageSize,
                        offset: this.paperListPageSize * (this.paperListCurrentPage - 1)
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
                // 提交文章查询
                submitPaperSearchHandle() {
                    this.submitPaperSearchBTLoading = true;
                    setTimeout(() => {
                        this.submitPaperSearchBTLoading = false;
                    }, 1500)
                    this.reqPaperList({
                        limit: this.paperListPageSizes[0],
                        offset: 0
                    })
                        .then(res => {
                            this.paperListPageSize = this.paperListPageSizes[0];
                            this.paperListCurrentPage = 1;
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
                // 查询文章内容
                paperContentEditHandle(row) {
                    this.paperEditNow = row.pid;
                    this.reqPaper(row.pid)
                        .then(res => {
                            if (res)
                                this.editorShow = true
                        })
                        .catch(err => {
                            this.$message({
                                message: '文章查询出现错误',
                                type: 'error',
                                showClose: true,
                                duration: 0,
                            });
                        })
                },
                // 编辑器保存
                editorSaveHandle(value) {
                    this.reqPaperSave(value)
                        .then(res => {
                            if (res)
                                this.$message({
                                    message: '保存成功',
                                    type: 'success',
                                    duration: 1500,
                                });
                        })
                        .catch(err => {
                            this.$message({
                                message: err.message ? err.message : '保存失败',
                                type: 'error',
                                showClose: true,
                                duration: 0,
                            });
                        })
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
                            url: this.BASE_URL + 'admin/borrows/finish',
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
                                message: "操作取消",
                                type: 'info',
                                duration: 1500,
                            });
                        })
                },
                // 收起列表
                contAsideHandle(name) {
                    console.log("yes")
                    this[name] = !this[name];
                },
                // 初始化富文本编辑器
            },
            computed: {
                // 渲染在页面中的分页数据
                userListPaging() {
                    let bg = (this.userListCurrentPage - 1) * this.userListPageSize;
                    let end = bg + this.userListPageSize;
                    return this.userList.slice(bg - this.userListBg, bg - this.userListBg + this.userListPageSize);
                }
                ,
                bookListPaging() {
                    let bg = (this.bookListCurrentPage - 1) * this.bookListPageSize;
                    let end = bg + this.bookListPageSize;
                    return this.bookList.slice(bg - this.bookListBg, bg - this.bookListBg + this.bookListPageSize);
                }
                ,
                borrowListPaging() {
                    let bg = (this.borrowListCurrentPage - 1) * this.borrowListPageSize;
                    let end = bg + this.borrowListPageSize;
                    return this.borrowList.slice(bg - this.borrowListBg, bg - this.borrowListBg + this.borrowListPageSize);
                }
                ,
                paperListPaging() {
                    let bg = (this.paperListCurrentPage - 1) * this.paperListPageSize;
                    let end = bg + this.paperListPageSize;
                    return this.paperList.slice(bg - this.paperListBg, bg - this.paperListBg + this.paperListPageSize);
                }
                ,
            }
        }
    )
}