// Product listing / category / search / filters / product & category cards /
// breadcrumb. Reuses common.* / header.* / nav.* / footer.* from core.ts.
const en: Record<string, string> = {
  // ── Breadcrumb ────────────────────────────────────────────────────
  "catalog.breadcrumb.home": "Home",

  // ── Listings / states ─────────────────────────────────────────────
  "catalog.allProducts": "All Products",
  "catalog.loadingProducts": "Loading products...",
  "catalog.showingOfProducts": "Showing {count} of {total} products",
  "catalog.noProductsFound": "No products found",
  "catalog.tryAdjusting": "Try adjusting your filters or search terms.",
  "catalog.clearFilters": "Clear filters",
  "catalog.failedToLoad": "Failed to load products",
  "catalog.all": "All",

  // ── Filters ───────────────────────────────────────────────────────
  "catalog.applyFilters": "Apply Filters",
  "catalog.filters.quick": "Quick Filters",
  "catalog.filters.priceRange": "Price Range",
  "catalog.filters.brands": "Brands",
  "catalog.filters.customerRating": "Customer Rating",
  "catalog.filters.discount": "Discount",
  "catalog.andUp": "& Up",
  "catalog.closeFilters": "Close filters",
  "catalog.gridView": "Grid view",
  "catalog.listView": "List view",
  "catalog.sortLocked": "Sort locked to Newest while New Arrivals is on",

  // ── Clear chip aria-labels ────────────────────────────────────────
  "catalog.clearSearch": "Clear search",
  "catalog.clearCategory": "Clear category",
  "catalog.clearNewArrivals": "Clear new arrivals",
  "catalog.clearPriceRange": "Clear price range",
  "catalog.clearPrice": "Clear price",
  "catalog.clearDiscount": "Clear discount",

  // ── Sort options ──────────────────────────────────────────────────
  "catalog.sort.featured": "Featured",
  "catalog.sort.newest": "Newest",
  "catalog.sort.oldest": "Oldest",
  "catalog.sort.priceLow": "Price: Low to High",
  "catalog.sort.priceHigh": "Price: High to Low",
  "catalog.sort.nameAsc": "Name: A-Z",
  "catalog.sort.nameDesc": "Name: Z-A",
  "catalog.sort.bestRating": "Best Rating",
  "catalog.sort.biggestDiscount": "Biggest Discount",
  "catalog.sort.topRated": "Top Rated",
  "catalog.sort.mostPopular": "Most Popular",
  "catalog.sort.mostViewed": "Most Viewed",
  "catalog.sort.endingSoon": "Ending Soon",

  // ── Price ranges ──────────────────────────────────────────────────
  "catalog.price.all": "All Prices",
  "catalog.price.under50": "Under $50",
  "catalog.price.under100": "Under $100",
  "catalog.price.50to100": "$50 - $100",
  "catalog.price.100to200": "$100 - $200",
  "catalog.price.100to500": "$100 - $500",
  "catalog.price.500to1000": "$500 - $1000",
  "catalog.price.over200": "Over $200",
  "catalog.price.over1000": "Over $1000",

  // ── Discount ranges ───────────────────────────────────────────────
  "catalog.discount.all": "All Discounts",
  "catalog.discount.30plus": "30% or more",
  "catalog.discount.50plus": "50% or more",
  "catalog.discount.70plus": "70% or more",

  // ── Category filter pills ─────────────────────────────────────────
  "catalog.filter.sports": "Sports",
  "catalog.filter.home": "Home",

  // ── Cards ─────────────────────────────────────────────────────────
  "catalog.card.save": "Save {amount}",
  "catalog.card.addToWishlist": "Add to wishlist",
  "catalog.card.removeFromWishlist": "Remove from wishlist",
  "catalog.card.quickView": "Quick view",
  "catalog.card.ratingStars": "{rating} out of 5 stars",
  "catalog.card.freeShipping": "Free Shipping",
  "catalog.card.warranty": "Warranty",
  "catalog.productsLower": "products",
  "catalog.sellersCount": "{count} sellers",
  "catalog.browseCategory": "Browse category",
  "catalog.noImage": "No Image",

  // ── Categories page ───────────────────────────────────────────────
  "catalog.browseAllDepartments": "Browse products across every department",
  "catalog.searchCategories": "Search categories...",
  "catalog.noCategoriesFound": "No categories found",
  "catalog.tryDifferentSearch": "Try a different search term",

  // ── "Showing X …" split lines ─────────────────────────────────────
  "catalog.showingPrefix": "Showing",
  "catalog.dealsWord": "deals",
  "catalog.trendingProductsWord": "trending products",

  // ── Stats strips ──────────────────────────────────────────────────
  "catalog.stats.activeDeals": "Active Deals",
  "catalog.stats.maxDiscount": "Max Discount",
  "catalog.stats.itemsSold": "Items Sold",
  "catalog.stats.trendingItems": "Trending Items",
  "catalog.stats.viewsThisWeek": "Views This Week",
  "catalog.stats.purchased": "Purchased",

  // ── Deals page ────────────────────────────────────────────────────
  "catalog.deals.subtitle": "{count} handpicked deals updated daily",
  "catalog.deals.newDealsAdded": "New deals added",
  "catalog.deals.everyDay": "every day",
  "catalog.deals.checkBack": "Check back tomorrow for more!",

  // ── Trending page ─────────────────────────────────────────────────
  "catalog.trending.title": "Trending Now",
  "catalog.trending.subtitle": "Most popular products this week",
  "catalog.trending.bottomPre": "Trending products updated",
  "catalog.trending.everyHour": "every hour",
  "catalog.trending.bottomPost": "based on real-time data",

  // ── Flash sale page ───────────────────────────────────────────────
  "catalog.flash.liveNow": "LIVE NOW",
  "catalog.flash.subtitle": "{count} of {total} deals · up to 60% off",
  "catalog.flash.saleEndsIn": "Sale ends in",
  "catalog.flash.hours": "Hours",
  "catalog.flash.min": "Min",
  "catalog.flash.sec": "Sec",
  "catalog.flash.noDeals": "No deals match your filters",
  "catalog.flash.tryAdjusting": "Try adjusting or clearing them.",
  "catalog.flash.sold": "{count} sold",
  "catalog.flash.almostGone": "Almost gone!",
  "catalog.flash.bottomPre": "New flash deals added every",
  "catalog.flash.sixHours": "6 hours",
  "catalog.flash.bottomPost": "Don't miss out!",

  // ── Category detail page ──────────────────────────────────────────
  "catalog.categoryPage.electronicsDesc":
    "Discover the latest in electronics and gadgets. From smartphones to laptops, find everything you need.",

  // ── Departments (mock catalog data) ───────────────────────────────
  "catalog.dept.electronics.name": "Electronics",
  "catalog.dept.electronics.desc":
    "Smartphones, laptops, audio, cameras and all the latest gadgets.",
  "catalog.dept.fashion.name": "Fashion",
  "catalog.dept.fashion.desc":
    "Clothing, shoes, and accessories for men, women, and kids.",
  "catalog.dept.home-garden.name": "Home & Garden",
  "catalog.dept.home-garden.desc":
    "Furniture, decor, kitchen essentials, and garden tools.",
  "catalog.dept.sports.name": "Sports & Fitness",
  "catalog.dept.sports.desc":
    "Equipment, apparel, and accessories for every sport.",
  "catalog.dept.beauty.name": "Beauty",
  "catalog.dept.beauty.desc":
    "Skincare, makeup, haircare, and fragrances from top brands.",
  "catalog.dept.gaming.name": "Gaming",
  "catalog.dept.gaming.desc":
    "Consoles, PC components, peripherals, and gaming accessories.",
  "catalog.dept.watches.name": "Watches",
  "catalog.dept.watches.desc":
    "Luxury, smart, and casual watches from top brands.",
  "catalog.dept.automotive.name": "Automotive",
  "catalog.dept.automotive.desc":
    "Parts, accessories, tools, and care products for your vehicle.",

  // ── Subcategories ─────────────────────────────────────────────────
  "catalog.sub.smartphones": "Smartphones",
  "catalog.sub.laptops": "Laptops",
  "catalog.sub.audio": "Audio",
  "catalog.sub.cameras": "Cameras",
  "catalog.sub.wearables": "Wearables",
  "catalog.sub.accessories": "Accessories",
  "catalog.sub.men": "Men",
  "catalog.sub.women": "Women",
  "catalog.sub.kids": "Kids",
  "catalog.sub.shoes": "Shoes",
  "catalog.sub.bags": "Bags",
  "catalog.sub.jewelry": "Jewelry",
  "catalog.sub.furniture": "Furniture",
  "catalog.sub.decor": "Decor",
  "catalog.sub.kitchen": "Kitchen",
  "catalog.sub.bedding": "Bedding",
  "catalog.sub.lighting": "Lighting",
  "catalog.sub.garden": "Garden",
  "catalog.sub.gym": "Gym",
  "catalog.sub.running": "Running",
  "catalog.sub.cycling": "Cycling",
  "catalog.sub.yoga": "Yoga",
  "catalog.sub.outdoor": "Outdoor",
  "catalog.sub.supplements": "Supplements",
  "catalog.sub.skincare": "Skincare",
  "catalog.sub.makeup": "Makeup",
  "catalog.sub.haircare": "Haircare",
  "catalog.sub.fragrance": "Fragrance",
  "catalog.sub.tools": "Tools",
  "catalog.sub.organic": "Organic",
  "catalog.sub.consoles": "Consoles",
  "catalog.sub.pcGaming": "PC Gaming",
  "catalog.sub.controllers": "Controllers",
  "catalog.sub.headsets": "Headsets",
  "catalog.sub.chairs": "Chairs",
  "catalog.sub.merchandise": "Merchandise",
  "catalog.sub.smartWatches": "Smart Watches",
  "catalog.sub.luxury": "Luxury",
  "catalog.sub.casual": "Casual",
  "catalog.sub.sport": "Sport",
  "catalog.sub.bands": "Bands",
  "catalog.sub.parts": "Parts",
  "catalog.sub.carCare": "Car Care",
  "catalog.sub.interior": "Interior",
  "catalog.sub.electronics": "Electronics",
};

