<template src="./html/pages-register.html">
</template>

<script setup>
  import { useAuthStore } from "@/stores/auth";
  //import { ref, reactive, computed } from "vue"
  import router from "@/router";
  import alertifyjs from '@/alertifyjs';
  const stores = useAuthStore()
    const registerForm = async () => {
      const res = await stores.register(stores.regForm)
      console.log(res)
      if (res.status==400){
        const contents = Object.keys(res.data);
        contents.forEach(i => {
          alertifyjs.error(...res.data[i])
        });
        
      } else {
        alertifyjs.success("Registration Successful")
        router.push("/account/login")
      }
      
    }
</script>

