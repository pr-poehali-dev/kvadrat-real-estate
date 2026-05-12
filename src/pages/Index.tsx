import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/projects/cfe57687-6d6f-462b-965a-8b5e88af9429/bucket/20d35dd4-1e7d-49f5-b32f-c12477872400.png";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/cfe57687-6d6f-462b-965a-8b5e88af9429/files/34ef97d2-003c-4dbb-a904-ed70b22a4e08.jpg";
const VILLA_IMAGE = "https://cdn.poehali.dev/projects/cfe57687-6d6f-462b-965a-8b5e88af9429/files/ce267202-09f2-478f-b90a-5813d32c1c4f.jpg";

const properties = [
  { id: 1,  title: "Пентхаус «Северная Звезда»",  location: "Пресненская набережная",       price: "185 000 000 ₽", type: "Пентхаус",    area: "320 м²",  rooms: 5,  floor: "42 эт.", image: HERO_IMAGE,  tag: "Эксклюзив", lat: 55.7494, lng: 37.5398 },
  { id: 2,  title: "Вилла «Серебряный Бор»",       location: "Рублёво-Успенское ш.",         price: "420 000 000 ₽", type: "Вилла",        area: "780 м²",  rooms: 8,  floor: "2 эт.",  image: VILLA_IMAGE, tag: "Новинка",   lat: 55.7800, lng: 37.3200 },
  { id: 3,  title: "Апартаменты «Патриарши»",      location: "Патриаршие пруды",             price: "95 000 000 ₽",  type: "Апартаменты", area: "180 м²",  rooms: 3,  floor: "7 эт.",  image: HERO_IMAGE,  tag: null,        lat: 55.7640, lng: 37.5935 },
  { id: 4,  title: "Таунхаус «Дубровка»",          location: "Рублёвское ш., Москва",        price: "260 000 000 ₽", type: "Таунхаус",    area: "450 м²",  rooms: 6,  floor: "3 эт.",  image: VILLA_IMAGE, tag: null,        lat: 55.7450, lng: 37.3800 },
  { id: 5,  title: "Пентхаус «Алые Паруса»",       location: "Хорошёвское ш., Москва",       price: "145 000 000 ₽", type: "Пентхаус",    area: "240 м²",  rooms: 4,  floor: "34 эт.", image: HERO_IMAGE,  tag: "Горячее",   lat: 55.7850, lng: 37.4900 },
  { id: 6,  title: "Усадьба «Николина Гора»",       location: "Николина Гора, Подмосковье",   price: "580 000 000 ₽", type: "Усадьба",     area: "1200 м²", rooms: 12, floor: "2 эт.",  image: VILLA_IMAGE, tag: "Эксклюзив", lat: 55.7200, lng: 37.1500 },
  { id: 7,  title: "Апартаменты «Арбат»",          location: "Арбат, Москва",                price: "78 000 000 ₽",  type: "Апартаменты", area: "145 м²",  rooms: 3,  floor: "5 эт.",  image: VILLA_IMAGE, tag: null,        lat: 55.7520, lng: 37.5900 },
  { id: 8,  title: "Вилла «Сосновый Бор»",         location: "Новорижское ш., Подмосковье",  price: "310 000 000 ₽", type: "Вилла",        area: "620 м²",  rooms: 7,  floor: "2 эт.",  image: HERO_IMAGE,  tag: "Новинка",   lat: 55.8100, lng: 37.2300 },
  { id: 9,  title: "Таунхаус «Куркино»",           location: "Куркино, Москва",              price: "88 000 000 ₽",  type: "Таунхаус",    area: "280 м²",  rooms: 4,  floor: "2 эт.",  image: VILLA_IMAGE, tag: null,        lat: 55.8700, lng: 37.3700 },
  { id: 10, title: "Пентхаус «Москва-Сити»",       location: "Пресня Сити, Москва",          price: "320 000 000 ₽", type: "Пентхаус",    area: "410 м²",  rooms: 6,  floor: "55 эт.", image: HERO_IMAGE,  tag: "Эксклюзив", lat: 55.7490, lng: 37.5360 },
  { id: 11, title: "Апартаменты «Замоскворечье»",  location: "Замоскворечье, Москва",        price: "62 000 000 ₽",  type: "Апартаменты", area: "120 м²",  rooms: 2,  floor: "4 эт.",  image: HERO_IMAGE,  tag: null,        lat: 55.7370, lng: 37.6270 },
  { id: 12, title: "Усадьба «Барвиха»",            location: "Барвиха, Подмосковье",         price: "890 000 000 ₽", type: "Усадьба",     area: "1800 м²", rooms: 14, floor: "2 эт.",  image: VILLA_IMAGE, tag: "Горячее",   lat: 55.7600, lng: 37.2800 },
];

