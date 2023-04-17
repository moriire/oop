<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>

<!-- ======= Hero Section ======= -->
<section class="d-flex">
  <div class="container" >
    <div class="row align-items-center justify-content-center" >
      <div class="col-lg-7 col-md-6 col-sm-10 order-2 order-lg-1 text-center" style="height: 70vh; background-image: url(/assets/img/home.png); background-position: center; background-repeat: no-repeat; background-size: cover;">
        
      </div>
      <div class="col-lg-5 col-md-6 d-flex justify-content-center order-2 order-lg-2" >
        <RouterView />
      </div>
    </div>
  </div>

</section><!-- End Hero -->

</template>