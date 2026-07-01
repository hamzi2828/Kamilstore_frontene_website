// Product detail page and reviews section. Filled during conversion.
// New strings under the `product.` prefix. Shared terms live in core.ts (common.*).
const en: Record<string, string> = {
  // ── Product detail page ───────────────────────────────────────────
  "product.loadingProduct": "Loading product...",
  "product.notFound": "Product not found",
  "product.notFoundDesc": "We couldn't find a product matching this URL.",
  "product.browseAllProducts": "Browse all products",
  "product.reviewCount": "({count} reviews)",
  "product.inStockCount": "In Stock ({count})",
  "product.savePercent": "Save {percent}%",
  "product.addedToCart": "Added {count} × {name} to cart",
  "product.verified": "Verified",
  "product.productCount": "{count} products",
  "product.moreFromVendor": "More from this vendor",

  // ── Feature badges ────────────────────────────────────────────────
  "product.featureFreeShippingTitle": "Free Shipping",
  "product.featureFreeShippingDesc": "On orders over $50",
  "product.featureReturnsTitle": "Easy Returns",
  "product.featureReturnsDesc": "30 day return policy",
  "product.featureSecureTitle": "Secure Payment",
  "product.featureSecureDesc": "100% protected",
  "product.featureGenuineTitle": "Genuine Product",
  "product.featureGenuineDesc": "Verified by seller",

  // ── Tabs ──────────────────────────────────────────────────────────
  "product.tabDescription": "Description",
  "product.tabSpecifications": "Specifications",
  "product.tabReviewsCount": "Reviews ({count})",
  "product.noDescription": "No description provided for this product yet.",
  "product.noSpecifications": "No specifications available.",

  // ── Specification labels ──────────────────────────────────────────
  "product.specSku": "SKU",
  "product.specSubCategory": "Sub-category",
  "product.specSellingType": "Selling type",
  "product.specMinOrderQty": "Min order qty",
  "product.specTaxType": "Tax type",
  "product.specVariantSku": "Variant SKU",
  "product.specVariantStock": "Variant stock",

  // ── Reviews section ───────────────────────────────────────────────
  "product.writeReview": "Write a review",
  "product.updateYourReview": "Update your review",
  "product.reviewPlaceholder": "Share your experience with this product...",
  "product.saving": "Saving...",
  "product.submitReview": "Submit review",
  "product.updateReview": "Update review",
  "product.starSingular": "{count} star",
  "product.starPlural": "{count} stars",
  "product.toLeaveReview": " to leave a review.",
  "product.loadingReviews": "Loading reviews...",
  "product.noReviews": "No reviews yet. Be the first to review this product.",
  "product.userFallback": "User",
  "product.anonymous": "Anonymous",
};

const it: Record<string, string> = {
  // ── Product detail page ───────────────────────────────────────────
  "product.loadingProduct": "Caricamento prodotto...",
  "product.notFound": "Prodotto non trovato",
  "product.notFoundDesc":
    "Non abbiamo trovato un prodotto corrispondente a questo URL.",
  "product.browseAllProducts": "Sfoglia tutti i prodotti",
  "product.reviewCount": "({count} recensioni)",
  "product.inStockCount": "Disponibile ({count})",
  "product.savePercent": "Risparmia {percent}%",
  "product.addedToCart": "Aggiunti {count} × {name} al carrello",
  "product.verified": "Verificato",
  "product.productCount": "{count} prodotti",
  "product.moreFromVendor": "Altro da questo venditore",

  // ── Feature badges ────────────────────────────────────────────────
  "product.featureFreeShippingTitle": "Spedizione gratuita",
  "product.featureFreeShippingDesc": "Sugli ordini superiori a 50 $",
  "product.featureReturnsTitle": "Resi facili",
  "product.featureReturnsDesc": "Reso entro 30 giorni",
  "product.featureSecureTitle": "Pagamento sicuro",
  "product.featureSecureDesc": "100% protetto",
  "product.featureGenuineTitle": "Prodotto originale",
  "product.featureGenuineDesc": "Verificato dal venditore",

  // ── Tabs ──────────────────────────────────────────────────────────
  "product.tabDescription": "Descrizione",
  "product.tabSpecifications": "Specifiche",
  "product.tabReviewsCount": "Recensioni ({count})",
  "product.noDescription":
    "Nessuna descrizione disponibile per questo prodotto.",
  "product.noSpecifications": "Nessuna specifica disponibile.",

  // ── Specification labels ──────────────────────────────────────────
  "product.specSku": "SKU",
  "product.specSubCategory": "Sottocategoria",
  "product.specSellingType": "Tipo di vendita",
  "product.specMinOrderQty": "Quantità minima d'ordine",
  "product.specTaxType": "Tipo di imposta",
  "product.specVariantSku": "SKU variante",
  "product.specVariantStock": "Disponibilità variante",

  // ── Reviews section ───────────────────────────────────────────────
  "product.writeReview": "Scrivi una recensione",
  "product.updateYourReview": "Aggiorna la tua recensione",
  "product.reviewPlaceholder":
    "Condividi la tua esperienza con questo prodotto...",
  "product.saving": "Salvataggio...",
  "product.submitReview": "Invia recensione",
  "product.updateReview": "Aggiorna recensione",
  "product.starSingular": "{count} stella",
  "product.starPlural": "{count} stelle",
  "product.toLeaveReview": " per lasciare una recensione.",
  "product.loadingReviews": "Caricamento recensioni...",
  "product.noReviews":
    "Ancora nessuna recensione. Sii il primo a recensire questo prodotto.",
  "product.userFallback": "Utente",
  "product.anonymous": "Anonimo",
};

export const product = { en, it };
