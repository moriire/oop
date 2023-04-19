import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"
const BASE = location.origin;//"http://127.0.0.1:8000";
//const BASE = "http://127.0.0.1:8000";
import { useAuthStore } from "@/stores/auth"
export const useBookStore = defineStore('counter', () => {
  const auth = useAuthStore();
  const categories = ref([]);
  const searchinput = ref("");
  const posts = ref([]);
  const post = ref([]);
  const comments = ref([]);
  const postwithcomments = ref({});
  const commentForm = ref({body: "", comment_by: ""});
  const postForm = ref({title: "", body: "", uploaded_by: ""});
  function getCats() {
    axios.get(`${BASE}/v1/api/categories/`)
    .then(res => {
      this.categories = res.data
    })
    .catch(e=>{
      console.log(e.response)
    })
  }
  function addPost(pk) {
    this.postForm["posted_by"] = pk;
    axios.post(`${BASE}/v1/api/posts/`, this.postForm, { headers: {
		  "Authorization": `Bearer ${auth.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
    .then(res=>{
      this.getPosts()
    })
    .catch(e=>{
      if (e.response.data.code === "token_not_valid"){
        this.logout()
        }
        alert(e)
      
    })
  }
  function delSubjects(pk) {
    axios.delete(`${BASE}/v1/api/subject/${pk}/`, { headers: {
		  "Authorization": `Bearer ${auth.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
    .then(res=>{
      this.getSubjects(),
      alertifyjs.success("deleted")
    })
    .catch(e=>{
      if (e.response.data.code === "token_not_valid"){
        this.logout()
        }
        alert(e)
      
    })
  }
  function getPosts() {
    axios.get(`${BASE}/v1/api/posts/`, { headers: {
		  "Authorization": `Bearer ${auth.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
    .then(res => {
      this.posts = res.data
    })
    .catch(e=>{
      if (e.response.data.code === "token_not_valid"){
        auth.logout()
        }
        alert(e)    
    })
  }
  function getSinglePost(pk) {
    axios.get(`${BASE}/v1/api/posts/${pk}/`, { headers: {
		  "Authorization": `Bearer ${auth.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
    .then(res => {
      this.post = res.data
    })
    .catch(e=>{
      if (e.response.data.code === "token_not_valid"){
        this.logout()
        }
        alert(e)
      
    })
  }
  function getComments(post_id) {
    axios.get(`${BASE}/v1/api/comments/?post=${post_id}`, { headers: {
		  "Authorization": `Bearer ${auth.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
    .then(res => {
      this.comments = res.data
    })
    .catch(e=>{
      console.log(e.response)
    })
  }
  function getPostWithComments(pk) {
    axios.get(`${BASE}/v1/api/post-with-comments/${pk}/`, { headers: {
		  "Authorization": `Bearer ${auth.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
    .then(res => {
      this.postwithcomments = res.data
    })
    .catch(e=>{
      console.log(e.response)
    })
  }
  function addComment(post_id, user_id) {
    this.commentForm.comment_by=user_id;
    this.commentForm.post=post_id;
    axios.post(`${BASE}/v1/api/comments/`, this.commentForm, { headers: {
		  "Authorization": `Bearer ${auth.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
    .then(res=>{
      this.getComments(post_id)
    })
    .catch(e=>{
      console.log(e.response)
    })
  }
  function delBooks(pk) {
    axios.delete(`${BASE}/v1/api/book/${pk}/`, )
    .then(res=>{
      this.getBooks(),
      alert("deleted")
    })
    .catch(e=>{
      console.log(e.response)
    })
  };
  return { getCats, categories, addComment, commentForm, postForm, addPost, posts, post, getPosts, getPostWithComments, postwithcomments,  getSinglePost, getComments, comments }
})