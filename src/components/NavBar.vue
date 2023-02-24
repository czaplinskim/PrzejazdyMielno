<template>

<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="true">
  <el-menu-item @click="logout" index="4">
    <i class="el-icon-circle-close"></i>
    <span slot="title">Wyloguj się</span>
  </el-menu-item>
  <el-menu-item index="4">
    <download-csv
      class="btn btn-csv"
      :data="csvdata"
      name="przejazdymielno.csv">
      <i class="el-icon-download"></i>
    </download-csv>
    
    <span slot="title">Pobierz listę (CSV)</span>
  </el-menu-item>
</el-menu>

</template>

<script>

import firebase from 'firebase'

export default {
  name: 'NavBar',
  props: {csvdata: Array},
 
  data() {
    return {
      data: ''
     
    }
  },
    methods: {

      logout(){
            firebase.auth().signOut().then(() => {
               this.$router.replace('admin');
            });
         },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },

 
}

</script>

<style lang="scss">
.el-menu--collapse {
    min-height: 400px;
  }
</style>
