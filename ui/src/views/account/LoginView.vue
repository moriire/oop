<template src="./html/pages-login.html">  
</template>

<script setup>
import { useAuthStore } from "@/stores/auth"
import alertifyjs from '@/alertifyjs';
import { useRoute } from "vue-router";
const route = useRoute();
const stores = useAuthStore();
  const loginAction =  async () => { 
        const { username, password } = stores.loginForm; 
        const res = await stores.login(username, password)
        if (res === "success"){
          console.log(res)
          location.href ="/posts/all"
        }
        else{
          console.log(res)
          alertifyjs.error("Invalid username or password")
          //console.log(res)
            //location.href ="/posts/all"
          }
          /*
        else if(res === "success"){
          const q=route.query.redirect
          console.log(q)
          if (q != undefined){
            location.href=q
          }else{
            location.href ="/posts/all"
          }
        }*/
    }
  

</script>

