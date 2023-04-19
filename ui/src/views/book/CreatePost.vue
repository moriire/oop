<script setup>
  import { onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";
  import { useBookStore } from "@/stores/books"
  import { useAuthStore } from "@/stores/auth"
  import dayjs from 'dayjs';
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import '@vueup/vue-quill/dist/vue-quill.bubble.css';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);
  const xy = ref("");
  const content = ref(`<h1 class="ql-align-center"><u style="color: rgb(136, 136, 136);">Python Function</u></h1>`);
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
  const pop = ({ quill, html, text }) => {
  ubook.postForm.body = content.value
  console.log(content.value);
  //console.log(content1.value);
};
</script>
<template>
  
  
  <!-- ======= Aall Books Section ======= -->
  <section id="about" class="why-us section-bg">
    <div class="container" data-aos="fade-up">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-sm-10">
      
          <form @submit.prevent="ubook.addPost(auth.stores.data.user.pk)" class="card-body">
            <div class="col-md-6 input-group">
              <input type="text" class="form-control" placeholder="Headline" v-model="ubook.postForm.title" required>
            </div>
            <div class="col-md-6 input-group">
                  <select class="form-select select form-control" v-model="ubook.postForm.program">
                    <option value="" class="" selected disabled default>Select Program</option>
                    <option :value="cat.id" class="" v-for="cat in ubook.categories">{{ cat.name }}</option>
                  </select>
            </div>
            <div class="col-md-12 input-group">
              <QuillEditor             
              class="form-control d-block"
              style="min-height: 35vh; resize: both;"
              :theme="bubble"
              toolbar="full"
              contentType="html"
              @textChange="pop"
              v-model:content="content" 
               />
            </div>
            <div class="input-group">
              <input type="submit" value="Create Post" class="btn btn-primary" style="float: right;">
            </div>
          </form>
        </div>
      </div>
      <div class="row justify-content-center ">
        <div class="col-lg-10 text-dark ql-editor" v-html="ubook.postForm.body">
          
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