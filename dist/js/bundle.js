(()=>{var e={653:(e,t,r)=>{"use strict";r.r(t)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{r(653);const e=document.querySelector(".navbar-burger"),t=document.querySelector("#sidebar"),o=document.querySelector("#mainContent");e.addEventListener("click",(function(){this.classList.toggle("is-active"),t.classList.toggle("is-hidden-mobile"),window.innerWidth>750&&o.classList.toggle("offset")}))})()})();