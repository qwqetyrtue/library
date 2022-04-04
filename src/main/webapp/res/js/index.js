window.onload = function (){
    new Vue({
        el: ".m-container",
        data: {
            activeIndex: '1',
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    })
}