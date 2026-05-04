# TeamManager — Documento de Especificación v1.0

## 1. Descripción General

**TeamManager** es una aplicación web progresiva (PWA) orientada a la gestión de guardias para líderes del equipo de admisiones en residencias universitarias. Su objetivo principal es automatizar y optimizar la asignación de turnos, considerando las restricciones de disponibilidad de los miembros, quienes son estudiantes con horarios variables.

---

## 2. Usuarios y Datos del Equipo

Cada miembro del equipo cuenta con un perfil que incluye:

- Nombre
- Rol
- Indicador de estudiante extranjero (booleano)
- Enlace directo a WhatsApp
- Correo electrónico
- Matriz de disponibilidad semanal:
  - Basada en su horario de clases
  - Representada como bloques ocupados de lunes a viernes

### Gestión de miembros

- La cantidad de miembros es dinámica
- Se permite:
  - Agregar perfiles
  - Editar perfiles existentes
  - Eliminar perfiles

---

## 3. Calculadora de Turnos

El módulo principal funciona mediante un flujo de tres pasos:

### 3.1 Parámetros

El usuario define:

- Periodo (fecha de inicio y fin)
- Duración del turno (1 o 2 horas)
- Hora de inicio del día
- Número de turnos por día

### 3.2 Revisión de disponibilidad

- El sistema cruza los parámetros con la disponibilidad de los perfiles
- Se identifican y muestran conflictos

### 3.3 Resultado editable

- Se genera un calendario semanal (lunes a viernes)
- Cada bloque incluye un selector para reasignación manual
- La reasignación puede ignorar las reglas del algoritmo

---

## 4. Reglas del Algoritmo

- Distribución equitativa de turnos entre todos los miembros activos
- Si el total de turnos no es divisible equitativamente:
  - Se muestra un panel de selección (checkboxes)
  - El líder puede asignar un turno adicional (máximo uno) a miembros específicos

### Restricciones

- Los turnos:
  - Son consecutivos desde la hora de inicio
  - Son homogéneos de lunes a viernes
  - No incluyen fines de semana

---

## 5. Persistencia y Portabilidad

- Todos los datos se almacenan en `localStorage`
- Se permite:

### Exportación

- Perfiles del equipo
- Calendarios generados
- Formato: JSON

### Importación

- Restauración de datos desde archivos JSON
- Transferencia entre dispositivos
- Traspaso entre líderes

---

## 6. PWA y Funcionamiento Offline

- La aplicación es instalable como PWA
- La vista **Horarios actuales**:
  - Funciona completamente offline
  - Incluye calendarios previamente generados y guardados

- El resto de vistas:
  - Requieren carga inicial

---

## 7. Navegación

La aplicación cuenta con tres secciones principales accesibles desde el encabezado:

- **Calculadora**
  - Flujo completo de generación de turnos (3 pasos)

- **Horarios**
  - Visualización de calendarios guardados

- **Perfiles**
  - Gestión de miembros del equipo

---

## 8. Diseño Visual

### Paleta de colores

- Fondo: `#0F0F13`
- Superficie / tarjetas: `#1A1A24`
- Color de acento: `#A78BFA`
- Texto primario: `#FFFFFF`
- Texto secundario: `#94A3B8`

### Tipografía

- Títulos: Montserrat
- Cuerpo: Roboto

### Iconografía

- Biblioteca: `react-icons`