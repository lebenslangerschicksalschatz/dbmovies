(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{26:function(e,t,a){e.exports=a(39)},31:function(e,t,a){},32:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(23),s=a.n(c),l=(a(31),a(4)),i=a(5),o=a(7),m=a(6),u=a(8),v=(a(32),a(10)),p=a(11),d=a(19),h="https://api.themoviedb.org/3/movie/",g="https://image.tmdb.org/t/p/",E="?api_key=090028bc6de357f7dbfd5aeebae43718",b=function(e){return r.a.createElement("div",{className:"search-box"},r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("input",{onChange:e.handleChange,type:"text",placeholder:"What are you looking for?",minLength:3}),r.a.createElement("select",{className:"sort-box",defaultValue:"Sort",onChange:e.handleSort},r.a.createElement("option",{disabled:!0,value:"Sort"},"Sort"),r.a.createElement("option",{value:"Newest"},"Newest"),r.a.createElement("option",{value:"Oldest"},"Oldest"),r.a.createElement("option",{value:"RatingAsc"},"By Rating Asc"),r.a.createElement("option",{value:"RatingDesc"},"By Rating Desc"))))},f=function(e){return r.a.createElement("div",{className:"movie"},null===e.image?r.a.createElement("img",{className:"movie__pic",src:"https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-300x450.jpg",alt:"Movie Poster"}):r.a.createElement("img",{className:"movie__pic",src:"".concat(g+"w185/"+e.image),alt:"Movie Poster"}),r.a.createElement("div",{className:"movie__overlay"},0===e.voteAverage?"":r.a.createElement("div",{className:"movie__rating"},r.a.createElement("svg",{viewBox:"0 0 36 36",className:"circular-chart"},r.a.createElement("path",{className:"circle-bg",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("path",{className:"circle",strokeDasharray:"78, 100",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("text",{x:"18",y:"21.5",className:"percentage"},e.voteAverage))),r.a.createElement("div",{className:"movie__info"},r.a.createElement("h3",{className:"movie__title"},e.title),""===e.release_date?"":r.a.createElement("div",{className:"movie__date"},r.a.createElement("span",null,"Release Date: ",e.release_date.substring(0,4))))))},_=function(e){return r.a.createElement("div",{className:"movies__list"},e.movies.map((function(e){return r.a.createElement(v.b,{key:e.id,to:"/movie/".concat(e.id)},r.a.createElement(f,{key:e.id,image:e.poster_path,title:e.title,voteAverage:e.vote_average,release_date:e.release_date}))})))},N=function(e){for(var t=[],a=function(a){var n=e.currentPage===a?"activePage":"";t.push(r.a.createElement("li",{className:"pages__number ".concat(n),key:a,onClick:function(){return e.nextPage(a)}},r.a.createElement("button",null,a)))},n=1;n<=e.pages;n++)a(n);return r.a.createElement("ul",{className:"pages"},e.currentPage>1?r.a.createElement("li",{className:"pages__number pages__arrow",onClick:function(){return e.nextPage(e.currentPage-1)}},r.a.createElement("button",null,r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"angle-double-left",role:"img",viewBox:"0 0 448 512"},r.a.createElement("path",{fill:"currentColor",d:"M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"})))):"",t,e.currentPage<e.pages?r.a.createElement("li",{className:"pages__number pages__arrow",onClick:function(){return e.nextPage(e.currentPage+1)}},r.a.createElement("button",null,r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"angle-double-right",role:"img",viewBox:"0 0 448 512"},r.a.createElement("path",{fill:"currentColor",d:"M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"})))):"")},w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){a.setState({searchTerm:e.target.value})},a.handleSubmit=function(e){e.preventDefault();var t=e.target;fetch("".concat("https://api.themoviedb.org/3/search/movie?api_key=090028bc6de357f7dbfd5aeebae43718","&query=").concat(a.state.searchTerm)).then((function(e){return e.json()})).then((function(e){console.log(e),a.setState({movies:Object(d.a)(e.results),totalPages:e.total_pages,totalResults:e.total_results}),t.reset()}))},a.nextPage=function(e){fetch("".concat("https://api.themoviedb.org/3/search/movie?api_key=090028bc6de357f7dbfd5aeebae43718","&query=").concat(a.state.searchTerm,"&page=").concat(e)).then((function(e){return e.json()})).then((function(t){a.setState({movies:Object(d.a)(t.results),currentPage:e})}))},a.handleSort=function(e){a.setState({sort:e.target.value})},a.state={movies:[],searchTerm:"",totalPages:0,totalResults:0,currentPage:1,sort:""},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state.totalPages,a=this.state.movies.sort((function(t,a){return"Newest"===e.state.sort?parseInt(a.release_date.substring(0,4))-parseInt(t.release_date.substring(0,4)):"Oldest"===e.state.sort?parseInt(t.release_date.substring(0,4))-parseInt(a.release_date.substring(0,4)):"RatingAsc"===e.state.sort?t.vote_average-a.vote_average:"RatingDesc"===e.state.sort?a.vote_average-t.vote_average:void 0}));return r.a.createElement("div",{className:"movies"},r.a.createElement(b,{searchTerm:this.state.searchTerm,handleSubmit:this.handleSubmit,handleChange:this.handleChange,handleSort:this.handleSort}),r.a.createElement(_,{movies:a}),this.state.totalResults>20?r.a.createElement(N,{pages:t,nextPage:this.nextPage,currentPage:this.state.currentPage}):"")}}]),t}(r.a.Component),j=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"WATCHLIST"),r.a.createElement("p",null,"Cras facilisis urna ornare ex volutpat, et convallis erat elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."))}}]),t}(r.a.Component),y=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"ALREADY SEEN"),r.a.createElement("p",null,"Cras facilisis urna ornare ex volutpat, et convallis erat elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."))}}]),t}(r.a.Component),O=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"TOP 250"),r.a.createElement("p",null,"Cras facilisis urna ornare ex volutpat, et convallis erat elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."))}}]),t}(r.a.Component),x=a(14),k=a.n(x),P=a(18),C=a(20),S=function(e){var t=e.match;Object(n.useEffect)((function(){o(),d()}),[]);var a,c=Object(n.useState)({}),s=Object(C.a)(c,2),l=s[0],i=s[1],o=function(){var e=Object(P.a)(k.a.mark((function e(){var a,n,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=h+t.params.id+E,e.next=3,fetch("".concat(a));case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,i(r),console.log(r);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=Object(n.useState)({}),u=Object(C.a)(m,2),v=u[0],p=u[1],d=function(){var e=Object(P.a)(k.a.mark((function e(){var a,n,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=h+t.params.id+"/videos"+E,e.next=3,fetch("".concat(a));case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,p(r);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function b(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}return!b(v)&&(a=v.results[0].key,b(l)||b(v)?r.a.createElement("span",null,"is loading"):r.a.createElement("div",{className:"movie-d"},r.a.createElement("div",{className:"movie-d__info"},r.a.createElement("h1",null,l.title),l.genres.map((function(e){return r.a.createElement("span",{key:e.name},e.name)})),0===l.vote_average?"":r.a.createElement("div",{className:"movie__rating movie__rating_detail"},r.a.createElement("svg",{viewBox:"0 0 36 36",className:"circular-chart"},r.a.createElement("path",{className:"circle-bg",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("path",{className:"circle",strokeDasharray:"78, 100",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("text",{x:"18",y:"21.5",className:"percentage"},l.vote_average)))),r.a.createElement("div",{className:"movie-d__visual"},r.a.createElement("div",{className:"movie-d__pic"},null===l.poster_path?r.a.createElement("img",{src:"https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-300x450.jpg",alt:"Movie Poster"}):r.a.createElement("img",{src:"".concat(g+"w342/"+l.poster_path),alt:"Movie Poster"})),r.a.createElement("div",{className:"movie-d__vid"},r.a.createElement("iframe",{title:"https://www.youtube.com/embed/"+a,src:"https://www.youtube.com/embed/"+a})))))},M=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,null,r.a.createElement("header",{className:"header"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"header__logo"},r.a.createElement(v.c,{exact:!0,to:"/"},r.a.createElement("img",{src:"./main_logo.png",alt:"Main Logo"}))),r.a.createElement("nav",{className:"nav"},r.a.createElement("ul",{className:"nav__list"},r.a.createElement("li",{className:"nav__item"},r.a.createElement(v.c,{exact:!0,to:"/"},"Home")),r.a.createElement("li",{className:"nav__item"},r.a.createElement(v.c,{to:"/Watchlist"},"Watchlist")),r.a.createElement("li",{className:"nav__item"},r.a.createElement(v.c,{to:"/AlreadySeen"},"Already Seen")),r.a.createElement("li",{className:"nav__item"},r.a.createElement(v.c,{to:"/Top250"},"Top250")))))),r.a.createElement("main",{className:"main"},r.a.createElement("div",{className:"wrapper"},r.a.createElement(p.a,{exact:!0,path:"/",component:w}),r.a.createElement(p.a,{path:"/Watchlist",component:j}),r.a.createElement(p.a,{path:"/AlreadySeen",component:y}),r.a.createElement(p.a,{path:"/Top250",component:O}),r.a.createElement(p.a,{path:"/Movie/:id",component:S})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.bce61183.chunk.js.map