import{r as n,_ as x,u as h,j as e,L as p,N as r}from"./index-DCB2o80S.js";import{G as u,B as b}from"./iconBase-BneYDday.js";function j(s){return u({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"},child:[]}]})(s)}const g=n.lazy(()=>x(()=>import("./AddEventModel-BUOw4IkF.js"),__vite__mapDeps([0,1,2,3,4]))),N=()=>{const{auth:s,setAuth:i}=h(),[t,l]=n.useState(!1),d=()=>{l(!1)},a=()=>{i({accessToken:"",email:""}),localStorage.removeItem("user")},[o,c]=n.useState(!1),m=()=>{c(!o)};return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:"z-50",children:e.jsxs("div",{style:{position:"fixed",width:"100%",zIndex:999},className:"px-4 py-2 text-white flex   justify-between bg-black",children:[e.jsx("div",{className:"flex mt-2 sm:mt-0 items-start sm:items-center justify-center",children:e.jsx(p,{to:"/",children:e.jsx("h1",{className:"font-custom font-extrabold text-2xl align-middle",children:"easyevents"})})}),e.jsx("div",{className:o?"md:flex  md:pt-0 pt-10 w-full md:w-auto":"hidden md:flex",id:"menu",children:e.jsxs("ul",{children:[e.jsx("li",{className:"md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3",children:e.jsx(r,{to:"/",className:"md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3",children:"Home"})}),s!=null&&s.accessToken?e.jsxs(e.Fragment,{children:[" ",e.jsx("li",{className:"md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3",children:e.jsx(r,{to:"/user",className:"md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3",children:"Dashboard"})}),e.jsx("li",{className:"md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3",children:e.jsx(r,{to:"/login",onClick:a,className:"md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3",children:"Log out"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("li",{className:"md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3",children:e.jsx(r,{to:"/signup",className:"md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3",children:"Signup"})}),e.jsx("li",{className:"md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3",children:e.jsx(r,{to:"/login",className:"md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3",children:"Login"})})]})]})}),e.jsxs("div",{className:"flex ",children:[!o&&e.jsx("div",{className:"flex items-center",children:e.jsxs(b,{className:"p-0 mx-auto mt-2 focus:z-0",onClick:()=>{l(!0)},children:[e.jsx(j,{})," Add event"," "]})}),e.jsxs("div",{className:"cursor-pointer md:hidden",children:[e.jsx("input",{className:"menu-btn hidden",type:"checkbox",id:"menu-btn"}),e.jsx("label",{className:"menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none",htmlFor:"menu-btn",children:e.jsx("span",{onClick:m,className:"navicon bg-white-darkest flex items-center relative"})})]})]}),e.jsx("div",{className:`${!t&&"hidden"}`,children:e.jsx(n.Suspense,{fallback:e.jsx("h2",{children:"Loading..."}),children:t&&e.jsx("div",{className:"fixed inset-0 backdrop-filter backdrop-blur-lg",children:e.jsx(g,{handleCloseModal:d})})})})]})}),e.jsx(e.Fragment,{})]})};export{N as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/AddEventModel-BUOw4IkF.js","assets/index-DCB2o80S.js","assets/index-BDMltyzj.css","assets/iconBase-BneYDday.js","assets/index-CzEfZKJO.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}