import{r as l,_ as S,u as E,i as R,j as s,e as i,b as f}from"./index-DCB2o80S.js";import{M,F as T,a as I,R as A}from"./Route-BzkLDGJv.js";import{B as m}from"./iconBase-BneYDday.js";import{I as P}from"./index-CzEfZKJO.js";const O=l.lazy(()=>S(()=>import("./CustomModel-cfJmMhrG.js"),__vite__mapDeps([0,1,2,3,4]))),$=()=>{var h;const[b,j]=l.useState(null),[n,w]=l.useState(!1),N=[23.03282845,72.54671281964617],[u,r]=l.useState(!1),{auth:o}=E(),y=()=>{r(!0)},k=()=>{r(!1)},[e,D]=l.useState(),p=R().eventId;console.log(p);const c=t=>{const a=Intl.DateTimeFormat().resolvedOptions().timeZone,d=new Date(t),x=new Date(d.toLocaleString("en-US",{timeZone:a}));console.log(x);const _=x.toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});return`${x.toDateString()} ${_}`},g=async()=>{try{const t=await f.get(`http://localhost:5000/api/v1/events/detailed/${p}`);console.log(JSON.stringify(t.data)),D(t.data[0]),console.log("=========categories==============")}catch(t){if(f.isAxiosError(t))if(t.response&&t.response.data){const a=t.response.data.message;i.error(a)}else i.error("An error occurred");else i.error("An error occurred"),console.error("An error occurred:",t);console.log(t)}};return l.useEffect(()=>{g()},[]),l.useEffect(()=>{g()},[n]),l.useEffect(()=>{console.log("===================================="),console.log(e),console.log("===================================="),console.log(e==null?void 0:e.venue.latitude),console.log(e==null?void 0:e.venue.longitude),console.log("===================================="),e!=null&&e.venue.latitude&&(e!=null&&e.venue.longitude)&&j([e==null?void 0:e.venue.latitude,e==null?void 0:e.venue.longitude]),console.log("====================================")},[e]),s.jsxs("div",{className:"mx-auto",style:{background:"linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)"},children:[s.jsxs("div",{className:"pt-10 px-2 sm:w-5/6 w-full mx-auto flex flex-col justify-between",children:[s.jsxs("h1",{className:"text-xl my-2 font-bold leading-tight tracking-wide  md:text-2xl text-white text-left",children:[e==null?void 0:e.title," ",s.jsx("br",{})]})," ",s.jsxs("div",{className:"flex flex-col",children:[" ",s.jsxs("span",{className:"text-xs flex items-center gap-2 mb-1 md:text-sm text-gray-300 m-0",children:[s.jsx(P,{className:"text-yellow-300 text-base"}),"Registration"," ",c(e==null?void 0:e.start_date_toRegister),"-"," ",c(e==null?void 0:e.end_date_toRegister)]})]})]}),s.jsxs("div",{className:"flex sm:w-5/6 w-full mx-auto sm:border border-gray-700  flex-col sm:flex-row rounded-xl ",children:[s.jsxs("div",{className:"left sm:w-4/6 sm:p-4 w-full p-1",children:[s.jsxs("div",{className:"posterImage w-full",children:[s.jsx("img",{className:"rounded-t-lg w-full object-cover object-center aspect-ratio-16-9 ",src:`http://localhost:5000/uploads/${(h=e==null?void 0:e.images[0])==null?void 0:h.poster_image}`,alt:""})," "]}),s.jsxs("div",{className:"datetime w-full flex flex-wrap gap-2 items-center mt-2 border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ",children:[s.jsx(m,{className:"p-0 mx-auto bg-purple-900 rounded-full",children:e==null?void 0:e.mode}),s.jsx(m,{className:"p-0 mx-auto  bg-purple-900 rounded-full",children:e==null?void 0:e.category.name}),s.jsx(m,{className:"p-0 mx-auto  bg-purple-900 rounded-full",children:e==null?void 0:e.type.name})]})]}),s.jsxs("div",{className:"right  sm:w-2/6 sm:p-4 w-full p-1",children:[s.jsxs("div",{className:"datetime flex items-center border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ",children:[s.jsx(M,{className:"text-yellow-300 mr-2 text-xl md:text-2xl"}),s.jsxs("div",{className:"flex flex-col",children:[" ",s.jsx("span",{className:"text-sm   md:text-base text-white m-0",children:c(e==null?void 0:e.start_date)})]}),s.jsx("span",{className:"text-sm   md:text-base text-white mx-4",children:"-"}),s.jsxs("div",{className:"flex flex-col",children:[" ",s.jsx("span",{className:"text-sm   md:text-base text-white m-0",children:c(e==null?void 0:e.end_date)})]})]}),s.jsxs("div",{className:"datetime mt-3 flex items-center border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ",children:[s.jsx(T,{className:"text-yellow-300 mr-2 text-xl md:text-2xl"}),s.jsxs("div",{className:"flex flex-col",children:[" ",s.jsx("span",{className:"text-sm   md:text-base text-white m-0",children:e==null?void 0:e.venue.name}),s.jsxs("span",{className:"text-sm   md:text-base text-white m-0",children:[e==null?void 0:e.venue.city,", ",e==null?void 0:e.venue.state,","," ",e==null?void 0:e.venue.country," - ",e==null?void 0:e.venue.postcode]})]})]}),s.jsx("div",{className:"datetime mt-3 flex items-center border h-[25vh] border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ",children:s.jsx("div",{style:{width:"100%",height:"100%"},children:s.jsx(I,{selectPosition:b||N})})}),s.jsx("div",{className:"flex justify-center w-full",children:s.jsxs("div",{className:"datetime mt-3 sm:w-full w-full ticket sm:py-3  align-middle  ",children:[s.jsxs("div",{className:"flex justify-between",children:[s.jsxs("p",{className:"text-sm p-1   md:text-base text-white m-0",children:["Tickets remaining: ",e==null?void 0:e.tickets_remaining]}),s.jsxs("p",{className:"text-sm p-1 px-3 rounded-lg font-bold  bg-yellow-300  md:text-base text-black m-0",children:["₹ ",e==null?void 0:e.price]})]}),s.jsx(m,{onClick:()=>{if(o&&(o!=null&&o.accessToken)){const t=new Date,a=new Date(e==null?void 0:e.start_date_toRegister),d=new Date(e==null?void 0:e.end_date_toRegister);console.log("===================================="),console.log("Current Date:",t),console.log("Start Date:",a),console.log("End Date:",d),console.log("===================================="),t>=a&&t<=d?r(!0):i.error("Registration period has ended")}else r(!0)},className:"p-0 mx-auto mt-2 focus:z-0",children:"Book now"})]})})]})]}),s.jsxs("div",{className:"flex sm:w-5/6 w-full mx-auto sm:border border-gray-700 flex-col-reverse sm:flex-row rounded-xl mt-2",children:[s.jsx("div",{className:"left sm:w-4/6 sm:p-4 p-2 w-full ",children:s.jsxs("div",{className:"border border-gray-700 rounded-xl p-3",children:[s.jsxs("h1",{className:"text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-left",children:["Description ",s.jsx("br",{})]})," ",s.jsx("p",{className:"text-white text-justify text-sm",children:e==null?void 0:e.description})]})}),s.jsxs("div",{className:"right sm:w-2/6 sm:p-4 w-full p-1",children:[s.jsxs("div",{className:"datetime flex flex-col items-center border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ",children:[s.jsx("span",{className:"text-sm   md:text-base text-white m-0",children:"Organizer"}),s.jsxs("div",{className:"flex",children:[s.jsx(A,{className:"text-yellow-300 mr-2 text-xl md:text-2xl"}),s.jsx("span",{className:"text-sm   md:text-base text-white m-0",children:e==null?void 0:e.organizer.name})]})]}),s.jsxs("div",{className:"datetime mt-2 flex flex-col items-center border  border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ",children:[s.jsx("span",{className:"text-sm   md:text-base text-white m-0",children:"Speakers"}),e==null?void 0:e.speakers.map(t=>s.jsxs("div",{className:"flex items-center  mt-2",children:[s.jsxs("div",{className:"posterImage w-1/4 mr-4",children:[s.jsx("img",{className:"rounded-full w-full object-cover object-center aspect-ratio-rounded",src:`http://localhost:5000/uploads/${t.image}`,alt:""})," "]}),s.jsx("span",{className:"text-sm   md:text-base text-white m-0",children:t.name})]}))]})]})]}),s.jsx(s.Fragment,{children:s.jsx("div",{children:s.jsx(l.Suspense,{fallback:s.jsx("h2",{children:"Loading..."}),children:u&&s.jsx("div",{className:"fixed inset-0 backdrop-filter backdrop-blur-lg",children:s.jsx(O,{booked:n,modalOpen:u,setBooked:w,handleOpenModal:y,handleCloseModal:k,eventId:e==null?void 0:e.id,eventPrice:e==null?void 0:e.price})})})})})]})};export{$ as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/CustomModel-cfJmMhrG.js","assets/index-DCB2o80S.js","assets/index-BDMltyzj.css","assets/iconBase-BneYDday.js","assets/index-CzEfZKJO.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
