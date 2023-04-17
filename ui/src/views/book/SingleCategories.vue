<script setup>
  import { onMounted, ref, computed } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  import { useBookStore } from "@/stores/books"
  import { useAuthStore } from "@/stores/auth"
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);
  const ubook = useBookStore();
  const auth = useAuthStore();
  const route = useRoute();
  
  let searchinput = ref("");
  
  onMounted(() => {
    ubook.getPosts()
  });

  const categoricals = computed(()=>{
      return ubook.posts.filter(post=>post.program.id==route.params.cat_id)
  })
  function searchCat(){
    return ubook.categoricals.filter((cat) => 
      cat.title.toLowerCase().includes(searchinput.value.toLowerCase())
  )}
</script>
<template>
  <!-- ======= Aall Books Section ======= -->
  <section id="about" class="why-us section-bg">
    <div class="container" data-aos="fade-up">
      
      <div class="row">
        
        <div class="col-lg-8 order-2 order-lg-2 ">
          <div class="col-md-8 input-group">
          <input type="search" class="form-control" placeholder="Search topics" @input="searchSub" v-model="searchinput">
        </div>
          <div class="accordion-list" style="margin:0; padding: 0;">
                  <ul >
                    <li v-for="(cat, index) in categoricals" v-bind:key="index" >
                      <h2>
                        {{ cat.title }}
                      </h2>
                      <a data-bs-toggle="collapse" class="collapse display-2" :data-bs-target="`#accordion-list-${index+1}`"> {{ cat.program.name }} <span style="float:right;"> {{ dayjs(cat.uploaded_on).fromNow() }}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></span></a>
                      <div :id="`accordion-list-${index+1}`" class="collapse" data-bs-parent=".accordion-list">
                        <p >
                          {{ cat.body }}
                          
                        </p>
                        <RouterLink :to="`/post/${cat.id}`" style="float:right">
                          ... read more
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