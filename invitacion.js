'use strict';
const byId=id=>document.getElementById(id),audio=byId('music'),control=byId('music-button'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let effects=!reduced.matches;
function musicState(){control.setAttribute('aria-pressed',String(!audio.paused));control.setAttribute('aria-label',audio.paused?'Reproducir música':'Pausar música');byId('music-glyph').textContent=audio.paused?'♫':'Ⅱ';byId('music-label').textContent=audio.paused?'Música':'Pausar'}
audio.addEventListener('play',musicState);audio.addEventListener('pause',musicState);control.addEventListener('click',()=>{if(audio.paused)audio.play().catch(musicState);else audio.pause()});
function effectState(){document.body.classList.toggle('effects-off',!effects);byId('effects-button').setAttribute('aria-pressed',String(effects));byId('effects-button').setAttribute('aria-label',effects?'Pausar brillitos':'Activar brillitos');byId('effects-button').innerHTML=effects?'✧ <span>Brillitos</span>':'✧ <span>Activar</span>'}
effectState();byId('effects-button').addEventListener('click',()=>{effects=!effects;effectState()});
byId('open').addEventListener('click',()=>{byId('open').disabled=true;audio.volume=.6;audio.play().catch(musicState);byId('cover').classList.add('opening');setTimeout(()=>{byId('cover').hidden=true;byId('invitation').hidden=false;control.hidden=false;byId('effects-button').hidden=false;document.body.classList.remove('sealed');window.scrollTo(0,0);document.querySelector('.hero h2').focus({preventScroll:true});if(!reduced.matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)})}},reduced.matches?0:2150)});
for(let i=0;i<78;i++){
 const el=document.createElement('span'),heart=i<32;
 el.className=heart?'falling-heart':'appearing-glint';
 el.textContent=heart?(i%3===0?'♡':'♥'):(i%3===0?'✧':'✦');
 el.style.cssText=`--left:${(i*37+3)%100}%;--top:${(i*23+7)%100}%;--duration:${heart?11+i%11:2.4+(i%8)*.43}s;--delay:${-i*1.37}s;--size:${heart?12+i%5*3:13+i%6*4}px;--sway:${i%2===0?45:-45}px;--tilt:${i%2===0?35:-35}deg`;
 byId('particles').append(el);
}
document.addEventListener('visibilitychange',()=>byId('particles').classList.toggle('paused',document.hidden));
byId('back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'}));
function countdown(){const diff=new Date('2026-10-24T13:00:00-04:00')-Date.now();if(diff<=0){byId('countdown').textContent='¡Llegó el día de celebrar!';return}const values=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];byId('countdown').innerHTML=values.map((n,i)=>`<div><strong>${String(n).padStart(2,'0')}</strong><span>${['DÍAS','HORAS','MINUTOS','SEGUNDOS'][i]}</span></div>`).join('')}
countdown();setInterval(countdown,1000);
byId('song-form').addEventListener('submit',event=>{event.preventDefault();const song=byId('song').value.trim(),guest=byId('guest').value.trim();if(!song){byId('song').setCustomValidity('Escribe una canción y su artista.');byId('song').reportValidity();return}const message=`Hola Ximena, ${guest?'soy '+guest+'. ':''}Para los XV de Nicole me gustaría sugerir esta canción: ${song}`;window.open('https://wa.me/59175989333?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')});byId('song').addEventListener('input',()=>byId('song').setCustomValidity(''));

byId('open-label').addEventListener('click',()=>byId('open').click());
