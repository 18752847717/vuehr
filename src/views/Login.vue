<template>
    <div>
        <!-- 登录表单区 -->
        <el-form :model="loginForm" label-width="0px" :rules="loginFormRule" class="login_container" ref="loginFormRef">
            <h3 class="login_title">系统登录</h3>
            <!-- 用户名 -->
          <el-form-item prop="username">
              <el-input v-model="loginForm.username"  prefix-icon="iconfont icon-bussiness-man"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
              <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" show-password></el-input>
          </el-form-item>
          <!-- 记住我 -->
          <el-checkbox v-model="checked" class="login_remember">记住我</el-checkbox>
          <!-- 登录按钮 -->
          <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {postKeyValueRequest} from '../utils/api'
export default{
name: '',
components:{},
data() {
    return{
        // 登录表单的数据绑定对象
        loginForm:{
            username: 'admin',
            password: '123'
        },
        checked: true,
        loginFormRule:{
            //验证用户名是否合法
            username:[
                {required:true,$message:'请输入用户名',trigger:'blur'},
                {min:3,max:10,$message:'长度在3到10个字符',trigger:'blur'}
            ],
            //验证密码是否合法
            password:[
                {required:true,$message:'请输入密码',trigger:'blur'},
                {min:3,max:20,$message:'长度在3到20个字符',trigger:'blur'}
            ]
        }
    }
},
methods:{
//重置按钮
    resetLoginForm(){
        console.log(this.$refs)
      this.$refs.loginFormRef.resetFields()
    },
    login(){
        this.$refs.loginFormRef.validate(async valid =>{
            if(!valid){
               return this.$message.error('用户名或密码格式不正确,请重新输入');
            }
           const resp = await postKeyValueRequest('/doLogin',this.loginForm)
           console.log(resp)
           if(resp){
               console.log(resp.obj)
               this.$message.success('登录成功')

               window.sessionStorage.setItem("user",JSON.stringify(resp.obj));

                let path = this.$route.query.redirect
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
          await this.$router.replace((path === '/' || path === undefined) ? '/home' : path)
           }
        })
    }
}
}
</script>
<style scoped>
.login_container{
    width: 400px;
    background-clip: padding-box;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    border-radius: 15px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
}
.login_title{
    width: 100%;
    text-align: center;
    margin:15px auto 20px auto;
    color: #505458;
}
.login_remember{
    text-align: left;
    margin:0px 0px 15px 0px;
}
.btn{
    display: flex;
    justify-content: flex-end;
}
</style>