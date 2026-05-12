import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/cfe57687-6d6f-462b-965a-8b5e88af9429/files/34ef97d2-003c-4dbb-a904-ed70b22a4e08.jpg";
const VILLA_IMAGE = "https://cdn.poehali.dev/projects/cfe57687-6d6f-462b-965a-8b5e88af9429/files/ce267202-09f2-478f-b90a-5813d32c1c4f.jpg";

const properties = [
  {
    id: 1,
    title: "Пентхаус «Северная Звезда»",
    location: "Москва, Пресненская набережная",
    price: "185 000 000 ₽",
    type: "Пентхаус",
    area: "320 м²",
    rooms: 5,
    floor: "42 этаж",
    image: HERO_IMAGE,
    tag: "Эксклюзив",
  },
  {
    id: 2,
    title: "Вилла «Серебряный Бор»",
    location: "Подмосковье, Рублёво-Успенское ш.",
    price: "420 000 000 ₽",
    type: "Вилла",
    area: "780 м²",
    rooms: 8,
    floor: "2 этажа",
    image: VILLA_IMAGE,
    tag: "Новинка",
  },
  {
    id: 3,
    title: "Апартаменты «Патриарши»",
    location: "Москва, Патриаршие пруды",
    price: "95 000 000 ₽",
    type: "Апартаменты",
    area: "180 м²",
    rooms: 3,
    floor: "7 этаж",
    image: HERO_IMAGE,
    tag: null,
  },
  {
    id: 4,
    title: "Таунхаус «Дубровка»",
    location: "Москва, Рублёвское ш.",
    price: "260 000 000 ₽",
    type: "Таунхаус",
    area: "450 м²",
    rooms: 6,
    floor: "3 этажа",
    image: VILLA_IMAGE,
    tag: null,
  },
  {
    id: 5,
    title: "Пентхаус «Алые Паруса»",
    location: "Москва, Хорошёвское ш.",
    price: "145 000 000 ₽",
    type: "Пентхаус",
    area: "240 м²",
    rooms: 4,
    floor: "34 этаж",
    image: HERO_IMAGE,
    tag: "Горячее",
  },
  {
    id: 6,
    title: "Усадьба «Николина Гора»",
    location: "Подмосковье, Николина Гора",
    price: "580 000 000 ₽",
    type: "Усадьба",
    area: "1200 м²",
    rooms: 12,
    floor: "2 этажа",
    image: VILLA_IMAGE,
    tag: "Эксклюзив",
  },
];

const agents = [
  {
    id: 1,
    name: "Александра Вернова",
    title: "Старший агент",
    deals: 148,
    rating: 5,
    reviews: 94,
    avatar: "АВ",
    specialization: "Пентхаусы, Элитные апартаменты",
    review: "Александра провела сделку безупречно — профессионализм высшего класса.",
    reviewer: "Михаил К.",
  },
  {
    id: 2,
    name: "Дмитрий Соловьёв",
    title: "Эксперт по загородной недвижимости",
    deals: 203,
    rating: 5,
    reviews: 127,
    avatar: "ДС",
    specialization: "Виллы, Усадьбы, Таунхаусы",
    review: "Дмитрий нашёл именно то, что мы искали годами. Знает рынок досконально.",
    reviewer: "Елена Р.",
  },
  {
    id: 3,
    name: "Ирина Белова",
    title: "Руководитель отдела",
    deals: 312,
    rating: 5,
    reviews: 201,
    avatar: "ИБ",
    specialization: "Инвестиционная недвижимость",
    review: "Работа с Ириной — это удовольствие. Всегда на связи, всё объясняет чётко.",
    reviewer: "Андрей В.",
  },
];

const propertyTypes = ["Все", "Пентхаус", "Вилла", "Апартаменты", "Таунхаус", "Усадьба"];
const locations = ["Все районы", "Москва, центр", "Москва, запад", "Подмосковье"];
const priceRanges = ["Любая цена", "До 100 млн", "100–250 млн", "250–500 млн", "Свыше 500 млн"];

