window.onload = function (){
    let app = new Vue({
        el: ".m-container",
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length >= 3 ? '/' + paths[1] + '/' : '';
        },
        mounted() {
        },
        data() {
            return {
                menuIndex: 'notice',
                BASE_URL: '',
            }
        },
        methods: {
            menuSelectHandle(key, keyPath) {
                location.replace(this.BASE_URL + keyPath)
            }
        }
    })
}