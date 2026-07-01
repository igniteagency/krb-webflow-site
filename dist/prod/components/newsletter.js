"use strict";(()=>{var k="[data-lightbox-template], [data-newsletter-lightbox-template]",_="krb-lightbox-css",D=/\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;function A(e){let{root:t,imagesSelector:n="img",template:r=G(t),label:l="Image gallery",initialisedKey:i="lightboxInitialised",imageIndexAttribute:m="lightboxIndex",overlayAttribute:c="data-lightbox",bodyOpenClass:s="lightbox-open",triggerImages:g=!0}=e;if(t.dataset[i]==="true")return;let o=P(t,n);if(!o.length)return;let f=o.map((d,h)=>(d.dataset[m]=String(h),g&&(d.setAttribute("tabindex","0"),d.setAttribute("role","button"),d.setAttribute("aria-label",d.alt?`Open image: ${d.alt}`:"Open image")),{img:d,src:F(d),alt:d.alt||"",caption:Y(d)}));B();let u=r?r.cloneNode(!0):X();u instanceof HTMLElement&&($(u),u.removeAttribute("data-lightbox-template"),u.removeAttribute("data-newsletter-lightbox-template"),u.setAttribute(c,""),u.setAttribute("role","dialog"),u.setAttribute("aria-modal","true"),u.setAttribute("aria-label",l),u.setAttribute("aria-hidden","true"),r&&u.style.removeProperty("display"),document.body.appendChild(u),U(u,f,{bodyOpenClass:s,triggerImages:g}),t.dataset[i]="true")}function P(e,t){return Array.from(e.querySelectorAll(t)).filter(n=>n.currentSrc||n.src).filter((n,r,l)=>l.indexOf(n)===r)}function G(e){return e.querySelector(k)}function B(){if(document.getElementById(_))return;let e=document.createElement("style");e.id=_,e.textContent=`
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
  `,document.head.appendChild(e)}function $(e){e.querySelectorAll("buttton").forEach(t=>{let n=document.createElement("button");Array.from(t.attributes).forEach(r=>{n.setAttribute(r.name,r.value)}),n.type=n.getAttribute("type")||"button",n.append(...Array.from(t.childNodes)),t.replaceWith(n)})}function X(){let e=document.createElement("div");return e.className="newsletter-lightbox",e.setAttribute("data-lightbox",""),e.innerHTML=`
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
  `,e}function U(e,t,n){let r=e.querySelector("[data-lightbox-image]")||e.querySelector("img"),l=e.querySelector("[data-lightbox-caption]"),i=Array.from(e.querySelectorAll("[data-lightbox-counter]")),m=e.querySelectorAll("[data-lightbox-close]"),c=e.querySelectorAll("[data-lightbox-prev]"),s=e.querySelectorAll("[data-lightbox-next]"),g=e.querySelector("[data-lightbox-stage]")||r?.parentElement||e;if(!r)return{open:()=>{},close:()=>{}};let o=0,f=null,u=0,d=0,h=()=>{let a=t[o];a&&(r.src=a.src,r.alt=a.alt||a.caption||"Image",l&&(l.textContent=a.caption,l.hidden=!a.caption),i.forEach(E=>{E.textContent=`${o+1} / ${t.length}`}))},b=(a=0)=>{o=M(a,t.length),f=document.activeElement,h(),document.body.classList.add(n.bodyOpenClass),e.classList.add("is-open"),e.setAttribute("aria-hidden","false"),(e.querySelector("[data-lightbox-close]")||e.querySelector("button")||e).focus()},y=()=>{e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.classList.remove(n.bodyOpenClass),f instanceof HTMLElement&&f.focus()},x=()=>{o=M(o-1,t.length),h()},H=()=>{o=M(o+1,t.length),h()};return n.triggerImages&&t.forEach((a,E)=>{a.img.addEventListener("click",p=>{p.preventDefault(),b(E)}),a.img.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),b(E))})}),m.forEach(a=>a.addEventListener("click",y)),c.forEach(a=>a.addEventListener("click",x)),s.forEach(a=>a.addEventListener("click",H)),e.addEventListener("click",a=>{a.target===e&&y()}),g.addEventListener("touchstart",a=>{let E=a.changedTouches[0];u=E.clientX,d=E.clientY},{passive:!0}),g.addEventListener("touchend",a=>{let E=a.changedTouches[0],p=E.clientX-u,O=E.clientY-d;Math.abs(p)>45&&Math.abs(p)>Math.abs(O)&&(p>0?x():H())},{passive:!0}),document.addEventListener("keydown",a=>{e.classList.contains("is-open")&&(a.key==="Escape"&&y(),a.key==="ArrowLeft"&&x(),a.key==="ArrowRight"&&H())}),{open:b,close:y}}function M(e,t){return t?(e%t+t)%t:0}function F(e){let t=e.closest("a[href]"),n=t?.getAttribute("href")||"";return D.test(n)?t?.href||"":e.currentSrc||e.src}function Y(e){return(e.closest("figure")?.querySelector("figcaption")?.textContent||e.alt||"").trim()}var W=".newsletter_component",L=".newsletter_side-nav_details",K=".newsletter_side-nav_link",z=".newsletter_period_item[id]",j=".newsletter_period_item > details",N=".newsletter_rich-text.w-richtext",Q=".newsletter-content_component",V=".newsletter-content_toc",v="krb-newsletter-readmore-transition-css",J="(min-width: 768px)",T=window.matchMedia(J);function Se(){document.querySelectorAll(W).forEach(t=>{let n=le(t);Z(t),ee(t),ae(n),ie(t),pe(t),Te(t)})}function Z(e){let t=e.querySelector(L),n=t?.parentElement,r=t?.querySelector(K);if(!t||!n||!r)return;let l=ne(te(e));if(!l.size)return;let i=t.open,m=Array.from(l.entries()).map(([c,s],g)=>{let o=t.cloneNode(!0),f=o.querySelector("summary p")||o.querySelector("summary"),u=o.querySelector(".newsletter_side-nav_content"),d=u?.querySelector('[class*="spacer"]')?.cloneNode(!0);return o.open=i&&g===0,f&&(f.textContent=c),u&&u.replaceChildren(...s.map(h=>{let b=r.cloneNode(!0);return b.textContent=h.term,b.setAttribute("href",`#${encodeURIComponent(h.id)}`),b}),...d?[d]:[]),o});n.querySelectorAll(L).forEach(c=>c.remove()),n.append(...m)}function ee(e){let n=e.querySelector(L)?.parentElement;if(!n?.parentElement||n.dataset.responsiveSideNavInitialised==="true")return;n.dataset.responsiveSideNavInitialised="true";let r=document.createComment("newsletter side nav mobile placeholder");n.before(r);let l=()=>{if(T.matches){n.isConnected||r.after(n);return}n.remove()};l(),T.addEventListener("change",l)}function te(e){return Array.from(e.querySelectorAll(z)).filter(t=>!t.closest(L)).map(t=>{let n=t.closest("[data-year]")?.dataset.year||Le(t.id),r=ye(t.id)||t.querySelector("summary")?.textContent?.trim();return!n||!r?null:{year:n,term:xe(r),id:t.id}}).filter(t=>!!t)}function ne(e){return e.reduce((t,n)=>{let r=t.get(n.year)||[];return r.some(i=>i.id===n.id)||t.set(n.year,[...r,n].sort(re)),t},new Map)}function re(e,t){return C(e.term)-C(t.term)}function le(e){return Array.from(e.querySelectorAll(j)).filter(t=>!t.closest(L))}function ae(e){let t=()=>{e.forEach(n=>{n.open=T.matches})};e.forEach(n=>{if(n.dataset.newsletterDetailsInitialised==="true")return;n.dataset.newsletterDetailsInitialised="true",n.querySelector("summary")?.addEventListener("click",l=>{T.matches&&(l.preventDefault(),n.open=!0)})}),t(),T.addEventListener("change",t)}function ie(e){let t=w(e);t&&t.dataset.newsletterArticlesInitialised!=="true"&&(oe(),Array.from(t.children).filter(se).forEach(n=>{if(n.closest(".newsletter_article"))return;let r=ce(n);if(!de(r))return;let l=me(r);if(!l)return;let i=document.createElement("div");i.className="newsletter_article",n.before(i),i.appendChild(n);let m=l.cloneNode(!0);m.classList.add("newsletter_article-summary"),i.appendChild(m);let c=document.createElement("div");c.className="newsletter_article-body",c.style.maxHeight="0px",i.appendChild(c),r.forEach(g=>c.appendChild(g));let s=document.createElement("button");s.type="button",s.className="newsletter_article-toggle",s.setAttribute("aria-expanded","false"),s.innerHTML=`
        <span class="more">Read More</span>
        <span class="less">Read Less</span>
        <span class="newsletter_article-toggle-icon" aria-hidden="true"></span>
      `,i.appendChild(s),s.addEventListener("click",()=>{i.classList.contains("is-open")?Ee(i,c,s):ge(i,c,s)})}),t.dataset.newsletterArticlesInitialised="true")}function oe(){if(document.getElementById(v))return;let e=document.createElement("style");e.id=v,e.textContent=`
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
  `,document.head.appendChild(e)}function se(e){if(!["H2","H3"].includes(e.tagName))return!1;if(e.tagName==="H3")return!0;let t=e.nextElementSibling;return!!(t&&!["H2","H3"].includes(t.tagName))}function ce(e){let t=[],n=e.nextElementSibling;for(;n&&!ue(n);){let r=n.nextElementSibling;t.push(n),n=r}return t}function ue(e){return["H2","H3"].includes(e.tagName)?!0:e.tagName==="FIGURE"&&(e.nextElementSibling?.tagName==="FIGURE"||e.previousElementSibling?.tagName==="FIGURE")}function de(e){return e.some(t=>t.matches("p, ul, ol, blockquote, h4, h5, h6"))}function me(e){return e.find(t=>t.matches("p, ul, ol, blockquote"))}function ge(e,t,n){e.classList.add("is-open"),n.setAttribute("aria-expanded","true"),t.style.maxHeight="0px",t.offsetHeight,t.style.maxHeight=`${t.scrollHeight}px`}function Ee(e,t,n){n.setAttribute("aria-expanded","false"),t.style.maxHeight=`${t.scrollHeight}px`,t.offsetHeight,e.classList.remove("is-open"),t.style.maxHeight="0px"}function pe(e){let t=e.querySelector(V),n=w(e);if(!t||!n||t.dataset.tocGenerated==="true")return;let r=t.querySelector(".newsletter-content_toc-group"),l=r?.querySelector(".newsletter-content_toc-group_top"),i=r?.querySelector(".newsletter-content_toc-group_link");if(!r||!l||!i)return;let m={},c=document.createDocumentFragment(),s=null;Array.from(n.children).forEach(g=>{let o=he(g);if(o){if(o.tagName==="H2"){s=I(o,r,l,m),c.appendChild(s);return}if(o.tagName==="H3"){if(!s){s=I(o,r,l,m),c.appendChild(s);return}s.appendChild(fe(o,i,m))}}}),c.childNodes.length&&(r.remove(),t.appendChild(c),t.dataset.tocGenerated="true")}function I(e,t,n,r){let l=t.cloneNode(!1);l.removeAttribute("id"),l.removeAttribute("data-generated");let i=n.cloneNode(!0);return i.href=`#${q(e,r)}`,R(i,S(e)),l.appendChild(i),l}function fe(e,t,n){let r=t.cloneNode(!0);return r.href=`#${q(e,n)}`,R(r,S(e)),r}function he(e){return["H2","H3"].includes(e.tagName)?e:e.classList.contains("newsletter_article")?e.querySelector(":scope > h2, :scope > h3"):null}function q(e,t){if(e.id)return e.id;let n=e.getAttribute("data-toc-id")||e.getAttribute("data-anchor-id");return e.id=n||be(S(e),t),e.id}function be(e,t){let n=e.toLowerCase().trim().replace(/&/g,"and").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")||"section";return t[n]=(t[n]||0)+1,t[n]===1?n:`${n}-${t[n]}`}function S(e){return e.textContent?.trim().replace(/\s+/g," ")||""}function R(e,t){let n=e.querySelector("p")||e.querySelector(".text-style-eyebrow")||e.querySelector("div")||e;n.textContent=t}function Te(e){let t=w(e);t&&A({root:t,template:e.querySelector("[data-lightbox-template], [data-newsletter-lightbox-template]"),label:"Newsletter image gallery",initialisedKey:"lightboxInitialised",imageIndexAttribute:"newsletterLightboxIndex",overlayAttribute:"data-newsletter-lightbox",bodyOpenClass:"newsletter-lightbox-open",triggerImages:!0})}function w(e){return e.querySelector(`${Q} ${N}`)||e.querySelector(N)}function Le(e){return e.match(/\b(20\d{2})\b/)?.[1]}function ye(e){return e.match(/\bTerm\s+\d+\b/i)?.[0]}function C(e){return Number(e.match(/\d+/)?.[0]||0)}function xe(e){return e.replace(/\s+/g," ").trim().toLowerCase().replace(/\b\w/g,t=>t.toUpperCase())}})();
