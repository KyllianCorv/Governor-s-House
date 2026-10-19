// ============================================
// TEXTES FR/EN MODIFIABLES - Governor's House
// ============================================
// Chaque texte de la page est identifié par son texte FR d'origine (celui du HTML).
// EN par défaut : translations.js (associé via le texte FR), s'il est chargé sur la page.
// Les textes modifiés par l'admin (/api/texts) passent par-dessus.
// Mode édition : ?edit dans l'URL, après connexion sur /admin.
// À charger en fin de <body>.

(function() {
  'use strict';

  var translations = window.TRANSLATIONS || {};
  var currentLang = localStorage.getItem('lang') || 'fr';
  var texts = {};      // texte FR d'origine -> { fr, en } depuis translations.js
  var overrides = {};  // clé -> { fr, en } modifié depuis l'admin

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  (function pair(fr, en) {
    for (var k in fr) {
      if (typeof fr[k] === 'object') pair(fr[k], (en && en[k]) || {});
      else texts[norm(fr[k])] = { fr: fr[k], en: (en && en[k]) || '' };
    }
  })(translations.fr || {}, translations.en);

  // Préfixe par page (sauf l'accueil) : le titre « Mentions légales » de sa page ≠ le lien du pied de page de l'accueil
  var page = location.pathname.replace(/^\/|\.html$/g, '').replace(/^index$/, '');

  // Textes statiques de la page (le contenu chargé ensuite par JS, ex. événements, n'est pas concerné)
  var textNodes = [];
  var seen = {};
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    var tn = walker.currentNode;
    if (!/[A-Za-zÀ-ÿ]/.test(tn.nodeValue) || tn.parentNode.closest('script, style, noscript, svg, option, textarea, #lang-btn')) continue;
    var parts = tn.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var text = norm(parts[2]);
    seen[text] = (seen[text] || 0) + 1;
    // Texte répété (ex. « Réserver cette formule ») : une clé par emplacement pour les modifier séparément.
    // shortcut: numéroté dans l'ordre de la page, ajouter une copie plus haut dans le HTML décale les suivantes
    var key = (page ? page + ' · ' : '') + text + (seen[text] > 1 ? ' #' + seen[text] : '');
    textNodes.push({
      node: tn, text: text, key: key, orig: tn.nodeValue, pre: parts[1], post: parts[3],
      todo: tn.parentNode.closest('.todo')  // champ à compléter des pages légales (surligné en jaune)
    });
  }

  function applyTexts() {
    textNodes.forEach(function(t) {
      var o = overrides[t.key] || {}, d = texts[t.text] || {};
      var value = currentLang === 'en' ? (o.en || d.en || o.fr || t.text) : (o.fr || t.text);
      t.node.nodeValue = value === t.text ? t.orig : t.pre + value + t.post;
      if (t.todo) t.todo.classList.toggle('todo', value === t.text);
    });
  }

  window.setSiteLanguage = function(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTexts();
  };

  // Textes admin en cache pour éviter le flash de l'ancien texte
  try { overrides = JSON.parse(localStorage.getItem('site_texts')) || {}; } catch (e) {}
  applyTexts();

  fetch('/api/texts')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data.texts) return;
      overrides = data.texts;
      try { localStorage.setItem('site_texts', JSON.stringify(overrides)); } catch (e) {}
      applyTexts();
    })
    .catch(function() {});

  /* ── Mode édition ── */
  var adminPassword = sessionStorage.getItem('admin_password');
  if (!/[?&]edit\b/.test(location.search) || !adminPassword) return;

  document.documentElement.classList.add('edit-mode');
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/css/edit.css';
  document.head.appendChild(css);

  textNodes.forEach(function(t, i) {
    var span = document.createElement('span');
    span.className = 'gh-edit';
    span.dataset.i = i;
    t.node.parentNode.replaceChild(span, t.node);
    span.appendChild(t.node);
  });

  var bar = document.createElement('div');
  bar.className = 'gh-edit-bar';
  bar.innerHTML = 'Mode édition · cliquez sur un texte pour le modifier · ' +
    '<a href="/?edit">Accueil</a> · <a href="/mentions-legales?edit">Mentions légales</a> · ' +
    '<a href="/confidentialite?edit">Confidentialité</a> · <a href="/admin">Retour à l\'admin</a>';
  document.body.appendChild(bar);

  var dlg = document.createElement('dialog');
  dlg.className = 'gh-edit-dialog';
  dlg.innerHTML =
    '<form method="dialog">' +
      '<p class="gh-edit-orig"></p>' +
      '<label>Français<textarea name="fr" rows="4"></textarea></label>' +
      '<label>English<textarea name="en" rows="4" placeholder="Vide = texte français"></textarea></label>' +
      '<p class="gh-edit-hint">Videz les deux champs pour revenir au texte d\'origine.</p>' +
      '<div class="gh-edit-actions"><button value="cancel">Annuler</button><button value="save" class="gh-edit-save">Enregistrer</button></div>' +
    '</form>';
  document.body.appendChild(dlg);

  var editing;
  document.addEventListener('click', function(e) {
    var span = e.target.closest && e.target.closest('.gh-edit');
    if (!span) return;
    e.preventDefault();
    e.stopPropagation();
    editing = textNodes[span.dataset.i];
    var o = overrides[editing.key] || {}, d = texts[editing.text] || {};
    dlg.querySelector('.gh-edit-orig').textContent = 'Texte d\'origine : ' + editing.text;
    dlg.querySelector('[name=fr]').value = o.fr || editing.text;
    dlg.querySelector('[name=en]').value = o.en || d.en || '';
    dlg.returnValue = '';
    dlg.showModal();
  }, true);

  dlg.addEventListener('close', function() {
    if (dlg.returnValue !== 'save') return;
    var key = editing.key;
    var fr = dlg.querySelector('[name=fr]').value.trim();
    var en = dlg.querySelector('[name=en]').value.trim();
    fetch('/api/admin/update-texts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword, key: key, fr: fr, en: en })
    }).then(function(r) {
      if (!r.ok) throw new Error(r.status);
      if (fr || en) overrides[key] = { fr: fr, en: en };
      else delete overrides[key];
      applyTexts();
    }).catch(function() {
      alert('Erreur : le texte n\'a pas été enregistré.');
    });
  });
})();
