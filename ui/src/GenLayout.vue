<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue"
import { useAuthStore } from "@/stores/auth"
import { useBookStore } from "@/stores/books"
const auth = useAuthStore()
const ubook = useBookStore();
onMounted(()=>{
  ubook.getCats(),
  console.log(ubook.categories)
})
const categories = ubook.categories
</script>
<template>
   <!-- ======= Header ======= -->
  <header id="header" class="sticky-top bg-dark">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><RouterLink to="/" style="text-decoration: none;">OOP</RouterLink></h1>
      <nav id="navbar" class="navbar">
        <ul>
          <li><RouterLink class="nav-link"  to="/posts/all">Home</RouterLink></li>
          <li class="dropdown"><a href="#"><span>Category</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><RouterLink :to="`/categories/${category.id}`" v-for="category in ubook.categories" v-bind:key="category.id">{{ category.name }}</RouterLink></li>
            </ul>
          </li>
          <li><RouterLink class="nav-link"  to="/categories" >All Categories</RouterLink></li>
          <li><RouterLink class="nav-link " to="/account/profile">Profile</RouterLink></li>
          <li><a class="getstarted " href="#" @click.prevent="auth.logout">Logout</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
  <!-- End Header -->
   <!-- ======= Hero Section ======= -->
   <!--section id="hero" class="d-flex align-items-center" style="height: 45vh; background-image: url(/assets/img/lib.jpg); background-position: center; background-repeat: no-repeat; background-size: cover;">

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center" data-aos="fade-up" data-aos-delay="200">
            <h1 id="title">Search Books</h1>
            <h2 id="subtitle">Our latest online Library</h2>
            
          </div>
        </div>
      </div>
   </section--><!-- End Hero -->
   <RouterView />
  
</template>