<template>
    <div class='admin-main-container'>
        <div class='login-container'>
            <el-form :label-position="'top'" :model="form">
           
                <el-form-item>
                  <span class='form__label' slot="label">Login (e-mail)</span>
                  <el-input placeholder="Wpisz swój e-mail" v-model="form.login"></el-input>
                </el-form-item>

                <el-form-item>
                  <span class='form__label' slot="label">Hasło</span>
                  <el-input placeholder="Wpisz swoje hasło" type='password' v-model="form.password"></el-input>
                </el-form-item>

                <el-button @click='login' style='width: 100%' type="primary">ZALOGUJ SIĘ</el-button>
            
            </el-form>   

        </div>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
    name: 'Admin', 
    data() {
        return { 
            form: {
                login: '',
                password: ''
            }

        }
    },

    methods: {

        login(){
            firebase.auth().signInWithEmailAndPassword(this.form.login, this.form.password)
               .then(user => {
                  this.$router.replace('dashboard');
               })
               .catch(err => {
                   this.invalidAuth = true;
                    // this.errorMessage = err.message
               });
         }
    }
    
}
</script>

<style lang="scss">

.admin-main-container {
  background-color: #E5E5E5;
  width: 100vw;
  height: 100vh;
  min-width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
    background-color: white;
    padding: 25px 25px 50px;
    max-width: 400px;
    width: 100%;
    border: 1px solid #00008B;

}



</style>