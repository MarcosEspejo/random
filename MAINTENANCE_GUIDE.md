# 🔧 Guía de Mantenimiento

## ✅ Forma más fácil - Variable de entorno en Vercel:

### Para ACTIVAR modo mantenimiento:
1. Ve a https://vercel.com/marcos-projects-07c9c421/random/settings/environment-variables
2. Clic en **"Add New"**
3. Agrega:
   - **Name**: `VITE_MAINTENANCE_MODE`
   - **Value**: `true`
   - Marca: **Production**, **Preview**, **Development**
4. Clic en **"Save"**
5. Ve a la terminal y ejecuta: `vercel --prod`

### Para DESACTIVAR modo mantenimiento:
1. Ve a la misma página de variables de entorno
2. Encuentra `VITE_MAINTENANCE_MODE`
3. Haz clic en los 3 puntos → **"Delete"**
4. En la terminal ejecuta: `vercel --prod`

---

## Otras opciones:

### **Opción 2: Pausar Railway (Desactiva el chat)**
1. Ve a https://railway.app/dashboard
2. Selecciona tu proyecto "random"
3. Settings → Sleep/Pause Service
4. El servidor de Socket.IO se detendrá (el frontend seguirá pero sin funcionalidad de chat)

### **Opción 3: Modo Mantenimiento con Vercel (Más profesional)**

#### A. Usando la página de mantenimiento:
1. Renombra temporalmente el archivo:
   ```powershell
   mv index.html index.html.backup
   mv maintenance.html index.html
   ```

2. Sube los cambios:
   ```powershell
   git add .
   git commit -m "Activar modo mantenimiento"
   git push
   ```

3. Vercel desplegará automáticamente la página de mantenimiento

#### B. Para restaurar el servicio:
   ```powershell
   mv index.html maintenance.html
   mv index.html.backup index.html
   git add .
   git commit -m "Restaurar servicio"
   git push
   ```

### **Opción 4: Variable de entorno (Más técnico)**
Agrega una variable `MAINTENANCE_MODE=true` en Vercel y modifica el código para detectarla.

---

## 🚨 Métodos rápidos de "apagado":

### Más rápido: Pausar Railway
- ⏱️ Tiempo: 10 segundos
- ✅ Efecto: El chat deja de funcionar
- ⚠️ El frontend sigue visible pero sin funcionalidad

### Más profesional: Página de mantenimiento
- ⏱️ Tiempo: 2 minutos
- ✅ Efecto: Muestra mensaje personalizado
- ✅ Los usuarios entienden que es temporal

### Más drástico: Pausar Vercel
- ⏱️ Tiempo: 30 segundos
- ✅ Efecto: Todo el sitio se apaga
- ⚠️ Puede mostrar error 404 de Vercel
