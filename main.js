// ===== PAGE LOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".page-loader")?.classList.add("hidden");
  }, 1600);
});

// ===== NAVBAR =====
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 50;
  navbar?.classList.toggle("scrolled", scrolled);
  document
    .getElementById("back-to-top")
    ?.classList.toggle("visible", window.scrollY > 400);
});

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu?.classList.toggle("open");
});

// Close menu on nav link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("open");
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      active?.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ===== SCROLL ANIMATIONS =====
const animEls = document.querySelectorAll(
  ".fade-in-up, .fade-in-left, .fade-in-right, .timeline-item",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

animEls.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    galleryItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "";
        item.style.animation = "fadeInUp 0.4s ease";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption =
      item.querySelector(".gallery-overlay-title")?.textContent || "";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox?.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

document
  .getElementById("lightbox-close")
  ?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox?.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeModal();
  }
});

// ===== COUNTRY MODAL =====
const modalOverlay = document.getElementById("country-modal");
const countries = {
  kazakhstan: {
    name: "Kazakhstan",
    subtitle: "The Great Steppe",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
    data: [
      ["Capital", "Astana (formerly Nur-Sultan)"],
      ["Area", "~2,724,900 km² (9th largest in the world)"],
      ["Population", "~21 million (2026 estimate)"],
      [
        "Ethnicities",
        "Kazakh (~71.3%), Russian (14.6%), Uzbek, Ukrainian, Uyghur, German",
      ],
      ["Religions", "Islam (Sunni ~70%), Russian Orthodox (~17%)"],
      ["Official Languages", "Kazakh (State), Russian (Official, widely used)"],
      ["Currency", "Kazakhstani Tenge (KZT)"],
      [
        "Government",
        "Unitary presidential republic — multi-vector foreign policy",
      ],
      [
        "Economy",
        "Oil, gas, uranium, chromium; largest economy in Central Asia (~$260B GDP)",
      ],
      ["Org. Membership", "UN, SCO, CIS, CSTO, EAEU, OIC, OSCE, WTO"],
    ],
    desc: "Kazakhstan is the largest landlocked country in the world and a colossal nation of vast steppes and growing modern cities. Its culture is deeply rooted in nomadic heritage — horse culture, kumis (fermented mare's milk), oral epic poetry, and the national sport Kokpar. The dombra, a two-stringed instrument, is a national symbol. Major celebrations include Nauryz (March 21–23) and Independence Day (December 16).",
  },
  kyrgyzstan: {
    name: "Kyrgyzstan",
    subtitle: "Land of the Celestial Mountains",
    img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80",
    data: [
      ["Capital", "Bishkek"],
      ["Area", "~199,951 km² (Land: 191,801 km²; Water: 8,150 km²)"],
      ["Population", "~7,379,895 (April 2026)"],
      [
        "Ethnicities",
        "Kyrgyz (~77.5%), Uzbek (14.2%), Russian (4.1%), Dungan, Uyghur, Tajik",
      ],
      [
        "Religions",
        "Islam Sunni-Hanafi (~75%), Russian Orthodox (~20%), Other (5%)",
      ],
      ["Official Languages", "Kyrgyz (State), Russian (Official)"],
      ["Currency", "Kyrgyzstani Som (KGS) — introduced May 1993"],
      [
        "Government",
        "Unitary presidential republic (2021 constitution); unicameral parliament (90 seats)",
      ],
      [
        "Economy",
        "Gold mining (Kumtor), livestock, agriculture; ~33% GDP from remittances",
      ],
      [
        "Org. Membership",
        "UN, SCO (holds 2025–2026 presidency), CSTO, EAEU, WTO",
      ],
    ],
    desc: "Kyrgyzstan is a country of breathtaking alpine landscapes dominated by the Tian Shan mountains. Its culture is profoundly shaped by nomadic heritage. The yurt (a portable circular dwelling) is a national symbol and appears on the flag. The Kyrgyz oral epic Manas — one of the world's longest — is a source of national identity. Traditional sports include Kok-Boru (dead goat polo), Er Enish (horseback wrestling), and Salbuurun (eagle hunting).",
  },
  tajikistan: {
    name: "Tajikistan",
    subtitle: "Roof of the World",
    img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1200&q=80",
    data: [
      ["Capital", "Dushanbe (elevation 785 m)"],
      ["Area", "143,100 km² (max width ~700 km; max length ~350 km)"],
      ["Population", "~10,935,917 (April 2026); median age 22.4 years"],
      [
        "Ethnicities",
        "Tajik (84.3%), Uzbek (12.2%), Kyrgyz (0.8%), Russian (0.5%), Other (2.2%)",
      ],
      [
        "Religions",
        "Sunni Islam Hanafi (~90–95%), Ismaili Shia (~3–7%), Russian Orthodox (small minority)",
      ],
      [
        "Official Language",
        "Tajik (a variety of Persian); Russian widely spoken",
      ],
      [
        "Currency",
        "Tajikistani Somoni (TJS) — introduced October 30, 2000; 1 Somoni = 100 Dirams",
      ],
      [
        "Government",
        "Presidential Islamic Republic; President Emomali Rahmon; PM Qohir Rasulzoda",
      ],
      [
        "Economy",
        "Remittance-driven (>30% GDP); aluminum, cotton, hydropower; Belt & Road investments",
      ],
      [
        "Org. Membership",
        "UN (1992), SCO, CIS, CSTO, ECO, OIC, OSCE, NATO PfP, WTO (2013)",
      ],
    ],
    desc: "Tajikistan is a nation of stunning high mountains — over 90% is mountainous — and a proud Persian (Tajik) cultural identity, setting it apart from its Turkic-speaking neighbors. The ancient Silk Road city of Khujand, the Pamir mountains, and Persian literary heritage define the country. Traditional weddings are major multi-day events. The Kelin Salom ritual (bride greeting ceremony) is an important cultural tradition shared with Uzbek and Kyrgyz cultures.",
  },
  turkmenistan: {
    name: "Turkmenistan",
    subtitle: "Land of the Turkmens",
    img: "https://images.unsplash.com/photo-1605296830714-7fd1f0812ab1?w=1200&q=80",
    data: [
      ["Capital", 'Ashgabat — "City of White Marble", capital since 1924'],
      ["Area", "~491,210 km² (over 80% Karakum Desert)"],
      ["Population", "7.6 million (2025); life expectancy: M 67 / F 73 years"],
      [
        "Ethnicities",
        "Turkmen (~85%), Uzbek (second-largest), Russian (urban minority)",
      ],
      ["Religion", "Sunni Islam Hanafi (~90%), Russian Orthodox (minority)"],
      [
        "Official Language",
        "Turkmen (Latin script since 1993); Russian widely used",
      ],
      [
        "Currency",
        "Turkmenistani Manat (TMT) — introduced 1993; 1 Manat = 100 Tenge",
      ],
      [
        "Government",
        "Unitary presidential republic (highly centralized); President Serdar Berdimuhamedow",
      ],
      [
        "Economy",
        "Natural gas (world's largest reserves), cotton, wheat; heavily state-controlled",
      ],
      [
        "Org. Membership",
        "UN (permanent neutral status since 1995), ECO, OSCE; non-member CIS/SCO to preserve neutrality",
      ],
    ],
    desc: 'Turkmenistan is a land of massive gas wealth and a highly unique, centralized political system with permanent neutrality. Ashgabat is known as the "City of White Marble" due to grandiose state projects. The Akhal-Teke horse, a national treasure, is a powerful symbol. Carpet weaving is the most important cultural heritage — Turkmen carpets are world-famous, with each design representing specific tribes or regions. Nowruz (spring festival) and traditional multi-day weddings are key celebrations.',
  },
  uzbekistan: {
    name: "Uzbekistan",
    subtitle: "The Pearl of the Silk Road",
    img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&q=80",
    data: [
      ["Capital", "Tashkent — largest city in Central Asia (~2.6 million)"],
      ["Area", "448,978 km²"],
      ["Population", "~36.8 million (2025) — largest in Central Asia"],
      [
        "Ethnicities",
        "Uzbek (84.4%), Tajik (4.9%), Kazakh (3.3%), Karakalpak (2.1%), Russian (2.1%), Others",
      ],
      ["Religions", "Sunni Islam (~88–90%), Russian Orthodox (~5–7%), Others"],
      [
        "Official Language",
        "Uzbek (Latin script since 1993); Russian widely used",
      ],
      ["Currency", "Uzbekistani Som (UZS)"],
      [
        "Government",
        'Unitary presidential republic; President Shavkat Mirziyoyev (since 2016); "New Uzbekistan" reforms',
      ],
      [
        "Economy",
        "Cotton, natural gas, gold, uranium, textiles, automotive (GM Uzbekistan); major economic reforms since 2017",
      ],
      [
        "Org. Membership",
        "UN, CIS, SCO, OIC, ECO; WTO applicant; Turkic States Organization (observer)",
      ],
    ],
    desc: "Uzbekistan is the most populous nation in Central Asia and home to the region's most iconic ancient settled cities. The Silk Road cities of Samarkand, Bukhara, and Khiva are UNESCO World Heritage Sites. Traditional crafts include ikat weaving and suzani embroidery. The national dish is plov (pilaf). Maqom classical music is recognized by UNESCO. Navruz (March 21) is the most important festival. The country is undergoing significant economic and social reforms to open to the world.",
  },
};

