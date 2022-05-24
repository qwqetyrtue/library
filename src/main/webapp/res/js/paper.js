window.onload = function (){
    let wangEditor = window.wangEditor;
    const editorConfig = {
    }
    // 编辑器
    let editor = null;
    function initWangEditor() {
        editor = wangEditor.createEditor({
            selector: '#editor-container',
            config: editorConfig,
            mode: 'default',// 或 'simple' 参考下文
        })
    }
    let app = new Vue({
        el: ".m-container",
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length >= 3 ? '/' + paths[1] + '/' : '';
            this.pid = paths[paths.length-1];
            },
        async mounted() {
            initWangEditor();
            await this.reqPaperDetail();
            editor.dangerouslyInsertHtml(this.paper.content)
            editor.disable()
            window.editor = editor;
            this.paperLoading = false;
        },
        data(){
            return {
                BASE_URL: "",
                pid: "",
                paper:{},
                paperLoading: true,
            }
        },
        methods: {
            backButtonHandle(){
              location.href = window.BASE_URL + "index"
            },
            reqPaperDetail(){
                return $.ajax({
                    type: 'post',
                    url: window.BASE_URL + window.paths.paperDetail,
                    data: JSON.stringify({pid:this.pid}),
                    contentType: "application/json;charset=UTF-8",
                })
                    .then(r => {
                        let res = JSON.parse(r);
                        if (res.res == "success") {
                            this.paper = res.data;
                            return true;
                        } else {
                            location.href = "/404notfound"
                        }
                    })
            }
        }
    })
}

window.paths = {
    paperDetail: 'paper/detail'
}