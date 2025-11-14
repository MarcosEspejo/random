# 🔧 Guía de Mantenimiento

## Opciones para poner la app en mantenimiento:

### **Opción 1: Pausar en Vercel (Recomendado)**
1. Ve a https://vercel.com/marcos-projects-07c9c421/random
2. Settings → General
3. Busca "Pause Deployments" o "Disable Project"
4. La app dejará de estar disponible temporalmente

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
