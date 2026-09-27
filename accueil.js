// kodaprod.space : salut selon l'heure, redirection annoncée (l'adresse s'écrit avant de partir).
const salut = () => {
  const h = new Date().getHours();
  if (h < 6) return 'Encore debout ? Moi aussi.';
  if (h < 12) return 'Bonjour ! Par où on commence ?';
  if (h < 18) return 'Salut ! Choisissez une porte.';
  return 'Bonsoir ! Par quelle porte on commence ?';
};

/** Écrit le texte lettre à lettre dans l'élément, curseur clignotant au bout. */
const taper = (el, texte, vitesse = 32) => new Promise((fin) => {
  el.innerHTML = '<span></span><i class="curseur"></i>';
  const s = el.firstChild;
  let i = 0;
  const t = setInterval(() => {
    s.textContent = texte.slice(0, ++i);
    if (i >= texte.length) { clearInterval(t); fin(); }
  }, vitesse);
});

/**
 * La redirection : on montre OÙ l'on part avant d'y aller. L'adresse
 * s'écrit, la ligne se remplit, puis la page change. `?demo` dans
 * l'adresse de la maquette rejoue l'animation sans quitter la page.
 */
const partir = (url, libelle) => {
  let barre = document.querySelector('.redirection');
  if (!barre) {
    barre = document.createElement('div');
    barre.className = 'redirection';
    barre.innerHTML = '<div class="surtitre" style="color:#6B6B72">On y va</div><div class="adresse"></div><div class="ligne"><i></i></div>';
    document.body.append(barre);
  }
  barre.classList.remove('visible');
  void barre.offsetWidth;
  const adresse = barre.querySelector('.adresse');
  adresse.innerHTML = '';
  barre.classList.add('visible');
  taper(adresse, libelle, 28);
  const demo = new URLSearchParams(location.search).has('demo');
  setTimeout(() => {
    if (demo) { barre.classList.remove('visible'); document.querySelectorAll('.ouverte').forEach((p) => p.classList.remove('ouverte')); return; }
    location.href = url;
  }, 1300);
};

window.Koda = { salut, taper, partir };
