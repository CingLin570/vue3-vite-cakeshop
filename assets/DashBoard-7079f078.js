import{u as r,o as a,c,d as s}from"./index-a263e2f3.js";const p={__name:"DashBoard",setup(n){const t=r();return(async()=>{try{const e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");s.defaults.headers.common.Authorization=e;const o="https://vue3-course-api.hexschool.io/api/user/check";(await s.post(o)).data.success||t.push("/login")}catch(e){throw new Error(e)}})(),(e,o)=>(a(),c("div",null," Dashboard "))}};export{p as default};
