"use strict";(()=>{var q=".newsletter_component",b=".newsletter_side-nav_details",R=".newsletter_side-nav_link",k=".newsletter_period_item[id]",D=".newsletter_period_item > details",M=".newsletter_rich-text.w-richtext",O=".newsletter-content_component",P=".newsletter-content_toc",S="krb-newsletter-readmore-transition-css",_="krb-newsletter-lightbox-template-css",$="(min-width: 768px)",T=window.matchMedia($);function fe(){document.querySelectorAll(q).forEach(t=>{let n=W(t);B(t),G(t),X(n),z(t),ne(t),se(t)})}function B(e){let t=e.querySelector(b),n=t?.parentElement,r=t?.querySelector(R);if(!t||!n||!r)return;let i=U(F(e));if(!i.size)return;let l=t.open,s=Array.from(i.entries()).map(([c,o],d)=>{let u=t.cloneNode(!0),h=u.querySelector("summary p")||u.querySelector("summary"),f=u.querySelector(".newsletter_side-nav_content"),g=f?.querySelector('[class*="spacer"]')?.cloneNode(!0);return u.open=l&&d===0,h&&(h.textContent=c),f&&f.replaceChildren(...o.map(L=>{let E=r.cloneNode(!0);return E.textContent=L.term,E.setAttribute("href",`#${encodeURIComponent(L.id)}`),E}),...g?[g]:[]),u});n.querySelectorAll(b).forEach(c=>c.remove()),n.append(...s)}function G(e){let n=e.querySelector(b)?.parentElement;if(!n?.parentElement||n.dataset.responsiveSideNavInitialised==="true")return;n.dataset.responsiveSideNavInitialised="true";let r=document.createComment("newsletter side nav mobile placeholder");n.before(r);let i=()=>{if(T.matches){n.isConnected||r.after(n);return}n.remove()};i(),T.addEventListener("change",i)}function F(e){return Array.from(e.querySelectorAll(k)).filter(t=>!t.closest(b)).map(t=>{let n=t.closest("[data-year]")?.dataset.year||me(t.id),r=pe(t.id)||t.querySelector("summary")?.textContent?.trim();return!n||!r?null:{year:n,term:Ee(r),id:t.id}}).filter(t=>!!t)}function U(e){return e.reduce((t,n)=>{let r=t.get(n.year)||[];return r.some(l=>l.id===n.id)||t.set(n.year,[...r,n].sort(Y)),t},new Map)}function Y(e,t){return A(e.term)-A(t.term)}function W(e){return Array.from(e.querySelectorAll(D)).filter(t=>!t.closest(b))}function X(e){let t=()=>{e.forEach(n=>{n.open=T.matches})};e.forEach(n=>{if(n.dataset.newsletterDetailsInitialised==="true")return;n.dataset.newsletterDetailsInitialised="true",n.querySelector("summary")?.addEventListener("click",i=>{T.matches&&(i.preventDefault(),n.open=!0)})}),t(),T.addEventListener("change",t)}function z(e){let t=x(e);t&&t.dataset.newsletterArticlesInitialised!=="true"&&(j(),Array.from(t.children).filter(K).forEach(n=>{if(n.closest(".newsletter_article"))return;let r=Q(n);if(!J(r))return;let i=Z(r);if(!i)return;let l=document.createElement("div");l.className="newsletter_article",n.before(l),l.appendChild(n);let s=i.cloneNode(!0);s.classList.add("newsletter_article-summary"),l.appendChild(s);let c=document.createElement("div");c.className="newsletter_article-body",c.style.maxHeight="0px",l.appendChild(c),r.forEach(d=>c.appendChild(d));let o=document.createElement("button");o.type="button",o.className="newsletter_article-toggle",o.setAttribute("aria-expanded","false"),o.innerHTML=`
        <span class="more">Read More</span>
        <span class="less">Read Less</span>
        <span class="newsletter_article-toggle-icon" aria-hidden="true"></span>
      `,l.appendChild(o),o.addEventListener("click",()=>{l.classList.contains("is-open")?te(l,c,o):ee(l,c,o)})}),t.dataset.newsletterArticlesInitialised="true")}function j(){if(document.getElementById(S))return;let e=document.createElement("style");e.id=S,e.textContent=`
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
  `,document.head.appendChild(e)}function K(e){if(!["H2","H3"].includes(e.tagName))return!1;if(e.tagName==="H3")return!0;let t=e.nextElementSibling;return!!(t&&!["H2","H3"].includes(t.tagName))}function Q(e){let t=[],n=e.nextElementSibling;for(;n&&!V(n);){let r=n.nextElementSibling;t.push(n),n=r}return t}function V(e){return["H2","H3"].includes(e.tagName)?!0:e.tagName==="FIGURE"&&(e.nextElementSibling?.tagName==="FIGURE"||e.previousElementSibling?.tagName==="FIGURE")}function J(e){return e.some(t=>t.matches("p, ul, ol, blockquote, h4, h5, h6"))}function Z(e){return e.find(t=>t.matches("p, ul, ol, blockquote"))}function ee(e,t,n){e.classList.add("is-open"),n.setAttribute("aria-expanded","true"),t.style.maxHeight="0px",t.offsetHeight,t.style.maxHeight=`${t.scrollHeight}px`}function te(e,t,n){n.setAttribute("aria-expanded","false"),t.style.maxHeight=`${t.scrollHeight}px`,t.offsetHeight,e.classList.remove("is-open"),t.style.maxHeight="0px"}function ne(e){let t=e.querySelector(P),n=x(e);if(!t||!n||t.dataset.tocGenerated==="true")return;let r=t.querySelector(".newsletter-content_toc-group"),i=r?.querySelector(".newsletter-content_toc-group_top"),l=r?.querySelector(".newsletter-content_toc-group_link");if(!r||!i||!l)return;let s={},c=document.createDocumentFragment(),o=null;Array.from(n.children).forEach(d=>{let u=le(d);if(u){if(u.tagName==="H2"){o=N(u,r,i,s),c.appendChild(o);return}if(u.tagName==="H3"){if(!o){o=N(u,r,i,s),c.appendChild(o);return}o.appendChild(re(u,l,s))}}}),c.childNodes.length&&(r.remove(),t.appendChild(c),t.dataset.tocGenerated="true")}function N(e,t,n,r){let i=t.cloneNode(!1);i.removeAttribute("id"),i.removeAttribute("data-generated");let l=n.cloneNode(!0);return l.href=`#${v(e,r)}`,C(l,H(e)),i.appendChild(l),i}function re(e,t,n){let r=t.cloneNode(!0);return r.href=`#${v(e,n)}`,C(r,H(e)),r}function le(e){return["H2","H3"].includes(e.tagName)?e:e.classList.contains("newsletter_article")?e.querySelector(":scope > h2, :scope > h3"):null}function v(e,t){if(e.id)return e.id;let n=e.getAttribute("data-toc-id")||e.getAttribute("data-anchor-id");return e.id=n||ie(H(e),t),e.id}function ie(e,t){let n=e.toLowerCase().trim().replace(/&/g,"and").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")||"section";return t[n]=(t[n]||0)+1,t[n]===1?n:`${n}-${t[n]}`}function H(e){return e.textContent?.trim().replace(/\s+/g," ")||""}function C(e,t){let n=e.querySelector("p")||e.querySelector(".text-style-eyebrow")||e.querySelector("div")||e;n.textContent=t}function se(e){let t=x(e);if(!t||t.dataset.lightboxInitialised==="true")return;let n=Array.from(t.querySelectorAll("img")).filter(s=>s.currentSrc||s.src).filter((s,c,o)=>o.indexOf(s)===c);if(!n.length)return;let r=n.map((s,c)=>(s.dataset.newsletterLightboxIndex=String(c),s.setAttribute("tabindex","0"),s.setAttribute("role","button"),s.setAttribute("aria-label",s.alt?`Open image: ${s.alt}`:"Open image"),{img:s,src:ue(s),alt:s.alt||"",caption:de(s)}));ae();let i=e.querySelector("[data-newsletter-lightbox-template]"),l=i?i.cloneNode(!0):oe();l instanceof HTMLElement&&(l.removeAttribute("data-newsletter-lightbox-template"),l.setAttribute("data-newsletter-lightbox",""),l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),l.setAttribute("aria-label","Newsletter image gallery"),l.setAttribute("aria-hidden","true"),i&&l.style.removeProperty("display"),document.body.appendChild(l),ce(l,r),t.dataset.lightboxInitialised="true")}function ae(){if(document.getElementById(_))return;let e=document.createElement("style");e.id=_,e.textContent=`
    .newsletter_rich-text img[data-newsletter-lightbox-index] {
      cursor: zoom-in;
    }

    body.newsletter-lightbox-open {
      overflow: hidden;
    }

    [data-newsletter-lightbox-template] {
      display: none !important;
    }

    .newsletter-lightbox,
    [data-newsletter-lightbox] {
      position: fixed;
      inset: 0;
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
    }

    .newsletter-lightbox.is-open,
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
  `,document.head.appendChild(e)}function oe(){let e=document.createElement("div");return e.className="newsletter-lightbox",e.setAttribute("data-newsletter-lightbox",""),e.innerHTML=`
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
  `,e}function ce(e,t){let n=e.querySelector("[data-lightbox-image]")||e.querySelector("img"),r=e.querySelector("[data-lightbox-caption]"),i=e.querySelector("[data-lightbox-counter]"),l=e.querySelectorAll("[data-lightbox-close]"),s=e.querySelectorAll("[data-lightbox-prev]"),c=e.querySelectorAll("[data-lightbox-next]"),o=e.querySelector("[data-lightbox-stage]")||n?.parentElement||e;if(!n)return;let d=0,u=null,h=0,f=0,g=()=>{let a=t[d];n.src=a.src,n.alt=a.alt||a.caption||"Newsletter image",r&&(r.textContent=a.caption,r.hidden=!a.caption),i&&(i.textContent=`${d+1} / ${t.length}`)},L=a=>{d=a,u=document.activeElement,g(),document.body.classList.add("newsletter-lightbox-open"),e.classList.add("is-open"),e.setAttribute("aria-hidden","false"),(e.querySelector("[data-lightbox-close]")||e.querySelector("button")||e).focus()},E=()=>{e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.classList.remove("newsletter-lightbox-open"),u instanceof HTMLElement&&u.focus()},y=()=>{d=(d-1+t.length)%t.length,g()},w=()=>{d=(d+1)%t.length,g()};t.forEach((a,m)=>{a.img.addEventListener("click",p=>{p.preventDefault(),L(m)}),a.img.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),L(m))})}),l.forEach(a=>a.addEventListener("click",E)),s.forEach(a=>a.addEventListener("click",y)),c.forEach(a=>a.addEventListener("click",w)),e.addEventListener("click",a=>{a.target===e&&E()}),o.addEventListener("touchstart",a=>{let m=a.changedTouches[0];h=m.clientX,f=m.clientY},{passive:!0}),o.addEventListener("touchend",a=>{let m=a.changedTouches[0],p=m.clientX-h,I=m.clientY-f;Math.abs(p)>45&&Math.abs(p)>Math.abs(I)&&(p>0?y():w())},{passive:!0}),document.addEventListener("keydown",a=>{e.classList.contains("is-open")&&(a.key==="Escape"&&E(),a.key==="ArrowLeft"&&y(),a.key==="ArrowRight"&&w())})}function ue(e){let t=e.closest("a[href]"),n=t?.getAttribute("href")||"";return/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(n)?t?.href||"":e.currentSrc||e.src}function de(e){return(e.closest("figure")?.querySelector("figcaption")?.textContent||e.alt||"").trim()}function x(e){return e.querySelector(`${O} ${M}`)||e.querySelector(M)}function me(e){return e.match(/\b(20\d{2})\b/)?.[1]}function pe(e){return e.match(/\bTerm\s+\d+\b/i)?.[0]}function A(e){return Number(e.match(/\d+/)?.[0]||0)}function Ee(e){return e.replace(/\s+/g," ").trim().toLowerCase().replace(/\b\w/g,t=>t.toUpperCase())}})();
