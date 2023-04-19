<script setup>
  import { onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";
  import { useBookStore } from "@/stores/books"
  import { useAuthStore } from "@/stores/auth"
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);
  const ubook = useBookStore();
  const auth = useAuthStore();
  let searchinput = ref("");
  onMounted(() => {
    ubook.getPosts()
  })
  function searchSub(){
    return ubook.posts.filter((post) => 
      post
      //.title.toLowerCase().includes(searchinput.value.toLowerCase())
  )}
</script>
<template>
  
  
  <!-- ======= Aall Books Section ======= -->
  <section id="about" class="why-us section-bg">
    <div class="container" data-aos="fade-up">
      <div class="row justify-content-center">
        <div class="col-md-8 input-group">
          <input type="search" class="form-control" placeholder="Search" @input="searchSub" v-model="searchinput">
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 order-2 order-lg-2 ">
          <div class="accordion-list" style="margin:0; padding: 0;">
                  <ul >
                    <li v-for="(post, index) in searchSub()" v-bind:key="index" >
                      <h2>
                        {{ post.posted_by.username }}
                      </h2>
                      <a data-bs-toggle="collapse" class="collapse display-2" :data-bs-target="`#accordion-list-${index+1}`"> {{ post.title }} ? <span style="float:right;">{{ dayjs(post.uploaded_on).fromNow() }}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></span></a>
                      <div :id="`accordion-list-${index+1}`" class="collapse" data-bs-parent=".accordion-list">
                        <!--p v-html="post.body" class="ql-editor">  
                        </p-->
                        <RouterLink :to="`/post/${post.id}`" style="float:right">
                          ... read more
                        </RouterLink>
                      </div>
                    </li>

                  </ul>
          </div>
        </div>
        <!--div class="col-lg-4 order-1 order-lg-2 pb-2 mb-4">
          <div class="card">
            <div class="card-header text-center"><h2>What is it?</h2></div>
            <form @submit.prevent="ubook.addPost(auth.stores.data.user.pk)" class="card-body bg-primary">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Topic" v-model="ubook.postForm.title" required>
              </div>
              <div class="input-group">
                <select name="" id="" class="form-select select form-control" v-model="ubook.postForm.program">
                  <option value="" class="" selected disabled>Select Program</option>
                  <option :value="cat.id" class="" v-for="cat in ubook.categories">{{ cat.name }}</option>
                </select>
              </div>
              <div class="input-group">
                <textarea class="form-control" placeholder="Post Description" v-model="ubook.postForm.body" required></textarea>
              </div>
              
              <div class="input-group">
                <input type="submit" value="Add Post">
              </div>
            </form>
          </div>
        </div-->
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