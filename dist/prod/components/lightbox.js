"use strict";(()=>{var M="[data-lightbox-parent]",v="[data-lightbox-trigger]",I="[data-lightbox-target]",w="[data-lightbox-template], [data-newsletter-lightbox-template]",_="krb-lightbox-css",k=/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;function $(t=document){q(t).forEach(O)}function j(t){let{root:e,imagesSelector:a="img",template:o=G(e),label:c="Image gallery",initialisedKey:b="lightboxInitialised",imageIndexAttribute:p="lightboxIndex",overlayAttribute:E="data-lightbox",bodyOpenClass:h="lightbox-open",triggerImages:u=!0}=t;if(e.dataset[b]==="true")return;let d=P(e,a);if(!d.length)return;let g=d.map((l,m)=>(l.dataset[p]=String(m),u&&(l.setAttribute("tabindex","0"),l.setAttribute("role","button"),l.setAttribute("aria-label",l.alt?`Open image: ${l.alt}`:"Open image")),{img:l,src:D(l),alt:l.alt||"",caption:Y(l)}));B();let r=o?o.cloneNode(!0):R();r instanceof HTMLElement&&(r.removeAttribute("data-lightbox-template"),r.removeAttribute("data-newsletter-lightbox-template"),r.setAttribute(E,""),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-label",c),r.setAttribute("aria-hidden","true"),o&&r.style.removeProperty("display"),document.body.appendChild(r),N(r,g,{bodyOpenClass:h,triggerImages:u}),e.dataset[b]="true")}function q(t){let e=Array.from(t.querySelectorAll(M));return t instanceof HTMLElement&&t.matches(M)&&e.unshift(t),e}function O(t){t.querySelectorAll(v).forEach(e=>{if(e.dataset.lightboxBound==="true")return;let a=C(t,e);!a||a===e||(e.dataset.lightboxBound="true",e.addEventListener("click",o=>{o.preventDefault(),a.click()}))})}function C(t,e){let a=e.getAttribute("data-lightbox-trigger")?.trim();if(a)try{let o=t.querySelector(a);if(o)return o}catch{return null}return t.querySelector(I)}function P(t,e){return Array.from(t.querySelectorAll(e)).filter(a=>a.currentSrc||a.src).filter((a,o,c)=>c.indexOf(a)===o)}function G(t){return t.querySelector(w)}function B(){if(document.getElementById(_))return;let t=document.createElement("style");t.id=_,t.textContent=`
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
  `,document.head.appendChild(t)}function R(){let t=document.createElement("div");return t.className="newsletter-lightbox",t.setAttribute("data-lightbox",""),t.innerHTML=`
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
  `,t}function N(t,e,a){let o=t.querySelector("[data-lightbox-image]")||t.querySelector("img"),c=t.querySelector("[data-lightbox-caption]"),b=Array.from(t.querySelectorAll("[data-lightbox-counter]")),p=Array.from(t.querySelectorAll("[data-lightbox-counter], [data-lightbox-pagination]")),E=t.querySelectorAll("[data-lightbox-close]"),h=t.querySelectorAll("[data-lightbox-prev]"),u=t.querySelectorAll("[data-lightbox-next]"),d=t.querySelector("[data-lightbox-stage]")||o?.parentElement||t;if(!o)return{open:()=>{},close:()=>{}};let g=e.length>1;X([...h,...u,...p],!g);let r=0,l=null,m=0,H=0,x=()=>{let n=e[r];n&&(o.src=n.src,o.alt=n.alt||n.caption||"Image",c&&(c.textContent=n.caption,c.hidden=!n.caption),b.forEach(i=>{i.textContent=`${r+1} / ${e.length}`}))},L=(n=0)=>{r=A(n,e.length),l=document.activeElement,x(),document.body.classList.add(a.bodyOpenClass),t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),(t.querySelector("[data-lightbox-close]")||t.querySelector("button")||t).focus()},f=()=>{t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),document.body.classList.remove(a.bodyOpenClass),l instanceof HTMLElement&&l.focus()},y=()=>{g&&(r=A(r-1,e.length),x())},T=()=>{g&&(r=A(r+1,e.length),x())};return a.triggerImages&&e.forEach((n,i)=>{n.img.addEventListener("click",s=>{s.preventDefault(),L(i)}),n.img.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),L(i))})}),E.forEach(n=>n.addEventListener("click",f)),h.forEach(n=>n.addEventListener("click",y)),u.forEach(n=>n.addEventListener("click",T)),t.addEventListener("click",n=>{n.target===t&&f()}),d.addEventListener("touchstart",n=>{let i=n.changedTouches[0];m=i.clientX,H=i.clientY},{passive:!0}),d.addEventListener("touchend",n=>{let i=n.changedTouches[0],s=i.clientX-m,S=i.clientY-H;Math.abs(s)>45&&Math.abs(s)>Math.abs(S)&&(s>0?y():T())},{passive:!0}),document.addEventListener("keydown",n=>{t.classList.contains("is-open")&&(n.key==="Escape"&&f(),n.key==="ArrowLeft"&&y(),n.key==="ArrowRight"&&T())}),{open:L,close:f}}function A(t,e){return e?(t%e+e)%e:0}function X(t,e){t.forEach(a=>{a.hidden=e,a.setAttribute("aria-hidden",String(e)),e?a.style.setProperty("display","none","important"):a.style.removeProperty("display")})}function D(t){let e=t.closest("a[href]"),a=e?.getAttribute("href")||"";return k.test(a)?e?.href||"":t.currentSrc||t.src}function Y(t){return(t.closest("figure")?.querySelector("figcaption")?.textContent||t.alt||"").trim()}})();
