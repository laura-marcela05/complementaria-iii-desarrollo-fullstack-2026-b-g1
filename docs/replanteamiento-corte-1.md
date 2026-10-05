---
title: "Replanteamiento y recomendaciones — Corte 1"
---

# Replanteamiento y recomendaciones — Documentación de proyecto

**Complementaria III · Profundización Desarrollo Fullstack · 2026-B**
Corte de revisión: **28 de septiembre de 2026** · Framework: [`monolith-governance-framework`](https://github.com/jesusarielgb-works/monolith-governance-framework)

---

## 1. Qué se midió y contra qué

La meta del corte no es "haber escrito algo en cada carpeta". Es esta:

| Secciones | Meta |
|---|---|
| `00-governance` … `06-data` | **100%** |
| `07-api` y `12-ux-ui` | **80%** |

Un documento cuenta como **completo** cuando se cumplen las dos condiciones:

1. Fue editado con contenido propio del proyecto, y
2. **ya no conserva su bloque `> [!NOTE] INSTRUCTIONS`**.

Esa segunda condición no es un capricho de la revisión: es la regla que el propio
framework escribe en cada README de sección —
*«Delete this block once every document in the section is complete»*.
Mientras el bloque siga ahí, el documento declara de sí mismo que no está terminado.

Las secciones 00–06 suman **21 documentos obligatorios (⭐)**. Las secciones 07 y 12 piden,
cada una, su documento ⭐ (`rest-conventions.md` y `design-system.md`) **más los artefactos
propios**: un contrato OpenAPI por grupo de recursos y un documento por pantalla del MVP.

Todo lo que sigue se midió sobre `main`, comparando contra el commit base del template
(`53f27f0`). El trabajo que vive en ramas sin mergear no cuenta.

---

## 2. Dónde está cada equipo

| Equipo | Repo | 00–06 (meta 100%) | 07-api (meta 80%) | 12-ux-ui (meta 80%) |
|---|---|---|---|---|
| Wellness Habits System | `habits-system-docs` | **100%** ✅ | **100%** ✅ | 90% ✅ |
| Gym Track | `g-t-docs` | 95% | **100%** ✅ | **100%** ✅ |
| Budget Tracker | `bud-tack-docs` | 95% | 0% ❌ | 0% ❌ |
| Attendance Registry | `att-book-docs` | 90% | **100%** ✅ | **100%** ✅ |
| Task Manager | `tm-fs-docs` | 86% | 0% ❌ | 0% ❌ |
| UrbanStyle E-commerce | `u-e-docs` | 81% | 0% ❌ | 40% ❌ |
| VisionCare | `vc-docs` | 76% | **100%** ✅ | **100%** ✅ |
| Inven Track | `it-docs` | 76% | 0% ❌ | 0% ❌ |
| BarFlow | `bf-docs` | **0%** ⚠️ | 50% | 50% |
| Product Invoice Manager | `product-invoice-manager-docs` | 0% ❌ | 0% ❌ | 0% ❌ |

**Un solo equipo llegó a la meta de 00–06:** Wellness Habits System.
**Cuatro llegaron a la meta de 07 y 12:** Gym Track, Attendance Registry, VisionCare y —
con la salvedad del punto siguiente — Wellness Habits System.

El caso de **BarFlow merece leerse aparte**: tiene 67 commits, 13 historias en archivo propio,
5 ADR, 6 contratos OpenAPI y 7 documentos de pantalla — el mayor volumen de contenido del
curso. Y marca 0% porque **no borró un solo bloque de instrucciones**. No es un equipo
atrasado: es un equipo que no cerró. Una pasada de limpieza lo pone entre los primeros.

---

## 3. Lo que apareció al cruzar secciones

Medir sección por sección no basta. La documentación sirve cuando lo que dice una sección
sigue siendo verdad en la siguiente. Estos son los cruces que no cierran.

### C1 · UrbanStyle perdió su sección de datos en un merge — crítico

El PR #8 (`docs: release documentation for sections 00 to 06`) **borró**
`06-data/models.md`, `06-data/database-conventions.md` y `06-data/migrations.md`,
y dejó en su lugar únicamente los archivos `README - copia.md`, `models - copia.md`,
`migrations - copia.md` y `database-conventions - copia.md`.

Hoy `06-data/` no tiene ninguno de sus tres documentos obligatorios. Y como `07-api` se
construye sobre el modelo de datos, la sección 07 se quedó sin punto de partida.

**Acción inmediata:** recuperar los tres archivos del commit anterior al merge, borrar las
copias, y revisar por qué un PR que elimina documentos obligatorios pasó la revisión.

### C2 · La trazabilidad va en una sola dirección

En los seis equipos que ya tienen pantallas documentadas, **el 100% de los documentos de
pantalla cita la historia de usuario que los origina**. Eso está bien hecho.

Pero el camino de vuelta casi no existe: `04-requirements/traceability-matrix.md` menciona
`07-api` o `12-ux-ui` entre 0 y 3 veces por equipo. La matriz es justamente el documento que
debe cerrar el ciclo **HU → endpoint → pantalla → prueba**. Como está, permite responder
"¿de dónde salió esta pantalla?" pero no "¿qué construí para esta historia y qué la prueba?".

### C3 · Contratos que no cumplen sus propias convenciones

| Equipo | `servers.url` del OpenAPI | Qué dice su `rest-conventions.md` |
|---|---|---|
| Gym Track | `https://{host}/api/v1` | versionado en la ruta ✅ |
| VisionCare | `https://{host}/api/v1` | versionado en la ruta ✅ |
| BarFlow | `http://{host}/api/v1` | versionado en la ruta ✅ |
| Attendance Registry | `/api` — **sin versión** | sí habla de versioning ❌ |
| Wellness Habits System | `http://localhost:3001` | **no menciona versionado** ❌ |

Un contrato con `localhost:3001` como servidor no es publicable: describe la máquina de quien
lo escribió, no el sistema. Y un contrato que ignora la convención que el mismo equipo
escribió dos archivos más arriba convierte esa convención en decoración.

### C4 · Idioma mezclado entre capas, sin mapeo

- **VisionCare** nombra sus entidades en inglés (`Patient`, `WorkOrder`, `Invoice`), sus
  tablas en español (`pacientes`, `ordenes`, `facturacion`) y sus endpoints otra vez en
  inglés (`/patients`, `/work-orders`). No hay tabla que relacione las tres.
- **Wellness Habits System** nombra sus tablas en PascalCase singular (`Usuario`, `Habito`,
  `RegistroDiario`) contra la convención de plural en `snake_case` del framework, y el
  desvío no está justificado en ningún lado.
- **Attendance Registry hace esto bien y es el patrón a copiar**: sus entidades están en
  inglés y sus esquemas en español, pero `06-data/models.md` abre con una tabla
  `Entity | Table | Owner module | Key attributes` que hace explícito el mapeo. Mezclar
  idiomas es aceptable si está escrito dónde y por qué.

Mención aparte para **Movie Rater** del grupo de Móvil, que documentó que Sequelize crea sus
tablas con mayúscula inicial apartándose de la convención, y lo dejó escrito en vez de
esconderlo. Esa es la conducta correcta.

### C5 · El modelo de datos es más pobre que el dominio

- **VisionCare** declara 14 entidades en `02-domain/entities-and-rules.md`
  (`Patient`, `Frame`, `Lens`, `OpticalFormula`, `WorkOrder`, `Invoice`, `Payment`,
  `StockMovement`, `DailyClosing`, `PeriodicControl`…) y su `06-data/models.md` define
  alrededor de cinco tablas. **Más de la mitad del dominio no tiene persistencia definida.**
- **Gym Track** tiene el problema inverso, menor: la tabla `session_muscle_groups` existe en
  `06-data` pero no aparece como concepto en `02-domain`.

Cuando 02 y 06 no coinciden, 07 no tiene cómo ser correcto.

### C6 · Historias de usuario sin archivo propio

Solo **Gym Track (7), UrbanStyle (7) y BarFlow (13)** abrieron un archivo por historia a
partir de `_template-hu.md`. Attendance Registry, Wellness Habits System, VisionCare,
Task Manager, Budget Tracker e Inven Track resuelven todo el backlog dentro de
`user-stories.md`. Eso funciona para listar, no para especificar: los criterios de
aceptación de cada historia no caben en una fila de tabla.

### C7 · Task Manager sigue documentando al margen del framework

`04-requirements/non-functional.md` **no existe** — fue reemplazado por
`non-functional-requirements.md`, un archivo paralelo. Falta también
`05-architecture/decisions/README.md`. El índice de cada sección sigue apuntando a los
nombres canónicos, así que el README miente sobre dónde está el contenido.

### C8 · Product Invoice Manager continúa sin integrantes

El repositorio está exactamente como salió del template (23 commits, todos del docente) y el
equipo de GitHub no tiene ningún estudiante asignado. Hay que asignar integrantes o retirar
el proyecto del curso: no es evaluable como está.

---

## 4. Replanteamiento: qué cambia de aquí en adelante

Siete reglas, derivadas de lo anterior. Aplican a todos los equipos desde ya.

### R1 — Una sección no está terminada hasta que el bloque de instrucciones desaparece

Antes de declarar una sección lista, corre esto en tu repo:

```bash
grep -rn "\[!NOTE\] INSTRUCTIONS" --include="*.md" . | grep -v "_template"
```

Si devuelve algo, la sección no está terminada. Los archivos `_template-*.md` son plantillas
reutilizables: **su bloque se queda**, y por eso el `grep` los excluye.

### R2 — La matriz de trazabilidad cierra el ciclo completo

`04-requirements/traceability-matrix.md` debe permitir recorrer, para cada historia:

```
HU → módulo (05) → tabla (06) → endpoint (07) → pantalla (12) → prueba (11)
```

Una fila por historia, con enlaces relativos reales. Si una columna queda vacía, esa historia
todavía no está construida — y eso también es información útil.

### R3 — El contrato de API describe el sistema, no tu máquina

- `servers.url` versionado: `https://{host}/api/v1`. Nunca `localhost`.
- Un archivo OpenAPI por grupo de recursos, copiado de `_template-api.yaml`.
- Lo que diga `rest-conventions.md` tiene que cumplirse en los contratos. Si decides
  apartarte de la convención, cámbiala en el documento o escribe por qué la excepción existe.

### R4 — Una decisión de idioma, y si hay mezcla, una tabla de mapeo

Elige el idioma de los identificadores técnicos y sostenlo. Si por el stack terminas con
capas en idiomas distintos, `06-data/models.md` abre con la tabla
`Entidad | Tabla | Módulo dueño | Atributos clave`, como la de `att-book-docs`.
Un desvío documentado es una decisión; un desvío silencioso es un error.

### R5 — Cada entidad del dominio tiene tabla, o una razón escrita para no tenerla

Si `02-domain` declara una entidad que no aparece en `06-data`, ocurre una de dos cosas:
sobra en el dominio, o falta en el modelo. Ambas se resuelven escribiendo, no ignorando.

### R6 — Una historia, un archivo

Copia `_template-hu.md` por cada historia del MVP. `user-stories.md` queda como índice y
cada fila enlaza a su archivo. Los criterios de aceptación viven en el archivo, no en la tabla.

### R7 — No renombres los archivos canónicos

Si el framework pide `non-functional.md`, ese es el nombre. Crear `non-functional-requirements.md`
al lado deja el canónico como plantilla vacía y rompe todos los enlaces de los README.
Si necesitas un documento que el framework no contempla, agrégalo **además**, y regístralo
en la tabla del README de la sección.

### R8 — Nada se mergea sin que otra persona lo lea

El PR que borró la sección de datos de UrbanStyle pasó sin que nadie lo notara. Antes de
aprobar, mira la pestaña **Files changed** y verifica que no haya archivos eliminados ni
duplicados con sufijos como `- copia`.

---

## 5. Qué le falta a cada equipo

Ordenado por lo que más rinde primero.

### Wellness Habits System — `habits-system-docs`
1. Cerrar el README de `12-ux-ui` (queda un bloque de instrucciones).
2. Cambiar `servers.url` del OpenAPI: `http://localhost:3001` → `https://{host}/api/v1`, y
   agregar la regla de versionado a `rest-conventions.md`.
3. Documentar en `database-conventions.md` por qué las tablas van en PascalCase singular,
   o migrarlas a plural `snake_case`.
4. Abrir un archivo por historia desde `_template-hu.md`.

### Gym Track — `g-t-docs`
1. Completar `00-governance/documentation-rules.md` — es lo único que separa al equipo del 100%.
2. Agregar `session_muscle_groups` como concepto en `02-domain`, o explicar que es una tabla
   de relación sin entidad propia.
3. Ampliar la cobertura de contratos OpenAPI: hoy hay uno solo para todos los recursos.

### Attendance Registry — `att-book-docs`
1. Completar `00-governance/documentation-rules.md` y `05-architecture/decisions/README.md`.
2. Cerrar los README de las secciones 00, 02, 03 y 05.
3. Poner versión en `servers.url` del OpenAPI (`/api` → `/api/v1`), coherente con lo que ya
   dice su propio `rest-conventions.md`.
4. Abrir un archivo por historia. Es el equipo con más integrantes y el único sin HU por archivo.

*Su `06-data/models.md` con la tabla de mapeo entidad→tabla→módulo es el mejor ejemplo del
curso: vale la pena que los otros equipos lo miren.*

### Budget Tracker — `bud-tack-docs`
1. Cerrar los README de las secciones 01 a 06 — el contenido está, falta declararlo terminado.
2. Completar `00-governance/documentation-rules.md`.
3. **Arrancar 07-api y 12-ux-ui desde cero**: `rest-conventions.md`, al menos un contrato
   OpenAPI, `design-system.md` y un documento por pantalla. Es el mayor salto pendiente.

### Task Manager — `tm-fs-docs`
1. Restaurar `04-requirements/non-functional.md` con el contenido de
   `non-functional-requirements.md`, y eliminar el paralelo.
2. Crear `05-architecture/decisions/README.md`.
3. Cerrar los README de 00 y los bloques restantes en 05.
4. **Arrancar 07-api y 12-ux-ui desde cero.**

### UrbanStyle E-commerce — `u-e-docs`
1. **Recuperar `06-data`** (`models.md`, `database-conventions.md`, `migrations.md`) del
   commit anterior al PR #8 y borrar los cuatro archivos `- copia.md`. Es lo primero.
2. Eliminar el `README-12-ux-ui.md` duplicado; el índice de la sección es `README.md`.
3. Completar `12-ux-ui/design-system.md` (hay 4 pantallas documentadas sin sistema de diseño
   que las respalde).
4. Completar `00-governance/documentation-rules.md` y **arrancar 07-api**.

### VisionCare — `vc-docs`
1. **Ampliar `06-data/models.md`**: hay 14 entidades en el dominio y ~5 tablas. Es la brecha
   más grande del curso entre lo que se declaró y lo que se modeló.
2. Completar `05-architecture`: faltan `layered-architecture.md`, `boundary-enforcement.md` y
   `decisions/README.md`.
3. Completar `06-data/database-conventions.md` y `00-governance/documentation-rules.md`.
4. Cerrar los README de 01 a 06.
5. Agregar a `models.md` la tabla de mapeo entidad→tabla→endpoint (el idioma cambia entre capas).

*Sus 10 documentos de pantalla y 4 contratos OpenAPI son de lo mejor del curso; el problema
está aguas arriba, no en 07 ni en 12.*

### Inven Track — `it-docs`
1. **`00-governance` completa está intacta**: los cuatro documentos obligatorios siguen
   siendo el texto del framework. Es la sección que el framework sitúa antes de todo lo demás.
2. Crear `05-architecture/decisions/README.md`.
3. Cerrar los README de las secciones 01 a 06.
4. **Arrancar 07-api y 12-ux-ui desde cero.**

### BarFlow — `bf-docs`
1. **Una sola tarea, y el equipo salta al primer lugar:** borrar los bloques
   `[!NOTE] INSTRUCTIONS` de los 21 documentos obligatorios de 00–06, más los de 07 y 12.
   Usa el `grep` de la regla R1 para encontrarlos todos.
2. Mover las historias de `04-requirements/stories/` a la raíz de la sección, que es donde
   el README las busca.
3. Revisar que cada HU no arrastre el bloque de instrucciones heredado de `_template-hu.md`.

*El contenido ya está y es abundante. Lo único que falta es declararlo terminado.*

### Product Invoice Manager — `product-invoice-manager-docs`
Sin integrantes asignados y sin un solo commit de estudiante. Requiere decisión del docente
antes de que tenga sentido cualquier recomendación técnica.

---

## 6. Checklist de cierre

Antes de dar por cerrada la documentación del corte, tu equipo debe poder responder **sí** a
las nueve preguntas:

- [ ] ¿El `grep` de la regla R1 no devuelve nada fuera de los `_template-*`?
- [ ] ¿Existen los 21 documentos obligatorios de 00–06 con sus nombres canónicos?
- [ ] ¿Cada entidad de `02-domain` tiene su tabla en `06-data`, o una razón escrita?
- [ ] ¿Cada historia del MVP tiene su archivo propio y está enlazada desde `user-stories.md`?
- [ ] ¿La matriz de trazabilidad recorre HU → módulo → tabla → endpoint → pantalla?
- [ ] ¿`rest-conventions.md` describe lo que los contratos OpenAPI realmente hacen?
- [ ] ¿`servers.url` está versionado y no apunta a `localhost`?
- [ ] ¿Cada pantalla del MVP tiene documento en `12-ux-ui` y cita su historia?
- [ ] ¿Ningún PR mergeado borró documentos obligatorios ni dejó archivos duplicados?

---

## 7. Lo que hay que corregir hoy

Tres cosas no pueden esperar al próximo corte:

1. **UrbanStyle:** restaurar `06-data`. Hay documentación perdida en `main`.
2. **BarFlow:** la pasada de limpieza. Es el mayor retorno por esfuerzo de todo el curso.
3. **Product Invoice Manager:** asignar integrantes o retirar el proyecto.

---

*Revisión generada sobre el estado de `main` de cada repositorio al 28 de septiembre de 2026,
contrastada contra el commit base del template `53f27f0`.*
*Docente: Jesús Ariel González Bonilla — Corporación Universitaria del Huila (CORHUILA).*
