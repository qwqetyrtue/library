window.onload = function (){
    new Vue({
        el: ".m-container",
        data: {
            activeIndex: '2',
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    })
}