const agents = [
  { id: 1, name: "Александра Вернова", title: "Старший агент", deals: 148, rating: 5, reviews: 94, avatar: "АВ", specialization: "Пентхаусы, Элитные апартаменты", review: "Александра провела сделку безупречно — профессионализм высшего класса.", reviewer: "Михаил К." },
  { id: 2, name: "Дмитрий Соловьёв", title: "Эксперт по загородной недвижимости", deals: 203, rating: 5, reviews: 127, avatar: "ДС", specialization: "Виллы, Усадьбы, Таунхаусы", review: "Дмитрий нашёл именно то, что мы искали годами. Знает рынок досконально.", reviewer: "Елена Р." },
  { id: 3, name: "Ирина Белова", title: "Руководитель отдела", deals: 312, rating: 5, reviews: 201, avatar: "ИБ", specialization: "Инвестиционная недвижимость", review: "Работа с Ириной — это удовольствие. Всегда на связи, всё объясняет чётко.", reviewer: "Андрей В." },
];

const propertyTypes = ["Все", "Пентхаус", "Вилла", "Апартаменты", "Таунхаус", "Усадьба"];
const locations = ["Все районы", "Москва, центр", "Москва, запад", "Подмосковье"];
const priceRanges = ["Любая цена", "До 100 млн", "100–250 млн", "250–500 млн", "Свыше 500 млн"];

