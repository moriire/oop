import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/AuthLayout.vue'
import GenLayout from '@/GenLayout.vue'
import LoginView from '@/views/account/LoginView.vue'
import RegisterView from '@/views/account/RegisterView.vue'
import ProfileView from '@/views/account/ProfileView.vue'
import HomePage from '@/views/book/HomePage.vue'
import AllPosts from '@/views/book/AllPosts.vue'
import CreatePost from '@/views/book/CreatePost.vue'
import AllCategories from '@/views/book/AllCategories.vue'
import SingleCategories from "@/views/book/SingleCategories.vue"
import SinglePost from '@/views/book/SinglePost.vue'
import SinglePostAndComments from '@/views/book/SinglePostAndComments.vue'
//const book = useBookStore();

function guardMyroute(to, from, next)
{
  var check= localStorage.getItem("access_token_time"),
refreshTime=  localStorage.getItem("refresh_token_time");

  let start = check? new Date(check).getTime(): 0,
  end = start - new Date().getTime(),
  refreshEnd = new Date(refreshTime).getTime() - new Date().getTime()
  console.log(start)
  console.log(end)
  if(end > 0 && refreshEnd>0) {
  //checkTime(globals.state.data.access_token)
    next()
  }
  else{
    console.log(from)
    next({path: "/account/login", query:{redirect: `${to.path}`} }); // go to '/login';
 }
}

const guardAuth=(to, from, next)=>{
  var check= localStorage.getItem("access_token_time"),
refreshTime=  localStorage.getItem("refresh_token_time");

  var start = check? new Date(check.access_token_expiration).getTime(): 0,
  end = start - new Date().getTime();
  if(end>0){
    next(false)
  }
  next()
 
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '',
      name: 'home',
      beforeEnter: guardAuth,
      component: HomePage,
      meta: {title: "Home", subtitle: "is it ...?"}
    },
    {
      path: '/account',
      name: 'account',
      beforeEnter:guardAuth,
      component: AuthLayout,
      children: [
          {
            path: 'login',
            name: 'login',
            component: LoginView,
            meta: {title: "Login", subtitle: "Add & Manage Subject Categories"},
          },
          {
            path: 'register',
            name: 'register',
            component: RegisterView,
            meta: {title: "Sign up", subtitle: "Add & Manage Subject Categories"},
          },
          {
            path: 'profile',
            name: 'profile',
            beforeEnter: guardMyroute,
            component: ProfileView,
            meta: {title: "Profile", subtitle: "Manage Categories"}
          },
          
      ]
        
    },
    {
      path: '/posts',
      name: 'posts',
      beforeEnter: guardMyroute,
      component: GenLayout,
      children: [
          {
            path: 'all',
            name: 'all-post',
            component: AllPosts,
            meta: {title: "All Posts", subtitle: "What is it?"},
          },
          {
            path: 'create',
            name: 'create-post',
            component: CreatePost,
            meta: {title: "Create Posts", subtitle: "What is it?"},
          },
      ]
        
    },
    {
      path: '/categories',
      name: 'categories',
      component: GenLayout,
      beforeEnter: guardMyroute,
      children:[
        {path: "", name: "all", component: AllCategories, meta: {title: "All Categories", subtitle: "What is it?"},},
        {path: ":cat_id", name: "cat-spec", component: SingleCategories, meta: {title: "Category", subtitle: "What is it?"},}
      ]
      
    },
    {
      path: '/post',
      name: 'post',
      beforeEnter: guardMyroute,
      component: GenLayout,
      children:[
        {
          path: ':post_id',
          name: 'single_post',
          component: SinglePost,
          meta: {title: "Post", subtitle: "What is it?"},
          children:[
            {
              path: 'comment',
              name: 'single_post_and_comments',
              component: SinglePostAndComments,
              meta: {title: "Post and Comments", subtitle: "What is it?"},
              
            }
          ]
      }
    ]
  }
  ]
})

export default router

router.afterEach((to) =>{
  document.title = `${to.meta.title} | OOP`
})