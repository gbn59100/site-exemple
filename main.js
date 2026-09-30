// Charge le contenu depuis content/site.json (modifiable via /admin)
const $ = (id) => document.getElementById(id);

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

fetch("content/site.json")
  .then((r) => r.json())
  .then((d) => {
    document.title = d.name + " – Restaurant";
    $("logo").textContent = d.name;
    $("hero-title").textContent = d.name;
    $("tagline").textContent = d.tagline;
    if (d.hero_image) $("top").style.setProperty("--hero", `url("${d.hero_image}")`);

    $("about-title").textContent = d.about_title;
    $("about-text").textContent = d.about_text;
    $("about-image").src = d.about_image;

    const menu = $("menu-list");
    (d.menu || []).forEach((cat) => {
      const box = el("div", "menu-cat");
      box.appendChild(el("h3", "", cat.category));
      (cat.items || []).forEach((it) => {
        const row = el("div", "menu-item");
        const left = el("div");
        left.appendChild(el("strong", "", it.name));
        left.appendChild(el("span", "", it.description || ""));
        row.appendChild(left);
        row.appendChild(el("div", "price", it.price));
        box.appendChild(row);
      });
      menu.appendChild(box);
    });

    const gal = $("gallery-list");
    (d.gallery || []).forEach((src) => {
      const img = el("img");
      img.src = src;
      img.alt = "Photo du restaurant";
      img.loading = "lazy";
      gal.appendChild(img);
    });

    const hours = $("hours-list");
    (d.hours || []).forEach((h) => {
      const li = el("li");
      li.appendChild(el("span", "", h.day));
      li.appendChild(el("span", "", h.time));
      hours.appendChild(li);
    });

    $("address").textContent = d.address;
    $("phone").textContent = d.phone;
    $("phone").href = "tel:" + d.phone.replace(/\s/g, "");
    $("email").textContent = d.email;
    $("email").href = "mailto:" + d.email;
    $("footer").textContent = `© ${new Date().getFullYear()} ${d.name} – Tous droits réservés`;
  })
  .catch(() => {
    document.body.insertAdjacentHTML("afterbegin",
      "<p style='padding:5rem 1rem;text-align:center'>Impossible de charger le contenu. Ouvre le site via un serveur (Netlify, Live Server…), pas en double-clic.</p>");
  });
