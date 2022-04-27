window.onload = function (){
    let app = new Vue({
        el: ".m-container",
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length == 3 ? '/' + paths[1] + '/' : '';
        },
        mounted() {
            this.$refs.mHeaderBg.style.backgroundImage =  "url('/library/images/head_logo.png')";
        },
        data(){
            return {
                BASE_URL: '',
                menuIndex: '',
                newsIndex: 0,
                noticeIndex: 0,
            }
        },
        methods: {
            menuSelectHandle(key, keyPath) {
                location.href = this.BASE_URL + keyPath;
            },
            paperDetailCheckHandle(pid) {

            },
        }
    })
}