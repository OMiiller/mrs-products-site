// Preencha os contatos antes de publicar. Nenhuma mensagem é enviada automaticamente.
export const CONTACT = { whatsapp: '+55 19 99274-2985', email: 'joaomiillerdev@gmail.com', instagram: '@miillerdev' };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
setTimeout(() => document.body.classList.add('loaded'), reduced ? 0 : 650);
const tabs = $$('[role=tab]');
function selectTab(id, focus = false) {
  tabs.forEach(tab => {
    const selected = tab.id === `tab-${id}`;
    tab.setAttribute('aria-selected', selected); tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    if (selected && focus) tab.focus();
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab.id.slice(4)));
  tab.addEventListener('keydown', event => {
    let index;
    if (event.key === 'ArrowRight') index = (i + 1) % tabs.length;
    if (event.key === 'ArrowLeft') index = (i - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = tabs.length - 1;
    if (index !== undefined) { event.preventDefault(); selectTab(tabs[index].id.slice(4), true); }
  });
});
$$('[data-select]').forEach(link => link.addEventListener('click', () => selectTab(link.dataset.select)));
// Reuse the exact plan content, with unique accessible elements in each panel.
$$('.site-plan').forEach(card => $('#panel-planos').append(card.cloneNode(true)));
$$('[data-interest]').forEach(link => link.addEventListener('click', () => {
  $('#interest').value = link.dataset.interest;
  if (link.dataset.plan) $('#message').value = `Olá! Tenho interesse no Plano ${link.dataset.plan}.`;
}));
const menu = $('.menu');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); $('nav').classList.toggle('open', open); });
$$('nav a').forEach(link => link.addEventListener('click', () => { $('nav').classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
const answers = [
 ['Como funciona a tecnologia NFC?', 'A NFC permite a comunicação por aproximação. Ao encostar um celular compatível na região indicada, a placa disponibiliza o link configurado. Para abrir páginas online, o celular precisa de internet.'],
 ['Preciso instalar algum aplicativo?', 'Em celulares compatíveis, a leitura de um link NFC normalmente usa os recursos do próprio sistema. Para concluir ações como um pagamento, pode ser necessário abrir o aplicativo correspondente e confirmar a operação.'],
 ['Quais celulares são compatíveis?', 'É necessário que o celular tenha NFC e suporte a leitura de etiquetas. No Android, pode ser preciso ativar a função nas configurações. A compatibilidade e a posição da antena variam por modelo; consulte antes de pedir.'],
 ['Como funciona a entrega?', 'Atendemos 100% online e entregamos a placa no endereço combinado com você. Disponibilidade, frete e prazo são confirmados no atendimento. Sites são entregues digitalmente.'],
 ['Como é feita a personalização?', 'Alinhamos a identidade visual e o destino do link durante o atendimento. A personalização da placa está inclusa. Outros destinos estão sujeitos a consulta.'],
 ['Qual é o prazo?', 'O prazo é combinado no atendimento, conforme a personalização, o tipo de projeto e o local de entrega.'],
 ['Quais são as formas de pagamento?', 'As formas e condições de pagamento são a combinar no atendimento.'],
 ['Como funciona a garantia?', 'Oferecemos garantia de 30 dias. Consulte as condições e o procedimento de atendimento antes de finalizar seu pedido.']
];
answers.forEach(([question, answer]) => { const detail = document.createElement('details'); const summary = document.createElement('summary'); summary.textContent = question; const p = document.createElement('p'); p.textContent = answer; detail.append(summary, p); $('.faq-list').append(detail); });
let destination = 'Pix', demoTimer;
const screens = { Pix: ['Pronto para pagar', 'Abra seu banco para continuar.'], Instagram: ['Sua marca no Instagram', 'Um atalho para o seu perfil.'], WhatsApp: ['Vamos conversar?', 'Contato direto com seu negócio.'], Google: ['Sua opinião importa', 'Acesso à página de avaliações.'], Outros: ['Seu link, sua ideia', 'Destino disponível sob consulta.'] };
function scan() {
  clearTimeout(demoTimer); $('.phone').classList.add('scanning');
  const content = $('.phone-content'); content.replaceChildren();
  const icon = document.createElementNS('http://www.w3.org/2000/svg','svg');
  icon.innerHTML = '<use href="#signal"/>';
  const strong = document.createElement('strong'); strong.textContent = screens[destination][0];
  const span = document.createElement('span'); span.textContent = screens[destination][1];
  content.append(icon, strong, span);
  demoTimer = setTimeout(() => $('.phone').classList.remove('scanning'), 1500);
}
$('.phone').addEventListener('click', scan);
if (matchMedia('(hover:hover)').matches) $('.phone').addEventListener('mouseenter', scan);
$$('.destinations button').forEach(button => button.addEventListener('click', () => {
 destination = button.textContent; $('#demo-destination').textContent = destination;
 $$('.destinations button').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', b === button); }); scan();
}));
function openWhatsApp(message) {
 const phone = CONTACT.whatsapp.replace(/\D/g, "");
 if (!/^\d{10,15}$/.test(phone)) {
   $('.form-status').textContent = 'O WhatsApp da MR’s Products ainda não foi configurado. Substitua [SEU_WHATSAPP] em js/main.js para habilitar o envio.';
   $('#contato').scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }); return false;
 }
 window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); return true;
}
$$('.whatsapp-link').forEach(link => link.addEventListener('click', event => { event.preventDefault(); openWhatsApp('Olá! Quero conhecer as soluções da MR’s Products para o meu negócio.'); }));
$('#contact-form').addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return; const data = new FormData(form); const text = `Olá, MR’s Products! Meu nome é ${data.get('name')}.\nWhatsApp: ${data.get('whatsapp')}\nInteresse: ${data.get('interest')}\n${data.get('message')}`; if (openWhatsApp(text)) $('.form-status').textContent = 'Mensagem preparada! Conclua o envio na conversa do WhatsApp.'; });
if (CONTACT.email !== '[SEU_EMAIL]') $('.contact-details span').textContent = CONTACT.email;
if (CONTACT.instagram !== '[SEU_INSTAGRAM]') $$('.contact-details span')[1].textContent = CONTACT.instagram;
let paused = reduced;
$('.motion-toggle').addEventListener('click', event => { paused = !paused; document.body.classList.toggle('paused', paused); event.currentTarget.setAttribute('aria-pressed', paused); event.currentTarget.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações'); event.currentTarget.textContent = paused ? '▷' : 'Ⅱ'; });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .08 });
if (!reduced) $$('.section-heading, .benefits article, .price-card, .about, .faq, .contact').forEach(element => { element.classList.add('reveal'); observer.observe(element); });
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; $$('nav a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`)); }), { rootMargin: '-20% 0px -55% 0px' });
$$('section[id]').forEach(section => sectionObserver.observe(section));
const visibilityObserver = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('offscreen', !e.isIntersecting)));
$$('.product-stage, .demo-scene, .laptop, .marquee').forEach(element => visibilityObserver.observe(element));
let mouseX = 0, mouseY = 0;
if (!reduced && matchMedia('(pointer:fine)').matches) {
 const cursor = $('.cursor');
 window.addEventListener('pointermove', event => { cursor.classList.add('tracking'); cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px) translate(-50%, -50%)`; }, { passive:true });
 document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('tracking'));
 window.addEventListener('blur', () => cursor.classList.remove('tracking'));
 $$('a,button,summary').forEach(element => { element.addEventListener('pointerenter', () => cursor.classList.add('hover')); element.addEventListener('pointerleave', () => cursor.classList.remove('hover')); });
}
// Optional motion libraries: core interactions and CSS fallback remain functional offline.
if (!reduced) {
 Promise.all([import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm'), import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm')]).then(([{gsap},{ScrollTrigger}]) => {
   gsap.registerPlugin(ScrollTrigger);
   gsap.from('.hero-copy > *', { y:25, opacity:0, stagger:.12, duration:.85, delay:.65, ease:'power3.out' });
   gsap.from('.benefits article > span', { opacity:0, y:15, stagger:.1, scrollTrigger:{ trigger:'.benefits', start:'top 85%', once:true } });
 }).catch(() => {});
 import('https://cdn.jsdelivr.net/npm/lenis@1.1.20/+esm').then(({default:Lenis}) => { const lenis = new Lenis({ autoRaf:true, anchors:true, duration:1.05 }); document.addEventListener('visibilitychange', () => document.hidden ? lenis.stop() : lenis.start()); }).catch(() => {});
}
// Rotação 360° por arraste, botões e teclado, inclusive no fallback CSS.
let plateYaw = -.35;
let platePitch = .08;
const stage360 = $('.product-stage');
stage360.tabIndex = 0;
stage360.setAttribute('aria-label', 'Placa NFC em 360 graus. Arraste ou use as setas esquerda e direita para girar. Home volta à frente.');
const updateFallback = () => {
 $('.plate').style.transform = 'rotateX(' + platePitch + 'rad) rotateY(' + plateYaw + 'rad)';
};
function turnPlate(value) {
 plateYaw = value === 'reset' ? -.35 : plateYaw + Number(value) * Math.PI / 180;
 updateFallback();
}
$$('[data-turn]').forEach(button => button.addEventListener('click', () => turnPlate(button.dataset.turn)));
let drag = null;
stage360.addEventListener('pointerdown', event => {
 if (event.target.closest('button') || event.button !== 0) return;
 drag = { id: event.pointerId, x: event.clientX, angle: plateYaw };
 stage360.setPointerCapture(event.pointerId); stage360.classList.add('dragging');
});
stage360.addEventListener('pointermove', event => {
 if (!drag || drag.id !== event.pointerId) return;
 plateYaw = drag.angle + (event.clientX - drag.x) * .012;
 updateFallback();
});
const endDrag = () => { drag = null; stage360.classList.remove('dragging'); };
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => stage360.addEventListener(type, endDrag));
stage360.addEventListener('keydown', event => {
 if (event.target !== stage360) return;
 if (['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) {
  event.preventDefault(); turnPlate(event.key === 'Home' ? 'reset' : event.key === 'ArrowLeft' ? -15 : 15);
 }
});
updateFallback();

// Enhanced hero: a true L-shaped matte plate. Low-power/touch devices retain CSS 3D.
async function initThree() {
 if ((navigator.deviceMemory && navigator.deviceMemory < 4) || navigator.connection?.saveData) return;
 let renderer;
 try {
 const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.170.0/+esm');
 const stage = $('.product-stage'), scene = new THREE.Scene();
 renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)); renderer.domElement.className='hero-canvas'; renderer.outputColorSpace=THREE.SRGBColorSpace;
 const camera = new THREE.PerspectiveCamera(33,1,.1,100); camera.position.set(0,.3,7);
 const group = new THREE.Group(); scene.add(group);
 const material = new THREE.MeshStandardMaterial({color:0x16191b,roughness:.82,metalness:.18});
 const face = new THREE.Mesh(new THREE.BoxGeometry(1.65,2.65,.065), material); group.add(face);
 const base = new THREE.Mesh(new THREE.BoxGeometry(1.65,.065,.9),material); base.position.set(0,-1.32,-.42);group.add(base);
 const canvas = document.createElement('canvas');canvas.width=512;canvas.height=800;
 const ctx=canvas.getContext('2d');ctx.clearRect(0,0,512,800);ctx.fillStyle='#e1e9eb';
 const path = new Path2D($('.pix path').getAttribute('d'));ctx.save();ctx.translate(139,95);ctx.scale(2.35,2.35);ctx.fill(path);ctx.restore();
 ctx.font='200 126px Arial';ctx.textAlign='center';ctx.fillText('pix',256,452);
 ctx.strokeStyle='#e1e9eb';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(256,625,69,82,0,0,Math.PI*2);ctx.stroke();
 [24,45,66].forEach(radius=>{ctx.beginPath();ctx.arc(225,625,radius,-.83,.83);ctx.stroke();});
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const decal=new THREE.Mesh(new THREE.PlaneGeometry(1.64,2.64),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));decal.position.z=.034;group.add(decal);
 scene.add(new THREE.AmbientLight(0x8cabbf,2));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-3,5,5);scene.add(key);
 const blue=new THREE.PointLight(0x00b3ff,25,12);blue.position.set(2,1,-1);scene.add(blue);
 group.rotation.set(platePitch,plateYaw,0);
 const resize=()=>{const r=stage.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();};resize();new ResizeObserver(resize).observe(stage);
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();stage.classList.remove('three-ready');renderer.setAnimationLoop(null);});
 stage.prepend(renderer.domElement);stage.classList.add('three-ready');
 renderer.setAnimationLoop(time=>{if(document.hidden||stage.classList.contains('offscreen'))return;group.position.y=paused||reduced?0:Math.sin(time*.001)*.08;group.rotation.y=plateYaw;group.rotation.x=platePitch;renderer.render(scene,camera);});
 } catch { renderer?.dispose(); $('.product-stage').classList.remove('three-ready'); }
}
initThree();
