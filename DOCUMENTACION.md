# MACHINA — Documentación Técnica del Frontend

> Mini-documentación de la estructura de la aplicación React (Next.js 14), el sistema de colores/estilos y el flujo completo de Login / Registro.

---

## Índice

1. [Stack Tecnológico](#1-stack-tecnológico)
2. [Estructura de Carpetas](#2-estructura-de-carpetas)
3. [Sistema de Colores](#3-sistema-de-colores)
   - 3.1 Paleta principal
   - 3.2 Configuración en Tailwind
   - 3.3 Utilidades CSS personalizadas
   - 3.4 Texturas y efectos visuales
4. [Layout Global (`layout.tsx`)](#4-layout-global)
5. [Navbar](#5-navbar)
6. [Página de Login — Detalle Completo](#6-página-de-login--detalle-completo)
   - 6.1 Estado y hooks
   - 6.2 Lógica de "Recordar sesión"
   - 6.3 Flujo de `handleSubmit`
   - 6.4 Estructura visual (JSX)
   - 6.5 Estilos línea por línea
7. [Página de Registro](#7-página-de-registro)
8. [Firebase y Firestore](#8-firebase-y-firestore)
9. [Animaciones](#9-animaciones)

---

## 1. Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **Next.js** | 14.2.0 | Framework React con App Router |
| **React** | 18.2.x | Librería UI |
| **TypeScript** | 5.8.x | Tipado estático |
| **TailwindCSS** | 3.4.x | Estilos utility-first |
| **Firebase** | 12.12.x | Auth, Firestore, Storage |
| **Lucide React** | 0.546.x | Iconos SVG |
| **clsx + tailwind-merge** | — | Merge condicional de clases |

---

## 2. Estructura de Carpetas

```
app/
├── layout.tsx            ← Layout raíz (Navbar + Footer + Chatbot)
├── globals.css           ← Estilos globales, colores, animaciones
├── page.tsx              ← Página principal (Home)
├── loading.tsx           ← Skeleton de carga
├── login/
│   └── page.tsx          ← Página de inicio de sesión
├── register/
│   └── page.tsx          ← Página de registro
├── forgot-password/
│   └── page.tsx          ← Recuperar contraseña
├── about/                ← Nosotros
├── catalog/              ← Catálogo de productos
├── contact/              ← Contacto
├── services/             ← Servicios
├── admin/                ← Panel de administración (9 archivos)
├── components/
│   ├── Navbar.tsx        ← Barra de navegación
│   ├── Footer.tsx        ← Pie de página
│   └── Chatbot.tsx       ← Widget de chat
└── lib/
    ├── firebase.ts       ← Configuración Firebase
    ├── firestore.ts      ← CRUD Firestore (productos, usuarios, categorías…)
    └── utils.ts          ← Función `cn()` (clsx + tailwind-merge)
```

---

## 3. Sistema de Colores

### 3.1 Paleta Principal

La app usa un tema **dark industrial** con acento amarillo/dorado.

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#FFC107` | Color de acento, CTAs, iconos destacados |
| `primary-hover` | `#FFB300` | Hover en botones primarios |
| `primary-light` | `#FFD54F` | Versión clara del primario |
| `dark-950` | `#050505` | Negro más profundo — fondo `<body>` |
| `dark-900` | `#0F1012` | Fondo principal de secciones |
| `dark-800` | `#18191C` | Cards, paneles elevados |
| `dark-700` | `#25262B` | Bordes, divisores |
| `dark-600` | `#2C2E33` | Bordes secundarios, scrollbar thumb |

Colores auxiliares de Tailwind usados directamente:
- `gray-300`, `gray-400`, `gray-500`, `gray-600`, `gray-700` → textos secundarios
- `white` / `white/5`, `white/10` → textos principales y overlays
- `red-400`, `red-500` → errores
- `green-500` → validaciones cumplidas

### 3.2 Configuración en Tailwind (`tailwind.config.js`)

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#FFC107',   // → text-primary, bg-primary
        hover: '#FFB300',     // → hover:bg-primary-hover
        light: '#FFD54F',     // → text-primary-light
      },
      dark: {
        950: '#050505',       // → bg-dark-950
        900: '#0F1012',       // → bg-dark-900
        800: '#18191C',       // → bg-dark-800
        700: '#25262B',       // → bg-dark-700, border-dark-700
        600: '#2C2E33',       // → bg-dark-600
      },
    },
  },
},
```

### 3.3 Utilidades CSS Personalizadas (`globals.css`)

Debido a que Tailwind v3 a veces necesita clases explícitas para opacidades, se definen manualmente:

```css
/* Fondos con opacidad */
.bg-primary\/10   → rgba(255, 193, 7, 0.1)   /* Fondos sutiles de acento */
.bg-primary\/20   → rgba(255, 193, 7, 0.2)
.bg-primary\/5    → rgba(255, 193, 7, 0.05)
.bg-dark-900\/90  → rgba(15, 16, 18, 0.9)    /* Navbar translúcida */
.bg-dark-950\/40  → rgba(5, 5, 5, 0.4)

/* Bordes con opacidad */
.border-primary\/20 → rgba(255, 193, 7, 0.2)
.border-primary\/50 → rgba(255, 193, 7, 0.5)

/* Texto con opacidad */
.text-primary\/80   → rgba(255, 193, 7, 0.8)
.text-primary\/90   → rgba(255, 193, 7, 0.9)

/* Foco */
.focus\:ring-primary:focus   → ring color #FFC107
.focus\:border-primary:focus → border color #FFC107
```

### 3.4 Texturas y Efectos Visuales

| Clase | Qué hace |
|---|---|
| `.bg-noise` | Superpone ruido fractal SVG con `mix-blend-mode: overlay` al 5% de opacidad. Da textura industrial. |
| `.bg-grid-pattern` | Cuadrícula 40×40px con líneas blancas al 3% de opacidad. |
| `.bg-metal` | Patrón de rayas diagonales 45° que simula metal cepillado. |
| `.bg-carbon` | Patrón de fibra de carbono con gradientes superpuestos. |
| `.text-shadow-sm` | Sombra de texto sutil `0 1px 2px rgba(0,0,0,0.5)`. |
| `.border-gradient` | Borde con gradiente de `#FFC107` a transparente usando `border-image`. |

**Scrollbar personalizado:**
```css
::-webkit-scrollbar           → width: 8px
::-webkit-scrollbar-track     → color #0F1012 (dark-900)
::-webkit-scrollbar-thumb     → color #2C2E33 (dark-600), bordes redondeados
::-webkit-scrollbar-thumb:hover → color #FFC107 (primary)
```

---

## 4. Layout Global

**Archivo:** `app/layout.tsx`

```tsx
<html lang="es">
  <body className="bg-dark-900 text-white font-sans antialiased">
    <div className="min-h-screen bg-dark-900 text-white font-sans
                    selection:bg-primary selection:text-dark-900 flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </div>
  </body>
</html>
```

**Qué hace cada cosa:**
- `bg-dark-900` → fondo oscuro `#0F1012`
- `text-white` → texto blanco por defecto
- `antialiased` → suavizado de fuentes
- `selection:bg-primary selection:text-dark-900` → al seleccionar texto, el highlight es amarillo con texto oscuro
- `flex flex-col` → columna flexible para que el footer quede abajo
- Las rutas `/admin/*` **no** renderizan Navbar, Footer ni Chatbot

---

## 5. Navbar

**Archivo:** `app/components/Navbar.tsx`

### Estilos del contenedor principal
```
bg-dark-900/90      → fondo oscuro al 90% opacidad (efecto glass)
backdrop-blur-xl    → desenfoque del contenido detrás
border-b border-white/5 → borde inferior casi invisible
sticky top-0 z-50   → pegado arriba, por encima de todo
bg-noise            → textura de ruido superpuesta
```

### Comportamiento por ruta
- En `/login`, `/register`, `/forgot-password`: **oculta** los links de navegación y muestra solo botones de autenticación alternos.
- Cuando el usuario está logueado: muestra su nombre, botón de logout, y si es admin un link "Panel Admin".
- Logo: icono `Hammer` sobre fondo `#FFC107` con sombra glow amarilla.

### Links activos vs inactivos
```tsx
// Activo:
"text-primary bg-white/5 border-white/10 shadow-inner"
// → texto amarillo, fondo blanco muy sutil, borde sutil, sombra interior

// Inactivo:
"text-gray-400 hover:text-white hover:bg-white/5"
// → gris, al hover se aclara
```

---

## 6. Página de Login — Detalle Completo

**Archivo:** `app/login/page.tsx` (285 líneas)

### 6.1 Estado y Hooks

```tsx
const router = useRouter();           // Navegación programática
const [email, setEmail] = useState('');         // Valor del input email
const [password, setPassword] = useState('');   // Valor del input password
const [showPassword, setShowPassword] = useState(false);  // Toggle ojo/contraseña
const [rememberMe, setRememberMe] = useState(false);      // Checkbox "Recordar"
const [loading, setLoading] = useState(false);             // Spinner del botón
const [error, setError] = useState('');                    // Mensaje de error
```

### 6.2 Lógica de "Recordar Sesión"

Al montar el componente (`useEffect`):
1. Lee `machina_remember_pref` de `localStorage`.
2. Si es `'true'`, carga el email guardado en `machina_remember` y activa el checkbox.
3. Si es `'false'` o no existe, no carga nada.

Al cambiar el checkbox:
- **Activar** → guarda email en `machina_remember` y pone `machina_remember_pref = 'true'`
- **Desactivar** → elimina `machina_remember` y pone `machina_remember_pref = 'false'`

### 6.3 Flujo de `handleSubmit`

```
1. preventDefault() — evita recarga
2. setLoading(true), setError('')
3. signInWithEmailAndPassword(auth, email, password)
   └─ Firebase Auth devuelve userCredential
4. ¿Email verificado? (userCredential.user.emailVerified)
   ├─ NO → muestra error, signOut(), return
   └─ SÍ → continua
5. getUserProfile(uid) — busca perfil en Firestore
   ├─ No existe → createUserProfile() con datos básicos → getUserProfile() otra vez
   └─ Existe → continua
6. Determina isAdmin (role === 'admin')
7. Construye objeto userData:
   { uid, email, nombre, role, isAdmin }
8. localStorage.setItem('machina_user', JSON.stringify(userData))
9. router.push('/') — redirige al Home
```

**Manejo de errores:**
| Código Firebase | Mensaje mostrado |
|---|---|
| `invalid-credential` / `wrong-password` | "Credenciales incorrectas. Verifica tu email y contraseña." |
| `user-not-found` | "No existe una cuenta con ese correo." |
| Otro | "Error al iniciar sesión. Intenta de nuevo." |

### 6.4 Estructura Visual (JSX)

```
┌─────────────────────────────────────────────────────┐
│  CONTENEDOR PRINCIPAL (min-h-screen, flex)           │
│  bg-[#0a0a0a]                                        │
│                                                      │
│  ┌─────────────────┐  ┌──────────────────────┐       │
│  │  LADO IZQUIERDO │  │  LADO DERECHO        │       │
│  │  (oculto <lg)   │  │  (formulario)        │       │
│  │  lg:w-1/2       │  │  w-full / lg:w-1/2   │       │
│  │                 │  │                      │       │
│  │  • Imagen fondo │  │  🔨 Icono Hammer     │       │
│  │    /Fondo2.avif │  │  "BIENVENIDO"        │       │
│  │  • Gradiente    │  │                      │       │
│  │  • Logo MACHINA │  │  [Email input]       │       │
│  │  • "PODER       │  │  [Password input]    │       │
│  │    ABSOLUTO     │  │  □ Recordar  ¿Olvi?  │       │
│  │    PARA TU      │  │                      │       │
│  │    OBRA"        │  │  [INICIAR SESIÓN →]  │       │
│  │  • Stats:       │  │                      │       │
│  │    500+ | 32 |  │  │  ¿No tienes cuenta?  │       │
│  │    24/7         │  │  Crear Cuenta         │       │
│  │  • © 2026       │  │                      │       │
│  └─────────────────┘  └──────────────────────┘       │
│                                                      │
│  [Elementos flotantes decorativos con animación]     │
└─────────────────────────────────────────────────────┘
```

### 6.5 Estilos Línea por Línea

#### Contenedor raíz
```tsx
<div className="min-h-screen bg-[#0a0a0a] flex relative overflow-hidden">
```
- `min-h-screen` → ocupa mínimo 100% del viewport
- `bg-[#0a0a0a]` → negro casi puro (un poco más claro que `#000`)
- `flex` → layout horizontal (izq/der)
- `overflow-hidden` → oculta elementos flotantes que se salen

#### Fondo con textura de construcción
```tsx
<div className="absolute inset-0 bg-[#0a0a0a]" />
<div className="absolute inset-0" style={{ opacity: 0.03, backgroundImage: "url(...cruces SVG...)" }} />
```
- Capa 1: fondo sólido negro
- Capa 2: patrón SVG de cruces `+` en color `#FFC107` al **3% de opacidad** — da una textura industrial muy sutil

#### Lado izquierdo (solo desktop ≥1024px)
```tsx
<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
```
- `hidden lg:flex` → invisible en móvil/tablet, visible en desktop
- `lg:w-1/2` → ocupa la mitad izquierda

**Imagen de fondo:**
```tsx
<div className="absolute inset-0 bg-cover bg-center"
     style={{ backgroundImage: 'url("/Fondo2.avif")' }}>
  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
</div>
```
- Imagen `.avif` a pantalla completa
- Gradiente de izquierda a derecha: negro sólido → 80% negro → transparente (la imagen se ve solo a la derecha)

**Logo grande:**
```tsx
<div className="w-16 h-16 bg-[#FFC107] rounded-sm flex items-center justify-center
                shadow-[0_0_30px_rgba(255,193,7,0.4)] float-element">
  <Hammer className="w-10 h-10 text-[#0a0a0a] transform -rotate-12" />
</div>
```
- Cuadrado amarillo `64×64px` con brillo/glow
- `shadow-[0_0_30px_rgba(255,193,7,0.4)]` → resplandor amarillo difuso
- `float-element` → animación de flotación (sube y baja)
- Icono martillo oscuro rotado -12°

**Título:**
```tsx
<span className="text-[#FFC107]">PARA TU OBRA</span>
```
- "PODER ABSOLUTO" en blanco, "PARA TU OBRA" en amarillo

**Estadísticas (500+, 32, 24/7):**
- Círculos con `bg-[#FFC107]/10` (amarillo al 10%)
- Iconos `Wrench`, `Truck` en amarillo
- Texto bold blanco + etiqueta gris

#### Lado derecho (formulario)
```tsx
<div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
```
- `w-full` en móvil (ocupa todo), `lg:w-1/2` en desktop

**Elementos flotantes decorativos:**
```tsx
<div className="absolute top-10 right-10 w-20 h-20 border border-[#FFC107]/10 rounded-lg float-element" />
<div className="absolute top-1/4 left-5 w-14 h-14 bg-[#FFC107]/5 rounded-full float-delayed" />
<div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-[#FFC107]/10 rounded-full float-slow" />
<div className="absolute bottom-20 left-10 w-12 h-12 bg-[#FFC107]/5 rounded-lg float-element" />
```
- Cuadrados y círculos semi-transparentes con borde amarillo al 10% o fondo al 5%
- Animaciones: `float-element` (6s), `float-delayed` (7s), `float-slow` (8s)
- `pointer-events-none` → no bloquean clicks

**Icono central del formulario:**
```tsx
<div className="w-20 h-20 bg-[#FFC107] rounded-sm ... shadow-[0_0_30px_rgba(255,193,7,0.4)] float-element">
  <Hammer />
</div>
```

**Título:**
```tsx
<h2 className="text-3xl font-black text-white mb-2 tracking-tight">BIENVENIDO</h2>
<p className="text-gray-500">Inicia sesión para continuar</p>
```
- `font-black` → peso 900 (extra bold)
- `tracking-tight` → letras más juntas

**Labels de los inputs:**
```tsx
<label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
```
- `text-xs` → 12px
- `uppercase tracking-widest` → mayúsculas con espaciado amplio (estilo industrial)
- `text-gray-500` → gris medio

**Input de Email:**
```tsx
<input className="w-full bg-[#111] border border-[#222] text-white pl-12 pr-4 py-4
                  rounded-lg focus:outline-none focus:border-[#FFC107] focus:ring-1
                  focus:ring-[#FFC107] transition-all font-mono placeholder:text-gray-700"
       placeholder="tu@correo.com" />
```
| Propiedad | Valor | Explicación |
|---|---|---|
| `bg-[#111]` | Fondo casi negro | Campo oscuro |
| `border border-[#222]` | Borde gris muy oscuro | Sutil separación |
| `text-white` | Texto blanco | Lo que escribe el usuario |
| `pl-12` | Padding izq 48px | Espacio para el icono |
| `py-4` | Padding vertical 16px | Altura cómoda |
| `rounded-lg` | Border radius 8px | Esquinas redondeadas |
| `focus:border-[#FFC107]` | Borde amarillo en focus | Feedback visual |
| `focus:ring-1 focus:ring-[#FFC107]` | Ring amarillo | Glow exterior |
| `font-mono` | Fuente monoespaciada | Estilo técnico/industrial |
| `placeholder:text-gray-700` | Placeholder muy oscuro | No distrae |

**Icono dentro del input:**
```tsx
<User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
```
- Posicionado absolutamente dentro del `relative`
- `left-4` → 16px desde la izquierda
- `-translate-y-1/2` → centrado verticalmente
- `text-gray-600` → gris oscuro

**Toggle mostrar/ocultar contraseña:**
```tsx
<button onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white">
  {showPassword ? <EyeOff /> : <Eye />}
</button>
```
- Cambia entre `type="text"` y `type="password"`
- Icono cambia entre ojo abierto y cerrado

**Checkbox "Recordar sesión":**
```tsx
<input type="checkbox"
       className="rounded border-[#333] bg-[#111] text-[#FFC107] focus:ring-[#FFC107]" />
```
- Cuando está marcado: amarillo `#FFC107`
- Fondo oscuro `#111`, borde `#333`

**Link "¿Olvidaste tu contraseña?":**
```tsx
<Link href="/forgot-password" className="text-[#FFC107] hover:underline text-sm">
```
- Amarillo, subrayado al hover

**Mensaje de error:**
```tsx
<div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
```
- Fondo rojo al 10% de opacidad
- Borde rojo al 30%
- Texto rojo claro

**Botón "INICIAR SESIÓN":**
```tsx
<button className="w-full bg-[#FFC107] text-[#0a0a0a] font-bold py-4 rounded-lg
                   hover:bg-[#FFB300] transition-all
                   shadow-[0_4px_14px_rgba(255,193,7,0.2)]
                   flex items-center justify-center gap-2 group
                   disabled:opacity-50 disabled:cursor-not-allowed">
```
| Propiedad | Explicación |
|---|---|
| `bg-[#FFC107]` | Fondo amarillo sólido |
| `text-[#0a0a0a]` | Texto negro sobre amarillo |
| `font-bold py-4` | Negrita, 16px padding vertical |
| `hover:bg-[#FFB300]` | Amarillo más oscuro al hover |
| `shadow-[0_4px_14px_rgba(255,193,7,0.2)]` | Sombra amarilla sutil debajo |
| `group` | Permite hover en hijos con `group-hover:` |
| `disabled:opacity-50` | Semi-transparente cuando carga |

**Flecha animada:**
```tsx
<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
```
- Se mueve 4px a la derecha cuando el botón tiene hover

**Spinner de carga:**
```tsx
<Loader2 className="w-5 h-5 animate-spin" />
```
- Icono girando infinitamente mientras `loading === true`

**Link "Crear Cuenta":**
```tsx
<Link href="/register" className="text-white font-bold hover:text-[#FFC107] transition-colors">
```
- Blanco por defecto, se pone amarillo al hover

---

## 7. Página de Registro

**Archivo:** `app/register/page.tsx` (346 líneas)

Misma estructura visual split-screen que Login. Diferencias clave:

### Campos adicionales
- **Nombre Completo** (icono `User`)
- **Correo Electrónico** (icono `Mail`)
- **Teléfono** (opcional, icono `Phone`)
- **Contraseña** con indicadores de requisitos
- **Confirmar Contraseña**
- **Aceptar términos** (checkbox obligatorio)

### Validación de contraseña en tiempo real
```tsx
const passwordRequirements = [
  { met: password.length >= 8, text: 'Al menos 8 caracteres' },
  { met: /[A-Z]/.test(password), text: 'Una letra mayúscula' },
  { met: /[a-z]/.test(password), text: 'Una letra minúscula' },
  { met: /[0-9]/.test(password), text: 'Un número' },
];
```
- Cada requisito muestra `CheckCircle` verde o `XCircle` gris
- Grid de 2 columnas debajo del campo

### Flujo de registro
```
1. Validaciones locales (términos, contraseñas coinciden, requisitos)
2. createUserWithEmailAndPassword(auth, email, password)
3. sendEmailVerification(user) — correo de verificación
4. updateProfile(user, { displayName: name })
5. createUserProfile(uid, { nombre, email, telefono, role: 'usuario' })
6. auth.signOut() — cierra sesión inmediatamente
7. Muestra pantalla de éxito: "¡Cuenta Creada! Verifica tu correo"
```

### Pantalla de éxito
- Fondo `#111` con borde `#222`, bordes redondeados `2xl`
- Icono `CheckCircle` grande dentro de círculo `#FFC107/20`
- Muestra el email al que se envió la verificación
- Botón "IR A INICIAR SESIÓN" → redirige a `/login`

---

## 8. Firebase y Firestore

### Configuración (`app/lib/firebase.ts`)
```tsx
const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```
Variables de entorno en `.env.local`.

### Exports
- `auth` → `getAuth(app)` — autenticación
- `db` → `getFirestore(app)` — base de datos
- `storage` → `getStorage(app)` — almacenamiento de archivos

### Colecciones Firestore
| Colección | Uso |
|---|---|
| `productos` | Catálogo de maquinaria |
| `categorias` | Categorías de productos |
| `mensajes_contacto` | Formulario de contacto |
| `favoritos` | Productos favoritos por usuario |
| `usuarios` | Perfiles de usuario (nombre, email, rol) |
| `config` | Configuración del sitio |

### Funciones principales en `firestore.ts`
- `getUserProfile(uid)` → busca por `userId` en colección `usuarios`
- `createUserProfile(uid, data)` → usa `setDoc` con `merge: true`
- `getProducts(category?)` → lista productos, filtro opcional
- `getCategories()` → categorías ordenadas por nombre
- CRUD completo para admin: `createProduct`, `updateProduct`, `deleteProduct`, etc.

### Utilidad `cn()` (`app/lib/utils.ts`)
```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
Combina clases condicionalmente y resuelve conflictos de Tailwind.

---

## 9. Animaciones

Definidas en `globals.css`:

| Clase | Keyframe | Duración | Efecto |
|---|---|---|---|
| `.float-element` | `float` | 6s | Sube 20px y rota 5° |
| `.float-delayed` | `float-delayed` | 7s | Sube 15px y rota -5° |
| `.float-slow` | `float-slow` | 8s | Sube 25px sin rotar |
| `.pulse-glow` | `pulse-glow` | 4s | Opacidad 0.3→0.6 + escala |
| `.slide-up` | `slide-up` | 0.6s | Aparece subiendo 30px |
| `.animate-fade-in` | `fade-in` | 0.6s | Solo opacidad |
| `.animate-fade-in-up` | `fade-in-up` | 0.8s | Opacidad + sube 20px |
| `.scroll-animate` | `scroll-fade-in` | 0.6s | Activado por scroll, sube 40px |

**Delays disponibles:** `.delay-100` a `.delay-500` (100ms incrementos)

**Delays escalonados para scroll:** `.scroll-animate-1` a `.scroll-animate-4`

---

## Resumen Visual del Flujo de Autenticación

```
┌──────────┐     ┌──────────┐     ┌───────────┐
│  /login  │────▶│ Firebase │────▶│  Firestore │
│          │     │   Auth   │     │  usuarios  │
│ email    │     │          │     │            │
│ password │     │ signIn() │     │ getUserPro │
└──────────┘     └────┬─────┘     └─────┬──────┘
                      │                 │
                      ▼                 ▼
               ¿Email verificado?  ¿Perfil existe?
               │            │      │           │
              NO           SÍ    NO           SÍ
               │            │      │           │
            signOut()       │   create()       │
            + error         │      │           │
                            ▼      ▼           ▼
                      localStorage.setItem('machina_user')
                            │
                            ▼
                      router.push('/')
```

---

*Generado automáticamente — Machina © 2026*
