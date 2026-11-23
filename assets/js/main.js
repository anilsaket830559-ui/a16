(function(){
var b=document.querySelector('.burger'),n=document.getElementById('nav');
if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Close menu':'Open menu');});
function $(i){return document.getElementById(i);}
var f=$('cform');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var fm=$('fm');
 if($('website').value)return;
 if(!f.checkValidity()){fm.hidden=false;fm.textContent='Please fill in your name, a valid email and a message, and tick the agreement box.';return;}
 var body='Name: '+$('name').value+'\nEmail: '+$('email').value+'\nTopic: '+$('topic').value+'\n\n'+$('message').value;
 location.href='mailto:'+f.getAttribute('data-to')+'?subject='+encodeURIComponent(f.getAttribute('data-brand')+': '+$('topic').value)+'&body='+encodeURIComponent(body);
 fm.hidden=false;fm.textContent='Your email app should open with the message ready to send. If nothing happens, write to us directly at '+f.getAttribute('data-to')+'.';});
var c=$('cookie'),k=null;try{k=localStorage.getItem('ck_'+location.hostname);}catch(e){}
if(c&&!k)c.classList.add('show');
if(c)c.querySelectorAll('button').forEach(function(bt){bt.addEventListener('click',function(){try{localStorage.setItem('ck_'+location.hostname,bt.getAttribute('data-cookie'));}catch(e){}c.classList.remove('show');});});
var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();

