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
            });
        },
        data() {
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
                submitUserSearchBTLoading: false

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
            // 请求数据
            reqUserList(pagging) {
                this.userListBg = pagging.offset;
                this.userListEnd = pagging.offset + pagging.limit;
                let filtrate = {}
                for(let each in this.searchConfigChecked){
                    if(this.searchConfigChecked[each]){
                        filtrate[each] = this.searchConfigForm[each];
                    }
                }
                this.userListLoading = true;
                return $.ajax({
                    type: 'post',
                    url: '/' + this.BASE_URL + '/admin/users',
                    data: JSON.stringify({...pagging,...filtrate}),
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
            // 刷新表单
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
            submitUserSearchHandle(){
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
                        console.log("2:page=>",val)
                        this.userListCurrentPage = val;
                    })
                } else this.userListCurrentPage = val;
            },
        },
        computed: {
            // 渲染在节目中的分页数据
            userListPaging() {
                let bg = (this.userListCurrentPage - 1) * this.userListPageSize;
                let end = bg + this.userListPageSize;
                return this.userList.slice(bg - this.userListBg, bg - this.userListBg + this.userListPageSize);
            }
        }
    })
}