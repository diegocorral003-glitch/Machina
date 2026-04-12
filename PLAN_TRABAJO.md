# Plan de Trabajo - Machina

## Estado Actual del Proyecto

### ✅ COMPLETADO
- **Autenticación**: Login, Register, Forgot Password con Firebase Auth
- **Catálogo**: Conectado a Firestore, filtros por categoría, búsqueda
- **Página de Inicio**: Productos dinámicos desde Firestore
- **Detalle de Producto**: Nueva página `/catalog/[id]`
- **UI/UX**: Skeleton loaders, animaciones flotantes, diseño consistente
- **Página de Contacto**: Rediseño completo con animaciones, formulario conectado a Firestore

### ⚠️ POR COMPLETAR
- Panel de Administración (CRUD de maquinaria, ver mensajes)
- Datos reales de contacto de la empresa

---

## Plan de Trabajo por Fases

---

### **FASE 1: Panel de Administración** ⭐ PRIORIDAD CRÍTICA
**Objetivo**: CRUD completo para gestionar el negocio

- [ ] **1.1** Rutas del admin (`/admin`, `/admin/productos`, `/admin/mensajes`)
- [ ] **1.2** Proteger rutas de admin (solo usuarios admin)
- [ ] **1.3** CRUD de Productos (agregar, editar, eliminar maquinaria)
- [ ] **1.4** Ver mensajes de contacto
- [ ] **1.5** Marcar mensajes como leídos
- [ ] **1.6** Dashboard admin con estadísticas básicas

---

### **FASE 2: Catálogo Mejorado** ⭐ Prioridad Alta
**Objetivo**: Mejorar experiencia de compra

- [ ] **2.1** Ordenar por precio, nombre, categoría
- [ ] **2.2** Paginación (si hay muchos productos)
- [ ] **2.3** Filtros más avanzados (precio, status)
- [ ] **2.4** Vista de cuadrícula vs lista

---

### **FASE 3: Página de Contacto Completa**
**Objetivo**: Datos reales + funcionalidad completa

- [ ] **3.1** Agregar datos reales de contacto (cuando los tengas)
- [ ] **3.2** Agregar mapa de Google Maps
- [ ] **3.3** Validación de campos del formulario

---

### **FASE 4: Página de Inicio Mejorada** ⭐ Prioridad Media
**Objetivo**: Landing más completa

- [ ] **4.1** Testimonios de clientes (carrusel)
- [ ] **4.2** Sección "Por qué elegirnos"
- [ ] **4.3** Llamadas a acción más claras

---

### **FASE 5: Funcionalidades de Usuario** ⭐ Prioridad Media
**Objetivo**: Funciones para usuarios logueados

- [ ] **5.1** Guardar productos favoritos (Firestore)
- [ ] **5.2** Historial de cotizaciones
- [ ] **5.3** Perfil de usuario editable

---

### **FASE 6: Página Nosotros**
**Objetivo**: Contenido corporativo

- [ ] **6.1** Agregar contenido corporativo
- [ ] **6.2** Agregar equipo de trabajo/imagenes
- [ ] **6.3** Agregar estadísticas o logros

---

### **FASE 7: Página Servicios**
**Objetivo**: Mejorar la página de servicios

- [ ] **7.1** Rediseñar cards de servicios
- [ ] **7.2** Agregar más servicios si es necesario

---

### **FASE 8: Optimización y SEO** ⭐ Prioridad Baja
**Objetivo**: Mejoras técnicas

- [ ] **8.1** Pantalla de carga global (fallback)
- [ ] **8.2** Transiciones suaves entre páginas
- [ ] **8.3** Meta tags y SEO básico
- [ ] **8.4** Favicon e icono de la app
- [ ] **8.5** 404 Page personalizada

---

## Orden Sugerido de Trabajo

```
PRIORIDAD CRÍTICA:
1. Panel Admin (CRUD maquinaria + ver mensajes)

PRIORIDAD ALTA:
2. Catálogo mejorado (filtros, orden)
3. Datos reales de contacto + Mapa

PRIORIDAD MEDIA:
4. Página de inicio (testimonios, por qué elegirnos)
5. Favoritos de usuario
6. Página About mejorada
7. Página Servicios mejorada

PRIORIDAD BAJA:
8. SEO y meta tags
9. Transiciones y animaciones
```

---

## Notas Importantes

- **Firebase Firestore** ya está configurado y funcionando
- El proyecto usa **Next.js 14** con App Router
- **Firebase Auth** ya está implementado para usuarios
- La base de datos ya tiene 8 productos de ejemplo
- Colección `mensajes_contacto` ya existe (los mensajes del formulario se guardan ahí)

---

## Siguiente Paso Recomendado

**FASE 1: Panel de Administración**

Comenzar a diseñar y construir el panel de admin para:
1. Gestionar productos (agregar/editar/eliminar maquinaria)
2. Ver y responder mensajes de contacto

¿Comenzamos con el Panel Admin?