const it: Record<string, string> = {
  // ── Breadcrumb ────────────────────────────────────────────────────
  "catalog.breadcrumb.home": "Home",

  // ── Listings / states ─────────────────────────────────────────────
  "catalog.allProducts": "Tutti i prodotti",
  "catalog.loadingProducts": "Caricamento prodotti...",
  "catalog.showingOfProducts": "Visualizzati {count} di {total} prodotti",
  "catalog.noProductsFound": "Nessun prodotto trovato",
  "catalog.tryAdjusting": "Prova a modificare i filtri o i termini di ricerca.",
  "catalog.clearFilters": "Cancella filtri",
  "catalog.failedToLoad": "Impossibile caricare i prodotti",
  "catalog.all": "Tutti",

  // ── Filters ───────────────────────────────────────────────────────
  "catalog.applyFilters": "Applica filtri",
  "catalog.filters.quick": "Filtri rapidi",
  "catalog.filters.priceRange": "Fascia di prezzo",
  "catalog.filters.brands": "Marchi",
  "catalog.filters.customerRating": "Valutazione clienti",
  "catalog.filters.discount": "Sconto",
  "catalog.andUp": "e oltre",
  "catalog.closeFilters": "Chiudi filtri",
  "catalog.gridView": "Vista a griglia",
  "catalog.listView": "Vista a elenco",
  "catalog.sortLocked":
    "Ordinamento bloccato su Più recenti mentre Novità è attivo",

  // ── Clear chip aria-labels ────────────────────────────────────────
  "catalog.clearSearch": "Cancella ricerca",
  "catalog.clearCategory": "Cancella categoria",
  "catalog.clearNewArrivals": "Cancella novità",
  "catalog.clearPriceRange": "Cancella fascia di prezzo",
  "catalog.clearPrice": "Cancella prezzo",
  "catalog.clearDiscount": "Cancella sconto",

  // ── Sort options ──────────────────────────────────────────────────
  "catalog.sort.featured": "In evidenza",
  "catalog.sort.newest": "Più recenti",
  "catalog.sort.oldest": "Meno recenti",
  "catalog.sort.priceLow": "Prezzo: dal più basso",
  "catalog.sort.priceHigh": "Prezzo: dal più alto",
  "catalog.sort.nameAsc": "Nome: A-Z",
  "catalog.sort.nameDesc": "Nome: Z-A",
  "catalog.sort.bestRating": "Migliore valutazione",
  "catalog.sort.biggestDiscount": "Sconto maggiore",
  "catalog.sort.topRated": "Più votati",
  "catalog.sort.mostPopular": "Più popolari",
  "catalog.sort.mostViewed": "Più visti",
  "catalog.sort.endingSoon": "In scadenza",

  // ── Price ranges ──────────────────────────────────────────────────
  "catalog.price.all": "Tutti i prezzi",
  "catalog.price.under50": "Meno di $50",
  "catalog.price.under100": "Meno di $100",
  "catalog.price.50to100": "$50 - $100",
  "catalog.price.100to200": "$100 - $200",
  "catalog.price.100to500": "$100 - $500",
  "catalog.price.500to1000": "$500 - $1000",
  "catalog.price.over200": "Oltre $200",
  "catalog.price.over1000": "Oltre $1000",

  // ── Discount ranges ───────────────────────────────────────────────
  "catalog.discount.all": "Tutti gli sconti",
  "catalog.discount.30plus": "30% o più",
  "catalog.discount.50plus": "50% o più",
  "catalog.discount.70plus": "70% o più",

  // ── Category filter pills ─────────────────────────────────────────
  "catalog.filter.sports": "Sport",
  "catalog.filter.home": "Casa",

  // ── Cards ─────────────────────────────────────────────────────────
  "catalog.card.save": "Risparmia {amount}",
  "catalog.card.addToWishlist": "Aggiungi alla lista dei desideri",
  "catalog.card.removeFromWishlist": "Rimuovi dalla lista dei desideri",
  "catalog.card.quickView": "Anteprima rapida",
  "catalog.card.ratingStars": "{rating} su 5 stelle",
  "catalog.card.freeShipping": "Spedizione gratuita",
  "catalog.card.warranty": "Garanzia",
  "catalog.productsLower": "prodotti",
  "catalog.sellersCount": "{count} venditori",
  "catalog.browseCategory": "Sfoglia categoria",
  "catalog.noImage": "Nessuna immagine",

  // ── Categories page ───────────────────────────────────────────────
  "catalog.browseAllDepartments": "Sfoglia i prodotti di ogni reparto",
  "catalog.searchCategories": "Cerca categorie...",
  "catalog.noCategoriesFound": "Nessuna categoria trovata",
  "catalog.tryDifferentSearch": "Prova un altro termine di ricerca",

  // ── "Showing X …" split lines ─────────────────────────────────────
  "catalog.showingPrefix": "Mostrando",
  "catalog.dealsWord": "offerte",
  "catalog.trendingProductsWord": "prodotti di tendenza",

  // ── Stats strips ──────────────────────────────────────────────────
  "catalog.stats.activeDeals": "Offerte attive",
  "catalog.stats.maxDiscount": "Sconto massimo",
  "catalog.stats.itemsSold": "Articoli venduti",
  "catalog.stats.trendingItems": "Articoli di tendenza",
  "catalog.stats.viewsThisWeek": "Visualizzazioni questa settimana",
  "catalog.stats.purchased": "Acquistati",

  // ── Deals page ────────────────────────────────────────────────────
  "catalog.deals.subtitle": "{count} offerte selezionate aggiornate ogni giorno",
  "catalog.deals.newDealsAdded": "Nuove offerte aggiunte",
  "catalog.deals.everyDay": "ogni giorno",
  "catalog.deals.checkBack": "Torna domani per altre!",

  // ── Trending page ─────────────────────────────────────────────────
  "catalog.trending.title": "Di tendenza ora",
  "catalog.trending.subtitle": "I prodotti più popolari di questa settimana",
  "catalog.trending.bottomPre": "Prodotti di tendenza aggiornati",
  "catalog.trending.everyHour": "ogni ora",
  "catalog.trending.bottomPost": "in base ai dati in tempo reale",

  // ── Flash sale page ───────────────────────────────────────────────
  "catalog.flash.liveNow": "IN DIRETTA",
  "catalog.flash.subtitle": "{count} di {total} offerte · fino al 60% di sconto",
  "catalog.flash.saleEndsIn": "L'offerta termina tra",
  "catalog.flash.hours": "Ore",
  "catalog.flash.min": "Min",
  "catalog.flash.sec": "Sec",
  "catalog.flash.noDeals": "Nessuna offerta corrisponde ai tuoi filtri",
  "catalog.flash.tryAdjusting": "Prova a modificarli o a cancellarli.",
  "catalog.flash.sold": "{count} venduti",
  "catalog.flash.almostGone": "Quasi esaurito!",
  "catalog.flash.bottomPre": "Nuove offerte lampo aggiunte ogni",
  "catalog.flash.sixHours": "6 ore",
  "catalog.flash.bottomPost": "Non perdertele!",

  // ── Category detail page ──────────────────────────────────────────
  "catalog.categoryPage.electronicsDesc":
    "Scopri le ultime novità in elettronica e gadget. Dagli smartphone ai laptop, trova tutto ciò di cui hai bisogno.",

  // ── Departments (mock catalog data) ───────────────────────────────
  "catalog.dept.electronics.name": "Elettronica",
  "catalog.dept.electronics.desc":
    "Smartphone, laptop, audio, fotocamere e tutti i gadget più recenti.",
  "catalog.dept.fashion.name": "Moda",
  "catalog.dept.fashion.desc":
    "Abbigliamento, scarpe e accessori per uomo, donna e bambini.",
  "catalog.dept.home-garden.name": "Casa e giardino",
  "catalog.dept.home-garden.desc":
    "Mobili, decorazioni, essenziali per la cucina e attrezzi da giardino.",
  "catalog.dept.sports.name": "Sport e fitness",
  "catalog.dept.sports.desc":
    "Attrezzatura, abbigliamento e accessori per ogni sport.",
  "catalog.dept.beauty.name": "Bellezza",
  "catalog.dept.beauty.desc":
    "Cura della pelle, trucco, cura dei capelli e profumi dei migliori marchi.",
  "catalog.dept.gaming.name": "Gaming",
  "catalog.dept.gaming.desc":
    "Console, componenti per PC, periferiche e accessori da gaming.",
  "catalog.dept.watches.name": "Orologi",
  "catalog.dept.watches.desc":
    "Orologi di lusso, smart e casual dei migliori marchi.",
  "catalog.dept.automotive.name": "Automotive",
  "catalog.dept.automotive.desc":
    "Ricambi, accessori, attrezzi e prodotti per la cura del tuo veicolo.",

  // ── Subcategories ─────────────────────────────────────────────────
  "catalog.sub.smartphones": "Smartphone",
  "catalog.sub.laptops": "Laptop",
  "catalog.sub.audio": "Audio",
  "catalog.sub.cameras": "Fotocamere",
  "catalog.sub.wearables": "Dispositivi indossabili",
  "catalog.sub.accessories": "Accessori",
  "catalog.sub.men": "Uomo",
  "catalog.sub.women": "Donna",
  "catalog.sub.kids": "Bambini",
  "catalog.sub.shoes": "Scarpe",
  "catalog.sub.bags": "Borse",
  "catalog.sub.jewelry": "Gioielli",
  "catalog.sub.furniture": "Mobili",
  "catalog.sub.decor": "Decorazioni",
  "catalog.sub.kitchen": "Cucina",
  "catalog.sub.bedding": "Biancheria da letto",
  "catalog.sub.lighting": "Illuminazione",
  "catalog.sub.garden": "Giardino",
  "catalog.sub.gym": "Palestra",
  "catalog.sub.running": "Corsa",
  "catalog.sub.cycling": "Ciclismo",
  "catalog.sub.yoga": "Yoga",
  "catalog.sub.outdoor": "Outdoor",
  "catalog.sub.supplements": "Integratori",
  "catalog.sub.skincare": "Cura della pelle",
  "catalog.sub.makeup": "Trucco",
  "catalog.sub.haircare": "Cura dei capelli",
  "catalog.sub.fragrance": "Profumi",
  "catalog.sub.tools": "Attrezzi",
  "catalog.sub.organic": "Biologico",
  "catalog.sub.consoles": "Console",
  "catalog.sub.pcGaming": "PC Gaming",
  "catalog.sub.controllers": "Controller",
  "catalog.sub.headsets": "Cuffie",
  "catalog.sub.chairs": "Sedie",
  "catalog.sub.merchandise": "Merchandise",
  "catalog.sub.smartWatches": "Smartwatch",
  "catalog.sub.luxury": "Lusso",
  "catalog.sub.casual": "Casual",
  "catalog.sub.sport": "Sport",
  "catalog.sub.bands": "Cinturini",
  "catalog.sub.parts": "Ricambi",
  "catalog.sub.carCare": "Cura auto",
  "catalog.sub.interior": "Interni",
  "catalog.sub.electronics": "Elettronica",
};

export const catalog = { en, it };
