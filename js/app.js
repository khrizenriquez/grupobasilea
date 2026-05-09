(function () {
  const state = {
    config: null,
    language: "es"
  };

  const routes = [
    ["home", "/"],
    ["about", "/about.html"],
    ["farm", "/farm.html"],
    ["inn", "/inn.html"],
    ["consulting", "/consulting.html"],
    ["contact", "/contact.html"]
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
    header.classList.toggle("site-header--inn", activePage === "inn");

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

    if (activePage === "inn") {
      nav.classList.add("site-nav--inn");
      nav.appendChild(link("/", "", t.nav.home));
    } else {
      routes.forEach(([key, href]) => {
        const navLink = link(href, "", t.nav[key]);
        if (key === activePage) navLink.setAttribute("aria-current", "page");
        nav.appendChild(navLink);
      });
    }

    const languageSwitcher = el("div", "language-switcher");
    languageSwitcher.setAttribute("aria-label", "Language selector");
    if (activePage === "inn") languageSwitcher.classList.add("language-switcher--inn");

    state.config.languages.forEach((language) => {
      const label = activePage === "inn" ? language.label : language.shortLabel;
      const button = el("button", "", label);
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
        localStorage.setItem("gib_lang", nextLanguage);
        render();
      }
    });
  };

  const renderHero = (page) => {
    if (page.hero.variant === "inn") return renderInnHero(page.hero);

    const hero = el("section", `hero hero--${page.hero.variant || "image"}`);

    if (page.hero.variant === "video") {
      if (page.hero.poster) {
        hero.style.backgroundImage = `url("${page.hero.poster}")`;
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
      hero.style.backgroundImage = `url("${page.hero.media}")`;
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

  const renderInnHero = (heroData) => {
    const hero = el("section", "hero hero--inn");
    hero.style.backgroundImage = `url("${heroData.media}")`;
    hero.appendChild(el("div", "hero__overlay"));

    const content = el("div", "hero__content hero__content--inn");
    content.appendChild(el("h1", "", heroData.title));
    hero.appendChild(content);
    hero.appendChild(el("div", "inn-hero__wave"));

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
    const modifier = sectionData.dark ? "section--center section--center--dark" : "section--center";
    const [section, inner] = sectionShell(modifier);
    if (sectionData.title) inner.appendChild(el("h2", "", sectionData.title));
    if (sectionData.text) inner.appendChild(el("p", "lead", sectionData.text));
    return section;
  };

  const renderServicesList = (sectionData) => {
    const frame = el("section", "consultoria-frame");
    frame.setAttribute("aria-label", sectionData.title || "Servicios de consultoría");
    const shell = el("div", "consultoria-shell");
    const copy = el("div", "consultoria-copy");
    const list = el("ul", "consultoria-list");
    sectionData.items.forEach((item) => {
      const li = el("li", "consultoria-item");
      li.appendChild(el("h4", "", item.title));
      li.appendChild(el("p", "", item.text));
      list.appendChild(li);
    });
    copy.appendChild(list);
    shell.appendChild(copy);
    if (sectionData.image) {
      const fig = document.createElement("figure");
      fig.className = "consultoria-media";
      fig.appendChild(image(sectionData.image, "", ""));
      shell.appendChild(fig);
    }
    frame.appendChild(shell);
    return frame;
  };

  const renderTextImage = (sectionData) => {
    const [section, inner] = sectionShell("section--text-image");
    if (sectionData.title) inner.appendChild(el("h2", "", sectionData.title));
    const split = el("div", "text-image__split");
    const copy = el("div", "rich-text");
    copy.appendChild(paragraphGroup(sectionData.paragraphs));
    const media = el("div", "image-panel");
    media.appendChild(image(sectionData.image, sectionData.title, ""));
    split.append(copy, media);
    inner.appendChild(split);
    return section;
  };

  const renderColumnsImage = (sectionData) => {
    if (sectionData.image) {
      const section = el("section", "section section--columns-image section--columns-image--image");
      const layout = el("div", "columns-image__layout");
      const content = el("div", "columns-image__content");
      content.appendChild(el("h2", "", sectionData.title));
      sectionData.items.forEach((item) => {
        const itemEl = el("div", "columns-image__item");
        itemEl.appendChild(el("h4", "", item.title));
        itemEl.appendChild(el("p", "", item.text));
        content.appendChild(itemEl);
      });
      const media = el("div", "columns-image__media");
      media.appendChild(image(sectionData.image, sectionData.title, "columns-image__img"));
      layout.append(content, media);
      section.appendChild(layout);
      return section;
    } else {
      const [section, inner] = sectionShell("section--columns-image");
      inner.appendChild(el("h2", "", sectionData.title));
      const grid = el("div", "columns-image__grid");
      sectionData.items.forEach((item) => {
        const itemEl = el("div", "columns-image__item");
        itemEl.appendChild(el("h4", "", item.title));
        itemEl.appendChild(el("p", "", item.text));
        grid.appendChild(itemEl);
      });
      inner.appendChild(grid);
      return section;
    }
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
    sectionData.items.forEach((item) => {
      const pill = el("div", "value-pill");
      if (item.image) {
        pill.appendChild(image(item.image, item.label, "value-pill__icon"));
      }
      pill.appendChild(el("span", "value-pill__label", item.label || item));
      list.appendChild(pill);
    });
    inner.appendChild(list);
    return section;
  };

  const renderBanner = (sectionData) => {
    const [section, inner] = sectionShell("section--banner");
    if (sectionData.title) inner.appendChild(el("h2", "", sectionData.title));
    if (sectionData.image) inner.appendChild(image(sectionData.image, sectionData.title || "", "banner__image"));
    return section;
  };

  const renderImageText = (sectionData) => {
    const [section, inner] = sectionShell("section--image-text");
    inner.appendChild(image(sectionData.image, "", "image-text__img"));
    const body = el("div", "image-text__body");
    sectionData.paragraphs.forEach((p) => body.appendChild(el("p", "", p)));
    inner.appendChild(body);
    return section;
  };

  const renderFeatureSections = (sectionData) => {
    const fragment = document.createDocumentFragment();
    sectionData.items.forEach((item) => {
      const modifier = item.variant === "dark"
        ? "section--feature-item section--feature-item--dark"
        : "section--feature-item";
      const [section, inner] = sectionShell(modifier);
      inner.appendChild(el("h2", "feature-item__title", item.title));
      inner.appendChild(el("div", "feature-item__divider"));
      inner.appendChild(image(item.image, item.title, "feature-item__image"));
      if (Array.isArray(item.paragraphs)) {
        item.paragraphs.forEach((p) => inner.appendChild(el("p", "feature-item__text", p)));
      } else if (item.text) {
        inner.appendChild(el("p", "feature-item__text", item.text));
      }
      fragment.appendChild(section);
    });
    return fragment;
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

  // Module-level reference to dismiss stale keydown handler on language switch
  let _teamModalKeydownRef = null;

  const renderProfiles = (sectionData) => {
    // Remove previous modal if page re-renders (language switch)
    const existingModal = document.getElementById("team-modal");
    if (existingModal) existingModal.remove();
    if (_teamModalKeydownRef) {
      document.removeEventListener("keydown", _teamModalKeydownRef);
      _teamModalKeydownRef = null;
    }

    // Build profile data map keyed by index string
    const profileMap = {};

    const section = document.createElement("section");
    section.className = "team-section";
    const shell = el("div", "team-shell");
    const grid = el("div", "team-grid");

    sectionData.items.forEach((item, idx) => {
      const profileId = "tp" + idx;
      profileMap[profileId] = item;

      const card = document.createElement("article");
      card.className = "team-card";

      const btn = document.createElement("button");
      btn.className = "team-photo-button";
      btn.type = "button";
      btn.setAttribute("aria-label", "Abrir perfil de " + item.name);
      btn.dataset.openProfile = profileId;

      const img = document.createElement("img");
      img.className = "team-photo";
      img.src = item.image;
      img.alt = item.name;
      img.loading = "lazy";
      btn.appendChild(img);

      const nameEl = el("h2", "team-name", item.name);
      const summaryEl = el("p", "team-summary", item.text);

      const lnk = document.createElement("a");
      lnk.className = "team-link";
      lnk.href = item.link;
      lnk.target = "_blank";
      lnk.rel = "noopener";
      lnk.textContent = item.linkText;

      card.appendChild(btn);
      card.appendChild(nameEl);
      card.appendChild(summaryEl);
      card.appendChild(lnk);
      grid.appendChild(card);
    });

    shell.appendChild(grid);
    section.appendChild(shell);

    // Build modal and inject into body
    const modal = document.createElement("div");
    modal.className = "team-modal";
    modal.id = "team-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<button class="team-modal__backdrop" type="button" aria-label="Cerrar modal"></button>' +
      '<div class="team-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="team-modal-title">' +
        '<div class="team-modal__media">' +
          '<img class="team-modal__photo" id="team-modal-photo" src="" alt="" />' +
          '<a class="team-modal__aside-link" id="team-modal-link-side" href="#" target="_blank" rel="noopener">Ver perfil en LinkedIn</a>' +
        '</div>' +
        '<div class="team-modal__content">' +
          '<div class="team-modal__topbar">' +
            '<div><h3 class="team-modal__title" id="team-modal-title"></h3>' +
            '<p class="team-modal__subtitle" id="team-modal-subtitle"></p></div>' +
            '<button class="team-modal__close" type="button" aria-label="Cerrar modal">\u00d7</button>' +
          '</div>' +
          '<div class="team-modal__body" id="team-modal-body"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    const modalPhoto = modal.querySelector("#team-modal-photo");
    const modalTitle = modal.querySelector("#team-modal-title");
    const modalBody = modal.querySelector("#team-modal-body");
    const sideLink = modal.querySelector("#team-modal-link-side");
    const closeButton = modal.querySelector(".team-modal__close");
    const backdrop = modal.querySelector(".team-modal__backdrop");
    let lastTrigger = null;

    function openProfile(profileId, trigger) {
      const profile = profileMap[profileId];
      if (!profile) return;
      lastTrigger = trigger || null;
      modalTitle.textContent = profile.name;
      modalBody.innerHTML = "";
      const rawText = profile.fullText || profile.text || "";
      rawText
        .split(/\n\s*\n/)
        .map((c) => c.trim())
        .filter(Boolean)
        .forEach((t) => {
          const p = document.createElement("p");
          p.textContent = t;
          p.style.marginBottom = "1.15em";
          modalBody.appendChild(p);
        });
      modalPhoto.src = profile.image;
      modalPhoto.alt = profile.name;
      sideLink.href = profile.link;
      modal.hidden = false;
      document.body.classList.add("team-modal-open");
      closeButton.focus();
    }

    function closeProfile() {
      modal.hidden = true;
      document.body.classList.remove("team-modal-open");
      if (lastTrigger) lastTrigger.focus();
    }

    grid.querySelectorAll("[data-open-profile]").forEach((b) => {
      b.addEventListener("click", () => openProfile(b.dataset.openProfile, b));
    });
    closeButton.addEventListener("click", closeProfile);
    backdrop.addEventListener("click", closeProfile);

    _teamModalKeydownRef = (e) => {
      if (e.key === "Escape" && !modal.hidden) closeProfile();
    };
    document.addEventListener("keydown", _teamModalKeydownRef);

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

  const renderInnIntro = (sectionData) => {
    const section = el("section", "section section--inn-intro");
    const inner = el("div", "inn-intro__inner");
    inner.appendChild(image(sectionData.image, "", "inn-intro__image"));

    const copy = el("div", "inn-intro__copy");
    copy.appendChild(paragraphGroup(sectionData.paragraphs));
    inner.appendChild(copy);
    section.appendChild(inner);

    return section;
  };

  const renderInnRest = (sectionData) => {
    const section = el("section", "section section--inn-rest");
    const inner = el("div", "inn-copy-block");
    inner.appendChild(el("h2", "", sectionData.title));
    sectionData.paragraphs.forEach((text) => inner.appendChild(el("p", "", text)));
    section.appendChild(inner);

    return section;
  };

  const renderInnCircles = (sectionData) => {
    const section = el("section", "section section--inn-circles");
    const list = el("div", "inn-circle-list");
    sectionData.items.forEach((item) => {
      list.appendChild(image(item.image, item.alt || "", "inn-circle-list__image"));
    });
    section.appendChild(list);

    return section;
  };

  const renderInnDark = (sectionData) => {
    const section = el("section", "section section--inn-dark");
    const inner = el("div", "inn-copy-block inn-copy-block--dark");
    inner.appendChild(el("h2", "", sectionData.title));
    inner.appendChild(el("p", "", sectionData.text));
    section.appendChild(inner);

    return section;
  };

  const renderInnAirbnb = (sectionData) => {
    const section = el("section", "section section--inn-airbnb");
    section.style.backgroundImage = `url("${sectionData.image}")`;

    const inner = el("div", "inn-airbnb__inner");
    inner.appendChild(el("h2", "", sectionData.title));
    inner.appendChild(link(sectionData.href, "inn-airbnb__button", sectionData.button));
    section.appendChild(inner);

    return section;
  };

  const renderInnGallery = (sectionData) => {
    const section = el("section", "section section--inn-gallery");
    const viewport = el("div", "inn-gallery__viewport");
    const track = el("div", "inn-gallery__track");
    sectionData.images.forEach((src, index) => {
      const slide = el("div", `inn-gallery__slide${index === 1 ? " inn-gallery__slide--active" : ""}`);
      slide.appendChild(image(src, "", "inn-gallery__image"));
      track.appendChild(slide);
    });
    viewport.appendChild(track);
    section.appendChild(viewport);
    section.appendChild(el("button", "inn-gallery__next", "›"));

    return section;
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

    // --- Form card ---
    const formWrap = el("div", "contact-card");
    formWrap.appendChild(el("h2", "contact-card__title", sectionData.formTitle));
    const form = el("form", "contact-form");
    form.name = "contact";
    form.setAttribute("data-netlify-honeypot", "bot-field");
    form.addEventListener("submit", (e) => e.preventDefault());

    const namePh = sectionData.namePlaceholder || t.form.name;
    const emailPh = sectionData.emailPlaceholder || t.form.email + "*";
    const msgPh = sectionData.messagePlaceholder || t.form.message;
    const submitLabel = t.form.submit;

    form.innerHTML = `
      <input type="hidden" name="form-name" value="contact">
      <p class="visually-hidden">
        <label>Do not fill this out if you are human: <input name="bot-field"></label>
      </p>
      <div class="cf-field">
        <input class="cf-input" type="text" name="name" placeholder="${namePh}" autocomplete="name">
      </div>
      <div class="cf-field">
        <input class="cf-input" type="email" name="email" placeholder="${emailPh}" autocomplete="email" required>
      </div>
      <div class="cf-field">
        <textarea class="cf-input cf-textarea" name="message" placeholder="${msgPh}" rows="7" required></textarea>
      </div>
      <button class="cf-submit" type="submit">${submitLabel.toUpperCase()}</button>
    `;
    formWrap.appendChild(form);

    // --- Info card ---
    const info = el("aside", "contact-info");
    info.appendChild(el("h2", "contact-info__title", sectionData.infoTitle));

    const emailGroup = el("div", "contact-info__group");
    emailGroup.appendChild(el("strong", "contact-info__label", sectionData.emailLabel));
    emailGroup.appendChild(link(`mailto:${sectionData.email}`, "contact-info__link", sectionData.email));
    info.appendChild(emailGroup);

    const phoneGroup = el("div", "contact-info__group");
    phoneGroup.appendChild(el("strong", "contact-info__label", sectionData.phoneLabel));
    (sectionData.phones || []).forEach((ph) => {
      const row = el("p", "contact-info__phone-row");
      const lbl = el("span", "contact-info__phone-label", ph.label + " ");
      const lnk = document.createElement("a");
      lnk.className = "contact-info__link";
      lnk.href = ph.url;
      lnk.textContent = ph.number;
      row.appendChild(lbl);
      row.appendChild(lnk);
      phoneGroup.appendChild(row);
    });
    info.appendChild(phoneGroup);

    info.appendChild(el("p", "contact-info__address", sectionData.address));

    const hoursGroup = el("div", "contact-info__group");
    hoursGroup.appendChild(el("h3", "contact-info__hours-title", sectionData.hoursTitle));
    const hoursRow = el("p", "contact-info__hours-row");
    hoursRow.appendChild(el("span", "contact-info__hours-status", sectionData.hoursStatus + " "));
    hoursRow.appendChild(el("span", "", sectionData.hours));
    hoursGroup.appendChild(hoursRow);
    info.appendChild(hoursGroup);

    if (sectionData.directionsUrl) {
      const dirLink = document.createElement("a");
      dirLink.className = "contact-info__directions";
      dirLink.href = sectionData.directionsUrl;
      dirLink.target = "_blank";
      dirLink.rel = "noopener";
      dirLink.textContent = sectionData.directions;
      info.appendChild(dirLink);
    }

    inner.append(formWrap, info);
    return section;
  };

  const renderMap = (sectionData) => {
    const wrapper = document.createElement("div");
    wrapper.className = "contact-map";
    wrapper.id = "contact-map";
    wrapper.setAttribute("aria-label", sectionData.label || "Mapa");

    // Inject Leaflet CSS once
    if (!document.getElementById("leaflet-css")) {
      const lnk = document.createElement("link");
      lnk.id = "leaflet-css";
      lnk.rel = "stylesheet";
      lnk.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(lnk);
    }

    // Load Leaflet JS and init map after load
    const initMap = () => {
      if (!window.L) return;
      const lat = sectionData.lat || 14.6349;
      const lng = sectionData.lng || -90.5069;
      const zoom = sectionData.zoom || 14;
      const map = window.L.map("contact-map", { scrollWheelZoom: false }).setView([lat, lng], zoom);
      window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      window.L.marker([lat, lng]).addTo(map).bindPopup(sectionData.label || "Grupo Integral Basilea");
    };

    if (window.L) {
      // Already loaded (language switch)
      requestAnimationFrame(initMap);
    } else if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      // Script tag exists but not yet loaded — wait
      document.getElementById("leaflet-js").addEventListener("load", initMap);
    }

    return wrapper;
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
      columnsImage: renderColumnsImage,
      values: renderValues,
      banner: renderBanner,
      imageText: renderImageText,
      featureSections: renderFeatureSections,
      featureGrid: renderFeatureGrid,
      servicesList: renderServicesList,
      profiles: renderProfiles,
      innIntro: renderInnIntro,
      innRest: renderInnRest,
      innCircles: renderInnCircles,
      innDark: renderInnDark,
      innAirbnb: renderInnAirbnb,
      innGallery: renderInnGallery,
      cta: renderCta,
      social: renderSocial,
      contact: renderContact,
      map: renderMap
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
    const response = await fetch("data/i18n.json?v=" + Date.now());
    state.config = await response.json();
    const saved = localStorage.getItem("gib_lang");
    state.language = (saved && state.config.translations[saved]) ? saved : state.config.defaultLanguage;
    render();
  };

  init().catch((error) => {
    document.body.dataset.error = "content-load";
    console.error(error);
  });
})();
