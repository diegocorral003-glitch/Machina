# Plan de Trabajo - Machina

## Estado Actual del Proyecto

### ✅ COMPLETADO
- **Migración a Next.js**: Proyecto 100% en App Router (`app/`)
- **UI/UX**: Rediseño de páginas Nosotros, Catálogo, Contacto, Servicios
- **Autenticación**: Login, Register con Firebase Auth + perfil en Firestore
- **Catálogo**: Conectado a Firestore, filtros por categoría, búsqueda
- **Panel Admin**: Dashboard, CRUD productos, mensajes, configuración
- **Protección de rutas**: Solo admins pueden acceder al panel
- **Sistema de roles**: Usuarios con role "usuario" o "admin"

### ⚠️ POR COMPLETAR
- Asignar rol de admin al usuario principal

---

## Plan de Trabajo por Fases

---

### **FASE 1: Panel de Administración** ⭐ COMPLETADO
**Objetivo**: CRUD completo para gestionar el negocio

- [x] **1.1** Rutas del admin (`/admin`, `/admin/productos`, `/admin/mensajes`)
- [x] **1.2** CRUD de Productos (agregar, editar, eliminar maquinaria)
- [x] **1.3** Ver mensajes de contacto
- [x] **1.4** Marcar mensajes como leídos
- [x] **1.5** Dashboard admin con estadísticas básicas
- [x] **1.6** Configuración de empresa (datos, redes, chatbot)

---

### **FASE 2: Catálogo Mejorado** ⭐ Prioridad Alta
**Objetivo**: Mejorar experiencia de compra

- [ ] **2.1** Ordenar por precio, nombre, categoría
- [ ] **2.2** Paginación (si hay muchos productos)
- [ ] **2.3** Filtros más avanzados (precio, status)
- [ ] **2.4** Vista de cuadrícula vs lista

---

### **FASE 3: Funcionalidades de Usuario** ⭐ Prioridad Media
**Objetivo**: Funciones para usuarios logueados

- [ ] **3.1** Guardar productos favoritos (Firestore)
- [ ] **3.2** Perfil de usuario editable
- [ ] **3.3** Historial de cotizaciones

---

### **FASE 4: Página de Inicio Mejorada** ⭐ Prioridad Media
**Objetivo**: Landing más completa

- [ ] **4.1** Testimonios de clientes (carrusel)
- [ ] **4.2** Sección "Por qué elegirnos"
- [ ] **4.3** Llamadas a acción más claras
- [ ] **4.4** Usar datos de configuración de empresa

---

### **FASE 5: Optimización y SEO** ⭐ Prioridad Baja
**Objetivo**: Mejoras técnicas

- [ ] **5.1** Pantalla de carga global (fallback)
- [ ] **5.2** Transiciones suaves entre páginas
- [ ] **5.3** Meta tags y SEO básico
- [ ] **5.4** Favicon e icono de la app
- [ ] **5.5** 404 Page personalizada

---

## Notas Importantes

- **Firebase Firestore** ya está configurado y funcionando
- El proyecto usa **Next.js 14** con App Router
- **Firebase Auth** implementado para usuarios
- Sistema de roles: "usuario" (default) o "admin"
- Para hacer admin a un usuario: actualizar campo `role` en colección `usuarios`

---

## Siguiente Paso Recomendado

**FASE 2: Catálogo Mejorado** - Agregar filtros avanzados y ordenar productos