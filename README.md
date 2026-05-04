# TeamManager

TeamManager es una aplicación web progresiva (PWA) diseñada para optimizar la gestión de guardias y turnos en equipos de admisiones de residencias universitarias. El sistema automatiza la asignación de horarios considerando las restricciones académicas de los miembros del equipo.

## Caracteristicas Principales

- Gestion Dinamica de Equipos: Permite agregar, editar y eliminar perfiles de miembros, incluyendo datos de contacto y matrices de disponibilidad semanal.
- Calculadora de Turnos Inteligente: Algoritmo que cruza los parametros de tiempo (duracion, fecha, turnos por dia) con la disponibilidad de los estudiantes.
- Distribucion Equitativa: El sistema garantiza una carga de trabajo balanceada entre todos los miembros activos.
- Soporte PWA y Offline: Instalable en dispositivos moviles y de escritorio con capacidad de visualizar horarios guardados sin conexion a internet.
- Persistencia Local: Los datos se almacenan de forma segura en el navegador mediante localStorage.
- Portabilidad de Datos: Funciones integradas para exportar e importar la configuracion completa del equipo y calendarios en formato JSON.

## Flujo de Trabajo

La aplicacion se divide en tres secciones principales:

1. Calculadora: Proceso de tres pasos para definir parametros, revisar conflictos de disponibilidad y generar el resultado final.
2. Horarios: Repositorio de calendarios generados y guardados para consulta rapida.
3. Perfiles: Panel de administracion para la gestion de los integrantes del equipo.

## Especificaciones Tecnicas

### Reglas del Algoritmo
- Turnos consecutivos desde la hora de inicio definida.
- Turnos homogeneos de lunes a viernes (excluye fines de semana).
- Capacidad de asignacion manual para resolver casos excepcionales o turnos adicionales.

### Interfaz y Diseño
- Estetica Dark Mode: Fondo #0F0F13 y tarjetas #1A1A24.
- Color de Acento: #A78BFA.
- Tipografia: Montserrat para titulos y Roboto para el cuerpo de texto.
- Iconografia: Implementada con react-icons.

## Requisitos de Usuario

Cada perfil de usuario incluye:
- Nombre y Rol.
- Indicador de estudiante extranjero.
- Acceso directo a WhatsApp y correo electronico.
- Matriz de disponibilidad basada en horarios de clases.

## Instalacion y Uso

Al ser una PWA, puedes acceder a la aplicacion desde el navegador e instalarla directamente en tu pantalla de inicio para un acceso mas rapido y funcionamiento offline.

Para desarrolladores:
1. Clonar el repositorio.
2. Instalar dependencias necesarias (React y react-icons).
3. Ejecutar el servidor de desarrollo local.
