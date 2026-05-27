# ⚽ World Cup 2026 Hub

![World Cup 2026](https://img.shields.io/badge/World_Cup-2026-9d4edd?style=for-the-badge&logo=soccer)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 Descripción del Proyecto

**World Cup 2026 Hub** es una aplicación web moderna y vibrante que proporciona información completa sobre el FIFA World Cup 2026. Diseñada con inspiración en el branding oficial del Mundial y los dashboards deportivos modernos, ofrece una experiencia visual espectacular.

### ✨ Características Principales

- 🌟 **Diseño Moderno y Vibrante** - Inspirado en FIFA World Cup 2026 branding
- 📱 **Responsive Design** - Funciona perfectamente en todos los dispositivos
- ⚡ **Carga Rápida** - Datos locales en JSON para máxima velocidad
- 🎨 **Efectos Visuales** - Animaciones fluidas y glassmorphism
- 📊 **Información Completa** - Equipos, partidos, posiciones, noticias
- 🎫 **Interfaz Intuitiva** - Fácil de navegar y usar
- 🔐 **Código Limpio** - Bien estructurado y documentado

## 📁 Estructura del Proyecto

```
worldcup-2026-app/
├── index.html                 # Página de inicio
├── README.md                  # Este archivo
├── .gitignore                 # Archivos a ignorar en Git
│
├── assets/
│   ├── images/               # Imágenes
│   ├── icons/                # Iconos
│   └── backgrounds/          # Fondos
│
├── css/
│   ├── styles.css            # Estilos principales
│   ├── animations.css        # Animaciones
│   └── responsive.css        # Diseño responsivo
│
├── js/
│   ├── api.js                # Servicio de API
│   ├── app.js                # Lógica principal
│   └── teams.js              # Lógica de equipos
│
├── pages/
│   ├── teams.html            # Página de equipos
│   ├── matches.html          # Página de partidos
│   ├── standings.html        # Página de posiciones
│   ├── stadiums.html         # Página de estadios
│   └── news.html             # Página de noticias
│
└── data/
    ├── teams.json            # Datos de equipos
    ├── matches.json          # Datos de partidos
    └── standings.json        # Datos de posiciones
```

## 🚀 Inicio Rápido

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git instalado
- Extensión Live Server para VS Code

### Instalación Local

1. **Clonar el repositorio** (después de crear en GitHub)
```bash
git clone https://github.com/tu-usuario/worldcup-2026-app.git
cd worldcup-2026-app
```

2. **Abrir con Live Server**
   - Click derecho en `index.html`
   - Seleccionar "Open with Live Server"
   - O presionar `Alt + L, O`

3. **¡Listo!** - La aplicación abrirá en `http://localhost:5500`

## 📚 Guía de Git & GitHub Flow

### Paso 1: Inicializar Git en Tu Máquina

```bash
# Verificar si Git está instalado
git --version

# Configurar usuario global (primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"

# Verificar configuración
git config --list
```

### Paso 2: Crear Repositorio en GitHub

1. **Ir a GitHub.com** y crear cuenta si no la tienes
2. **Click en el ícono `+`** → "New repository"
3. **Configurar el repositorio:**
   - Name: `worldcup-2026-app`
   - Description: `FIFA World Cup 2026 Hub - Aplicación web moderna`
   - Public o Private (elige según prefieras)
   - ✓ Add a README.md
   - ✓ Add .gitignore (seleccionar template si es necesario)

4. **Copiar la URL del repositorio** (botón verde "Code")

### Paso 3: Inicializar Git Localmente

```bash
# Navegar a la carpeta del proyecto
cd worldcup-2026-app

# Inicializar Git
git init

# Agregar repositorio remoto
git remote add origin https://github.com/tu-usuario/worldcup-2026-app.git

# Verificar que está configurado
git remote -v
```

### Paso 4: Primer Commit

```bash
# Ver cambios sin rastrear
git status

# Agregar todos los archivos
git add .

# Crear commit inicial
git commit -m "Initial commit: World Cup 2026 Hub base structure"

# Cambiar rama a main (si es necesario)
git branch -M main

# Subir los cambios
git push -u origin main
```

## 🌿 GitHub Flow - Guía Completa

### ¿Qué es GitHub Flow?

GitHub Flow es un flujo de trabajo simple y poderoso para colaboración en proyectos:

```
main branch
    ↓
crear feature branch
    ↓
realizar cambios
    ↓
crear pull request
    ↓
revisar código
    ↓
merge a main
    ↓
listo en producción
```

### Flujo Paso a Paso

#### 1️⃣ Crear una Feature Branch

```bash
# Asegurarse de estar en main y actualizado
git checkout main
git pull origin main

# Crear rama feature (nomenclatura: feature/descripcion)
git checkout -b feature/add-teams-page

# O en una línea:
git checkout -b feature/add-teams-page && git push -u origin feature/add-teams-page
```

**Convenciones de nombres:**
- `feature/` - nuevas funcionalidades
- `fix/` - correcciones de bugs
- `docs/` - documentación
- `style/` - cambios de estilo CSS
- `refactor/` - refactorización de código
- `test/` - pruebas

#### 2️⃣ Realizar Cambios

```bash
# Hacer cambios en archivos
# (editar, crear nuevos archivos, etc.)

# Ver cambios
git status

# Ver detalles de cambios
git diff

# Agregar cambios específicos
git add css/styles.css js/app.js

# O agregar todo
git add .

# Crear commit con mensaje descriptivo
git commit -m "feat: add modern gradient animations to hero section"
```

**Buenas prácticas en mensajes:**
```
feat: add new feature
fix: fix bug description
docs: update documentation
style: change CSS styles
refactor: refactor function logic
test: add test cases
chore: update dependencies
```

#### 3️⃣ Subir Cambios

```bash
# Subir rama al repositorio remoto
git push origin feature/add-teams-page

# O si ya está enlazada:
git push
```

#### 4️⃣ Crear Pull Request (PR)

1. **En GitHub**, verás un banner: "Pull Request"
2. **Click en "Compare & pull request"**
3. **Completar el PR:**
   - **Title**: Título descriptivo
   - **Description**: Qué cambios hiciste, por qué, etc.
   - **Reviewers**: Asignar revisores (equipo)
   - **Labels**: Agregar etiquetas (enhancement, bug, docs)

**Template de PR (crear en `.github/pull_request_template.md`):**
```markdown
## Descripción
Brevemente describe los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Actualización de documentación
- [ ] Refactor

## Cambios Realizados
- Cambio 1
- Cambio 2
- Cambio 3

## Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado testing
- [ ] Documenté los cambios
- [ ] Sin warnings o errores
```

#### 5️⃣ Revisar y Hacer Cambios

```bash
# Si hay solicitud de cambios:
# 1. Hacer los cambios locales
git add .
git commit -m "fix: address review comments"

# 2. Subir los cambios
git push origin feature/add-teams-page

# Los cambios se agregan automáticamente al PR
```

#### 6️⃣ Merge (Fusionar)

```bash
# En GitHub, click en "Merge pull request"
# Seleccionar tipo de merge:

# Opción A: Create a merge commit (recomendado)
# Mantiene historia clara

# Opción B: Squash and merge
# Comprime todos los commits en uno

# Opción C: Rebase and merge
# Reescribe la historia de commits
```

**O hacer merge localmente:**
```bash
# Actualizar main
git checkout main
git pull origin main

# Merge de la rama
git merge feature/add-teams-page

# Subir cambios
git push origin main

# Eliminar rama local (opcional)
git branch -d feature/add-teams-page

# Eliminar rama remota
git push origin --delete feature/add-teams-page
```

### Flujo Completo de Ejemplo

```bash
# 1. Actualizar main
git checkout main
git pull origin main

# 2. Crear rama feature
git checkout -b feature/add-news-page

# 3. Hacer cambios (editar archivos)

# 4. Confirmar cambios
git status
git add .
git commit -m "feat: add news page with animations"

# 5. Subir cambios
git push origin feature/add-news-page

# 6. Crear PR en GitHub (web)

# 7. Después del merge en GitHub:
git checkout main
git pull origin main

# 8. Limpiar rama local
git branch -d feature/add-news-page
git push origin --delete feature/add-news-page
```

## 🚀 Despliegue en Vercel

### Paso 1: Crear Cuenta en Vercel

1. **Ir a vercel.com**
2. **Click en "Sign Up"**
3. **Iniciar sesión con GitHub** (recomendado)
4. **Autorizar Vercel**

### Paso 2: Conectar Repositorio

1. **Dashboard de Vercel** → "New Project"
2. **Seleccionar GitHub**
3. **Buscar `worldcup-2026-app`**
4. **Click en "Import"**

### Paso 3: Configuración del Proyecto

```
Framework Preset: Otras (HTML/CSS/JS)
Root Directory: ./
Build Command: (dejar vacío)
Output Directory: (dejar vacío)
Environment Variables: (opcional)
```

### Paso 4: Deploy

1. **Click en "Deploy"**
2. **Esperar a que termine** (~30 segundos)
3. **¡Listo!** Tu sitio está en vivo

### Paso 5: Dominio Personalizado (Opcional)

1. **Ir a proyecto en Vercel**
2. **"Settings" → "Domains"**
3. **Agregar dominio personalizado**
4. **Seguir instrucciones de DNS**

### Deploy Automático

Vercel automáticamente despliega cuando:
- Haces push a `main`
- Se acepta un PR

**Ver despliegues:**
- Dashboard de Vercel
- Pestaña "Deployments"

### Variables de Entorno (si es necesario)

```bash
# .env.local (no versionar)
REACT_APP_API_URL=https://api.example.com
```

## 📋 Comandos Git Útiles

### Básicos
```bash
git status                    # Ver estado
git add .                     # Agregar cambios
git commit -m "mensaje"       # Crear commit
git push                      # Subir cambios
git pull                      # Descargar cambios
```

### Ramas
```bash
git branch                    # Listar ramas
git branch -a                 # Listar todas (local + remoto)
git checkout -b rama          # Crear y cambiar rama
git checkout rama             # Cambiar rama
git branch -d rama            # Eliminar rama local
git push origin --delete rama # Eliminar rama remota
```

### Historial
```bash
git log                       # Ver historial
git log --oneline            # Ver historial simplificado
git log --graph              # Ver gráfico de ramas
git log -p                   # Ver cambios detallados
```

### Deshacer Cambios
```bash
git restore archivo          # Deshacer cambios en archivo
git reset HEAD archivo       # Desagregar archivo
git revert HEAD              # Revertir último commit
git revert hash-commit       # Revertir commit específico
```

### Otros
```bash
git clone url                # Clonar repositorio
git remote -v               # Ver repositorios remotos
git fetch                   # Descargar sin fusionar
git stash                   # Guardar cambios temporalmente
git tag v1.0.0              # Crear etiqueta de versión
```

## 🤝 Colaboración en Equipo

### Configurar Protecciones de Branch

En GitHub → Repo Settings → Branches:
- ✓ Require pull request reviews
- ✓ Require status checks to pass
- ✓ Require branches to be up to date
- ✓ Dismiss stale pull request approvals

### Buenas Prácticas

1. **Comunica cambios grandes** antes de hacer PR
2. **Revisa código** de otros colaboradores
3. **Usa descriptivos en commits** - ayuda a entender la historia
4. **Pequeños PR** - más fáciles de revisar
5. **Merge a main solo lo que está listo** para producción

## 🐛 Resolver Conflictos

```bash
# Si hay conflicto al hacer merge:
git status  # Ver archivos en conflicto

# Editar archivos y resolver conflictos manualmente
# Buscar:
# <<<<<<< HEAD
# tu código
# =======
# código remoto
# >>>>>>> rama

# Después de resolver:
git add .
git commit -m "fix: resolve merge conflicts"
git push
```

## 📱 Características Desarrolladas

### ✅ Completado
- ✅ Homepage espectacular con hero section
- ✅ Página de equipos con filtros
- ✅ Página de partidos con estado
- ✅ Tabla de posiciones por grupo
- ✅ Página de estadios
- ✅ Sección de noticias
- ✅ Diseño responsive
- ✅ Animaciones modernas
- ✅ API de datos local
- ✅ Glassmorphism UI

### 🚀 Posibles Mejoras
- 📊 Gráficos interactivos con Chart.js
- 🔍 Buscador avanzado
- ⭐ Sistema de favoritos
- 📱 App móvil
- 🔐 Sistema de usuarios
- 💬 Chat en vivo
- 📊 Estadísticas avanzadas

## 🛠️ Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design**: CSS Grid, Flexbox, Gradients, Animations
- **Data**: JSON local
- **Hosting**: Vercel
- **Versionado**: Git & GitHub

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 👥 Colaboradores

- Tu nombre aquí
- Otros colaboradores

## 📧 Contacto

- Email: contacto@worldcup2026hub.com
- Twitter: @wc2026hub
- GitHub: github.com/tu-usuario/worldcup-2026-app

## 🎓 Recursos Adicionales

### Git & GitHub
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

### Vercel
- [Vercel Docs](https://vercel.com/docs)
- [Deploying with Vercel](https://vercel.com/docs/deployment)

### Frontend
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### Diseño
- [FIFA World Cup 2026](https://www.fifa.com/fifaworldcup/)
- [Color Palette Ideas](https://colorhunt.co/)
- [Unsplash Images](https://unsplash.com/)

---

## 📝 Notas

- Todos los datos de equipos y partidos son simulados para fines educativos
- Las imágenes pueden ser reemplazadas con contenido real
- La aplicación es completamente funcional sin dependencias externas

## 🎉 ¡Gracias por usar World Cup 2026 Hub!

Si te gustó este proyecto, por favor:
- ⭐ Dale una estrella en GitHub
- 🔄 Comparte con otros
- 🤝 Contribuye con mejoras
- 📝 Reporta bugs o sugiere features

---

**Hecho con ❤️ para los aficionados del fútbol mundial**

Última actualización: Mayo 2026
