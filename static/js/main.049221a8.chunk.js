(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{23:function(e,t,a){e.exports=a(35)},28:function(e,t,a){},29:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(20),c=a.n(l),s=(a(28),a(4)),i=a(5),o=a(7),m=a(6),u=a(8),p=(a(29),a(12)),g=a(10),h=a(17),v=function(e){return r.a.createElement("div",{className:"search-box"},r.a.createElement("form",{action:"",onSubmit:e.handleSubmit},r.a.createElement("input",{onChange:e.handleChange,type:"text",placeholder:"What are you looking for?"}),r.a.createElement("select",{className:"sort-box",defaultValue:"Sort",onChange:e.handleSort},r.a.createElement("option",{disabled:!0,value:"Sort"},"Sort"),r.a.createElement("option",{value:"Newest"},"Newest"),r.a.createElement("option",{value:"Oldest"},"Oldest"),r.a.createElement("option",{value:"RatingAsc"},"By Rating Asc"),r.a.createElement("option",{value:"RatingDesc"},"By Rating Desc"))))},d=function(e){return r.a.createElement("div",{className:"movie"},null===e.image?r.a.createElement("img",{className:"movie__pic",src:"https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-300x450.jpg",alt:"Movie Poster"}):r.a.createElement("img",{className:"movie__pic",src:"http://image.tmdb.org/t/p/w185".concat(e.image),alt:"Movie Poster"}),r.a.createElement("div",{className:"movie__overlay"},0===e.voteAverage?"":r.a.createElement("div",{className:"movie__rating"},r.a.createElement("svg",{viewBox:"0 0 36 36",className:"circular-chart"},r.a.createElement("path",{className:"circle-bg",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("path",{className:"circle",strokeDasharray:"78, 100",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("text",{x:"18",y:"21.5",className:"percentage"},e.voteAverage))),r.a.createElement("div",{className:"movie__info"},r.a.createElement("h3",{className:"movie__title"},e.title),""===e.release_date?"":r.a.createElement("div",{className:"movie__date"},r.a.createElement("span",null,"Released In: ",e.release_date.substring(0,4))))))},b=function(e){return r.a.createElement("div",{className:"movies__list"},e.movies.map((function(e){return r.a.createElement(d,{key:e.id,image:e.poster_path,title:e.title,voteAverage:e.vote_average,release_date:e.release_date})})))},E=function(e){for(var t=[],a=function(a){var n=e.currentPage===a?"activePage":"";t.push(r.a.createElement("li",{className:"pages__number ".concat(n),key:a,onClick:function(){return e.nextPage(a)}},r.a.createElement("button",null,a)))},n=1;n<=e.pages;n++)a(n);return r.a.createElement("ul",{className:"pages"},e.currentPage>1?r.a.createElement("li",{className:"pages__number pages__arrow",onClick:function(){return e.nextPage(e.currentPage-1)}},r.a.createElement("button",null,r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"angle-double-left",role:"img",viewBox:"0 0 448 512"},r.a.createElement("path",{fill:"currentColor",d:"M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"})))):"",t,e.currentPage<e.pages?r.a.createElement("li",{className:"pages__number pages__arrow",onClick:function(){return e.nextPage(e.currentPage+1)}},r.a.createElement("button",null,r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"angle-double-right",role:"img",viewBox:"0 0 448 512"},r.a.createElement("path",{fill:"currentColor",d:"M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"})))):"")},f=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){a.setState({searchTerm:e.target.value})},a.handleSubmit=function(e){e.preventDefault(),fetch("https://api.themoviedb.org/3/search/movie?api_key=".concat(a.apiKey,"&query=").concat(a.state.searchTerm)).then((function(e){return e.json()})).then((function(e){console.log(e),a.setState({movies:Object(h.a)(e.results),totalPages:e.total_pages,totalResults:e.total_results})}))},a.nextPage=function(e){fetch("https://api.themoviedb.org/3/search/movie?api_key=".concat(a.apiKey,"&query=").concat(a.state.searchTerm,"&page=").concat(e)).then((function(e){return e.json()})).then((function(t){a.setState({movies:Object(h.a)(t.results),currentPage:e})}))},a.handleSort=function(e){console.log(e.target.value),a.setState({sort:e.target.value})},a.state={movies:[],searchTerm:"",totalPages:0,totalResults:0,currentPage:1,sort:""},a.apiKey="090028bc6de357f7dbfd5aeebae43718",a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state.totalPages,a=this.state.movies.sort((function(t,a){return"Newest"===e.state.sort?parseInt(a.release_date.substring(0,4))-parseInt(t.release_date.substring(0,4)):"Oldest"===e.state.sort?parseInt(t.release_date.substring(0,4))-parseInt(a.release_date.substring(0,4)):"RatingAsc"===e.state.sort?a.vote_average-t.vote_average:"RatingDesc"===e.state.sort?t.vote_average-a.vote_average:void 0}));return r.a.createElement("div",{className:"movies"},r.a.createElement(v,{handleSubmit:this.handleSubmit,handleChange:this.handleChange,handleSort:this.handleSort}),r.a.createElement(b,{movies:a}),this.state.totalResults>20?r.a.createElement(E,{pages:t,nextPage:this.nextPage,currentPage:this.state.currentPage}):"")}}]),t}(r.a.Component),_=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"WATCHLIST"),r.a.createElement("p",null,"Cras facilisis urna ornare ex volutpat, et convallis erat elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."))}}]),t}(r.a.Component),N=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"ALREADY SEEN"),r.a.createElement("p",null,"Cras facilisis urna ornare ex volutpat, et convallis erat elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."))}}]),t}(r.a.Component),y=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"TOP 250"),r.a.createElement("p",null,"Cras facilisis urna ornare ex volutpat, et convallis erat elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."))}}]),t}(r.a.Component),O=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,null,r.a.createElement("header",{className:"header"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"header__logo"},r.a.createElement(p.b,{exact:!0,to:"/"},r.a.createElement("img",{src:"./main_logo.png",alt:"Main Logo"}))),r.a.createElement("nav",{className:"nav"},r.a.createElement("ul",{className:"nav__list"},r.a.createElement("li",{className:"nav__item"},r.a.createElement(p.b,{exact:!0,to:"/"},"Home")),r.a.createElement("li",{className:"nav__item"},r.a.createElement(p.b,{to:"/Watchlist"},"Watchlist")),r.a.createElement("li",{className:"nav__item"},r.a.createElement(p.b,{to:"/AlreadySeen"},"Already Seen")),r.a.createElement("li",{className:"nav__item"},r.a.createElement(p.b,{to:"/Top250"},"Top250")))))),r.a.createElement("main",{className:"main"},r.a.createElement("div",{className:"wrapper"},r.a.createElement(g.a,{exact:!0,path:"/",component:f}),r.a.createElement(g.a,{path:"/Watchlist",component:_}),r.a.createElement(g.a,{path:"/AlreadySeen",component:N}),r.a.createElement(g.a,{path:"/Top250",component:y})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.049221a8.chunk.js.map