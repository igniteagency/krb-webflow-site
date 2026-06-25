"use strict";(()=>{var D="[data-lightbox-trigger]",P="[data-lightbox-template], [data-newsletter-lightbox-template]",_="krb-lightbox-css",G=/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i,A=new WeakMap;function I(e){let{root:t,imagesSelector:n="img",triggerSelector:r=D,template:i=$(t),label:a="Image gallery",initialisedKey:m="lightboxInitialised",imageIndexAttribute:u="lightboxIndex",overlayAttribute:c="data-lightbox",bodyOpenClass:g="lightbox-open",triggerImages:o=!0}=e;if(t.dataset[m]==="true")return A.get(t);let E=B(t,n);if(!E.length)return;let f=E.map((s,L)=>(s.dataset[u]=String(L),o&&(s.setAttribute("tabindex","0"),s.setAttribute("role","button"),s.setAttribute("aria-label",s.alt?`Open image: ${s.alt}`:"Open image")),{img:s,src:K(s),alt:s.alt||"",caption:W(s)}));X();let d=i?i.cloneNode(!0):F();if(!(d instanceof HTMLElement))return;d.removeAttribute("data-lightbox-template"),d.removeAttribute("data-newsletter-lightbox-template"),d.setAttribute(c,""),d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.setAttribute("aria-label",a),d.setAttribute("aria-hidden","true"),i&&d.style.removeProperty("display"),document.body.appendChild(d);let p=U(d,f,{bodyOpenClass:g,triggerImages:o});return r&&t.querySelectorAll(r).forEach(s=>{s.dataset.lightboxBound!=="true"&&(s.dataset.lightboxBound="true",s.addEventListener("click",L=>{L.preventDefault(),p.open(Y(s))}))}),t.dataset[m]="true",A.set(t,p),p}function B(e,t){return Array.from(e.querySelectorAll(t)).filter(n=>n.currentSrc||n.src).filter((n,r,i)=>i.indexOf(n)===r)}function $(e){return e.querySelector(P)}function X(){if(document.getElementById(_))return;let e=document.createElement("style");e.id=_,e.textContent=`
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
  `,document.head.appendChild(e)}function F(){let e=document.createElement("div");return e.className="newsletter-lightbox",e.setAttribute("data-lightbox",""),e.innerHTML=`
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
  `,e}function U(e,t,n){let r=e.querySelector("[data-lightbox-image]")||e.querySelector("img"),i=e.querySelector("[data-lightbox-caption]"),a=e.querySelector("[data-lightbox-counter]"),m=e.querySelectorAll("[data-lightbox-close]"),u=e.querySelectorAll("[data-lightbox-prev]"),c=e.querySelectorAll("[data-lightbox-next]"),g=e.querySelector("[data-lightbox-stage]")||r?.parentElement||e;if(!r)return{open:()=>{},close:()=>{}};let o=0,E=null,f=0,d=0,p=()=>{let l=t[o];l&&(r.src=l.src,r.alt=l.alt||l.caption||"Image",i&&(i.textContent=l.caption,i.hidden=!l.caption),a&&(a.textContent=`${o+1} / ${t.length}`))},s=(l=0)=>{o=S(l,t.length),E=document.activeElement,p(),document.body.classList.add(n.bodyOpenClass),e.classList.add("is-open"),e.setAttribute("aria-hidden","false"),(e.querySelector("[data-lightbox-close]")||e.querySelector("button")||e).focus()},L=()=>{e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.classList.remove(n.bodyOpenClass),E instanceof HTMLElement&&E.focus()},y=()=>{o=S(o-1,t.length),p()},H=()=>{o=S(o+1,t.length),p()};return n.triggerImages&&t.forEach((l,b)=>{l.img.addEventListener("click",h=>{h.preventDefault(),s(b)}),l.img.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),s(b))})}),m.forEach(l=>l.addEventListener("click",L)),u.forEach(l=>l.addEventListener("click",y)),c.forEach(l=>l.addEventListener("click",H)),e.addEventListener("click",l=>{l.target===e&&L()}),g.addEventListener("touchstart",l=>{let b=l.changedTouches[0];f=b.clientX,d=b.clientY},{passive:!0}),g.addEventListener("touchend",l=>{let b=l.changedTouches[0],h=b.clientX-f,k=b.clientY-d;Math.abs(h)>45&&Math.abs(h)>Math.abs(k)&&(h>0?y():H())},{passive:!0}),document.addEventListener("keydown",l=>{e.classList.contains("is-open")&&(l.key==="Escape"&&L(),l.key==="ArrowLeft"&&y(),l.key==="ArrowRight"&&H())}),{open:s,close:L}}function Y(e){let t=e.getAttribute("data-lightbox-index"),n=Number(t||0);return Number.isFinite(n)?n:0}function S(e,t){return t?(e%t+t)%t:0}function K(e){let t=e.closest("a[href]"),n=t?.getAttribute("href")||"";return G.test(n)?t?.href||"":e.currentSrc||e.src}function W(e){return(e.closest("figure")?.querySelector("figcaption")?.textContent||e.alt||"").trim()}var z=".newsletter_component",T=".newsletter_side-nav_details",j=".newsletter_side-nav_link",Q=".newsletter_period_item[id]",V=".newsletter_period_item > details",N=".newsletter_rich-text.w-richtext",J=".newsletter-content_component",Z=".newsletter-content_toc",v="krb-newsletter-readmore-transition-css",ee="(min-width: 768px)",x=window.matchMedia(ee);function _e(){document.querySelectorAll(z).forEach(t=>{let n=ae(t);te(t),ne(t),oe(n),se(t),he(t),Te(t)})}function te(e){let t=e.querySelector(T),n=t?.parentElement,r=t?.querySelector(j);if(!t||!n||!r)return;let i=ie(re(e));if(!i.size)return;let a=t.open,m=Array.from(i.entries()).map(([u,c],g)=>{let o=t.cloneNode(!0),E=o.querySelector("summary p")||o.querySelector("summary"),f=o.querySelector(".newsletter_side-nav_content"),d=f?.querySelector('[class*="spacer"]')?.cloneNode(!0);return o.open=a&&g===0,E&&(E.textContent=u),f&&f.replaceChildren(...c.map(p=>{let s=r.cloneNode(!0);return s.textContent=p.term,s.setAttribute("href",`#${encodeURIComponent(p.id)}`),s}),...d?[d]:[]),o});n.querySelectorAll(T).forEach(u=>u.remove()),n.append(...m)}function ne(e){let n=e.querySelector(T)?.parentElement;if(!n?.parentElement||n.dataset.responsiveSideNavInitialised==="true")return;n.dataset.responsiveSideNavInitialised="true";let r=document.createComment("newsletter side nav mobile placeholder");n.before(r);let i=()=>{if(x.matches){n.isConnected||r.after(n);return}n.remove()};i(),x.addEventListener("change",i)}function re(e){return Array.from(e.querySelectorAll(Q)).filter(t=>!t.closest(T)).map(t=>{let n=t.closest("[data-year]")?.dataset.year||ye(t.id),r=He(t.id)||t.querySelector("summary")?.textContent?.trim();return!n||!r?null:{year:n,term:Se(r),id:t.id}}).filter(t=>!!t)}function ie(e){return e.reduce((t,n)=>{let r=t.get(n.year)||[];return r.some(a=>a.id===n.id)||t.set(n.year,[...r,n].sort(le)),t},new Map)}function le(e,t){return q(e.term)-q(t.term)}function ae(e){return Array.from(e.querySelectorAll(V)).filter(t=>!t.closest(T))}function oe(e){let t=()=>{e.forEach(n=>{n.open=x.matches})};e.forEach(n=>{if(n.dataset.newsletterDetailsInitialised==="true")return;n.dataset.newsletterDetailsInitialised="true",n.querySelector("summary")?.addEventListener("click",i=>{x.matches&&(i.preventDefault(),n.open=!0)})}),t(),x.addEventListener("change",t)}function se(e){let t=M(e);t&&t.dataset.newsletterArticlesInitialised!=="true"&&(ce(),Array.from(t.children).filter(ue).forEach(n=>{if(n.closest(".newsletter_article"))return;let r=de(n);if(!ge(r))return;let i=pe(r);if(!i)return;let a=document.createElement("div");a.className="newsletter_article",n.before(a),a.appendChild(n);let m=i.cloneNode(!0);m.classList.add("newsletter_article-summary"),a.appendChild(m);let u=document.createElement("div");u.className="newsletter_article-body",u.style.maxHeight="0px",a.appendChild(u),r.forEach(g=>u.appendChild(g));let c=document.createElement("button");c.type="button",c.className="newsletter_article-toggle",c.setAttribute("aria-expanded","false"),c.innerHTML=`
        <span class="more">Read More</span>
        <span class="less">Read Less</span>
        <span class="newsletter_article-toggle-icon" aria-hidden="true"></span>
      `,a.appendChild(c),c.addEventListener("click",()=>{a.classList.contains("is-open")?be(a,u,c):Ee(a,u,c)})}),t.dataset.newsletterArticlesInitialised="true")}function ce(){if(document.getElementById(v))return;let e=document.createElement("style");e.id=v,e.textContent=`
    .newsletter_article-summary {
      transition: opacity 220ms ease;
    }

    .newsletter_article-body {
      display: block !important;
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height 380ms ease, opacity 260ms ease;
      will-change: max-height, opacity;
    }

    .newsletter_article.is-open .newsletter_article-body {
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .newsletter_article-summary,
      .newsletter_article-body {
        transition: none !important;
      }
    }
  `,document.head.appendChild(e)}function ue(e){if(!["H2","H3"].includes(e.tagName))return!1;if(e.tagName==="H3")return!0;let t=e.nextElementSibling;return!!(t&&!["H2","H3"].includes(t.tagName))}function de(e){let t=[],n=e.nextElementSibling;for(;n&&!me(n);){let r=n.nextElementSibling;t.push(n),n=r}return t}function me(e){return["H2","H3"].includes(e.tagName)?!0:e.tagName==="FIGURE"&&(e.nextElementSibling?.tagName==="FIGURE"||e.previousElementSibling?.tagName==="FIGURE")}function ge(e){return e.some(t=>t.matches("p, ul, ol, blockquote, h4, h5, h6"))}function pe(e){return e.find(t=>t.matches("p, ul, ol, blockquote"))}function Ee(e,t,n){e.classList.add("is-open"),n.setAttribute("aria-expanded","true"),t.style.maxHeight="0px",t.offsetHeight,t.style.maxHeight=`${t.scrollHeight}px`}function be(e,t,n){n.setAttribute("aria-expanded","false"),t.style.maxHeight=`${t.scrollHeight}px`,t.offsetHeight,e.classList.remove("is-open"),t.style.maxHeight="0px"}function he(e){let t=e.querySelector(Z),n=M(e);if(!t||!n||t.dataset.tocGenerated==="true")return;let r=t.querySelector(".newsletter-content_toc-group"),i=r?.querySelector(".newsletter-content_toc-group_top"),a=r?.querySelector(".newsletter-content_toc-group_link");if(!r||!i||!a)return;let m={},u=document.createDocumentFragment(),c=null;Array.from(n.children).forEach(g=>{let o=Le(g);if(o){if(o.tagName==="H2"){c=C(o,r,i,m),u.appendChild(c);return}if(o.tagName==="H3"){if(!c){c=C(o,r,i,m),u.appendChild(c);return}c.appendChild(fe(o,a,m))}}}),u.childNodes.length&&(r.remove(),t.appendChild(u),t.dataset.tocGenerated="true")}function C(e,t,n,r){let i=t.cloneNode(!1);i.removeAttribute("id"),i.removeAttribute("data-generated");let a=n.cloneNode(!0);return a.href=`#${R(e,r)}`,O(a,w(e)),i.appendChild(a),i}function fe(e,t,n){let r=t.cloneNode(!0);return r.href=`#${R(e,n)}`,O(r,w(e)),r}function Le(e){return["H2","H3"].includes(e.tagName)?e:e.classList.contains("newsletter_article")?e.querySelector(":scope > h2, :scope > h3"):null}function R(e,t){if(e.id)return e.id;let n=e.getAttribute("data-toc-id")||e.getAttribute("data-anchor-id");return e.id=n||xe(w(e),t),e.id}function xe(e,t){let n=e.toLowerCase().trim().replace(/&/g,"and").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")||"section";return t[n]=(t[n]||0)+1,t[n]===1?n:`${n}-${t[n]}`}function w(e){return e.textContent?.trim().replace(/\s+/g," ")||""}function O(e,t){let n=e.querySelector("p")||e.querySelector(".text-style-eyebrow")||e.querySelector("div")||e;n.textContent=t}function Te(e){let t=M(e);t&&I({root:t,template:e.querySelector("[data-lightbox-template], [data-newsletter-lightbox-template]"),label:"Newsletter image gallery",initialisedKey:"lightboxInitialised",imageIndexAttribute:"newsletterLightboxIndex",overlayAttribute:"data-newsletter-lightbox",bodyOpenClass:"newsletter-lightbox-open",triggerImages:!0})}function M(e){return e.querySelector(`${J} ${N}`)||e.querySelector(N)}function ye(e){return e.match(/\b(20\d{2})\b/)?.[1]}function He(e){return e.match(/\bTerm\s+\d+\b/i)?.[0]}function q(e){return Number(e.match(/\d+/)?.[0]||0)}function Se(e){return e.replace(/\s+/g," ").trim().toLowerCase().replace(/\b\w/g,t=>t.toUpperCase())}})();