type Page = "home" | "catalog" | "about" | "contacts" | "account";

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < rating ? "star-filled" : "star-empty"} style={{ fontSize: 14 }}>
          ★
        </span>
      ))}
    </div>
  );
}

function Navbar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Главная", page: "home" },
    { label: "Каталог", page: "catalog" },
    { label: "О компании", page: "about" },
    { label: "Контакты", page: "contacts" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNav("home")}
          className="font-display text-2xl font-light tracking-[0.15em] text-gold"
        >
          КВАДРАТ
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => onNav(l.page)}
              className={`font-body text-xs tracking-widest uppercase transition-colors duration-200 ${
                current === l.page ? "text-gold" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => onNav("account")}
          className="hidden md:flex items-center gap-2 border border-gold/40 text-gold text-xs tracking-widest uppercase px-4 py-2 hover:bg-gold/10 transition-colors duration-200"
        >
          <Icon name="User" size={14} />
          Кабинет
        </button>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => { onNav(l.page); setOpen(false); }}
              className={`text-left font-body text-sm tracking-widest uppercase ${
                current === l.page ? "text-gold" : "text-foreground/60"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { onNav("account"); setOpen(false); }}
            className="text-left font-body text-sm tracking-widest uppercase text-gold"
          >
            Личный кабинет
          </button>
        </div>
      )}
    </nav>
  );
}

function PropertyCard({ property: p, delay = 0 }: { property: typeof properties[0]; delay?: number }) {
  return (
    <div
      className="luxury-card overflow-hidden group cursor-pointer animate-fadeInUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {p.tag && (
          <span className="absolute top-4 left-4 bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase px-3 py-1">
            {p.tag}
          </span>
        )}
        <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-foreground/80 font-body text-xs px-3 py-1">
          {p.type}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-medium mb-1 group-hover:text-gold transition-colors">{p.title}</h3>
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <Icon name="MapPin" size={12} />
          <span className="font-body text-xs">{p.location}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-body">
          <span className="flex items-center gap-1">
            <Icon name="Maximize2" size={11} />
            {p.area}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="BedDouble" size={11} />
            {p.rooms} комн.
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Building2" size={11} />
            {p.floor}
          </span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="font-display text-xl text-gold font-medium">{p.price}</span>
          <button className="font-body text-xs tracking-widest uppercase text-foreground/50 hover:text-gold transition-colors flex items-center gap-1">
            Подробнее <Icon name="ArrowRight" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent: a }: { agent: typeof agents[0] }) {
  return (
    <div className="luxury-card p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center font-display text-xl text-gold flex-shrink-0">
          {a.avatar}
        </div>
        <div>
          <h3 className="font-display text-xl font-medium">{a.name}</h3>
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{a.title}</p>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={a.rating} />
            <span className="font-body text-xs text-muted-foreground">({a.reviews})</span>
          </div>
        </div>
      </div>
      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">{a.specialization}</p>
      <div className="border-t border-border pt-4 mt-4">
        <p className="font-body text-sm text-foreground/70 italic mb-3">«{a.review}»</p>
        <p className="font-body text-xs text-gold">— {a.reviewer}</p>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="font-display text-2xl text-gold">{a.deals}</div>
          <div className="font-body text-xs text-muted-foreground">сделок</div>
        </div>
        <button className="border border-gold/40 text-gold font-body text-xs tracking-widest uppercase px-4 py-2 hover:bg-gold/10 transition-colors">
          Написать
        </button>
      </div>
    </div>
  );
}

