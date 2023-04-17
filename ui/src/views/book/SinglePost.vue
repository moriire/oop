<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute, RouterView, RouterLink} from "vue-router";
  import { useBookStore } from "@/stores/books";
  import { useAuthStore } from "@/stores/auth";
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime)
  //console.log(route.params.post_id);
  const ubook = useBookStore();
  const auth = useAuthStore();
  
  const route = useRoute();
  const post_id = route.params.post_id;
  onMounted(() => {
    ubook.getSinglePost(post_id);
  });

</script>
<template>
  <section id="team" class="team section-bg">
      <div class="container aos-init aos-animate" data-aos="fade-up">

        <div class="row mb-4">
          
          <div class="section-title">
            <p class="display-4">{{ ubook.post.title }}</p>
          </div>
          <div class="col-12 mt-2 mb-4">
            <p class="display-2 blockquote">{{ ubook.post.body }}</p>
          </div>
        </div>
        

        <div class="row">
          <div class="col-lg-8">
            <RouterLink :to="`/post/${ubook.post.id}/comment`">View Comments</RouterLink>
            <RouterView></RouterView>
      
          </div>
          <div class="col-lg-4 order-1 order-lg-2 pb-2 mb-4">
          <div class="card">
            <div class="card-header text-center"><h2>Comment on this post</h2></div>
            <form @submit.prevent="ubook.addComment(ubook.post.id, auth.stores.data.user.pk)" class="card-body bg-primary">
              
              <div class="input-group">
                <textarea class="form-control" placeholder="Comment" v-model="ubook.commentForm.body" required></textarea>
              </div>
              
              <div class="input-group">
                <input type="submit" value="Add Comment">
              </div>
            </form>
          </div>
        </div>
        </div>

      </div>
    </section>

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