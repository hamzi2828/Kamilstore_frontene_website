// Login and register pages. Filled during conversion.
// Shared/reusable terms live in core.ts under `common.*` / `footer.*` and are
// referenced directly from the components (e.g. common.signIn, footer.termsOfService).
const en: Record<string, string> = {
  // ── Shared field labels ───────────────────────────────────────────
  "auth.field.email": "Email Address",
  "auth.field.emailPlaceholder": "you@example.com",
  "auth.field.password": "Password",
  "auth.field.fullName": "Full Name",
  "auth.field.phone": "Phone Number",
  "auth.field.confirmPassword": "Confirm Password",

  // ── Login ─────────────────────────────────────────────────────────
  "auth.login.brandTitleLine1": "Welcome back to",
  "auth.login.brandTitleLine2": "your marketplace",
  "auth.login.brandSub":
    "Shop from 1,200+ verified sellers with buyer protection on every order.",
  "auth.login.verifiedSellers": "1,200+ Verified Sellers",
  "auth.login.formSub": "Enter your credentials to access your account",
  "auth.login.error": "Login failed",
  "auth.login.passwordPlaceholder": "Enter your password",
  "auth.login.rememberMe": "Remember me",
  "auth.login.forgotPassword": "Forgot password?",
  "auth.login.signingIn": "Signing in...",
  "auth.login.noAccount": "Don't have an account?",
  "auth.login.createAccount": "Create account",

  // ── Register ──────────────────────────────────────────────────────
  "auth.register.brandTitleLine1": "Join the largest",
  "auth.register.brandTitleLine2": "multi-vendor marketplace",
  "auth.register.brandSub":
    "Create your free account and start discovering amazing products from trusted sellers.",
  "auth.register.buyerProtection": "100% Buyer Protection",
  "auth.register.productsCount": "50,000+ Products",
  "auth.register.title": "Create Account",
  "auth.register.formSub": "Fill in your details to get started",
  "auth.register.passwordMismatch": "Passwords do not match",
  "auth.register.error": "Registration failed",
  "auth.register.namePlaceholder": "John Doe",
  "auth.register.passwordPlaceholder": "Min 6 characters",
  "auth.register.confirmPasswordPlaceholder": "Re-enter your password",
  "auth.register.agreePrefix": "I agree to the",
  "auth.register.and": "and",
  "auth.register.creatingAccount": "Creating account...",
  "auth.register.orSignUpWith": "Or sign up with",
  "auth.register.haveAccount": "Already have an account?",
};

const it: Record<string, string> = {
  // ── Shared field labels ───────────────────────────────────────────
  "auth.field.email": "Indirizzo email",
  "auth.field.emailPlaceholder": "you@example.com",
  "auth.field.password": "Password",
  "auth.field.fullName": "Nome completo",
  "auth.field.phone": "Numero di telefono",
  "auth.field.confirmPassword": "Conferma password",

  // ── Login ─────────────────────────────────────────────────────────
  "auth.login.brandTitleLine1": "Bentornato nel tuo",
  "auth.login.brandTitleLine2": "marketplace",
  "auth.login.brandSub":
    "Acquista da oltre 1.200 venditori verificati con protezione acquirenti su ogni ordine.",
  "auth.login.verifiedSellers": "Oltre 1.200 venditori verificati",
  "auth.login.formSub": "Inserisci le tue credenziali per accedere al tuo account",
  "auth.login.error": "Accesso non riuscito",
  "auth.login.passwordPlaceholder": "Inserisci la tua password",
  "auth.login.rememberMe": "Ricordami",
  "auth.login.forgotPassword": "Password dimenticata?",
  "auth.login.signingIn": "Accesso in corso...",
  "auth.login.noAccount": "Non hai un account?",
  "auth.login.createAccount": "Crea un account",

  // ── Register ──────────────────────────────────────────────────────
  "auth.register.brandTitleLine1": "Unisciti al più grande",
  "auth.register.brandTitleLine2": "marketplace multi-venditore",
  "auth.register.brandSub":
    "Crea il tuo account gratuito e inizia a scoprire prodotti straordinari da venditori affidabili.",
  "auth.register.buyerProtection": "Protezione acquirenti al 100%",
  "auth.register.productsCount": "Oltre 50.000 prodotti",
  "auth.register.title": "Crea account",
  "auth.register.formSub": "Inserisci i tuoi dati per iniziare",
  "auth.register.passwordMismatch": "Le password non corrispondono",
  "auth.register.error": "Registrazione non riuscita",
  "auth.register.namePlaceholder": "Mario Rossi",
  "auth.register.passwordPlaceholder": "Min 6 caratteri",
  "auth.register.confirmPasswordPlaceholder": "Reinserisci la tua password",
  "auth.register.agreePrefix": "Accetto i",
  "auth.register.and": "e",
  "auth.register.creatingAccount": "Creazione account in corso...",
  "auth.register.orSignUpWith": "Oppure registrati con",
  "auth.register.haveAccount": "Hai già un account?",
};

export const auth = { en, it };
