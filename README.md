# 📱 El Impostor - PWA Instalable

¡Tu aplicación **El Impostor** está lista para ser instalada en móviles! 🎉

## 🚀 Opciones para Compartir con tus Amigos

### ✅ Opción 1: Hosting Online (RECOMENDADO)

Esta es la forma más fácil. Sube la carpeta `dist` a uno de estos servicios gratuitos:

#### **Netlify** (Más Rápido):
1. Ve a [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta **`dist`** a la página
3. ¡Listo! Te dará una URL como `https://tu-app.netlify.app`
4. Comparte esa URL con tus amigos

#### **Vercel**:
1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Arrastra la carpeta **`dist`** o conecta con GitHub
3. Te dará una URL como `https://tu-app.vercel.app`
4. Comparte esa URL con tus amigos

#### **GitHub Pages**:
1. Crea un repositorio en GitHub
2. Sube el contenido de la carpeta `dist`
3. Activa GitHub Pages en Settings → Pages
4. Te dará una URL como `https://tu-usuario.github.io/el-impostor`

---

### 🏠 Opción 2: Servidor Local (Sin Internet)

Si quieres compartir la app en tu red WiFi local:

#### Método Automático (PowerShell):
```powershell
.\deploy.ps1
```
Sigue las instrucciones en pantalla.

#### Método Manual:
```bash
# 1. Instalar serve (solo la primera vez)
npm install -g serve

# 2. Iniciar servidor
serve dist -l 3000

# 3. Obtener tu IP local
ipconfig  # Busca "Dirección IPv4"

# 4. Compartir la URL con tus amigos:
# http://TU-IP:3000
# Ejemplo: http://192.168.1.100:3000
```

**Nota:** Tus amigos deben estar en la misma red WiFi.

---

## 📲 Cómo Instalan tus Amigos la App

### En Android:
1. Abrir la URL en **Chrome**, **Edge** o **Samsung Internet**
2. Tocar el mensaje "Añadir a pantalla de inicio" o el menú (⋮)
3. Seleccionar "Instalar aplicación"
4. ¡Listo! El icono aparecerá en la pantalla de inicio

### En iPhone/iPad:
1. Abrir la URL en **Safari** (obligatorio)
2. Tocar el botón de compartir (□↑)
3. Seleccionar "Añadir a pantalla de inicio"
4. Tocar "Añadir"
5. ¡Listo! El icono aparecerá en la pantalla de inicio

---

## 🎮 Características de la PWA

✅ **Instalable** como app nativa
✅ **Funciona offline** después de la primera carga
✅ **Icono personalizado** (ojo neón futurista)
✅ **Pantalla completa** sin barra del navegador
✅ **Actualizaciones automáticas** al abrir con internet
✅ **1000 palabras** con 3 pistas cada una
✅ **Diseño futurista** con efectos neón

---

## 📁 Estructura del Proyecto

```
EL Impostor/
├── dist/                    # ← Carpeta para subir a hosting
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── sw.js               # Service Worker
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── assets/
├── src/                     # Código fuente
├── public/                  # Recursos públicos
├── deploy.ps1              # Script de despliegue
├── GUIA_INSTALACION.md     # Guía para usuarios
└── package.json
```

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (http://localhost:5173)

# Producción
npm run build            # Construir para producción
npm run preview          # Vista previa de la build (http://localhost:4173)

# Despliegue
.\deploy.ps1             # Script automático de despliegue
```

---

## 📊 Información Técnica

- **Tamaño total:** ~1.2 MB
- **Tecnología:** React + Vite + PWA
- **Service Worker:** Workbox (caché automático)
- **Manifest:** Configurado para Android e iOS
- **Iconos:** 192x192 y 512x512 (maskable)
- **Offline:** Funciona sin conexión
- **Fuentes:** Google Fonts (cacheadas)

---

## ✨ Verificación de PWA

La aplicación cumple con todos los requisitos de PWA:

✅ Manifest configurado correctamente
✅ Service Worker registrado y activo
✅ Iconos en tamaños requeridos
✅ HTTPS (en producción) o localhost
✅ Modo standalone
✅ Tema y colores definidos

---

## 🎯 Próximos Pasos

1. **Construir la app** (si no lo has hecho):
   ```bash
   npm run build
   ```

2. **Elegir método de distribución:**
   - **Online:** Sube `dist` a Netlify/Vercel
   - **Local:** Ejecuta `.\deploy.ps1`

3. **Compartir URL** con tus amigos

4. **Disfrutar jugando** 🎮

---

## 📞 Soporte

Si tus amigos tienen problemas:

- **No aparece el botón de instalar:**
  - Android: Usar Chrome/Edge/Samsung Internet
  - iOS: Usar Safari obligatoriamente
  
- **No funciona offline:**
  - Necesitan abrir la app al menos una vez con internet
  - El Service Worker se registra automáticamente

- **El icono no se ve:**
  - Eliminar y reinstalar la app
  - Verificar que la URL esté actualizada

---

## 🎨 Diseño

- **Estilo:** Futurista sci-fi
- **Colores:** Cyan neón (#00f0ff) y Violeta (#a855f7)
- **Tipografía:** Orbitron (títulos) + Inter (cuerpo)
- **Efectos:** Glassmorphism, glow neón, animaciones suaves

---

¡Disfruta compartiendo **El Impostor** con tus amigos! 🕵️‍♂️✨

**Desarrollado con ❤️ usando React, Vite y PWA**
