(() => {
  'use strict';
  const PLUS='ksite.plus';
  const $=s=>document.querySelector(s);
  const log=$('#chatLog');
  const input=$('#chatInput');
  const send=$('#chatSend');
  const forbidden=/\b(naakt|nude|18\+|seks|sex|seksueel|genitaal|piemel|penis|vagina|borst|borsten|billen|onderbroek uit|kleren uit|fetish|fetisj)\b/i;
  const kb=[
    {keys:['wat is kietelen','kietelen'],text:'Kietelen is geen apart zintuig, maar een ervaring die ontstaat uit tastprikkels, zenuwsignalen, verwachting, aandacht en context. Daarom kan dezelfde aanraking op verschillende momenten anders voelen.'},
    {keys:['knismesis'],text:'Knismesis is een lichte, kriebelachtige vorm van aanraking. Die kan bijvoorbeeld aanvoelen als een zacht kriebeltje en hoeft niet tot lachen te leiden.'},
    {keys:['gargalesis'],text:'Gargalesis is de term die vaak wordt gebruikt voor sterkere kietelreacties waarbij lachen of wegtrekken kan voorkomen. De grens tussen beide termen is niet perfect scherp.'},
    {keys:['zelf kietelen','jezelf'],text:'Jezelf kietelen werkt vaak minder sterk omdat je brein je eigen beweging beter kan voorspellen. Daardoor is de prikkel minder onverwacht.'},
    {keys:['plekken','waar','gevoelig'],text:'Veelgenoemde niet-intieme gebieden zijn onder andere voetzolen, zijkanten van de romp, okselgebied, nek, handpalmen, onderarmen, schouders en kniegebied. Er bestaat geen universele ranglijst: gevoeligheid verschilt per persoon en moment.'},
    {keys:['voeten','voetzolen'],text:'Voetzolen bevatten veel sensorische informatie en kunnen daardoor opvallend reageren op lichte aanraking. Dat betekent niet dat voeten bij iedereen de gevoeligste plek zijn.'},
    {keys:['oksels','oksel'],text:'Het okselgebied wordt vaak als gevoelig genoemd, maar dat verschilt sterk per persoon. Voor IRL challenges geldt: alleen als die plek vooraf expliciet oké is.'},
    {keys:['zijkant','zij'],text:'De zijkanten van de romp kunnen gevoelig aanvoelen doordat aanraking daar onverwacht kan zijn en er veel beweging van huid en spieren is. Ook hier geldt: persoonlijke verschillen zijn groot.'},
    {keys:['lachen','lach'],text:'Lachen tijdens kietelen kan deels automatisch zijn. Het betekent niet automatisch dat iemand de situatie leuk vindt of wil doorgaan; toestemming moet altijd apart worden gerespecteerd.'},
    {keys:['zenuw','hersenen','brein'],text:'Mechanische prikkels worden door receptoren in de huid omgezet in zenuwsignalen. Die informatie wordt verder verwerkt in het zenuwstelsel en de hersenen, waar verwachting en aandacht de ervaring kunnen beïnvloeden.'},
    {keys:['challenge','challenges'],text:'KSite Plus heeft 50 IRL challenges met timers, punten en random selectie. Ze zijn vrijwillig, met kleding aan, zonder vasthouden en met directe stopvrijheid.'},
    {keys:['stop','toestemming','consent'],text:'De belangrijkste regel is simpel: vraag vooraf toestemming, spreek grenzen af en stop onmiddellijk zodra iemand wil stoppen of twijfelt. Een challenge overslaan is altijd oké.'},
    {keys:['waarom verschillend','verschillen'],text:'Verschillen kunnen komen door aandacht, verwachting, stemming, gewenning, eerdere ervaringen, context en individuele gevoeligheid van huid en zenuwstelsel.'},
    {keys:['gewenning'],text:'Bij herhaalde of voorspelbare prikkels kan het zenuwstelsel soms minder sterk reageren. Dat heet gewenning of habituatie.'},
    {keys:['random'],text:'Op de Challenge Hub kan de randomizer een challenge kiezen uit de geselecteerde moeilijkheidsgraad. Je kunt altijd opnieuw rollen als een challenge niet goed voelt.'},
    {keys:['timer'],text:'De Challenge Hub heeft ingebouwde timers. Een timer is altijd een maximum, nooit een verplicht minimum: iemand mag dus altijd eerder stoppen.'}
  ];
  function time(){return new Date().toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit'})}
  function add(role,text){const row=document.createElement('div');row.className=`chat-row ${role}`;row.innerHTML=`<div class="chat-bubble">${escapeHtml(text).replace(/\n/g,'<br>')}<div class="chat-meta">${role==='user'?'Jij':'KSite Assist'} • ${time()}</div></div>`;log.appendChild(row);log.scrollTop=log.scrollHeight}
  function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function typing(){const row=document.createElement('div');row.className='chat-row assistant';row.id='typingRow';row.innerHTML='<div class="chat-bubble"><div class="typing"><span></span><span></span><span></span></div></div>';log.appendChild(row);log.scrollTop=log.scrollHeight}
  function answer(q){const t=q.toLowerCase();if(forbidden.test(t))return 'Daar kan ik niet in meegaan. Ik kan je wel helpen met niet-seksuele informatie over kietelen, zenuwen, gevoeligheid, veilige IRL challenges, plekken en toestemming.';let best=null,score=0;for(const item of kb){let s=0;for(const k of item.keys)if(t.includes(k))s+=k.length;if(s>score){score=s;best=item}}if(best)return best.text;return 'Ik weet hier nog niet genoeg van om er betrouwbaar op te antwoorden. Vraag bijvoorbeeld naar gevoelige plekken, waarom zelfkietelen anders voelt, knismesis/gargalesis, lachen, zenuwen, gewenning, toestemming of de IRL challenges.'}
  function submit(text){const q=(text??input.value).trim();if(!q)return;add('user',q);input.value='';typing();setTimeout(()=>{document.getElementById('typingRow')?.remove();add('assistant',answer(q))},420)}
  function init(){const active=localStorage.getItem(PLUS)==='true';$('#chatGate')?.classList.toggle('hidden',active);$('#chatContent')?.classList.toggle('hidden',!active);if(!active)return;send?.addEventListener('click',()=>submit());input?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();submit()}});document.querySelectorAll('[data-chat-prompt]').forEach(b=>b.addEventListener('click',()=>submit(b.dataset.chatPrompt)));$('#clearChat')?.addEventListener('click',()=>{log.innerHTML='';add('assistant','Nieuwe chat gestart. Waar wil je iets over weten?')});add('assistant','Hoi! Ik ben KSite Assist. Vraag me iets over kietelen, gevoelige plekken, zenuwen, reacties, de Challenge Hub of toestemming.');}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();