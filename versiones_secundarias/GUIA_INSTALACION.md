# 📱 Guía de Instalación - El Impostor

## 🎮 ¿Qué es El Impostor?

**El Impostor** es un juego social de deducción para jugar con amigos. Una persona es el impostor y debe pasar desapercibida mientras todos hablan de una palabra secreta que solo ella no conoce.

### ✨ Características:
- 🎯 **1000 palabras** con 3 pistas diferentes cada una
- 🎨 **Diseño futurista** con efectos neón
- 📱 **Instalable** como app nativa en tu móvil
- 🔄 **Funciona sin internet** una vez instalada
- 👥 **Multijugador local** (un solo móvil para todos)

---

## 📲 Cómo Instalar en tu Móvil

### Para Android (Chrome/Edge/Samsung Internet):

1. **Abre el navegador** (Chrome, Edge o Samsung Internet)
2. **Visita la web** que te compartí
3. **Espera el mensaje** "Añadir a pantalla de inicio" o toca el menú (⋮)
4. **Selecciona** "Instalar aplicación" o "Añadir a pantalla de inicio"
5. **Confirma** la instalación
6. ✅ ¡Listo! Ahora tienes el icono en tu pantalla de inicio

**Captura de pantalla:**
- Busca el botón con un ➕ o el mensaje emergente
- El icono será un **ojo neón cyan/violeta** sobre fondo oscuro

---

### Para iPhone/iPad (Safari):

1. **Abre Safari** (debe ser Safari, no Chrome)
2. **Visita la web** que te compartí
3. **Toca el botón de compartir** (□↑) en la parte inferior
4. **Desplázate** y selecciona **"Añadir a pantalla de inicio"**
5. **Personaliza el nombre** si quieres (o deja "El Impostor")
6. **Toca "Añadir"** en la esquina superior derecha
7. ✅ ¡Listo! Ahora tienes el icono en tu pantalla de inicio

**Nota iOS:**
- Solo funciona en Safari, no en otros navegadores
- El icono aparecerá como cualquier otra app

---

## 🎯 Cómo Jugar

### Configuración:
1. **Abre la app** desde tu pantalla de inicio
2. **Añade jugadores**: Escribe el nombre de cada participante
3. **Inicia el juego**: Toca "Empezar Juego"

### Asignación de Roles:
1. **Pasa el móvil** al primer jugador
2. **Toca para revelar** tu rol:
   - 💙 **Jugador normal**: Verás la palabra secreta (ej: "Playa")
   - 💜 **Impostor**: Verás una pista relacionada (ej: "Arena")
3. **Oculta tu rol** tocando de nuevo
4. **Pasa el móvil** al siguiente jugador
5. Repite hasta que todos sepan su rol

### Jugando:
1. **Empieza el jugador indicado** en la pantalla "¡A JUGAR!"
2. **Cada uno dice una palabra** relacionada con la palabra secreta
3. **El impostor** debe fingir que sabe la palabra
4. **Después de una ronda**, votad quién creéis que es el impostor
5. **Gana el impostor** si no lo descubren, o **ganan los demás** si lo atrapan

---

## 🌐 Opciones de Distribución

### Opción 1: Hosting Online (Recomendado)

**Servicios gratuitos para subir la app:**

#### A) **Netlify** (Más fácil):
1. Ve a [netlify.com](https://www.netlify.com/)
2. Arrastra la carpeta `dist` a la web
3. Te dará una URL tipo: `https://tu-app.netlify.app`
4. Comparte esa URL con tus amigos

#### B) **Vercel**:
1. Ve a [vercel.com](https://vercel.com/)
2. Importa el proyecto desde GitHub o arrastra `dist`
3. Te dará una URL tipo: `https://tu-app.vercel.app`
4. Comparte esa URL con tus amigos

#### C) **GitHub Pages**:
1. Sube el contenido de `dist` a un repositorio de GitHub
2. Activa GitHub Pages en la configuración
3. Te dará una URL tipo: `https://tu-usuario.github.io/el-impostor`

---

### Opción 2: Servidor Local (Para jugar sin internet)

Si quieres compartir la app directamente sin subirla a internet:

1. **Instala un servidor local** en tu PC:
   ```bash
   npm install -g serve
   ```

2. **Ejecuta el servidor** desde la carpeta del proyecto:
   ```bash
   serve dist -l 3000
   ```

3. **Encuentra tu IP local**:
   - Windows: `ipconfig` (busca "Dirección IPv4")
   - Mac/Linux: `ifconfig` (busca "inet")

4. **Comparte la URL** con tus amigos en la misma red WiFi:
   ```
   http://TU-IP:3000
   ```
   Ejemplo: `http://192.168.1.100:3000`

5. **Tus amigos abren esa URL** en su navegador móvil e instalan la app

---

## 🔧 Solución de Problemas

### "No aparece el botón de instalar"
- **Android**: Asegúrate de usar Chrome, Edge o Samsung Internet
- **iOS**: Debes usar Safari obligatoriamente
- Espera unos segundos, a veces tarda en aparecer

### "La app no funciona sin internet"
- La primera vez necesitas internet para instalarla
- Después funcionará offline automáticamente
- Si no funciona, reinstala la app

### "El icono no se ve bien"
- Elimina la app y reinstálala
- Asegúrate de que la web esté actualizada

### "No puedo añadir jugadores"
- Toca directamente en el campo de texto
- Escribe el nombre y pulsa Enter o el botón "+"

---

## 📊 Información Técnica

- **Tecnología**: Progressive Web App (PWA)
- **Compatibilidad**: 
  - ✅ Android 5.0+ (Chrome, Edge, Samsung Internet)
  - ✅ iOS 11.3+ (Safari)
  - ✅ Tablets y móviles
- **Tamaño**: ~1.2 MB
- **Offline**: Funciona sin conexión después de instalar
- **Actualizaciones**: Automáticas al abrir la app con internet

---

## 🎨 Créditos

**Desarrollado con:**
- React + Vite
- Framer Motion (animaciones)
- PWA (instalación móvil)
- 1000 palabras cuidadosamente seleccionadas

**Diseño:**
- Estilo futurista con glassmorphism
- Colores neón cyan y violeta
- Tipografía Orbitron + Inter

---

## 📞 Soporte

Si tienes problemas:
1. Asegúrate de tener la última versión del navegador
2. Prueba a reinstalar la app
3. Verifica que tu móvil tenga espacio suficiente
4. Contacta con el desarrollador

---

¡Disfruta jugando a **El Impostor** con tus amigos! 🕵️‍♂️✨
