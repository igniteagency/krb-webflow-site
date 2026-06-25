"use strict";(()=>{var _="[data-lightbox-parent]",A="[data-lightbox-trigger]",S="[data-lightbox-target]",v="[data-lightbox-template], [data-newsletter-lightbox-template]",H="krb-lightbox-css",w=/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;function X(t=document){I(t).forEach(k)}function D(t){let{root:e,imagesSelector:a="img",template:r=C(e),label:u="Image gallery",initialisedKey:d="lightboxInitialised",imageIndexAttribute:f="lightboxIndex",overlayAttribute:p="data-lightbox",bodyOpenClass:x="lightbox-open",triggerImages:g=!0}=t;if(e.dataset[d]==="true")return;let i=q(e,a);if(!i.length)return;let b=i.map((l,h)=>(l.dataset[f]=String(h),g&&(l.setAttribute("tabindex","0"),l.setAttribute("role","button"),l.setAttribute("aria-label",l.alt?`Open image: ${l.alt}`:"Open image")),{img:l,src:R(l),alt:l.alt||"",caption:N(l)}));G();let o=r?r.cloneNode(!0):P();o instanceof HTMLElement&&(o.removeAttribute("data-lightbox-template"),o.removeAttribute("data-newsletter-lightbox-template"),o.setAttribute(p,""),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",u),o.setAttribute("aria-hidden","true"),r&&o.style.removeProperty("display"),document.body.appendChild(o),B(o,b,{bodyOpenClass:x,triggerImages:g}),e.dataset[d]="true")}function I(t){let e=Array.from(t.querySelectorAll(_));return t instanceof HTMLElement&&t.matches(_)&&e.unshift(t),e}function k(t){t.querySelectorAll(A).forEach(e=>{if(e.dataset.lightboxBound==="true")return;let a=O(t,e);!a||a===e||(e.dataset.lightboxBound="true",e.addEventListener("click",r=>{r.preventDefault(),a.click()}))})}function O(t,e){let a=e.getAttribute("data-lightbox-trigger")?.trim();if(a)try{let r=t.querySelector(a);if(r)return r}catch{return null}return t.querySelector(S)}function q(t,e){return Array.from(t.querySelectorAll(e)).filter(a=>a.currentSrc||a.src).filter((a,r,u)=>u.indexOf(a)===r)}function C(t){return t.querySelector(v)}function G(){if(document.getElementById(H))return;let t=document.createElement("style");t.id=H,t.textContent=`
    .newsletter_rich-text img[data-newsletter-lightbox-index] {
      cursor: zoom-in;
    }

    body.lightbox-open,
    body.newsletter-lightbox-open {
      overflow: hidden;
    }

    [data-lightbox-template],
    [data-newsletter-lightbox-template] {
      display: none !important;
    }

    .newsletter-lightbox,
    [data-lightbox],
    [data-newsletter-lightbox] {
      position: fixed;
      inset: 0;
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
    }

    .newsletter-lightbox.is-open,
    [data-lightbox].is-open,
    [data-newsletter-lightbox].is-open {
      opacity: 1;
      pointer-events: auto;
    }

    .newsletter-lightbox__image,
    [data-lightbox-image] {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  `,document.head.appendChild(t)}function P(){let t=document.createElement("div");return t.className="newsletter-lightbox",t.setAttribute("data-lightbox",""),t.innerHTML=`
    <button class="newsletter-lightbox__button newsletter-lightbox__close" type="button" data-lightbox-close aria-label="Close image gallery">\xD7</button>
    <button class="newsletter-lightbox__button newsletter-lightbox__prev" type="button" data-lightbox-prev aria-label="Previous image">\u2039</button>
    <div class="newsletter-lightbox__stage" data-lightbox-stage>
      <img class="newsletter-lightbox__image" data-lightbox-image alt="">
    </div>
    <button class="newsletter-lightbox__button newsletter-lightbox__next" type="button" data-lightbox-next aria-label="Next image">\u203A</button>
    <div class="newsletter-lightbox__meta">
      <p class="newsletter-lightbox__caption" data-lightbox-caption></p>
      <p class="newsletter-lightbox__counter" data-lightbox-counter></p>
    </div>
  `,t}function B(t,e,a){let r=t.querySelector("[data-lightbox-image]")||t.querySelector("img"),u=t.querySelector("[data-lightbox-caption]"),d=t.querySelector("[data-lightbox-counter]"),f=t.querySelectorAll("[data-lightbox-close]"),p=t.querySelectorAll("[data-lightbox-prev]"),x=t.querySelectorAll("[data-lightbox-next]"),g=t.querySelector("[data-lightbox-stage]")||r?.parentElement||t;if(!r)return{open:()=>{},close:()=>{}};let i=0,b=null,o=0,l=0,h=()=>{let n=e[i];n&&(r.src=n.src,r.alt=n.alt||n.caption||"Image",u&&(u.textContent=n.caption,u.hidden=!n.caption),d&&(d.textContent=`${i+1} / ${e.length}`))},E=(n=0)=>{i=T(n,e.length),b=document.activeElement,h(),document.body.classList.add(a.bodyOpenClass),t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),(t.querySelector("[data-lightbox-close]")||t.querySelector("button")||t).focus()},m=()=>{t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),document.body.classList.remove(a.bodyOpenClass),b instanceof HTMLElement&&b.focus()},L=()=>{i=T(i-1,e.length),h()},y=()=>{i=T(i+1,e.length),h()};return a.triggerImages&&e.forEach((n,s)=>{n.img.addEventListener("click",c=>{c.preventDefault(),E(s)}),n.img.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),E(s))})}),f.forEach(n=>n.addEventListener("click",m)),p.forEach(n=>n.addEventListener("click",L)),x.forEach(n=>n.addEventListener("click",y)),t.addEventListener("click",n=>{n.target===t&&m()}),g.addEventListener("touchstart",n=>{let s=n.changedTouches[0];o=s.clientX,l=s.clientY},{passive:!0}),g.addEventListener("touchend",n=>{let s=n.changedTouches[0],c=s.clientX-o,M=s.clientY-l;Math.abs(c)>45&&Math.abs(c)>Math.abs(M)&&(c>0?L():y())},{passive:!0}),document.addEventListener("keydown",n=>{t.classList.contains("is-open")&&(n.key==="Escape"&&m(),n.key==="ArrowLeft"&&L(),n.key==="ArrowRight"&&y())}),{open:E,close:m}}function T(t,e){return e?(t%e+e)%e:0}function R(t){let e=t.closest("a[href]"),a=e?.getAttribute("href")||"";return w.test(a)?e?.href||"":t.currentSrc||t.src}function N(t){return(t.closest("figure")?.querySelector("figcaption")?.textContent||t.alt||"").trim()}})();
