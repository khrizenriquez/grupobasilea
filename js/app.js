(function () {
  const state = {
    config: null,
    language: "es"
  };

  const routes = [
    ["home", "/"],
    ["about", "/about"],
    ["farm", "/farm"],
    ["inn", "/inn"],
    ["consulting", "/consulting"],
    ["contact", "/contact"]
  ];

  const socialLinks = [
    ["Facebook", "https://www.facebook.com/#"],
    ["Instagram", "https://www.instagram.com/#"],
    ["LinkedIn", "https://www.linkedin.com/#"]
  ];

  const socialIcons = {
    Facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    Instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    LinkedIn: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
  };

  const introValueIcons = {
    experience: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    vision: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`,
    sustainability: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 8"/><path d="M12 22V12"/></svg>`,
    responsibility: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
  };

  const pageKey = () => document.body.dataset.page || "home";

  const dictionary = () => state.config.translations[state.language];

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const link = (href, className, text) => {
    const node = el("a", className, text);
    node.href = href;
    if (href.startsWith("http")) {
      node.target = "_blank";
      node.rel = "noopener";
    }
    return node;
  };

  const image = (src, alt, className) => {
    const node = document.createElement("img");
    node.src = src;
    node.alt = alt || "";
    node.loading = "lazy";
    if (className) node.className = className;
    return node;
  };

  const paragraphGroup = (paragraphs) => {
    const fragment = document.createDocumentFragment();
    paragraphs.forEach((text) => fragment.appendChild(el("p", "", text)));
    return fragment;
  };

  const renderHeader = () => {
    const t = dictionary();
    const header = document.querySelector("[data-site-header]");
    const activePage = pageKey();
    header.innerHTML = "";

    const brand = link("/", "brand", "");
    brand.setAttribute("aria-label", t.common.brandAlt);
    const logo = image("assets/images/blob-c3288c8.png", t.common.brandAlt, "brand__logo");
    brand.appendChild(logo);

    const toggle = el("button", "nav-toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "site-nav");
    toggle.setAttribute("aria-label", t.nav.more);
    toggle.innerHTML = "<span></span><span></span><span></span>";

    const nav = el("nav", "site-nav");
    nav.id = "site-nav";

    routes.forEach(([key, href]) => {
      const navLink = link(href, "", t.nav[key]);
      if (key === activePage) navLink.setAttribute("aria-current", "page");
      nav.appendChild(navLink);
    });

    const languageSwitcher = el("div", "language-switcher");
    languageSwitcher.setAttribute("aria-label", "Language selector");

    state.config.languages.forEach((language) => {
      const button = el("button", "", language.shortLabel);
      button.type = "button";
      button.dataset.languageOption = language.code;
      button.setAttribute("aria-label", language.label);
      button.setAttribute("aria-pressed", String(language.code === state.language));
      languageSwitcher.appendChild(button);
    });

    nav.appendChild(languageSwitcher);
    header.append(brand, toggle, nav);

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.dataset.open = String(!isOpen);
    });

    languageSwitcher.addEventListener("click", (event) => {
      const button = event.target.closest("[data-language-option]");
      if (!button) return;
      const nextLanguage = button.dataset.languageOption;
      if (state.config.translations[nextLanguage]) {
        state.language = nextLanguage;
        render();
      }
    });
  };

  const renderHero = (page) => {
    const hero = el("section", `hero hero--${page.hero.variant || "image"}`);

    if (page.hero.variant === "video") {
      if (page.hero.poster) {
        hero.style.setProperty("--hero-image", `url("${page.hero.poster}")`);
      }
      const video = document.createElement("video");
      video.className = "hero__media";
      video.src = page.hero.media;
      if (page.hero.poster) video.poster = page.hero.poster;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      hero.appendChild(video);
    } else {
      hero.style.setProperty("--hero-image", `url("${page.hero.media}")`);
    }

    hero.appendChild(el("div", "hero__overlay"));

    const content = el("div", "hero__content");
    if (page.hero.eyebrow) content.appendChild(el("p", "eyebrow", page.hero.eyebrow));
    content.appendChild(el("h1", "", page.hero.title));
    if (page.hero.subtitle) content.appendChild(el("p", "hero__subtitle", page.hero.subtitle));
    if (page.hero.button && page.hero.href) content.appendChild(link(page.hero.href, "button button--outline", page.hero.button));
    hero.appendChild(content);

    return hero;
  };

  const sectionShell = (modifier) => {
    const section = el("section", `section${modifier ? ` ${modifier}` : ""}`);
    const inner = el("div", "section__inner");
    section.appendChild(inner);
    return [section, inner];
  };

  const renderCards = (sectionData) => {
    const [section, inner] = sectionShell("section--cards");
    const grid = el("div", "card-grid");

    sectionData.items.forEach((item) => {
      const card = link(item.href, "service-card", "");
      card.appendChild(image(item.image, item.title, "service-card__image"));
      const body = el("div", "service-card__body");
      body.appendChild(el("h2", "", item.title));
      body.appendChild(el("p", "", item.text));
      body.appendChild(el("span", "service-card__label", item.label));
      card.appendChild(body);
      grid.appendChild(card);
    });

    inner.appendChild(grid);
    return section;
  };

  const renderCenter = (sectionData) => {
    const [section, inner] = sectionShell("section--center");
    if (sectionData.title) inner.appendChild(el("h2", "", sectionData.title));
    if (sectionData.text) inner.appendChild(el("p", "lead", sectionData.text));
    return section;
  };

  const renderTextImage = (sectionData) => {
    const [section, inner] = sectionShell("section--text-image");
    inner.classList.add("section__inner--split");
    const copy = el("div", "rich-text");
    copy.appendChild(el("h2", "", sectionData.title));
    copy.appendChild(paragraphGroup(sectionData.paragraphs));
    const media = el("div", "image-panel");
    media.appendChild(image(sectionData.image, sectionData.title, ""));
    inner.append(copy, media);
    return section;
  };

  const renderColumns = (sectionData) => {
    const [section, inner] = sectionShell("section--columns");
    const grid = el("div", "column-grid");
    sectionData.items.forEach((item) => {
      const column = el("article", "info-column");
      column.appendChild(el("h2", "", item.title));
      column.appendChild(el("p", "", item.text));
      grid.appendChild(column);
    });
    inner.appendChild(grid);
    return section;
  };

  const renderValues = (sectionData) => {
    const [section, inner] = sectionShell("section--values");
    inner.appendChild(el("h2", "", sectionData.title));
    const list = el("div", "value-list");
    sectionData.items.forEach((item) => list.appendChild(el("span", "value-pill", item)));
    inner.appendChild(list);
    return section;
  };

  const renderBanner = (sectionData) => {
    const section = el("section", "banner-section");
    section.style.setProperty("--banner-image", `url("${sectionData.image}")`);
    section.appendChild(el("div", "hero__overlay"));
    const content = el("div", "banner-section__content");
    content.appendChild(el("h2", "", sectionData.title));
    section.appendChild(content);
    return section;
  };

  const renderFeatureGrid = (sectionData) => {
    const [section, inner] = sectionShell("section--features");
    const grid = el("div", "feature-grid");

    sectionData.items.forEach((item) => {
      const article = el("article", "feature-card");
      article.appendChild(image(item.image, item.title, "feature-card__image"));
      article.appendChild(el("h2", "", item.title));
      article.appendChild(el("p", "", item.text));
      if (item.button && item.href) article.appendChild(link(item.href, "button", item.button));
      grid.appendChild(article);
    });

    inner.appendChild(grid);
    return section;
  };

  const renderProfiles = (sectionData) => {
    const [section, inner] = sectionShell("section--profiles");
    const grid = el("div", "profile-grid");

    sectionData.items.forEach((item) => {
      const article = el("article", "profile-card");
      article.appendChild(image(item.image, item.name, "profile-card__image"));
      article.appendChild(el("h2", "", item.name));
      article.appendChild(el("p", "", item.text));
      if (item.link) article.appendChild(link(item.link, "text-link", item.linkText));
      grid.appendChild(article);
    });

    inner.appendChild(grid);
    return section;
  };

  const renderIntro = (sectionData) => {
    const [section, inner] = sectionShell("section--intro");
    inner.appendChild(el("h2", "", sectionData.title));
    const valuesRow = el("div", "intro-values");
    sectionData.values.forEach((v) => {
      const item = el("div", "intro-value");
      item.innerHTML = (introValueIcons[v.key] || "") + `<span>${v.label}</span>`;
      valuesRow.appendChild(item);
    });
    inner.appendChild(valuesRow);
    inner.appendChild(link(sectionData.href, "button", sectionData.button));
    return section;
  };

  const renderFeaturesAlt = (sectionData) => {
    const wrapper = document.createElement("section");
    wrapper.className = "features-alt-section";
    sectionData.items.forEach((item, i) => {
      const row = el("div", `feature-row${i % 2 !== 0 ? " feature-row--reverse" : ""}`);
      row.appendChild(image(item.image, item.title, "feature-row__image"));
      const body = el("div", "feature-row__body");
      body.appendChild(el("h2", "", item.title));
      body.appendChild(el("p", "", item.text));
      body.appendChild(link(item.href, "feature-row__btn", item.label));
      row.appendChild(body);
      wrapper.appendChild(row);
    });
    return wrapper;
  };

  const renderImageBanner = (sectionData) => {
    const section = document.createElement("section");
    section.className = "image-banner";
    section.appendChild(image(sectionData.image, "", "image-banner__img"));
    return section;
  };

  const renderCta = () => {
    const t = dictionary();
    const [section, inner] = sectionShell("section--cta");
    inner.appendChild(el("h2", "", t.common.contactCtaTitle));
    inner.appendChild(el("p", "lead", t.common.contactCtaText));
    inner.appendChild(link("/contact", "button", t.common.contactCtaButton));
    return section;
  };

  const renderSocial = () => {
    const t = dictionary();
    const [section, inner] = sectionShell("section--social");
    inner.appendChild(el("h2", "", t.common.socialTitle));
    const list = el("div", "social-list");
    socialLinks.forEach(([label, href]) => {
      const a = link(href, "social-link", "");
      a.setAttribute("aria-label", label);
      a.innerHTML = socialIcons[label] || label;
      list.appendChild(a);
    });
    inner.appendChild(list);
    return section;
  };

  const renderContact = (sectionData) => {
    const t = dictionary();
    const [section, inner] = sectionShell("section--contact");
    inner.classList.add("section__inner--split");

    const formWrap = el("div", "contact-card");
    formWrap.appendChild(el("h2", "", sectionData.formTitle));
    const form = el("form", "contact-form");
    form.name = "contact";
    form.method = "POST";
    form.action = "/success";
    form.setAttribute("data-netlify", "true");
    form.setAttribute("data-netlify-honeypot", "bot-field");
    form.innerHTML = `
      <input type="hidden" name="form-name" value="contact">
      <p class="visually-hidden">
        <label>Do not fill this out if you are human: <input name="bot-field"></label>
      </p>
      <label>
        <span>${t.form.name}</span>
        <input type="text" name="name" autocomplete="name" required>
      </label>
      <label>
        <span>${t.form.email}</span>
        <input type="email" name="email" autocomplete="email" required>
      </label>
      <label>
        <span>${t.form.message}</span>
        <textarea name="message" rows="6" required></textarea>
      </label>
      <button type="submit">${t.form.submit}</button>
    `;
    formWrap.appendChild(form);

    const info = el("aside", "contact-info");
    info.appendChild(el("h2", "", sectionData.infoTitle));
    info.appendChild(el("h3", "", sectionData.emailLabel));
    info.appendChild(link(`mailto:${sectionData.email}`, "text-link", sectionData.email));
    info.appendChild(el("h3", "", sectionData.phoneLabel));
    sectionData.phoneLines.forEach((line) => info.appendChild(el("p", "", line)));
    info.appendChild(el("p", "", sectionData.address));
    info.appendChild(el("h3", "", sectionData.hoursTitle));
    info.appendChild(el("p", "", sectionData.hoursStatus));
    info.appendChild(el("p", "", sectionData.hours));
    info.appendChild(el("p", "text-link", sectionData.directions));

    inner.append(formWrap, info);
    return section;
  };

  const renderSection = (sectionData) => {
    const renderers = {
      intro: renderIntro,
      featuresAlt: renderFeaturesAlt,
      imageBanner: renderImageBanner,
      cards: renderCards,
      center: renderCenter,
      textImage: renderTextImage,
      columns: renderColumns,
      values: renderValues,
      banner: renderBanner,
      featureGrid: renderFeatureGrid,
      profiles: renderProfiles,
      cta: renderCta,
      social: renderSocial,
      contact: renderContact
    };
    return renderers[sectionData.type](sectionData);
  };

  const renderPage = () => {
    const t = dictionary();
    const page = t.pages[pageKey()];
    const root = document.querySelector("[data-page-root]");
    root.innerHTML = "";
    root.appendChild(renderHero(page));
    page.sections.forEach((sectionData) => root.appendChild(renderSection(sectionData)));

    document.title = `${page.title} | ${t.meta.siteName}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", page.description);
  };

  const renderFooter = () => {
    const t = dictionary();
    const footer = document.querySelector("[data-site-footer]");
    footer.innerHTML = "";

    const center = el("div", "footer-center");
    center.appendChild(el("p", "footer-business", t.footer.business));
    center.appendChild(el("p", "", t.footer.location));

    const phones = el("p", "footer-phones");
    phones.append(`${t.footer.international} `);
    phones.appendChild(link("tel:12026401830", "", "1 (202) 640-1830"));
    phones.append("   ");
    phones.append(`${t.footer.guatemala} `);
    phones.appendChild(link("tel:+50254114460", "", "+502 5411-4460"));
    center.appendChild(phones);
    footer.appendChild(center);

    const bar = el("div", "footer-bar");
    const emailP = el("p", "");
    emailP.appendChild(link("mailto:info@grupobasilea.com", "footer-email", "info@grupobasilea.com"));
    bar.appendChild(emailP);
    bar.appendChild(el("p", "", t.footer.copyright));
    footer.appendChild(bar);
  };

  const render = () => {
    document.documentElement.lang = state.language;
    renderHeader();
    renderPage();
    renderFooter();
  };

  const init = async () => {
    const response = await fetch("data/i18n.json");
    state.config = await response.json();
    state.language = state.config.defaultLanguage;
    render();
  };

  init().catch((error) => {
    document.body.dataset.error = "content-load";
    console.error(error);
  });
})();