(function(){
function $(i){return document.getElementById(i);}
function n(i){var v=parseFloat($(i).value);return isNaN(v)?0:v;}
var CUT={chickenWhole:['Whole chicken',200,40,20,74,'Breast side up, untrussed so the thighs cook through.'],
chickenPieces:['Chicken pieces',200,0,35,74,'Skin side up on a rack; no turning needed.'],
porkLoin:['Pork loin',180,35,25,63,'Rest it properly; pork carries on cooking for several minutes.'],
lambLeg:['Leg of lamb',180,30,25,60,'60&deg;C centre gives pink; 70&deg;C gives well done.'],
beefJoint:['Beef joint',200,25,20,55,'Start hot for 20 minutes, then drop the oven to 160&deg;C.'],
turkeyCrown:['Turkey crown',180,40,30,74,'Cover with foil for the first two thirds to keep it from drying.'],
fishWhole:['Whole fish',200,0,25,63,'Per kilogram; check the thickest part behind the head.'],
vegTray:['Tray of vegetables',200,0,40,0,'Cut everything to the same size and do not crowd the tray.']};
function roastOut(){var k=$('rCut').value,kg=n('rKg'),d=CUT[k],o=$('rOut');
 if(!(kg>0)){o.innerHTML='<h4>Enter a weight</h4><p>Give the weight in kilograms and we will work out the timing.</p>';return;}
 var mins=Math.round(d[1+1]*kg+d[3]);
 var rest=k==='vegTray'?0:Math.max(10,Math.round(mins*0.18));
 var temp=d[1];
 var rows=[];
 var now=new Date();
 function at(m){var x=new Date(now.getTime()+m*60000);return x.getHours()+':'+('0'+x.getMinutes()).slice(-2);}
 rows.push('<li><b>Now</b> &mdash; take it out of the fridge and heat the oven to '+temp+'&deg;C.</li>');
 rows.push('<li><b>In 30 min</b> &mdash; season and put it in.</li>');
 rows.push('<li><b>'+mins+' min later</b> &mdash; check the centre with a thermometer.</li>');
 if(rest)rows.push('<li><b>Then rest '+rest+' min</b> &mdash; loosely covered, somewhere warm.</li>');
 rows.push('<li><b>Ready about '+at(30+mins+rest)+'</b> if you start now.</li>');
 o.innerHTML='<h4>'+d[0]+' &middot; '+kg+' kg</h4><dl class="kv"><dt>Oven</dt><dd>'+temp+'&deg;C (fan: '+(temp-20)+'&deg;C)</dd><dt>Cooking time</dt><dd>about '+mins+' minutes</dd>'+(d[4]?'<dt>Target centre</dt><dd>'+d[4]+'&deg;C</dd>':'')+(rest?'<dt>Rest</dt><dd>'+rest+' minutes</dd>':'')+'</dl><ul class="tl">'+rows.join('')+'</ul><p style="margin:0"><b>Note:</b> '+d[5]+'</p><p style="margin:.5em 0 0;font-size:.9rem;color:#64594F">Ovens vary by up to 20&deg;C. A thermometer in the thickest part, away from bone, is the only reliable test.</p>';}
['rCut','rKg'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',roastOut);});
if($('rKg'))roastOut();
var PORT={starter:[['Soup',250,'ml'],['Bread',60,'g'],['Cured meat or cheese',50,'g']],
main:[['Meat on the bone',350,'g'],['Boneless meat or fish',180,'g'],['Potatoes',250,'g'],['Vegetables',200,'g'],['Rice or grains (dry)',75,'g'],['Pasta (dry)',100,'g'],['Sauce or gravy',100,'ml']],
pudding:[['Dessert portion',120,'g'],['Cream',40,'ml']],
drinks:[['Soft drinks',500,'ml'],['Coffee or tea',250,'ml']]};
function portOut(){var g=n('pGuests'),app=parseFloat($('pApp').value),course=$('pCourse').value,o=$('pOut');
 if(!(g>0)){o.innerHTML='<h4>How many people?</h4><p>Enter the number at the table and we will work out quantities.</p>';return;}
 var rows=PORT[course].map(function(r){var t=r[1]*g*app;
  var disp=r[2]==='g'&&t>=1000?(t/1000).toFixed(2)+' kg':r[2]==='ml'&&t>=1000?(t/1000).toFixed(2)+' l':Math.round(t)+' '+r[2];
  return '<dt>'+r[0]+'</dt><dd>'+disp+'</dd>';}).join('');
 o.innerHTML='<h4>'+g+' at the table</h4><dl class="kv">'+rows+'</dl><ul><li>Cook a little more of the cheap things and exactly enough of the expensive ones; nobody minds extra potatoes.</li><li>If there are children at the table, count two children as roughly one adult portion.</li><li>Leftovers are a plan, not a mistake. Choose a dish that reheats well and make a quarter more.</li></ul>';}
['pGuests','pApp','pCourse'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',portOut);});
if($('pGuests'))portOut();
function planOut(){var t=$('tServe').value,courses=+$('tCourses').value,oven=$('tOven').value,o=$('tOut');
 if(!t){o.innerHTML='<h4>Pick a serving time</h4><p>Tell us when you want to sit down and we will work backwards.</p>';return;}
 var p=t.split(':'),serve=new Date();serve.setHours(+p[0],+p[1],0,0);
 function at(m){var x=new Date(serve.getTime()+m*60000);return ('0'+x.getHours()).slice(-2)+':'+('0'+x.getMinutes()).slice(-2);}
 var L=[];
 L.push(['-1 day','Shop. Make anything that keeps: stock, dressing, pudding, anything braised.']);
 L.push([at(-240),'Lay the table and clear the kitchen. An empty sink is worth an hour later on.']);
 L.push([at(-180),'Prepare vegetables and anything that can sit covered in the fridge.']);
 if(oven==='one')L.push([at(-150),'Only one oven, so decide the order now: roast first, sides after, and keep the roast warm while it rests.']);
 L.push([at(-120),'Main course into the oven or onto the hob.']);
 if(courses>=3)L.push([at(-60),'Finish the starter so it only needs plating.']);
 L.push([at(-45),'Sides on. Anything green goes last.']);
 L.push([at(-25),'Take the roast out to rest. Turn the oven down and warm the plates.']);
 L.push([at(-10),'Make the gravy or sauce in the roasting tray. Pour drinks.']);
 if(courses>=3)L.push([at(-5),'Serve the starter.']);
 L.push([at(0),'Serve the main course.']);
 if(courses>=2)L.push([at(35),'Clear, then bring out the pudding.']);
 o.innerHTML='<h4>Sitting down at '+t+'</h4><ul class="tl">'+L.map(function(x){return '<li><b>'+x[0]+'</b> &mdash; '+x[1]+'</li>';}).join('')+'</ul><p style="margin:0;font-size:.9rem;color:#64594F">Build in twenty minutes of slack. Something always takes longer than it should, and a host who is calm matters more than a dish that is perfect.</p>';}
['tServe','tCourses','tOven'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',planOut);});
if($('tServe')){$('tServe').value='19:30';planOut();}
})();
