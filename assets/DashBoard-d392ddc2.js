import{u as x,r as d,i as C,a as c,o as h,c as f,b as r,d as e,w as T,h as v,F as b,j as B,e as _,_ as N,k as S}from"./index-b9a928ac.js";import{a as y,C as g}from"./js.cookie-5281431b.js";const E=e("div",{class:"text-gray-100 text-xl"},[e("div",{class:"p-2.5 mt-1 flex items-center"},[e("h1",{class:"font-bold text-gray-200 text-[24px]"},"後臺管理"),e("i",{class:"bi bi-x cursor-pointer ml-28 lg:hidden",onclick:"openSidebar()"})]),e("div",{class:"my-2 bg-primary-500 h-[1px]"})],-1),L={class:"mt-3 cursor-pointer text-white"},V=B('<div class="mt-3 cursor-pointer text-white"></div><div class="mt-3 cursor-pointer text-white"></div><div class="mt-3 cursor-pointer text-white"></div><div class="my-4 bg-primary-500 h-[1px]"></div><div class="my-4 bg-primary-500 h-[1px] mt-auto"></div>',5),z={class:"text-[15px] text-gray-200 font-bold"},j={__name:"SideBarComponent",setup(u,{expose:s}){const l=x(),t=d(!1),p=d(null);s({sidebar:p});const o=C("emitter"),m=d(null),n=async()=>{try{t.value=!0;const a="https://vue3-course-api.hexschool.io/logout",i=await _.post(a);i.data.success?(t.value=!1,y.remove("hexToken",{path:""}),l.push("/login"),o.emit("push-message",{style:"green-500",title:"登出成功"})):(t.value=!1,m.value=i.data.error.message,o.emit("push-message",{style:"red-500",title:"登出失敗",content:i.data.error.message}))}catch(a){throw t.value=!1,o.emit("push-message",{style:"red-500",title:"登出失敗"}),new Error(a)}};return(a,i)=>{const w=c("LoadingComponent"),k=c("router-link"),$=c("font-awesome-icon");return h(),f(b,null,[r(w,{active:t.value},null,8,["active"]),e("div",{class:"sidebar select-none z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-primary-700 flex flex-col transition-transform",ref_key:"sidebar",ref:p},[E,e("div",L,[r(k,{to:{name:"adminProducts"},class:"block text-left py-2.5 pl-2.5 pr-4 text-[15px] text-gray-200 font-bold rounded-md duration-300 hover:bg-primary-700-hover"},{default:T(()=>[v("產品管理")]),_:1})]),V,e("button",{type:"button",class:"p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-700-hover active:bg-primary-700-focus text-white",onClick:n},[e("span",z,[v(" 登出 "),r($,{icon:["fas","arrow-right-from-bracket"],class:"ml-1"})])])],512)],64)}}},A={},D={class:"w-full sticky top-0 border-b select-none bg-white"},F={class:"flex"};function J(u,s){const l=c("font-awesome-icon");return h(),f("div",D,[e("div",F,[e("a",{href:"#",class:"p-4 inline-block border-r",onClick:s[0]||(s[0]=S(t=>u.$emit("navbar-toggle"),["prevent"]))},[r(l,{icon:["fas","up-right-and-down-left-from-center"],size:"lg",class:"block"})])])])}const M=N(A,[["render",J]]);const P={class:"main relative ml-[300px] transition-[spacing]"},q={__name:"DashBoard",setup(u){const s=x();(async()=>{try{const o=y.get("hexToken");if(!o){s.push("/login");return}const n=g.AES.decrypt(o,"secret key 123").toString(g.enc.Utf8);_.defaults.headers.common.Authorization=n;const a="https://vue3-course-api.hexschool.io/api/user/check";(await _.post(a)).data.success||s.push("/login")}catch(o){throw new Error(o)}})();const t=d(null),p=()=>{t.value.sidebar.classList.toggle("active")};return(o,m)=>{const n=c("router-view");return h(),f(b,null,[r(j,{ref_key:"sidebar",ref:t},null,512),e("div",P,[r(M,{onNavbarToggle:p}),r(n)])],64)}}};export{q as default};
