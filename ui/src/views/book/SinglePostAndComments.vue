<script setup>
  import { onMounted, ref, onBeforeMount } from "vue";
  import { useRoute, RouterView } from "vue-router";
  import { useBookStore } from "@/stores/books";
  //import { useAuthStore } from "@/stores/auth";
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime)
  //console.log(route.params.post_id);
  const ubook = useBookStore();
  //const auth = useAuthStore();
  const route = useRoute();
  const post_id = route.params.post_id;
  onBeforeMount(() => {
    ubook.getComments(post_id);
  });
  //onMounted(() => {
    let comments = ubook.comments;
  //});
  
</script>
<template>
<div v-for="(comment, index) in ubook.comments" v-bind:key="index"  class="aos-init aos-animate" data-aos="zoom-in" :data-aos-delay="100*(index+1)/2">
              <div class="member d-flex align-items-start">
                <!--div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div-->
                <div class="member-info">
                  <h4 >{{ comment.comment_by.username }}<span style="margin-left:30px; display:inline-block; text-align: right;">{{ dayjs(comment.created_on).fromNow() }}</span></h4>
                  
                  <p>{{ comment.body }}</p>
                </div>
              </div>
            </div>
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