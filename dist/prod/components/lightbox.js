"use strict";(()=>{var A="[data-lightbox-parent]",M="[data-lightbox-trigger]",S="[data-lightbox-target]",v="[data-lightbox-template], [data-newsletter-lightbox-template]",H="krb-lightbox-css",w=/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;function D(t=document){I(t).forEach(k)}function Y(t){let{root:e,imagesSelector:a="img",template:r=C(e),label:u="Image gallery",initialisedKey:m="lightboxInitialised",imageIndexAttribute:f="lightboxIndex",overlayAttribute:p="data-lightbox",bodyOpenClass:E="lightbox-open",triggerImages:d=!0}=t;if(e.dataset[m]==="true")return;let s=O(e,a);if(!s.length)return;let g=s.map((l,b)=>(l.dataset[f]=String(b),d&&(l.setAttribute("tabindex","0"),l.setAttribute("role","button"),l.setAttribute("aria-label",l.alt?`Open image: ${l.alt}`:"Open image")),{img:l,src:R(l),alt:l.alt||"",caption:X(l)}));G();let o=r?r.cloneNode(!0):B();o instanceof HTMLElement&&(P(o),o.removeAttribute("data-lightbox-template"),o.removeAttribute("data-newsletter-lightbox-template"),o.setAttribute(p,""),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",u),o.setAttribute("aria-hidden","true"),r&&o.style.removeProperty("display"),document.body.appendChild(o),N(o,g,{bodyOpenClass:E,triggerImages:d}),e.dataset[m]="true")}function I(t){let e=Array.from(t.querySelectorAll(A));return t instanceof HTMLElement&&t.matches(A)&&e.unshift(t),e}function k(t){t.querySelectorAll(M).forEach(e=>{if(e.dataset.lightboxBound==="true")return;let a=q(t,e);!a||a===e||(e.dataset.lightboxBound="true",e.addEventListener("click",r=>{r.preventDefault(),a.click()}))})}function q(t,e){let a=e.getAttribute("data-lightbox-trigger")?.trim();if(a)try{let r=t.querySelector(a);if(r)return r}catch{return null}return t.querySelector(S)}function O(t,e){return Array.from(t.querySelectorAll(e)).filter(a=>a.currentSrc||a.src).filter((a,r,u)=>u.indexOf(a)===r)}function C(t){return t.querySelector(v)}function G(){if(document.getElementById(H))return;let t=document.createElement("style");t.id=H,t.textContent=`
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
  `,document.head.appendChild(t)}function P(t){t.querySelectorAll("buttton").forEach(e=>{let a=document.createElement("button");Array.from(e.attributes).forEach(r=>{a.setAttribute(r.name,r.value)}),a.type=a.getAttribute("type")||"button",a.append(...Array.from(e.childNodes)),e.replaceWith(a)})}function B(){let t=document.createElement("div");return t.className="newsletter-lightbox",t.setAttribute("data-lightbox",""),t.innerHTML=`
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
  `,t}function N(t,e,a){let r=t.querySelector("[data-lightbox-image]")||t.querySelector("img"),u=t.querySelector("[data-lightbox-caption]"),m=Array.from(t.querySelectorAll("[data-lightbox-counter]")),f=t.querySelectorAll("[data-lightbox-close]"),p=t.querySelectorAll("[data-lightbox-prev]"),E=t.querySelectorAll("[data-lightbox-next]"),d=t.querySelector("[data-lightbox-stage]")||r?.parentElement||t;if(!r)return{open:()=>{},close:()=>{}};let s=0,g=null,o=0,l=0,b=()=>{let n=e[s];n&&(r.src=n.src,r.alt=n.alt||n.caption||"Image",u&&(u.textContent=n.caption,u.hidden=!n.caption),m.forEach(i=>{i.textContent=`${s+1} / ${e.length}`}))},x=(n=0)=>{s=T(n,e.length),g=document.activeElement,b(),document.body.classList.add(a.bodyOpenClass),t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),(t.querySelector("[data-lightbox-close]")||t.querySelector("button")||t).focus()},h=()=>{t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),document.body.classList.remove(a.bodyOpenClass),g instanceof HTMLElement&&g.focus()},L=()=>{s=T(s-1,e.length),b()},y=()=>{s=T(s+1,e.length),b()};return a.triggerImages&&e.forEach((n,i)=>{n.img.addEventListener("click",c=>{c.preventDefault(),x(i)}),n.img.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),x(i))})}),f.forEach(n=>n.addEventListener("click",h)),p.forEach(n=>n.addEventListener("click",L)),E.forEach(n=>n.addEventListener("click",y)),t.addEventListener("click",n=>{n.target===t&&h()}),d.addEventListener("touchstart",n=>{let i=n.changedTouches[0];o=i.clientX,l=i.clientY},{passive:!0}),d.addEventListener("touchend",n=>{let i=n.changedTouches[0],c=i.clientX-o,_=i.clientY-l;Math.abs(c)>45&&Math.abs(c)>Math.abs(_)&&(c>0?L():y())},{passive:!0}),document.addEventListener("keydown",n=>{t.classList.contains("is-open")&&(n.key==="Escape"&&h(),n.key==="ArrowLeft"&&L(),n.key==="ArrowRight"&&y())}),{open:x,close:h}}function T(t,e){return e?(t%e+e)%e:0}function R(t){let e=t.closest("a[href]"),a=e?.getAttribute("href")||"";return w.test(a)?e?.href||"":t.currentSrc||t.src}function X(t){return(t.closest("figure")?.querySelector("figcaption")?.textContent||t.alt||"").trim()}})();