type Page = "home" | "catalog" | "about" | "contacts" | "account";

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < rating ? "star-filled" : "star-empty"} style={{ fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

/* ─── MAP COMPONENT (Leaflet / OpenStreetMap) ─── */
function PropertyMap({ items }: { items: typeof properties }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([55.762, 37.48], 10);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      const goldIcon = L.divIcon({
        className: "",
        html: `<div style="
          background:#C9A84C;color:#1a1008;font-family:'Montserrat',sans-serif;
          font-size:10px;font-weight:700;padding:4px 7px;white-space:nowrap;
          box-shadow:0 2px 8px rgba(0,0,0,0.5);letter-spacing:0.05em;cursor:pointer;
          border-radius:2px;
        ">₽</div>`,
        iconAnchor: [16, 16],
      });

      items.forEach((p) => {
        const marker = L.marker([p.lat, p.lng], { icon: goldIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:'Montserrat',sans-serif;min-width:180px">
            <img src="${p.image}" style="width:100%;height:90px;object-fit:cover;display:block;margin-bottom:8px"/>
            <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.1em">${p.type}</div>
            <div style="font-size:13px;font-weight:600;margin:2px 0 4px">${p.title}</div>
            <div style="font-size:11px;color:#666;margin-bottom:6px">${p.location}</div>
            <div style="font-size:13px;font-weight:700;color:#C9A84C">${p.price}</div>
            <div style="font-size:10px;color:#999;margin-top:3px">${p.area} · ${p.rooms} комн. · ${p.floor}</div>
          </div>
        `, { maxWidth: 220 });
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [items]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-sm" style={{ minHeight: 320 }} />
  );
}

/* ─── DESKTOP NAVBAR ─── */
function Navbar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const links: { label: string; page: Page }[] = [
    { label: "Главная", page: "home" },
    { label: "Каталог", page: "catalog" },
    { label: "О компании", page: "about" },
    { label: "Контакты", page: "contacts" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNav("home")} className="flex items-center">
          <img src={LOGO} alt="КВАДРАТ" className="h-9 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </button>
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <button key={l.page} onClick={() => onNav(l.page)}
              className={`font-body text-xs tracking-widest uppercase transition-colors duration-200 ${current === l.page ? "text-gold" : "text-foreground/60 hover:text-foreground"}`}>
              {l.label}
            </button>
          ))}
        </div>
        <button onClick={() => onNav("account")}
          className="flex items-center gap-2 border border-gold/40 text-gold text-xs tracking-widest uppercase px-4 py-2 hover:bg-gold/10 transition-colors">
          <Icon name="User" size={14} />Кабинет
        </button>
      </div>
    </nav>
  );
}

/* ─── MOBILE TOP BAR ─── */
function MobileTopBar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 md:hidden nav-blur h-12 flex items-center px-4 justify-between">
      <button onClick={() => onNav("home")} className="flex items-center">
        <img src={LOGO} alt="КВАДРАТ" className="h-7 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
      </button>
      <button onClick={() => onNav("catalog")}
        className="flex items-center gap-1.5 bg-gold/10 border border-gold/30 text-gold text-xs px-3 py-1.5 rounded-full">
        <Icon name="Search" size={13} />Поиск
      </button>
    </header>
  );
}

/* ─── MOBILE BOTTOM NAV ─── */
function MobileBottomNav({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const items: { icon: string; label: string; page: Page }[] = [
    { icon: "Home",          label: "Главная",  page: "home"     },
    { icon: "Search",        label: "Каталог",  page: "catalog"  },
    { icon: "Heart",         label: "Избранное",page: "account"  },
    { icon: "MessageCircle", label: "Контакты", page: "contacts" },
    { icon: "User",          label: "Профиль",  page: "account"  },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex">
        {items.map((item) => (
          <button key={item.icon} onClick={() => onNav(item.page)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${current === item.page ? "text-gold" : "text-muted-foreground"}`}>
            <Icon name={item.icon as "Home"} size={21} />
            <span className="font-body text-[9px] tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ─── PROPERTY CARD горизонтальная (мобиль) ─── */
function PropertyCardH({ p, delay = 0 }: { p: typeof properties[0]; delay?: number }) {
  return (
    <div className="luxury-card overflow-hidden flex cursor-pointer" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative w-28 flex-shrink-0">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        {p.tag && (
          <span className="absolute top-1.5 left-1.5 bg-gold text-primary-foreground font-body text-[8px] tracking-widest uppercase px-1.5 py-0.5">
            {p.tag}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="font-body text-[9px] uppercase tracking-wider text-muted-foreground">{p.type}</span>
          <h3 className="font-display text-[15px] font-medium leading-tight mt-0.5 line-clamp-2">{p.title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground mt-0.5">
            <Icon name="MapPin" size={9} />
            <span className="font-body text-[10px] truncate">{p.location}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-body mt-1.5">
            <span>{p.area}</span><span>{p.rooms} комн.</span><span>{p.floor}</span>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-display text-[15px] text-gold font-medium">{p.price}</span>
            <button className="text-[9px] font-body tracking-wider text-gold border border-gold/30 px-2 py-0.5">Смотреть</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PROPERTY CARD вертикальная (десктоп) ─── */
function PropertyCardV({ p, delay = 0 }: { p: typeof properties[0]; delay?: number }) {
  return (
    <div className="luxury-card overflow-hidden group cursor-pointer" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative overflow-hidden h-48">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {p.tag && (
          <span className="absolute top-3 left-3 bg-gold text-primary-foreground font-body text-[10px] tracking-widest uppercase px-2.5 py-0.5">{p.tag}</span>
        )}
        <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-foreground/80 font-body text-[10px] px-2 py-0.5">{p.type}</span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-medium mb-0.5 group-hover:text-gold transition-colors line-clamp-1">{p.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <Icon name="MapPin" size={11} />
          <span className="font-body text-xs truncate">{p.location}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-body">
          <span className="flex items-center gap-1"><Icon name="Maximize2" size={10} />{p.area}</span>
          <span className="flex items-center gap-1"><Icon name="BedDouble" size={10} />{p.rooms} комн.</span>
          <span className="flex items-center gap-1"><Icon name="Building2" size={10} />{p.floor}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="font-display text-lg text-gold font-medium">{p.price}</span>
          <button className="font-body text-[10px] tracking-widest uppercase text-foreground/50 hover:text-gold transition-colors flex items-center gap-1">
            Подробнее <Icon name="ArrowRight" size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent: a }: { agent: typeof agents[0] }) {
  return (
    <div className="luxury-card p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center font-display text-base text-gold flex-shrink-0">{a.avatar}</div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium leading-tight">{a.name}</h3>
          <p className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">{a.title}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating rating={a.rating} />
            <span className="font-body text-[10px] text-muted-foreground">({a.reviews})</span>
          </div>
        </div>
      </div>
      <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mb-2">{a.specialization}</p>
      <div className="border-t border-border pt-3">
        <p className="font-body text-xs text-foreground/70 italic mb-1.5">«{a.review}»</p>
        <p className="font-body text-[10px] text-gold">— {a.reviewer}</p>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div><div className="font-display text-xl text-gold">{a.deals}</div><div className="font-body text-[9px] text-muted-foreground">сделок</div></div>
        <button className="border border-gold/40 text-gold font-body text-[10px] tracking-widest uppercase px-3 py-1.5 hover:bg-gold/10 transition-colors">Написать</button>
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div>
      {/* Шапка-бар с фильтрами вместо hero */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin flex-1">
            {propertyTypes.map((t) => (
              <button key={t} onClick={() => onNav("catalog")}
                className="flex-shrink-0 filter-pill font-body text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full whitespace-nowrap">
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => onNav("contacts")}
            className="flex-shrink-0 bg-gold text-primary-foreground font-body text-[10px] tracking-widest uppercase px-3 py-1.5 hover:bg-gold-light transition-colors whitespace-nowrap">
            Консультация
          </button>
        </div>
      </div>

      {/* ВСЕ объекты сразу — плотная сетка */}
      <section className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        {/* Заголовок секции — компактный */}
        <div className="flex items-center justify-between mb-3 md:mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl md:text-4xl font-light">Объекты в продаже</h2>
            <span className="font-body text-xs text-muted-foreground bg-card border border-border px-2 py-0.5">{properties.length}</span>
          </div>
          <button onClick={() => onNav("catalog")}
            className="flex items-center gap-1 font-body text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors">
            Все <Icon name="ArrowRight" size={13} />
          </button>
        </div>

        {/* Мобиль: горизонтальные карточки — все 12 */}
        <div className="md:hidden space-y-2">
          {properties.map((p, i) => <PropertyCardH key={p.id} p={p} delay={i * 40} />)}
        </div>

        {/* Десктоп: 4 колонки */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {properties.map((p, i) => <PropertyCardV key={p.id} p={p} delay={i * 50} />)}
        </div>
      </section>

      {/* Агенты — компактно, под объектами */}
      <section className="border-t border-border bg-card py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl md:text-3xl font-light">Наши агенты</h2>
            <button onClick={() => onNav("about")} className="font-body text-xs text-gold flex items-center gap-1 uppercase tracking-widest">
              О нас <Icon name="ArrowRight" size={12} />
            </button>
          </div>
          {/* Мобиль: горизонтальный скролл */}
          <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-thin pb-1 -mx-3 px-3">
            {agents.map((a) => <div key={a.id} className="flex-shrink-0 w-64"><AgentCard agent={a} /></div>)}
          </div>
          <div className="hidden md:grid grid-cols-3 gap-4">
            {agents.map((a) => <AgentCard key={a.id} agent={a} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CATALOG ─── */
function CatalogPage() {
  const [selectedType, setSelectedType] = useState("Все");
  const [selectedLocation, setSelectedLocation] = useState("Все районы");
  const [selectedPrice, setSelectedPrice] = useState("Любая цена");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filtered = properties.filter((p) => selectedType === "Все" || p.type === selectedType);

  return (
    <div className="pt-12 md:pt-16 min-h-screen">
      {/* Мобильный фильтр-бар */}
      <div className="md:hidden sticky top-12 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-2 px-3 py-2">
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1 border font-body text-[10px] px-2.5 py-1.5 rounded-full transition-colors flex-shrink-0 ${showFilters ? "border-gold text-gold bg-gold/10" : "border-border text-foreground/60"}`}>
            <Icon name="SlidersHorizontal" size={12} />Фильтры
          </button>
          <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-thin">
            {propertyTypes.map((t) => (
              <button key={t} onClick={() => setSelectedType(t === selectedType && t !== "Все" ? "Все" : t)}
                className={`flex-shrink-0 filter-pill font-body text-[10px] tracking-wider uppercase px-2.5 py-1.5 rounded-full whitespace-nowrap ${selectedType === t ? "active" : ""}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        {showFilters && (
          <div className="px-3 pb-3 space-y-2.5 border-t border-border bg-background">
            <div>
              <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-1.5 mt-2">Локация</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-0.5">
                {locations.map((l) => (
                  <button key={l} onClick={() => setSelectedLocation(l)}
                    className={`flex-shrink-0 filter-pill font-body text-[10px] px-2.5 py-1.5 rounded-full whitespace-nowrap ${selectedLocation === l ? "active" : ""}`}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-1.5">Цена</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-0.5">
                {priceRanges.map((r) => (
                  <button key={r} onClick={() => setSelectedPrice(r)}
                    className={`flex-shrink-0 filter-pill font-body text-[10px] px-2.5 py-1.5 rounded-full whitespace-nowrap ${selectedPrice === r ? "active" : ""}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-xs text-muted-foreground">Найдено: <span className="text-gold font-medium">{filtered.length}</span></span>
              <button onClick={() => { setSelectedType("Все"); setSelectedLocation("Все районы"); setSelectedPrice("Любая цена"); }}
                className="font-body text-[10px] text-muted-foreground underline">Сбросить</button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-8">
        {/* Десктоп фильтры */}
        <div className="hidden md:block mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display text-4xl font-light">Каталог объектов</h1>
            <span className="font-body text-sm text-muted-foreground">Найдено: <span className="text-gold font-medium">{filtered.length}</span></span>
          </div>
          <div className="bg-card border border-border p-4 space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mr-1">Тип:</span>
              {propertyTypes.map((t) => (
                <button key={t} onClick={() => setSelectedType(t)}
                  className={`filter-pill font-body text-[10px] tracking-wider uppercase px-3 py-1.5 ${selectedType === t ? "active" : ""}`}>{t}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">Район:</span>
                {locations.map((l) => (
                  <button key={l} onClick={() => setSelectedLocation(l)}
                    className={`filter-pill font-body text-[10px] tracking-wider px-3 py-1.5 ${selectedLocation === l ? "active" : ""}`}>{l}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">Цена:</span>
                {priceRanges.map((r) => (
                  <button key={r} onClick={() => setSelectedPrice(r)}
                    className={`filter-pill font-body text-[10px] tracking-wider px-3 py-1.5 ${selectedPrice === r ? "active" : ""}`}>{r}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Переключатель вид / карта */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-xs text-muted-foreground">
            Найдено: <span className="text-gold font-medium">{filtered.length}</span>
          </span>
          <div className="flex border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-body text-[10px] uppercase tracking-wider transition-colors ${viewMode === "list" ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <Icon name="LayoutList" size={13} />Список
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-body text-[10px] uppercase tracking-wider transition-colors ${viewMode === "map" ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <Icon name="Map" size={13} />Карта
            </button>
          </div>
        </div>

        {/* Режим карты */}
        {viewMode === "map" && (
          <div className="flex flex-col md:flex-row gap-4">
            {/* Карта */}
            <div className="w-full md:w-3/5 border border-border overflow-hidden" style={{ height: 520 }}>
              <PropertyMap items={filtered} />
            </div>
            {/* Список рядом с картой */}
            <div className="w-full md:w-2/5 space-y-2 overflow-y-auto" style={{ maxHeight: 520 }}>
              {filtered.map((p, i) => <PropertyCardH key={p.id} p={p} delay={i * 30} />)}
            </div>
          </div>
        )}

        {/* Режим списка — мобиль */}
        {viewMode === "list" && (
          <>
            <div className="md:hidden space-y-2">
              {filtered.map((p, i) => <PropertyCardH key={p.id} p={p} delay={i * 40} />)}
            </div>
            {/* Десктоп: 4 колонки */}
            <div className="hidden md:grid grid-cols-4 gap-4">
              {filtered.map((p, i) => <PropertyCardV key={p.id} p={p} delay={i * 50} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── ABOUT ─── */
function AboutPage() {
  return (
    <div className="pt-12 md:pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-6 md:py-10">
        <div className="relative overflow-hidden mb-8">
          <img src={VILLA_IMAGE} alt="О компании" className="w-full h-40 md:h-56 object-cover" />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="font-body text-[9px] tracking-[0.25em] uppercase text-gold mb-1">О нас</p>
            <img src={LOGO} alt="КВАДРАТ" className="h-10 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light gold-line pb-3 mb-4">Наша история</h2>
            <p className="font-body text-sm text-foreground/70 leading-relaxed mb-3">С 2004 года КВАДРАТ — ведущий оператор рынка элитной недвижимости Москвы и Подмосковья.</p>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">За 20 лет — более 1 200 сделок. Наша репутация строится на доверии и результате.</p>
          </div>
          <div className="space-y-3">
            {[
              { icon: "Shield", title: "Надёжность", desc: "Каждая сделка защищена юридически" },
              { icon: "Eye", title: "Прозрачность", desc: "Открытость на каждом этапе" },
              { icon: "Star", title: "Качество", desc: "Только проверенные объекты" },
            ].map((v) => (
              <div key={v.title} className="flex gap-3 p-3 bg-card border border-border">
                <div className="w-8 h-8 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={v.icon as "Shield"} size={15} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-base font-medium">{v.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-px bg-border mb-8">
          {[{ value: "20+", label: "Лет" }, { value: "1 200+", label: "Сделок" }, { value: "48", label: "Агентов" }, { value: "98%", label: "Рекомендуют" }].map((s) => (
            <div key={s.label} className="bg-card p-4 md:p-6 text-center">
              <div className="font-display text-2xl md:text-4xl font-light text-gold mb-1">{s.value}</div>
              <div className="font-body text-[9px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-light mb-4">Команда агентов</h2>
        <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-thin pb-1 -mx-3 px-3">
          {agents.map((a) => <div key={a.id} className="flex-shrink-0 w-64"><AgentCard agent={a} /></div>)}
        </div>
        <div className="hidden md:grid grid-cols-3 gap-4">
          {agents.map((a) => <AgentCard key={a.id} agent={a} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACTS ─── */
function ContactsPage() {
  const [formSent, setFormSent] = useState(false);
  return (
    <div className="pt-12 md:pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-5 md:py-10">
        <h1 className="font-display text-3xl md:text-4xl font-light mb-5">Контакты</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-card border border-border p-5">
            <h2 className="font-display text-2xl font-light mb-5">Оставить заявку</h2>
            {formSent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Check" size={22} className="text-gold" />
                </div>
                <h3 className="font-display text-xl mb-1">Заявка отправлена</h3>
                <p className="font-body text-sm text-muted-foreground">Свяжемся в течение 30 минут</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[{ label: "Имя", ph: "Имя и фамилия" }, { label: "Телефон", ph: "+7 (___) ___-__-__" }, { label: "Email", ph: "your@email.com" }].map((f) => (
                  <div key={f.label}>
                    <label className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">{f.label}</label>
                    <input className="w-full bg-background border border-border px-3 py-2.5 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors" placeholder={f.ph} />
                  </div>
                ))}
                <div>
                  <label className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Сообщение</label>
                  <textarea className="w-full bg-background border border-border px-3 py-2.5 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors resize-none h-20" placeholder="Пожелания..." />
                </div>
                <button onClick={() => setFormSent(true)}
                  className="w-full bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase py-3 hover:bg-gold-light transition-colors">
                  Отправить заявку
                </button>
              </div>
            )}
          </div>
          <div className="space-y-3">
            {[
              { icon: "Phone",   title: "Телефон",        lines: ["+7 (495) 123-45-67", "+7 (800) 555-00-11"] },
              { icon: "Mail",    title: "Email",           lines: ["info@kvadrat-estate.ru"] },
              { icon: "MapPin",  title: "Адрес",           lines: ["Москва, Пресненская наб., 10", "Башня «Федерация», 38 этаж"] },
              { icon: "Clock",   title: "Режим работы",    lines: ["Пн–Пт: 9:00–20:00", "Сб–Вс: 10:00–18:00"] },
            ].map((c) => (
              <div key={c.title} className="flex gap-3 p-4 bg-card border border-border">
                <div className="w-9 h-9 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon as "Phone"} size={16} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-1">{c.title}</p>
                  {c.lines.map((line) => <p key={line} className="font-display text-base">{line}</p>)}
                </div>
              </div>
            ))}
            <div className="p-4 bg-card border border-gold/30">
              <p className="font-body text-[9px] uppercase tracking-widest text-gold mb-2">Мессенджеры</p>
              <div className="grid grid-cols-3 gap-2">
                {["Telegram", "WhatsApp", "Viber"].map((m) => (
                  <button key={m} className="border border-border font-body text-xs py-2.5 hover:border-gold/40 hover:text-gold transition-colors">{m}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ACCOUNT ─── */
const accountListings = [
  { id: 1, title: "3-комн. апартаменты, Арбат",  status: "Активно",       price: "75 000 000 ₽",  date: "12.03.2026", views: 142 },
  { id: 2, title: "Пентхаус, Тверская",           status: "На модерации",  price: "210 000 000 ₽", date: "05.04.2026", views: 67  },
  { id: 3, title: "Таунхаус, Рублёвка",           status: "Завершено",     price: "185 000 000 ₽", date: "10.01.2026", views: 389 },
];

function AccountPage() {
  const [tab, setTab] = useState<"listings" | "favorites" | "settings">("listings");
  return (
    <div className="pt-12 md:pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8">
        <div className="flex items-center gap-3 mb-5 p-4 bg-card border border-border md:bg-transparent md:border-0 md:p-0">
          <div className="w-14 h-14 bg-gold/20 border border-gold/40 rounded-full flex items-center justify-center font-display text-xl text-gold flex-shrink-0">МК</div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-light">Михаил Кузнецов</h1>
            <p className="font-body text-[9px] text-muted-foreground uppercase tracking-widest">Клиент с 2022 · m.kuznetsov@email.com</p>
          </div>
        </div>
        <div className="flex border-b border-border mb-5 overflow-x-auto">
          {[{ key: "listings", label: "Объявления" }, { key: "favorites", label: "Избранное" }, { key: "settings", label: "Настройки" }].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
              className={`flex-shrink-0 font-body text-xs tracking-widest uppercase px-4 py-3 border-b-2 transition-colors ${tab === t.key ? "border-gold text-gold" : "border-transparent text-muted-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "listings" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-body text-xs text-muted-foreground">Всего: {accountListings.length}</p>
              <button className="bg-gold text-primary-foreground font-body text-[10px] tracking-widest uppercase px-4 py-2 hover:bg-gold-light transition-colors">+ Добавить</button>
            </div>
            <div className="space-y-2">
              {accountListings.map((l) => (
                <div key={l.id} className="luxury-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-medium truncate">{l.title}</h3>
                      <div className="flex items-center gap-3 font-body text-[10px] text-muted-foreground mt-0.5">
                        <span>{l.date}</span>
                        <span className="flex items-center gap-1"><Icon name="Eye" size={10} />{l.views}</span>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 font-body text-[9px] tracking-wider uppercase px-2 py-0.5 ${
                      l.status === "Активно" ? "bg-green-900/30 text-green-400 border border-green-800"
                      : l.status === "На модерации" ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                      : "bg-muted text-muted-foreground border border-border"}`}>{l.status}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border">
                    <span className="font-display text-lg text-gold">{l.price}</span>
                    <button className="text-muted-foreground"><Icon name="MoreHorizontal" size={15} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "favorites" && (
          <>
            <div className="md:hidden space-y-2">
              {properties.slice(0, 4).map((p, i) => <PropertyCardH key={p.id} p={p} delay={i * 50} />)}
            </div>
            <div className="hidden md:grid grid-cols-4 gap-4">
              {properties.slice(0, 4).map((p, i) => <PropertyCardV key={p.id} p={p} delay={i * 60} />)}
            </div>
          </>
        )}

        {tab === "settings" && (
          <div className="max-w-sm bg-card border border-border p-5 space-y-4">
            <h2 className="font-display text-xl font-light">Личные данные</h2>
            {[{ label: "Имя", value: "Михаил Кузнецов" }, { label: "Телефон", value: "+7 (999) 123-45-67" }, { label: "Email", value: "m.kuznetsov@email.com" }].map((f) => (
              <div key={f.label}>
                <label className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">{f.label}</label>
                <input defaultValue={f.value} className="w-full bg-background border border-border px-3 py-2.5 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
            ))}
            <button className="w-full bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase py-2.5 hover:bg-gold-light transition-colors">Сохранить</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── FOOTER (desktop only) ─── */
function Footer({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <footer className="hidden md:block border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="col-span-2">
            <img src={LOGO} alt="КВАДРАТ" className="h-10 w-auto object-contain mb-2" style={{ filter: "brightness(0) invert(1)" }} />
            <p className="font-body text-xs text-muted-foreground leading-relaxed">Портал элитной недвижимости Москвы и Подмосковья. 20+ лет на рынке.</p>
          </div>
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Навигация</p>
            <div className="space-y-1.5">
              {(["home", "catalog", "about", "contacts"] as Page[]).map((p) => (
                <button key={p} onClick={() => onNav(p)} className="block font-body text-sm text-foreground/60 hover:text-gold transition-colors">
                  {p === "home" ? "Главная" : p === "catalog" ? "Каталог" : p === "about" ? "О компании" : "Контакты"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Контакты</p>
            <div className="space-y-1.5 font-body text-sm text-foreground/60">
              <p>+7 (495) 123-45-67</p>
              <p>info@kvadrat-estate.ru</p>
              <p>Пресненская наб., 10</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <p className="font-body text-xs text-muted-foreground">© 2026 КВАДРАТ</p>
          <p className="font-body text-xs text-muted-foreground">Лицензия ЦБ РФ №123456</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ─── */
export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const navigate = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar current={page} onNav={navigate} />
      <MobileTopBar current={page} onNav={navigate} />
      <div className="pb-14 md:pb-0">
        {page === "home"     && <HomePage onNav={navigate} />}
        {page === "catalog"  && <CatalogPage />}
        {page === "about"    && <AboutPage />}
        {page === "contacts" && <ContactsPage />}
        {page === "account"  && <AccountPage />}
      </div>
      <Footer onNav={navigate} />
      <MobileBottomNav current={page} onNav={navigate} />
    </div>
  );
}