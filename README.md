# 🕵️ El Impostor - Juego de Palabras

Un emocionante juego de deducción social donde un jugador es el impostor y debe descubrir la palabra secreta a través de pistas.

---

## 📲 Instalación (Android)

### ✅ Opción 1: Descargar APK (RECOMENDADO)

La forma más fácil de instalar el juego en tu dispositivo Android:

[![Descargar APK](https://img.shields.io/badge/Descargar-APK%20v1.0-brightgreen?style=for-the-badge&logo=android)](https://github.com/Yisuescopeta/Juego-del-Impostor/releases/download/v1.0/ElImpostor-v1.0.apk)

1. **Descarga la APK** haciendo clic en el botón de arriba o desde [Releases](https://github.com/Yisuescopeta/Juego-del-Impostor/releases)
2. **Abre el archivo APK** en tu dispositivo Android
3. Si aparece "Instalación bloqueada":
   - Ve a `Ajustes → Seguridad`
   - Activa `Orígenes desconocidos` o `Instalar apps desconocidas`
4. **Instala y juega** 🎮

> ⚠️ **Nota:** Solo necesitas activar esta opción una vez. La app es 100% segura.

### Requisitos:
- Android 5.0 (Lollipop) o superior
- ~5 MB de espacio libre
- **No requiere internet para jugar**

---

## 🎮 Cómo Jugar

1. **Reúne a tus amigos** (3-10 jugadores recomendado)
2. **Un dispositivo para todos** - Se pasan el móvil entre jugadores
3. **Cada jugador ve su rol:**
   - 👥 **Ciudadanos:** Ven la palabra secreta
   - 🕵️ **Impostor:** Solo ve que es el impostor
4. **Discusión:** Cada jugador da una pista sobre la palabra
5. **Votación:** Intentan descubrir quién es el impostor
6. **Gana:**
   - El impostor si no lo descubren o adivina la palabra
   - Los ciudadanos si descubren al impostor

---

## ✨ Características

- 🎯 **1000+ palabras** con 3 pistas cada una
- 🎨 **Diseño futurista** con efectos neón
- 📱 **Funciona sin internet** - Juega donde quieras
- 🔄 **Partidas rápidas** - 5-10 minutos por ronda
- 👥 **Multijugador local** - Un solo dispositivo

---

## 🛠️ Desarrollo

### Tecnologías utilizadas:
- **Frontend:** React + Vite
- **Mobile:** Capacitor (Android nativo)
- **Estilos:** CSS con efectos neón/glassmorphism

### Estructura del proyecto:
```
EL Impostor/
├── android/                 # Proyecto Android Studio
├── src/                     # Código fuente React
│   ├── App.jsx             # Componente principal
│   └── data/               # Lista de palabras
├── dist/                    # Build de producción
└── package.json
```

### Compilar desde código:
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Sincronizar con Android
npx cap sync android
```

### Generar APK:
1. Abre `android/` en Android Studio
2. `Build → Build Bundle(s) / APK(s) → Build APK(s)`
3. La APK estará en `android/app/build/outputs/apk/release/`

---

## 📁 Releases

Cada versión incluye:
- **APK de instalación directa**
- Notas de la versión
- Changelog de mejoras

---

## 🎨 Diseño

- **Estilo:** Futurista sci-fi
- **Colores:** Cyan neón (#00f0ff) y Violeta (#a855f7)
- **Tipografía:** Orbitron (títulos) + Inter (cuerpo)
- **Efectos:** Glassmorphism, glow neón, animaciones suaves

---

## 📞 Soporte

¿Problemas con la instalación?

- **"App no instalada":** Asegúrate de tener espacio suficiente
- **"Bloqueado por seguridad":** Activa "Orígenes desconocidos" en Ajustes
- **"No compatible":** Requiere Android 5.0+

---

## 📄 Licencia

Este proyecto es de código abierto. ¡Siéntete libre de contribuir!

---

**Desarrollado con ❤️ para noches de juegos con amigos** 🕵️‍♂️✨
