window.onload = function (){
    let app = new Vue({
        el: '.m-container',
        created() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length == 3 ? '/' + paths[1] + '/' : '';
        },
        async mounted() {
        },
        data() {
            return {
                BASE_URL: '',
                adminForm: {
                    user: "root",
                    password: "root"
                },
                adminFormRules: {
                    user: [
                        { required: true, message: '请输用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ]
                },
                loginBTLoading: false,
            }
        },
        methods: {
            adminLoginHandle() {
                this.loginBTLoading = true
                this.$refs.adminForm.validate((valid)=>{
                    if(valid){
                        $.ajax({
                            url: this.BASE_URL + 'admin/login',
                            type: "post",
                            contentType: "application/json;charset=UTF-8",
                            data: JSON.stringify({'mid': this.adminForm.user, 'password': this.adminForm.password}),
                        })
                            .then(result => {
                                let res = JSON.parse(result)
                                console.log(res)
                                if (res.res == "success") {
                                    this.$message({
                                        message: '登录成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            location.href = this.BASE_URL + 'admin'
                                        }
                                    })
                                } else {
                                    this.loginBTLoading = false;
                                    this.$message({
                                        message: '账号或密码错误',
                                        type: 'warning'
                                    });
                                }
                            })
                    }else{
                        this.loginBTLoading = false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    })
}