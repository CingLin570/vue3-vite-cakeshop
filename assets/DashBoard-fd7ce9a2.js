import{_ as d,o as a,c as i,b as t,g as l,u,d as p,F as x,e as c}from"./index-50d21610.js";const h={},m={class:"sidebar select-none z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-brown-700 flex flex-col transition-transform",ref:"sidebar"},_=t("div",{class:"text-gray-100 text-xl"},[t("div",{class:"p-2.5 mt-1 flex items-center"},[t("h1",{class:"font-bold text-gray-200 text-[24px] ml-3"},"後臺管理"),t("i",{class:"bi bi-x cursor-pointer ml-28 lg:hidden",onclick:"openSidebar()"})]),t("div",{class:"my-2 bg-brown-500 h-[1px]"})],-1),b=l('<div class="mt-3 cursor-pointer text-white"></div><div class="mt-3 cursor-pointer text-white"></div><div class="mt-3 cursor-pointer text-white"></div><div class="mt-3 cursor-pointer text-white"></div><div class="my-4 bg-brown-500 h-[1px]"></div><div class="my-4 bg-brown-500 h-[1px] mt-auto"></div>',6),f=t("span",{class:"material-icons-outlined"},"logout",-1),v=t("span",{class:"text-[15px] ml-4 text-gray-200 font-bold"},"登出",-1),g=[f,v];function w(s,e){return a(),i("div",m,[_,b,t("button",{type:"button",class:"p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white",onClick:e[0]||(e[0]=(...r)=>s.logout&&s.logout(...r))},g)],512)}const k=d(h,[["render",w]]),y=t("div",null," Dashboard ",-1),N={__name:"DashBoard",setup(s){const e=u();return(async()=>{try{const o=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");c.defaults.headers.common.Authorization=o;const n="https://vue3-course-api.hexschool.io/api/user/check";(await c.post(n)).data.success||e.push("/login")}catch(o){throw new Error(o)}})(),(o,n)=>(a(),i(x,null,[p(k),y],64))}};export{N as default};
