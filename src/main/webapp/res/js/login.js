window.onload = function () {
    new Vue({
        el: ".m-container",
        async mounted() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length == 3 ? paths[1] : '';
        },
        data() {
            let validatePass = (rule, value, callback) => {
                let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!pattern.test(value)) {
                    callback(new Error('须包含大小写字母和数字，可以使用特殊字符，长度在8-10之间'));
                } else {
                    if (this.registerForm.checkPassword !== '') {
                        this.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateUser = (rule, value, callback) => {
                let pattern = /^[a-zA-Z][a-zA-Z0-9_]{8,10}$/
                if (value === '') {
                    callback(new Error("请输入uid"))
                } else if (!pattern.test(value)) {
                    callback(new Error('须字母开头,可包含字母数字下划线,长度在8-10之间'));
                } else {
                    callback();
                }
            }
            return {
                BASE_URL: '',
                loginForm: {
                    user: "1213564573",
                    password: "qwqe"
                },
                registerForm: {
                    user: "",
                    name: "",
                    password: "",
                    checkPassword: ""
                },
                ruleRegister: {
                    user: [
                        {validator: validateUser, trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {max: 10, message: '昵称最大长度为10位', trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                },
                ruleLogin: {
                    user: [
                        {required: true, message: '请输入uid', trigger: 'blur'},
                        {max: 10, message: 'uid最大长度为10位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {max: 10, message: '密码最大长度为10位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // 控制显示登录或注册框
            handleSignUpButton() {
                document.getElementById('cont').classList.add('right-panel-active')
                return;
            },
            handleSignInButton() {
                document.getElementById('cont').classList.remove('right-panel-active')
                return;
            },
            // 登录
            handleLoginButton(ev) {
                // 防止按键连点
                let el = ev.target;
                if (!el.disabled) {
                    el.disabled = true
                }
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let v = this;
                        $.ajax({
                            url: '/' + this.BASE_URL + '/user/login',
                            type: "post",
                            contentType: "application/json;charset=UTF-8",
                            data: JSON.stringify({'uid': v.loginForm.user, 'password': v.loginForm.password}),
                        })
                            .then(result => {
                                let res = JSON.parse(result)
                                if (res.res == "success") {
                                    el.disabled = true;
                                    v.$message({
                                        message: '登录成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            location.href = '/' + this.BASE_URL + '/user'
                                        }
                                    })
                                } else {
                                    el.disabled = false;
                                    v.$message({
                                        message: '账号或密码错误',
                                        type: 'warning'
                                    });
                                }
                            })
                    }
                    return false;
                });
            },
            // 注册
            handleRegisterButton(ev) {
                // 防止按键连点
                let el = ev.target;
                if (!el.disabled) {
                    el.disabled = true
                }
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        let v = this;
                        $.ajax({
                            url: '/' + this.BASE_URL + '/user/register',
                            type: "post",
                            contentType: "application/json;charset=UTF-8",
                            data: JSON.stringify({
                                'uid': v.registerForm.user,
                                'password': v.registerForm.password,
                                'name': v.registerForm.name
                            }),
                        })
                            .then(result => {
                                let res = JSON.parse(result)
                                if (res.res == "success") {
                                    el.disabled = true;
                                    v.$message({
                                        message: '注册成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            location.href = '/' + this.BASE_URL + '/user'
                                        }
                                    })
                                } else {
                                    el.disabled = false;
                                    v.$message({
                                        message: '注册失败',
                                        type: 'warning'
                                    });
                                }
                            })
                    }

                    return false;
                });
            }
        }
    })
}