function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <img src={HERO_IMAGE} alt="Элитная недвижимость" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28 w-full">
          <div className="animate-fadeInUp">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Портал элитной недвижимости</p>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-none text-foreground mb-6">
              Жизнь на<br />
              <em className="gold-shimmer not-italic">высшем уровне</em>
            </h1>
            <p className="font-body text-sm text-foreground/60 max-w-md mb-10 leading-relaxed">
              Эксклюзивные объекты Москвы и Подмосковья. Более 20 лет на рынке элитной недвижимости.
            </p>
          </div>
          <div className="animate-fadeInUp delay-300 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNav("catalog")}
              className="bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Смотреть каталог
            </button>
            <button
              onClick={() => onNav("contacts")}
              className="border border-foreground/30 text-foreground font-body text-xs tracking-widest uppercase px-8 py-4 hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Связаться с нами
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 gap-4">
            {[
              { value: "20+", label: "лет опыта" },
              { value: "1 200+", label: "сделок" },
              { value: "98%", label: "довольных клиентов" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-light text-gold">{s.value}</div>
                <div className="font-body text-xs text-foreground/50 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">Избранное</p>
            <h2 className="font-display text-5xl font-light">Топ объекты</h2>
          </div>
          <button
            onClick={() => onNav("catalog")}
            className="hidden sm:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
          >
            Весь каталог <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.slice(0, 3).map((p, i) => (
            <PropertyCard key={p.id} property={p} delay={i * 100} />
          ))}
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">Команда</p>
            <h2 className="font-display text-5xl font-light">Наши эксперты</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <img src={VILLA_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-4">Начните сейчас</p>
          <h2 className="font-display text-5xl md:text-6xl font-light mb-6 leading-tight">
            Найдите объект<br />вашей мечты
          </h2>
          <p className="font-body text-sm text-foreground/60 mb-10">
            Персональная консультация бесплатно. Наши эксперты свяжутся с вами в течение 30 минут.
          </p>
          <button
            onClick={() => onNav("contacts")}
            className="bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Получить консультацию
          </button>
        </div>
      </section>
    </div>
  );
}

function CatalogPage() {
  const [selectedType, setSelectedType] = useState("Все");
  const [selectedLocation, setSelectedLocation] = useState("Все районы");
  const [selectedPrice, setSelectedPrice] = useState("Любая цена");

  const filtered = properties.filter((p) => {
    if (selectedType !== "Все" && p.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">Недвижимость</p>
        <h1 className="font-display text-5xl font-light mb-12">Каталог объектов</h1>

        <div className="bg-card border border-border p-6 mb-10 space-y-5">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">Тип объекта</p>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`filter-pill font-body text-xs tracking-wider uppercase px-4 py-2 ${selectedType === t ? "active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">Локация</p>
              <div className="flex flex-wrap gap-2">
                {locations.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLocation(l)}
                    className={`filter-pill font-body text-xs tracking-wider px-4 py-2 ${selectedLocation === l ? "active" : ""}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">Цена</p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedPrice(r)}
                    className={`filter-pill font-body text-xs tracking-wider px-4 py-2 ${selectedPrice === r ? "active" : ""}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="font-body text-xs text-muted-foreground">
              Найдено: <span className="text-gold">{filtered.length}</span> объектов
            </span>
            <button
              className="font-body text-xs text-muted-foreground hover:text-foreground"
              onClick={() => { setSelectedType("Все"); setSelectedLocation("Все районы"); setSelectedPrice("Любая цена"); }}
            >
              Сбросить фильтры
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <PropertyCard key={p.id} property={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden mb-20">
          <img src={VILLA_IMAGE} alt="О компании" className="w-full h-72 object-cover" />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute bottom-0 left-0 p-10">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-2">О нас</p>
            <h1 className="font-display text-6xl font-light text-foreground">КВАДРАТ</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="font-display text-4xl font-light gold-line pb-4 mb-6">Наша история</h2>
            <p className="font-body text-sm text-foreground/70 leading-relaxed mb-4">
              С 2004 года компания КВАДРАТ является одним из ведущих операторов рынка элитной недвижимости Москвы и Подмосковья. Мы специализируемся на объектах премиум-класса, где каждый квадратный метр — это воплощение изысканности и безупречного вкуса.
            </p>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">
              За 20 лет работы мы провели более 1 200 сделок, накопив уникальную экспертизу в сегменте элитного жилья. Наша репутация строится на доверии клиентов, прозрачности и результате.
            </p>
          </div>
          <div>
            <h2 className="font-display text-4xl font-light gold-line pb-4 mb-6">Наши ценности</h2>
            <div className="space-y-4">
              {[
                { icon: "Shield", title: "Надёжность", desc: "Каждая сделка защищена юридически и сопровождается до финала" },
                { icon: "Eye", title: "Прозрачность", desc: "Полная открытость на каждом этапе сотрудничества" },
                { icon: "Star", title: "Качество", desc: "Только проверенные объекты без скрытых дефектов и рисков" },
              ].map((v) => (
                <div key={v.title} className="flex gap-4 p-4 bg-card border border-border">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={v.icon as "Shield"} size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium mb-1">{v.title}</h3>
                    <p className="font-body text-xs text-muted-foreground">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-20">
          {[
            { value: "20+", label: "Лет на рынке" },
            { value: "1 200+", label: "Сделок" },
            { value: "48", label: "Агентов" },
            { value: "98%", label: "Рекомендуют нас" },
          ].map((s) => (
            <div key={s.label} className="bg-card p-8 text-center">
              <div className="font-display text-5xl font-light text-gold mb-2">{s.value}</div>
              <div className="font-body text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">Команда</p>
          <h2 className="font-display text-4xl font-light mb-10">Наши эксперты</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactsPage() {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">Связь</p>
        <h1 className="font-display text-5xl font-light mb-12">Контакты</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-card border border-border p-8">
            <h2 className="font-display text-3xl font-light mb-8">Оставить заявку</h2>
            {formSent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={28} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl mb-2">Заявка отправлена</h3>
                <p className="font-body text-sm text-muted-foreground">Мы свяжемся с вами в течение 30 минут</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Ваше имя</label>
                  <input className="w-full bg-background border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors" placeholder="Имя и фамилия" />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Телефон</label>
                  <input className="w-full bg-background border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                  <input className="w-full bg-background border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Сообщение</label>
                  <textarea className="w-full bg-background border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors resize-none h-28" placeholder="Расскажите о ваших пожеланиях..." />
                </div>
                <button
                  onClick={() => setFormSent(true)}
                  className="w-full bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase py-4 hover:bg-gold-light transition-colors duration-300"
                >
                  Отправить заявку
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {[
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 123-45-67", "+7 (800) 555-00-11"] },
              { icon: "Mail", title: "Email", lines: ["info@kvadrat-estate.ru", "sales@kvadrat-estate.ru"] },
              { icon: "MapPin", title: "Адрес", lines: ["Москва, Пресненская наб., 10", "Башня «Федерация», 38 этаж"] },
              { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 9:00 — 20:00", "Сб–Вс: 10:00 — 18:00"] },
            ].map((c) => (
              <div key={c.title} className="flex gap-5 p-6 bg-card border border-border">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon as "Phone"} size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">{c.title}</p>
                  {c.lines.map((line) => (
                    <p key={line} className="font-display text-lg">{line}</p>
                  ))}
                </div>
              </div>
            ))}
            <div className="p-6 bg-card border border-gold/30">
              <p className="font-body text-xs uppercase tracking-widest text-gold mb-3">Мессенджеры</p>
              <div className="flex gap-3">
                {["Telegram", "WhatsApp", "Viber"].map((m) => (
                  <button key={m} className="flex-1 border border-border font-body text-xs py-3 hover:border-gold/40 hover:text-gold transition-colors tracking-wider">
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const accountListings = [
  { id: 1, title: "3-комн. апартаменты, Арбат", status: "Активно", price: "75 000 000 ₽", date: "12.03.2026", views: 142 },
  { id: 2, title: "Пентхаус, Тверская", status: "На модерации", price: "210 000 000 ₽", date: "05.04.2026", views: 67 },
  { id: 3, title: "Таунхаус, Рублёвка", status: "Завершено", price: "185 000 000 ₽", date: "10.01.2026", views: 389 },
];

function AccountPage() {
  const [tab, setTab] = useState<"listings" | "favorites" | "settings">("listings");

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-start gap-8 mb-10">
          <div className="w-20 h-20 bg-gold/20 border border-gold/40 rounded-full flex items-center justify-center font-display text-3xl text-gold flex-shrink-0">
            МК
          </div>
          <div>
            <h1 className="font-display text-4xl font-light">Михаил Кузнецов</h1>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mt-1">Клиент с 2022 года</p>
            <p className="font-body text-sm text-foreground/60 mt-1">m.kuznetsov@email.com</p>
          </div>
        </div>

        <div className="flex border-b border-border mb-8">
          {[
            { key: "listings", label: "Мои объявления" },
            { key: "favorites", label: "Избранное" },
            { key: "settings", label: "Настройки" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`font-body text-xs tracking-widest uppercase px-6 py-4 border-b-2 transition-colors ${
                tab === t.key
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "listings" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-muted-foreground">Всего: {accountListings.length} объявления</p>
              <button className="bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-light transition-colors">
                + Добавить объект
              </button>
            </div>
            <div className="space-y-3">
              {accountListings.map((l) => (
                <div key={l.id} className="luxury-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-medium mb-1">{l.title}</h3>
                    <div className="flex items-center gap-4 font-body text-xs text-muted-foreground">
                      <span>Добавлено: {l.date}</span>
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={11} />
                        {l.views} просмотров
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg text-gold">{l.price}</span>
                    <span
                      className={`font-body text-xs tracking-wider uppercase px-3 py-1 ${
                        l.status === "Активно"
                          ? "bg-green-900/30 text-green-400 border border-green-800"
                          : l.status === "На модерации"
                          ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {l.status}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="MoreHorizontal" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((p, i) => (
              <PropertyCard key={p.id} property={p} delay={i * 80} />
            ))}
          </div>
        )}

        {tab === "settings" && (
          <div className="max-w-lg bg-card border border-border p-8 space-y-5">
            <h2 className="font-display text-2xl font-light mb-6">Личные данные</h2>
            {[
              { label: "Имя", value: "Михаил Кузнецов" },
              { label: "Телефон", value: "+7 (999) 123-45-67" },
              { label: "Email", value: "m.kuznetsov@email.com" },
            ].map((f) => (
              <div key={f.label}>
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">{f.label}</label>
                <input
                  defaultValue={f.value}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold/60 transition-colors"
                />
              </div>
            ))}
            <button className="bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold-light transition-colors">
              Сохранить изменения
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="font-display text-3xl text-gold mb-3">КВАДРАТ</div>
            <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-sm">
              Портал элитной недвижимости Москвы и Подмосковья. Более 20 лет на рынке, более 1 200 успешных сделок.
            </p>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4">Навигация</p>
            <div className="space-y-2">
              {(["home", "catalog", "about", "contacts"] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => onNav(p)}
                  className="block font-body text-sm text-foreground/60 hover:text-gold transition-colors"
                >
                  {p === "home" ? "Главная" : p === "catalog" ? "Каталог" : p === "about" ? "О компании" : "Контакты"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4">Контакты</p>
            <div className="space-y-2 font-body text-sm text-foreground/60">
              <p>+7 (495) 123-45-67</p>
              <p>info@kvadrat-estate.ru</p>
              <p>Пресненская наб., 10</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">© 2026 КВАДРАТ. Все права защищены.</p>
          <p className="font-body text-xs text-muted-foreground">Лицензия ЦБ РФ №123456</p>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar current={page} onNav={navigate} />
      {page === "home" && <HomePage onNav={navigate} />}
      {page === "catalog" && <CatalogPage />}
      {page === "about" && <AboutPage />}
      {page === "contacts" && <ContactsPage />}
      {page === "account" && <AccountPage />}
      <Footer onNav={navigate} />
    </div>
  );
}
