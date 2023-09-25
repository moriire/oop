//<script>
//eslint-disable /
//const BASE = location.origin;//"http://127.0.0.1:8000";
const BASE = import.meta.env.VITE_API_URL; //"http://127.0.0.1:8000";
console.log(BASE);
import alertifyjs from "@/alertifyjs";
import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia"
export const useAuthStore = defineStore({
	id: "auth",
	state: ()=> ({
		loginForm: { username: "", password: "" },
		regForm: {email: "", username: "", gender: "", password1: "", password2: "" },
		stores : {
			data : JSON.parse(localStorage.getItem("user")),
			refresh_token: localStorage.getItem("refresh_token"),
			access_token: localStorage.getItem("access_token"),
			refresh_token_time: localStorage.getItem("refresh_token_time"),
			access_token_time: localStorage.getItem("access_token_time"),
			loggedIn: localStorage.getItem("loggedin"),
			detail: {}
		}

	}),
	actions: {
		async logout() {
			try {
			const res = await axios.post(`${BASE}/v1/api/auth/logout/`, {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${this.stores.access_token}`}})//config)
				const resp = res.data 
				window.localStorage.clear()
				alertifyjs.success("loggedout");   
				router.push("/account/login");
			} catch(errors) {
				console.log(errors);
				window.localStorage.clear();
				//location.href="/account/login"
				router.push("/account/login")
				alertifyjs.errors("loggedout");   
			}
	},
	async login(username, password) {
		try {
			const res = await axios.post(`${BASE}/v1/api/auth/login/`, {username, password});
			console.log(res
				)
			localStorage.setItem("user", JSON.stringify(res.data));
			localStorage.setItem("loggedin", true),
			localStorage.setItem("refresh_token", res.data.refresh_token),
			localStorage.setItem("access_token", res.data.access_token),
			localStorage.setItem("access_token_time", res.data.access_token_expiration),
			localStorage.setItem("refresh_token_time", res.data.refresh_token_expiration)
			return "success"
			//console.log(res.status)
		} catch(errors) {
			console.log(errors)
		return "invalid-user"
				}
	},
	
	getUserProfile(){
		axios.get(`${BASE}/v1/api/auth/user/`, { headers: {
		  "Authorization": `Bearer ${this.stores.access_token}`,
		  //"Content-Type": "application/json"
		}})
		.then(res => {
		  //console.log(res)
		  this.regForm = res.data
		})
		.catch(errors => {
		  if (errors.response.data.code === "token_not_valid"){
			this.logout()
		  }
		  alert(errors)
		})
	  },
	  async registerForm() {  
		const res = await this.register(this.form)
		console.log(res)
		return res
		
		if (res.status==400){
		  const contents = Object.keys(res.data);
		  console.log(contents)
		  contents.forEach(i => {
			alertifyjs.error(...res.data[i])
		  });
		  
		} else {
		  alertifyjs.success("Registration Successful")
		  router.push("/account/login")
		}
		
	  },
	
	async refreshToken(refresh_token = this.refresh_token) {
		try {
			const res = await axios.post(`${BASE}/v1/api/auth/token/refresh/`, 
				{ refresh: refresh_token }, {header: 
					{"Authorization": `Bearer ${this.access_token}`}
				});
			const resp = res.data;
			localStorage.setItem("access_token", resp.access_token),
			localStorage.setItem("access_token_time", resp.access_token_expiration),
			
			alert("refreshed")
		} catch(errors) {
			logout();
			localStorage.clear();
			location.href=getQ(location.href)
			//alert(errors.response.data)
		}
	},
	async verifyToken(token) {
		try {
		const res = await axios.post(`${BASE}/v1/api/auth/token/verify/`, { "token" : token})
		return true
		} catch(errors) {
		//localStorage.removeItem("loggedin"),
		console.log(errors.response.data)
		//location.href="/account/login"
		}
	},
	async resetPassword(email) {
		try {
			const res = await axios.post(`${BASE}/v1/api/auth/password/reset/`, { email });
			const resp = res.data
			alertifyjs.alert("Password reset successful")
			router.push("/account/confirm_password")
		} catch(errors) {
				alertifyjs.alert(errors);
				$errors.code = errors.response.status;
				$errors.message= "Username or password error"
		}
	},
	async changePassword(new_password1, new_password2) {
		const config = { headers: {Authorization: `Bearer  ${ state.data.access_token }` }}
		try {
			const res = await axios.post(`${BASE}/v1/api/auth/password/change/`, {new_password2, new_password1}, config);
			//location.href=location.href.split("?redirect=")[1] || '/receive'
			return res
		} catch(errors) {
		return errors.response.data
				}
	},

	async register(kw){
		try {
			const res = await axios.post(`${BASE}/v1/api/auth/signup/`, kw )
			//console.log(res.data)
			return res.data;
		} catch(errors){
			console.log(errors)
			//return errors.response
		}
	},

	},
	getters:{
		auth: (state)=>{
			return this.data
		}
	}
})