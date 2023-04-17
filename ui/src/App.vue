<script setup>
import { RouterView } from 'vue-router';
import "alertifyjs/build/css/alertify.min.css";
</script>
<template>

  <RouterView />
   <!-- ======= Footer ======= -->
   <footer id="footer">

<div class="container footer-bottom clearfix">
  <div class=".copyright text-center">
    &copy; Copyright <strong><span>2023</span></strong>. All Rights Reserved
  </div>
</div>
</footer><!-- End Footer -->
</template>
<style>

  .ajs-message {
    color: white;
    text-align: center;
    background: var(--bs-primary) !important;
  } 
  
</style>
