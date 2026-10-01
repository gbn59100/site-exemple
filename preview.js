// Prévisualisation en direct pour la collection "contenu"
const h = CMS.h;

CMS.registerPreviewStyle("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500&display=swap");
CMS.registerPreviewStyle("/css/style.css");

const SitePreview = ({ entry, getAsset }) => {
  const name = entry.getIn(["data", "name"]) || "";
  const tagline = entry.getIn(["data", "tagline"]) || "";
  const heroImage = entry.getIn(["data", "hero_image"]);
  const aboutTitle = entry.getIn(["data", "about_title"]) || "";
  const aboutText = entry.getIn(["data", "about_text"]) || "";
  const aboutImage = entry.getIn(["data", "about_image"]);

  const heroSrc = heroImage ? getAsset(heroImage).toString() : "";
  const aboutSrc = aboutImage ? getAsset(aboutImage).toString() : "";

  return h("div", {},
    h("header", { className: "nav", style: { position: "static" } },
      h("span", { className: "logo" }, name)
    ),
    h("section", {
      className: "hero",
      style: { minHeight: "60vh", "--hero": heroSrc ? `url("${heroSrc}")` : "none" }
    },
      h("div", { className: "hero-content" },
        h("h1", {}, name),
        h("p", {}, tagline)
      )
    ),
    h("section", { className: "section about" },
      aboutSrc ? h("img", { src: aboutSrc, alt: "" }) : null,
      h("div", {},
        h("h2", {}, aboutTitle),
        h("p", {}, aboutText)
      )
    )
  );
};

CMS.registerPreviewTemplate("contenu", SitePreview);