document.querySelectorAll("[data-country]").forEach((el) => {
  el.addEventListener("click", () => {
    const key = el.dataset.country;
    const country = countries[key];
    if (!country) return;

    document.getElementById("modal-title").textContent = country.name;
    document.getElementById("modal-subtitle").textContent = country.subtitle;
    document.getElementById("modal-hero-img").src = country.img;

    const tbody = document.getElementById("modal-table-body");
    tbody.innerHTML = country.data
      .map(([label, val]) => `<tr><td>${label}</td><td>${val}</td></tr>`)
      .join("");

    document.getElementById("modal-desc").textContent = country.desc;
    modalOverlay?.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

document.getElementById("modal-close")?.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

function closeModal() {
  modalOverlay?.classList.remove("active");
  document.body.style.overflow = "";
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  // Validate fields
  const fields = ["name", "email", "message"];
  fields.forEach((id) => {
    const input = document.getElementById(`field-${id}`);
    const err = document.getElementById(`err-${id}`);
    if (input && !input.value.trim()) {
      if (err) {
        err.textContent = "This field is required.";
        err.style.display = "block";
      }
      valid = false;
    } else {
      if (err) err.style.display = "none";
    }
  });

  // Email format
  const emailInput = document.getElementById("field-email");
  if (
    emailInput?.value &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
  ) {
    const err = document.getElementById("err-email");
    if (err) {
      err.textContent = "Please enter a valid email.";
      err.style.display = "block";
    }
    valid = false;
  }

  if (!valid) return;

  // Save to localStorage
  const submission = {
    id: Date.now(),
    name: document.getElementById("field-name")?.value,
    email: document.getElementById("field-email")?.value,
    subject: document.getElementById("field-subject")?.value,
    message: document.getElementById("field-message")?.value,
    timestamp: new Date().toISOString(),
  };

  const stored = JSON.parse(
    localStorage.getItem("contact_submissions") || "[]",
  );
  stored.push(submission);
  localStorage.setItem("contact_submissions", JSON.stringify(stored));

  // Show success
  const successMsg = document.getElementById("form-success");
  if (successMsg) {
    successMsg.style.display = "block";
  }
  contactForm.reset();

  setTimeout(() => {
    if (successMsg) successMsg.style.display = "none";
  }, 6000);
});

// Clear errors on input
document
  .querySelectorAll("#contact-form input, #contact-form textarea")
  .forEach((el) => {
    el.addEventListener("input", () => {
      const err = document.getElementById(`err-${el.id.replace("field-", "")}`);
      if (err) err.style.display = "none";
    });
  });

// ===== BACK TO TOP =====
document.getElementById("back-to-top")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

console.log(
  "🌍 Central Asia Educational Website — Marinduque State University",
);
