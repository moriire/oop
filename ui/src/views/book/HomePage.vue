<script setup>
  import { onMounted, ref, render, renderSlot } from "vue";
  import { RouterLink, RouterView } from 'vue-router';
  import { useBookStore } from "@/stores/books";
  import { Typed } from "@duskmoon/vue3-typed-js";
  const options = {
    strings: ["Make it work", "Make it right", "Make it fast", "Get help from programmers", "Solve problems for a star"],
    loop: true,
    typeSpeed: 100,
    showCursor: false,
  }
</script>
<template>
 <!-- ======= Header ======= -->
 <header id="header" class="sticky-top bg-dark">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><RouterLink to="/" style="text-decoration: none;">OOP</RouterLink></h1>
      <nav id="navbar" class="navbar navbar-dark">
        <ul>
          <li><RouterLink class="getstarted." exact to="/">Home</RouterLink></li>
          <li><RouterLink class="getstarted." exact to="/">About</RouterLink></li>
          <li><RouterLink class="getstarted." exact to="/">Contact</RouterLink></li>
          <li><RouterLink class="getstarted." exact to="/">Report</RouterLink></li>
          <li><RouterLink class="getstarted" to="/account/login">Login</RouterLink></li>
          <li><RouterLink class="getstarted" to="/account/register">Signup</RouterLink></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
  <!-- End Header -->
  <main id="main">
    <section id="why-us" class="why-us section-bg" style="min-height: 80vh;">
        <div class="container-fluid" data-aos="fade-up">
          

            <div class="row align-items-center justify-content-center">

              <div class="col-md-10 d-flex justify-content-center align-items-stretch  order-2 order-lg-1">

                <div class="content">
                  <h2 class="display-3 weight-bold">Discuss for Programmers</h2>
                  <p>
                    Most Recent Discuss Most Recent Discuss Most Recent Discuss Most Recent Discuss
                  </p>
                <div style="height: 60px; margin: 10px 0;">
                  <Typed :options="options">
                    <h1 class="typing"></h1>
                  </Typed>
                </div>
                  <div class="d-flex justify-content-center">
                    <RouterLink class="btn btn-primary btn-block m-2 btn-lg w-100" to="/account/register">Get Started</RouterLink>
                <RouterLink class="btn btn-secondary btn-block m-2 btn-lg w-100" to="/account/login">Login</RouterLink>

                  </div>
                  
                </div>
                
                <!--div class="accordion-list">
                  <ul>
                    <li v-for="(post, index) in ubook.posts" v-bind:key="index">
                      <a data-bs-toggle="collapse" class="collapse" :data-bs-target="`#accordion-list-${index+1}`"><span>{{ post.uploaded_on }}</span> {{ post.title }} ? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                      <div :id="`accordion-list-${index+1}`" class="collapse" data-bs-parent=".accordion-list">
                        
                      </div>
                    </li>

                  </ul>
                </div-->

              </div>

              </div>

            </div>
        
    </section>
  </main>
 
</template>

<style scoped>
div.input-group{
  margin: 15px 0;
}
input[type="search"]{
  outline: 2px dashed blue;
  margin: 10px 0 30px 0;
}
</style>
