(() => {
  'use strict';
  const KEY='ksite.irlChallenges';
  const XPKEY='ksite.xp';
  const PLUS='ksite.plus';
  const challenges=[
    {id:'c01',n:1,title:'10-seconden start',level:'easy',time:10,points:10,zones:'handpalmen of onderarmen',desc:'Kies vooraf één toegestane plek en doe maximaal 10 seconden. Stop direct bij “stop”.'},
    {id:'c02',n:2,title:'Links of rechts',level:'easy',time:10,points:10,zones:'onderarmen',desc:'De ontvanger kiest links of rechts. Alleen die kant telt voor deze ronde.'},
    {id:'c03',n:3,title:'Random veilige plek',level:'easy',time:10,points:10,zones:'handen, schouders of onderarmen',desc:'Laat de randomizer één afgesproken veilige plek kiezen uit jullie eigen lijst.'},
    {id:'c04',n:4,title:'Stopwoord test',level:'easy',time:8,points:10,zones:'zelf gekozen',desc:'Spreek eerst een stopwoord af en test of iedereen direct stopt zodra het gezegd wordt.'},
    {id:'c05',n:5,title:'Timer challenge',level:'easy',time:15,points:12,zones:'onderarmen of schouders',desc:'Gebruik de ingebouwde timer. De ronde stopt automatisch na 15 seconden.'},
    {id:'c06',n:6,title:'Om de beurt',level:'easy',time:10,points:12,zones:'zelf gekozen',desc:'Twee korte rondes van maximaal 10 seconden, waarbij jullie omwisselen.'},
    {id:'c07',n:7,title:'Eén hand',level:'easy',time:12,points:12,zones:'onderarmen',desc:'Gebruik maar één hand en blijf bij de vooraf gekozen plek.'},
    {id:'c08',n:8,title:'Stille ronde',level:'easy',time:10,points:12,zones:'handpalmen',desc:'Doe een korte ronde zonder praten, behalve als iemand wil stoppen.'},
    {id:'c09',n:9,title:'Keuze uit drie',level:'easy',time:12,points:12,zones:'handen, armen of schouders',desc:'De ontvanger kiest één van drie vooraf besproken plekken.'},
    {id:'c10',n:10,title:'Mini-best-of-3',level:'easy',time:8,points:15,zones:'zelf gekozen',desc:'Drie ultrakorte rondes van maximaal 8 seconden met pauzes ertussen.'},
    {id:'c11',n:11,title:'20-seconden ronde',level:'medium',time:20,points:18,zones:'onderarmen of zijkanten over kleding',desc:'Eén ronde van maximaal 20 seconden, zonder vasthouden of blokkeren.'},
    {id:'c12',n:12,title:'Zone switch',level:'medium',time:20,points:18,zones:'twee afgesproken plekken',desc:'Halverwege wissel je naar de tweede plek als de ontvanger dat nog steeds oké vindt.'},
    {id:'c13',n:13,title:'Blind keuze-kaart',level:'medium',time:15,points:18,zones:'veilige afgesproken zones',desc:'Kies willekeurig een kaartje met een toegestane plek; geen verrassingen buiten de afgesproken lijst.'},
    {id:'c14',n:14,title:'Puntenronde',level:'medium',time:20,points:20,zones:'zelf gekozen',desc:'Verdien 1 punt per 5 seconden die de ronde vrijwillig doorgaat. Stoppen kost nooit punten.'},
    {id:'c15',n:15,title:'Schouder vs onderarm',level:'medium',time:16,points:20,zones:'schouders en onderarmen',desc:'Twee rondes van 8 seconden en daarna vergelijken welke het meest opvallend voelde.'},
    {id:'c16',n:16,title:'Links-rechts switch',level:'medium',time:18,points:20,zones:'armen of schouders',desc:'Wissel om de 6 seconden van kant, maar alleen zolang beide personen dat willen.'},
    {id:'c17',n:17,title:'Timer roulette',level:'medium',time:25,points:20,zones:'zelf gekozen',desc:'Laat de timer willekeurig tussen 10 en 25 seconden kiezen.'},
    {id:'c18',n:18,title:'Reactiescore',level:'medium',time:15,points:20,zones:'zelf gekozen',desc:'Na afloop geeft de ontvanger alleen zelf een score van 1–5 voor hoe opvallend de prikkel was.'},
    {id:'c19',n:19,title:'Drie zones',level:'medium',time:24,points:22,zones:'drie vooraf gekozen plekken',desc:'Drie rondes van 8 seconden, steeds op een andere toegestane plek.'},
    {id:'c20',n:20,title:'Switch op signaal',level:'medium',time:20,points:22,zones:'twee veilige zones',desc:'De ontvanger bepaalt met “wissel” wanneer naar de tweede plek wordt gegaan.'},
    {id:'c21',n:21,title:'30-seconden max',level:'hard',time:30,points:25,zones:'over kleding, zelf gekozen',desc:'Een langere ronde, maximaal 30 seconden. Geen vasthouden, geen blokkeren, direct stoppen op verzoek.'},
    {id:'c22',n:22,title:'Vier korte rondes',level:'hard',time:24,points:25,zones:'maximaal vier veilige zones',desc:'Vier rondes van 6 seconden met korte pauzes.'},
    {id:'c23',n:23,title:'Random volgorde',level:'hard',time:24,points:25,zones:'drie afgesproken plekken',desc:'De randomizer kiest de volgorde van drie toegestane zones.'},
    {id:'c24',n:24,title:'Zonder voorspellen',level:'hard',time:20,points:25,zones:'twee afgesproken plekken',desc:'De ontvanger weet welke twee plekken mogen, maar niet welke als eerste komt.'},
    {id:'c25',n:25,title:'Team score',level:'hard',time:25,points:28,zones:'zelf gekozen',desc:'Beide deelnemers krijgen dezelfde punten als de ronde netjes binnen de afspraken blijft.'},
    {id:'c26',n:26,title:'Vijf-seconden sprintjes',level:'hard',time:25,points:28,zones:'veilige zones',desc:'Vijf korte rondes van 5 seconden met pauzes ertussen.'},
    {id:'c27',n:27,title:'Keuze verandert',level:'hard',time:24,points:28,zones:'zelf gekozen',desc:'Na elke 8 seconden mag de ontvanger een andere veilige plek kiezen of stoppen.'},
    {id:'c28',n:28,title:'Reactie voorspellen',level:'hard',time:20,points:28,zones:'zelf gekozen',desc:'Vooraf voorspelt de ontvanger welke plek het opvallendst zal zijn; daarna vergelijken jullie alleen de eigen ervaring.'},
    {id:'c29',n:29,title:'Dubbele timer',level:'hard',time:30,points:30,zones:'twee veilige zones',desc:'Twee rondes van 15 seconden, met minstens 15 seconden pauze.'},
    {id:'c30',n:30,title:'No-repeat ronde',level:'hard',time:30,points:30,zones:'drie veilige zones',desc:'Binnen de ronde mag dezelfde zone niet twee keer achter elkaar gekozen worden.'},
    {id:'c31',n:31,title:'Vier-zone circuit',level:'extreme',time:32,points:35,zones:'vier vooraf gekozen veilige zones',desc:'Vier rondes van 8 seconden. Alleen doorgaan als de ontvanger voor elke volgende ronde opnieuw akkoord is.'},
    {id:'c32',n:32,title:'Random 10–30',level:'extreme',time:30,points:35,zones:'zelf gekozen',desc:'Laat de site een duur tussen 10 en 30 seconden kiezen.'},
    {id:'c33',n:33,title:'Switch challenge',level:'extreme',time:30,points:35,zones:'drie veilige zones',desc:'De ontvanger mag onbeperkt “wissel” zeggen; elke wissel wordt direct gevolgd.'},
    {id:'c34',n:34,title:'Best-of-5',level:'extreme',time:30,points:35,zones:'veilige zones',desc:'Vijf rondes van 6 seconden en daarna één favoriete zone kiezen.'},
    {id:'c35',n:35,title:'Mystery zone',level:'extreme',time:20,points:38,zones:'alleen uit vooraf goedgekeurde lijst',desc:'De site kiest één onbekende plek uit de lijst die de ontvanger vooraf zelf heeft goedgekeurd.'},
    {id:'c36',n:36,title:'Control challenge',level:'extreme',time:30,points:38,zones:'zelf gekozen',desc:'De ontvanger bepaalt volledig de start, wissels, pauzes en stop.'},
    {id:'c37',n:37,title:'Countdown ronde',level:'extreme',time:25,points:38,zones:'zelf gekozen',desc:'De timer telt hardop af; zodra iemand eerder stopt is de challenge ook gewoon geslaagd.'},
    {id:'c38',n:38,title:'Pauze verplicht',level:'extreme',time:30,points:38,zones:'twee veilige zones',desc:'Na elke 10 seconden volgt verplicht minstens 10 seconden pauze.'},
    {id:'c39',n:39,title:'Drie-keuzesysteem',level:'extreme',time:30,points:40,zones:'drie veilige zones',desc:'Voor elke mini-ronde kiest de ontvanger opnieuw 1, 2 of 3.'},
    {id:'c40',n:40,title:'Perfect consent run',level:'extreme',time:25,points:40,zones:'zelf gekozen',desc:'De challenge telt alleen als vooraf toestemming is gevraagd, tijdens de ronde wordt gecheckt en direct wordt gestopt bij twijfel.'},
    {id:'c41',n:41,title:'Master circuit',level:'extreme',time:36,points:45,zones:'vier veilige zones',desc:'Vier rondes van 9 seconden met volledige keuzevrijheid voor de ontvanger.'},
    {id:'c42',n:42,title:'Random master',level:'extreme',time:30,points:45,zones:'veilige lijst',desc:'Laat de site zowel duur als één toegestane zone kiezen.'},
    {id:'c43',n:43,title:'Reverse roles',level:'extreme',time:30,points:45,zones:'zelf gekozen',desc:'Twee gelijke rondes met rolwissel. Beide deelnemers mogen hun eigen zones en duur kiezen.'},
    {id:'c44',n:44,title:'Three-round ladder',level:'extreme',time:30,points:45,zones:'zelf gekozen',desc:'10 seconden, pauze, 10 seconden, pauze, en alleen met nieuw akkoord nog 10 seconden.'},
    {id:'c45',n:45,title:'Choice master',level:'extreme',time:30,points:48,zones:'drie veilige zones',desc:'De ontvanger bestuurt de hele ronde met start, stop en wissel.'},
    {id:'c46',n:46,title:'Safe streak x5',level:'extreme',time:25,points:48,zones:'zelf gekozen',desc:'Voltooi vijf aparte korte challenges op verschillende momenten zonder één grensregel te missen.'},
    {id:'c47',n:47,title:'Random duo',level:'extreme',time:30,points:50,zones:'veilige lijst',desc:'De site kiest twee toegestane zones en een totale tijd; de ontvanger bepaalt wanneer er gewisseld wordt.'},
    {id:'c48',n:48,title:'Precision timer',level:'extreme',time:30,points:50,zones:'zelf gekozen',desc:'Stop exact wanneer de timer afloopt, tenzij iemand eerder wil stoppen.'},
    {id:'c49',n:49,title:'Consent champion',level:'extreme',time:30,points:55,zones:'zelf gekozen',desc:'Voltooi een ronde met duidelijke toestemming vóór, check-in tijdens en bevestiging achteraf dat alles oké was.'},
    {id:'c50',n:50,title:'KSite IRL Final Boss',level:'extreme',time:30,points:75,zones:'alleen vooraf goedgekeurde veilige zones',desc:'Maak zelf een ronde uit drie eerder voltooide challenges. Maximaal 30 seconden per ronde, met pauzes en volledige stopvrijheid.'}
  ];
  const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
  const getDone=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
  const setDone=v=>localStorage.setItem(KEY,JSON.stringify(v));
  const toast=(m)=>window.KSite?.showToast?window.KSite.showToast(m,'success'):alert(m);
  let filter='all',query='';
  function plusGate(){const active=localStorage.getItem(PLUS)==='true';$('#irlGate')?.classList.toggle('hidden',active);$('#irlContent')?.classList.toggle('hidden',!active);return active}
  function stats(){const done=getDone();const earned=challenges.filter(c=>done.includes(c.id)).reduce((a,c)=>a+c.points,0);if($('#doneCount'))$('#doneCount').textContent=done.length;if($('#pointCount'))$('#pointCount').textContent=earned;if($('#remainingCount'))$('#remainingCount').textContent=challenges.length-done.length;}
  function card(c){const done=getDone().includes(c.id);return `<article class="irl-challenge-card difficulty-${c.level} ${done?'completed':''}" data-id="${c.id}"><div class="irl-top"><span class="irl-number">#${String(c.n).padStart(2,'0')}</span><div class="irl-badges"><span class="irl-badge">${c.level.toUpperCase()}</span><span class="irl-badge">${c.points} PTS</span></div></div><h3>${c.title}</h3><p>${c.desc}</p><div class="irl-details"><div class="irl-detail"><span>Max. timer</span><strong>${c.time}s</strong></div><div class="irl-detail"><span>Plekken</span><strong>${c.zones}</strong></div></div><div class="irl-actions"><button class="btn secondary small start-timer" data-time="${c.time}" type="button">Timer</button><button class="btn primary small complete-irl" data-id="${c.id}" type="button">${done?'Voltooid ✓':'Voltooien'}</button></div></article>`}
  function render(){const g=$('#irlGrid');if(!g)return;const list=challenges.filter(c=>(filter==='all'||c.level===filter)&&(!query||`${c.title} ${c.desc} ${c.zones}`.toLowerCase().includes(query)));g.innerHTML=list.length?list.map(card).join(''):'<div class="empty-challenges">Geen challenges gevonden.</div>';$$('.complete-irl').forEach(b=>b.onclick=()=>complete(b.dataset.id));$$('.start-timer').forEach(b=>b.onclick=()=>startTimer(Number(b.dataset.time)));stats()}
  function complete(id){const done=getDone();if(done.includes(id)){toast('Deze challenge was al voltooid.');return}done.push(id);setDone(done);const c=challenges.find(x=>x.id===id);const xp=Number(localStorage.getItem(XPKEY)||0)+Math.max(5,Math.round(c.points/2));localStorage.setItem(XPKEY,String(xp));toast(`Challenge voltooid • +${Math.max(5,Math.round(c.points/2))} XP`);render()}
  let timerId=null;function startTimer(seconds){clearInterval(timerId);let left=seconds;const clock=$('#timerClock');const panel=$('#timerPanel');panel?.classList.remove('hidden');if(clock)clock.textContent=left+'s';timerId=setInterval(()=>{left--;if(clock)clock.textContent=Math.max(0,left)+'s';if(left<=0){clearInterval(timerId);toast('Timer klaar — ronde stoppen.')}},1000)}
  function randomChallenge(){const pool=challenges.filter(c=>filter==='all'||c.level===filter);const c=pool[Math.floor(Math.random()*pool.length)];if(!c)return;$('#randomDisplay').innerHTML=`<strong>#${String(c.n).padStart(2,'0')} — ${c.title}</strong><p>${c.desc}</p><div class="irl-actions" style="margin-top:12px"><button class="btn primary small" id="randomTimer" type="button">Start ${c.time}s timer</button><a class="btn secondary small" href="#challenge-${c.id}" onclick="return false">${c.points} punten</a></div>`;$('#randomTimer').onclick=()=>startTimer(c.time)}
  function init(){if(!plusGate())return;$$('.challenge-filter-btn').forEach(b=>b.onclick=()=>{$$('.challenge-filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()});$('#challengeSearch')?.addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render()});$('#randomChallengeBtn')?.addEventListener('click',randomChallenge);$('#stopTimerBtn')?.addEventListener('click',()=>{clearInterval(timerId);$('#timerPanel')?.classList.add('hidden')});render();randomChallenge()}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();