"use strict";(()=>{var A="[data-lightbox-gallery]",T="[data-lightbox-trigger]",k="[data-lightbox-template], [data-newsletter-lightbox-template]",S="krb-lightbox-css",C=/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i,M=new WeakMap;function P(t=document){t.querySelectorAll(A).forEach(e=>{_({root:e,imagesSelector:e.dataset.lightboxImages||"img",triggerSelector:T,template:v(e),label:e.dataset.lightboxLabel||"Image gallery",initialisedKey:"lightboxInitialised",imageIndexAttribute:"lightboxIndex",overlayAttribute:"data-lightbox",triggerImages:e.dataset.lightboxClickableImages!=="false"})}),t.querySelectorAll(T).forEach(e=>{if(e.closest(A)||e.dataset.lightboxBound==="true")return;let l=e.getAttribute("data-lightbox-trigger")?.trim();if(!l)return;let o=document.querySelector(l);if(!o)return;let r=_({root:o,imagesSelector:e.dataset.lightboxImages||o.dataset.lightboxImages||"img",triggerSelector:"",template:v(o),label:o.dataset.lightboxLabel||e.getAttribute("aria-label")||"Image gallery",initialisedKey:"lightboxInitialised",imageIndexAttribute:"lightboxIndex",overlayAttribute:"data-lightbox",triggerImages:o.dataset.lightboxClickableImages!=="false"});r&&(e.dataset.lightboxBound="true",e.addEventListener("click",b=>{b.preventDefault(),r.open(w(e))}))})}function _(t){let{root:e,imagesSelector:l="img",triggerSelector:o=T,template:r=v(e),label:b="Image gallery",initialisedKey:h="lightboxInitialised",imageIndexAttribute:f="lightboxIndex",overlayAttribute:E="data-lightbox",bodyOpenClass:x="lightbox-open",triggerImages:s=!0}=t;if(e.dataset[h]==="true")return M.get(e);let m=q(e,l);if(!m.length)return;let p=m.map((a,g)=>(a.dataset[f]=String(g),s&&(a.setAttribute("tabindex","0"),a.setAttribute("role","button"),a.setAttribute("aria-label",a.alt?`Open image: ${a.alt}`:"Open image")),{img:a,src:N(a),alt:a.alt||"",caption:X(a)}));O();let i=r?r.cloneNode(!0):B();if(!(i instanceof HTMLElement))return;i.removeAttribute("data-lightbox-template"),i.removeAttribute("data-newsletter-lightbox-template"),i.setAttribute(E,""),i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label",b),i.setAttribute("aria-hidden","true"),r&&i.style.removeProperty("display"),document.body.appendChild(i);let u=G(i,p,{bodyOpenClass:x,triggerImages:s});return o&&e.querySelectorAll(o).forEach(a=>{a.dataset.lightboxBound!=="true"&&(a.dataset.lightboxBound="true",a.addEventListener("click",g=>{g.preventDefault(),u.open(w(a))}))}),e.dataset[h]="true",M.set(e,u),u}function q(t,e){return Array.from(t.querySelectorAll(e)).filter(l=>l.currentSrc||l.src).filter((l,o,r)=>r.indexOf(l)===o)}function v(t){return t.querySelector(k)}function O(){if(document.getElementById(S))return;let t=document.createElement("style");t.id=S,t.textContent=`
    [data-lightbox-gallery] img[data-lightbox-index],
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
  `,document.head.appendChild(t)}function B(){let t=document.createElement("div");return t.className="newsletter-lightbox",t.setAttribute("data-lightbox",""),t.innerHTML=`
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
  `,t}function G(t,e,l){let o=t.querySelector("[data-lightbox-image]")||t.querySelector("img"),r=t.querySelector("[data-lightbox-caption]"),b=t.querySelector("[data-lightbox-counter]"),h=t.querySelectorAll("[data-lightbox-close]"),f=t.querySelectorAll("[data-lightbox-prev]"),E=t.querySelectorAll("[data-lightbox-next]"),x=t.querySelector("[data-lightbox-stage]")||o?.parentElement||t;if(!o)return{open:()=>{},close:()=>{}};let s=0,m=null,p=0,i=0,u=()=>{let n=e[s];n&&(o.src=n.src,o.alt=n.alt||n.caption||"Image",r&&(r.textContent=n.caption,r.hidden=!n.caption),b&&(b.textContent=`${s+1} / ${e.length}`))},a=(n=0)=>{s=I(n,e.length),m=document.activeElement,u(),document.body.classList.add(l.bodyOpenClass),t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),(t.querySelector("[data-lightbox-close]")||t.querySelector("button")||t).focus()},g=()=>{t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),document.body.classList.remove(l.bodyOpenClass),m instanceof HTMLElement&&m.focus()},L=()=>{s=I(s-1,e.length),u()},y=()=>{s=I(s+1,e.length),u()};return l.triggerImages&&e.forEach((n,c)=>{n.img.addEventListener("click",d=>{d.preventDefault(),a(c)}),n.img.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),a(c))})}),h.forEach(n=>n.addEventListener("click",g)),f.forEach(n=>n.addEventListener("click",L)),E.forEach(n=>n.addEventListener("click",y)),t.addEventListener("click",n=>{n.target===t&&g()}),x.addEventListener("touchstart",n=>{let c=n.changedTouches[0];p=c.clientX,i=c.clientY},{passive:!0}),x.addEventListener("touchend",n=>{let c=n.changedTouches[0],d=c.clientX-p,H=c.clientY-i;Math.abs(d)>45&&Math.abs(d)>Math.abs(H)&&(d>0?L():y())},{passive:!0}),document.addEventListener("keydown",n=>{t.classList.contains("is-open")&&(n.key==="Escape"&&g(),n.key==="ArrowLeft"&&L(),n.key==="ArrowRight"&&y())}),{open:a,close:g}}function w(t){let e=t.getAttribute("data-lightbox-index"),l=Number(e||0);return Number.isFinite(l)?l:0}function I(t,e){return e?(t%e+e)%e:0}function N(t){let e=t.closest("a[href]"),l=e?.getAttribute("href")||"";return C.test(l)?e?.href||"":t.currentSrc||t.src}function X(t){return(t.closest("figure")?.querySelector("figcaption")?.textContent||t.alt||"").trim()}})();
