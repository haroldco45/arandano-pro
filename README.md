# Arándano Pro — Guía del arandanero

App (PWA) bilingüe español / inglés para el cultivador de arándanos. Desarrollada por **Vibras Positivas HM — Derechos de Autor Reservados**.

**URL:** https://arandano-pro.netlify.app (repo sugerido: `haroldco45/arandano-pro`)

## Qué trae

**Hoy**
- Clima real de 7 días de la finca (Open‑Meteo, sin clave): 15 municipios arandaneros o el GPS del celular.
- Alertas de helada según la etapa de la planta (yema −6 °C, botón −4 °C, flor −2,3 °C, cuaja −1,1 °C), calor (28–30 °C), lluvia en cosecha (> 5 mm) y radiación (≥ 27 MJ/m²).
- Días‑grado de la semana, días estimados de yema a cosecha y ET0 (el agua que pide hoy).
- Revisión a mano cuando no hay señal, dato del día y resumen de la finca.
- Se actualiza cada vez que se abre la app y con el botón Actualizar.

**Cultivo**: En Colombia (caso Soatá, Boyacá) · Variedades con filtro por horas frío y marca de las que no pagan regalías · Siembra paso a paso · Clima · Suelo y nutrición · Poda · Riego, abejas y abejorros · Plagas y enfermedades (buscador por síntomas y 10 insectos plaga con umbrales) · Cosecha, calidad y poscosecha · Clima que cambia.

**Calcular**: plantas y sustrato · riego de hoy (ET0 × Kc × Fc, con eficiencia del goteo) · fertilización por rendimiento · poda y carga (yemas por planta) · monitoreo de plagas con umbrales (chiza, cuncunilla, cortadores, pulgones, enrollador, chanchito) · plata del proyecto a 12 años (VAN, TIR y recuperación) · pago de cosecha · exportadora o intermediario · análisis foliar.

**Mi finca**: bitácora de labores, cosechas y ventas · lista BPA de 23 puntos · nombre de la finca · respaldo `.json` y bitácora en `.csv` para Excel.

**Mercado**: Colombia 2025–2026, Agroventure Capital, producción y comercio mundial, y los otros 9 cultivos de la guía CIREN.

## Fuentes
- INIA‑INDAP (2017). *Manual de manejo agronómico del arándano*. Boletín INIA N.º 371.
- Undurraga, P. y Vargas, S. (eds.) (2013). *Manual del arándano*. Boletín INIA N.º 263.
- CIREN (2020). *Guía productiva para el cultivo de especies hortofrutícolas en la región del Maule*.
- López, Guevara y Bogoya (2021). *Producción del cultivo de arándanos bajo BPA en famiempresa del sector Soatá, Boyacá*. UNAD.
- Asocolblue en Portal Frutícola (feb. y abr. 2026); Forbes Colombia (may. 2026); Revista U.D.C.A (2012).
- Fotos: tomadas de los cuatro documentos.

## Archivos
```
index.html      app completa
manifest.json   PWA
sw.js           funciona sin internet
og-image.jpg    vista previa al compartir (1200×630)
icon-192.png    ícono de la app
icon-512.png
img/            fotos reales (44)
README.md
```

## Publicar
1. Crear el repo `arandano-pro` en GitHub y subir todos los archivos (con la carpeta `img/`).
2. Activar GitHub Pages (rama `main`, carpeta raíz).
3. En Netlify, nombre del sitio: `arandano-pro`, conectado al repo. Si se usa otro nombre, cambiar la URL de `og:image` y `og:url` en `index.html`.

Los datos de la bitácora, la lista BPA y las calculadoras quedan guardados en el celular (localStorage).
