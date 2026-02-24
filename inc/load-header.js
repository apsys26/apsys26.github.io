(async function(){
  const candidates = ['./inc/header.html', '/inc/header.html', '../inc/header.html'];
  let html = null;
  for(const p of candidates){
    try{
      const res = await fetch(p, {cache: 'no-store'});
      if(res.ok){ html = await res.text(); break; }
    }catch(e){}
  }
  const placeholder = document.getElementById('site-header-placeholder');
  if(!placeholder) return;
  if(html === null){ console.warn('header include not found'); return; }
  placeholder.innerHTML = html;
  // Re-execute any scripts inside the loaded fragment
  const scripts = Array.from(placeholder.querySelectorAll('script'));
  for(const s of scripts){
    const ns = document.createElement('script');
    if(s.src) ns.src = s.src;
    else ns.textContent = s.textContent;
    document.head.appendChild(ns);
  }
})();
