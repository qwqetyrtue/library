window.onload = function () {
    let app = new Vue({
        el: ".m-container",
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length >= 3 ? '/' + paths[1] + '/' : '';
        },
        async mounted() {
            for(let each in this.board){
                console.log(each)
                await this.reqBoardList(each);
            }
        },
        data() {
            return {
                menuIndex: '',
                newsIndex: 0,
                noticeIndex: 0,
                news: [],
                massage: [],
                notice: [],
                board: {
                    news: {title: "新闻中心", classify: "新闻"},
                    massage: {title: "最新资讯", classify: "资讯"},
                    notice: {title: "通知公告", classify: "公告"}
                },
            }
        },
        methods: {
            menuSelectHandle(key, keyPath) {
                location.replace(this.BASE_URL + keyPath)
            },
            paperDetailCheckHandle(pid) {
                location.href = "paper/"+ pid
            },
            reqBoardList(name) {
                return $.ajax({
                    type: 'post',
                    url: 'paper/type',
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify({classify:this.board[name].classify})
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this[name] = res.data;
                            for(let each in this[name]) {
                                let date = new Date(this[name][each].createtime);
                                this[name][each].createdate = [date.getFullYear(),date.getMonth(),date.getDate()];
                            }
                            return true;
                        } else throw new Error();
                    })
                    .catch(err => {
                        this.paperListLoading = false;
                        console.log(err)
                        throw  err;
                    })
            },
        }
    })
}