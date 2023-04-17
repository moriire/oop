<script setup>
  import { onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";
  import { useBookStore } from "@/stores/books"
  import { useAuthStore } from "@/stores/auth"
  const ubook = useBookStore();
  const auth = useAuthStore();
  let searchinput = ref("");
  
  onMounted(() => {
    ubook.getCats()
  });
  
  function searchCat(){
    return ubook.categories.filter((cat) => 
      cat.name.toLowerCase().includes(searchinput.value.toLowerCase())
  )}
</script>
<template>
  <!-- ======= Aall Books Section ======= -->
  <section id="about" class="why-us section-bg">
    <div class="container" data-aos="fade-up">
      
      <div class="row">
        
        <div class="col-lg-8 order-2 order-lg-2 ">
          <div class="col-md-8 input-group">
          <input type="search" class="form-control" placeholder="Search" @input="searchSub" v-model="searchinput">
        </div>
          <div class="accordion-list" style="margin:0; padding: 0;">
                  <ul >
                    <li v-for="(cat, index) in searchCat()" v-bind:key="index" >
                      <h2>
                        {{ cat.name }}
                      </h2>
                      <a class="collapse display-2">  {{ cat.desc? cat.desc: "No desciption yet" }} <span style="float:right;"></span></a>
                      <div  class="d-flex justify-content-between">
                        <RouterLink :to="`/categories/${cat.id}`" style="float:right">
                          read more
                        </RouterLink>
                        <RouterLink :to="`/categories/${cat.id}`" style="float:right">
                          views 90
                        </RouterLink>
                        <RouterLink :to="`/categories/${cat.id}`" style="float:right">
                          Comment 40
                        </RouterLink>
                        <RouterLink :to="`/categories/${cat.id}`" style="float:right">
                          read more
                        </RouterLink>
                      </div>
                    </li>

                  </ul>
          </div>
        </div>
        <div class="col-lg-4 order-1 order-lg-2 pb-2 mb-4">
          <div class="card">
            
          </div>
        </div>
      </div>

    </div>
  </section><!-- End All books Section -->

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