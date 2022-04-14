window.onload = function () {
    new Vue({
        el: ".m-container",
        async mounted() {
            let paths = document.location.pathname.split('/');
            this.BASE_URL = paths.length == 3 ? paths[1] : '';
        },
        data() {
            let validateEmail = (rule, value, callback) => {
                let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else if (!pattern.test(value)) {
                    return callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!pattern.test(value)) {
                    callback(new Error('须含大小写字母,数字，可使用特殊字符，长度:8-10'));
                } else {
                    if (this.registerForm.checkPassword !== '') {
                        this.$refs.registerForm.validateField('checkPassword');
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
                } else if (this.illegality.indexOf(value) !== -1) {
                    callback(new Error('当前账号已经被注册了'));
                } else if (!pattern.test(value)) {
                    callback(new Error('须字母开头,可含字母,数字,_,长度:8-10'));
                } else {
                    callback();
                }
            }
            return {
                BASE_URL: '',
                timer: null,
                count: 0,
                loginForm: {
                    user: "1213564573",
                    password: "qQ123456"
                },
                registerForm: {
                    user: "",
                    password: "",
                    checkPassword: ""
                },
                illegality: [],
                registerStep: 0,
                ruleRegister: {
                    user: [
                        {validator: validateUser, trigger: 'blur'},
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                },
                verifyEmailFormDialogVisible: false,
                showSendButton: true,
                verifyEmailForm: {
                    email: "",
                    verifyCode: ""
                },
                ruleVerifyEmailForm: {
                    email: [
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    verifyCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
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
                },
                verifyEmailBTLoading: false,
                loginBTLoading: false,
                registerBTLoading: false,
                sendVerifyBTLoading: false
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
                this.loginBTLoading = true
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
                                    v.$message({
                                        message: '登录成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            location.href = '/' + this.BASE_URL + '/user'
                                        }
                                    })
                                } else {
                                    this.loginBTLoading = false;
                                    v.$message({
                                        message: res.data,
                                        type: 'warning'
                                    });
                                }
                            })
                    } else {
                        this.loginBTLoading = false;
                        return false;
                    }
                });
            },
            // 注册
            handleRegisterButton(ev) {
                // 防止按键连点
                this.registerBTLoading = true;
                setTimeout(() => {
                    this.registerBTLoading = false;
                }, 2000)
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.checkUidLegalReq()
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.verifyEmailFormShowHandle()
                                } else {
                                    this.illegality.push(this.registerForm.user);
                                    this.$refs.registerForm.validateField('user')
                                }
                            })
                    }
                    return false;
                });
            },
            // 检测uid是否合法
            checkUidLegalReq() {
                return $.ajax({
                    url: '/' + this.BASE_URL + '/user/checkuid',
                    type: "post",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify({
                        'uid': this.registerForm.user,
                    }),
                })
            },
            // 发送验证码
            sendVerifyCodeHandle(ev) {
                this.sendVerifyBTLoading = true;
                this.$refs.verifyEmailForm.validateField('email', (err) => {
                    if (err != '请输入正确的邮箱' && err != '请输入邮箱') {
                        $.ajax({
                            url: '/' + this.BASE_URL + '/user/sendverifycode',
                            type: "post",
                            contentType: "application/json;charset=UTF-8",
                            data: JSON.stringify({
                                'email': this.verifyEmailForm.email,
                            }),
                        })
                            .then(r => {
                                let res = JSON.parse(r);
                                if (res.res == "success") {
                                    this.registerStep = 2;
                                    this.$message({
                                        message: '验证码发送成功',
                                        type: 'success',
                                        duration: 1500,
                                    })
                                    const TIME_COUNT = 60;
                                    if (!this.timer) {
                                        this.count = TIME_COUNT;
                                        this.showSendButton = false;
                                        this.sendVerifyBTLoading = false;
                                        this.timer = setInterval(() => {
                                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                                this.count--;
                                            } else {
                                                this.showSendButton = true;
                                                clearInterval(this.timer);
                                                this.timer = null;
                                            }
                                        }, 1000)
                                    }
                                } else {
                                    this.$message({
                                        message: '验证码发送失败',
                                        type: 'error',
                                        duration: 0,
                                        showClose: true,
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    else{
                        this.sendVerifyBTLoading = false;
                    }
                })
            },
            // 完成注册
            verifyEmailFormSubmitHandle(ev) {
                this.verifyEmailBTLoading = true;
                setTimeout(() => {
                    this.verifyEmailBTLoading = false;
                }, 2000)
                this.$refs.verifyEmailForm.validateField('verifyCode', (err) => {
                    if (err != '请输入验证码') {
                        $.ajax({
                            url: '/' + this.BASE_URL + '/user/register',
                            type: "post",
                            contentType: "application/json;charset=UTF-8",
                            data: JSON.stringify({
                                'uid': this.registerForm.user,
                                'password': this.registerForm.password,
                                'email': this.verifyEmailForm.email,
                                'verifyCode': this.verifyEmailForm.verifyCode
                            }),
                        })
                            .then(result => {
                                let res = JSON.parse(result)
                                if (res.res == "success") {
                                    this.registerStep = 3;
                                    this.$message({
                                        message: '注册成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            location.href = '/' + this.BASE_URL + '/user'
                                        }
                                    })
                                } else {
                                    this.$message({
                                        message: '注册失败',
                                        type: 'warning',
                                        duration: 0,
                                        showClose: true,
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
            },
            verifyEmailFormHideHandle() {
                this.registerStep = 0;
                this.verifyEmailFormDialogVisible = false;
            },
            verifyEmailFormShowHandle() {
                this.registerStep = 1;
                this.verifyEmailFormDialogVisible = true;
            }
        }
    })
}