# -*- coding: utf-8 -*-
"""Evaluacion appr Fullstack C1: 0.6 solo para quien tiene las actividades de la semana 1 a la 5."""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# fila: (usuario, resumen para el informe, nota para el estudiante)
COMPLETOS = {
 2: ("sebastiian06",
  "S2 maquetacion de interfaz; S3 mockup + consumo de API; S4 app React completa (17 archivos) con estado y manejo de error; S5 parcial practico resuelto por problemas.",
  "Juan Sebastian, mantuviste el ritmo las cinco semanas y se nota la progresion: de maquetar una interfaz en S2 a una app React con estado y manejo de error en S4. Nombraste cada carpeta con el titulo de la actividad, lo que hace tu repo muy facil de revisar."),
 3: ("Jose-1206",
  "S2 'Mi Stack de Desarrollo' con toggle; S3 directorio de usuarios con fetch y los 3 estados; S4 mockup + frontend 'AsistApp' con simulador de error; S5 parcial extenso (57 archivos).",
  "Jose Miguel, el simulador de error que agregaste en AsistApp es un detalle de buen criterio: obliga a probar el estado de fallo en vez de asumir que la API siempre responde. Tu parcial de la semana 5 es de los mas completos del curso."),
 4: ("JuanBernalCorhuila",
  "S2 trivia Mundial 2026; S3 Pokedex con PokeAPI real (Promise.all + estados); S4 'Equipos de LaLiga' en React y version vanilla; S5 roster de la Seleccion Colombia. Ademas entrego S6.",
  "Juan Camilo, usar Promise.all en la Pokedex para resolver varias peticiones a la vez muestra que entendiste como funciona fetch de verdad, no solo copiarlo. Y haber hecho la semana 4 en React y tambien en JavaScript plano dice mucho de tu interes."),
 5: ("jdbonilla-2025b-netizen",
  "S2 portafolio con toggle; S3 lista de usuarios con fetch y 3 estados; S4 componente React con useState; S5 mini-frontend React/Vite. Ademas entrego S6.",
  "Juan Diego, tu progresion de JavaScript plano a React con Vite en cinco semanas es clara y ordenada. Un detalle administrativo: tienes dos cuentas de GitHub y la otra (juan895) quedo con el fork vacio; deja solo esta para que no haya confusion al revisar."),
 14: ("juanjoGuzmanBohorquez",
  "S2 y S3 con fetch y estados; S4 'Asistencia CORHUILA' entregada en tres puntos: mockup, frontend y manejo de estados; S5 parcial practico.",
  "Juan Jose, organizar la semana 4 en tres puntos separados (mockup, frontend y manejo de estados) fue una buena decision: se ve exactamente que hiciste para cada requisito de la actividad. El proyecto de asistencia esta bien pensado como caso real."),
 15: ("Juan-Horta27",
  "S3 con boton 'Probar el error' para forzar el estado de fallo; S4 componente Angular standalone real (signals, HttpClient, componente hijo reutilizable); S5 parcial por problemas. Ademas entrego S6.",
  "Juan Jose, fuiste de los poquisimos que trabajo con Angular de verdad: signals, HttpClient y un componente hijo reutilizable. Y el boton 'Probar el error' de la semana 3 es justo lo que un desarrollador hace para no entregar a ciegas."),
 16: ("ItzJunixs",
  "Cada semana titulada exactamente como el enunciado oficial; S4 React con hooks y componente UserCard reutilizable; S5 con modulos ES (import/export).",
  "Juan Diego, tu repositorio es el mas facil de revisar de todo el curso: cada carpeta se llama como la actividad y cada semana trae su README. El componente UserCard reutilizable y el uso de modulos ES en el parcial muestran que estas pensando en estructura, no solo en que funcione."),
 19: ("cristianmunoz2006",
  "S2 estanteria semantica con flexbox; S3 'Recetario Expres' con fetch, busqueda y 3 estados; S4 'Citas Celebres' con consumo de API; S5 parcial con Bootstrap. Todo JavaScript plano de buena calidad.",
  "Cristian Andres, hiciste todo en JavaScript plano y aun asi tus entregas estan entre las mas cuidadas: el Recetario Expres con busqueda y los tres estados bien separados funciona igual de bien que las versiones con framework. Eso demuestra que entendiste el fondo."),
 21: ("luisfernando-77",
  "S2 panel de sesion de estudio con toggle; S3 directorio con fetch, plantilla y 3 estados; S4 React con Vite real; S5 parcial practico.",
  "Luis Fernando, pasar de JavaScript plano a un proyecto React con Vite en la semana 4 y que quede funcionando no es poca cosa. El directorio de la semana 3, con su plantilla y los tres estados, quedo muy limpio."),
 23: ("laura-marcela05",
  "S2 consejos de cocina con toggle; S3 recetas con fetch; S4 'Buscador de Recetas' en React consumiendo TheMealDB en vivo; S5 recetario en el parcial (24 archivos).",
  "Laura Marcela, sostuviste un mismo hilo tematico (la cocina) durante todo el corte y eso hizo que cada semana se apoyara en la anterior. El buscador de recetas consumiendo TheMealDB en vivo es un ejemplo real de consumo de API, no un simulacro."),
 26: ("Pablo2467",
  "S2 portafolio con toggle; S3 componente React que consume API con los 3 estados (en carpeta 'activity-04'); S4 app Rick and Morty en React/Vite con componentes separados y hook propio; S5 parcial en 3 casos.",
  "Juan Pablo, la app de Rick and Morty esta muy bien estructurada: separaste CharacterCard, CharacterList, LoadingState y ErrorState, y sacaste la logica a un hook propio (useCharacters). Un detalle: la entrega de la semana 3 quedo en una carpeta llamada 'activity-04', lo que confunde al revisar; el contenido si corresponde a la semana 3."),
 27: ("carloszuluaga-20",
  "S2 lista de tareas interactiva; S3 mockup + fetch con los 3 estados documentados; S4 app React real (Vite, useState/useEffect, componente reutilizable); S5 fetch de productos.",
  "Carlos Andres, documentar explicitamente los tres estados en la semana 3 fue un acierto: obliga a pensar que ve el usuario mientras carga y cuando falla. Tu app React de la semana 4, con componente reutilizable y useEffect, esta bien armada."),
}

INCOMPLETOS = {
 7:  ("felip442", [5], "Solo S5: parcial practico con fetch a JSONPlaceholder y respuestas de fundamentos, HTTP y SPA bien desarrolladas.",
      "Andres Felipe, el parcial que entregaste esta bien resuelto: el fetch funciona y tus respuestas sobre HTTP y SPA estan bien explicadas, no copiadas."),
 8:  ("feller2006", [1,2,4,5], "S1 presentacion, S2 lista de tareas, S4 lista de usuarios con fetch, S5 parcial en ingles. Le falta unicamente la S3. El mas cerca del curso.",
      "Rosfeller David, fuiste el que mas cerca quedo: hiciste la presentacion, la lista de tareas, el consumo de API y el parcial en ingles. Te falto solo la semana 3 (mockup + fetch con los tres estados)."),
 9:  ("ktchambo-2024a-max", [4,5], "S4 personajes de Rick and Morty con fetch y estados (en ingles); S5 practica C1. Sin bloque CONFIG en su repo de perfil.",
      "Karol Tatiana, tu componente de Rick and Morty maneja bien los estados y ademas lo documentaste en ingles. Te falta crear tu repo de perfil con el bloque CONFIG, que es parte de la semana 1."),
 10: ("11William11", [4,5], "S4 'barflow' gestion de pedidos con fetch, estados y simulador de fallo, muy completo; S5 parcial con catalogo.",
      "William Erney, barflow esta muy completo: el simulador de fallo que le pusiste es justo lo que hace falta para probar el estado de error en serio."),
 11: ("Palinapau", [4,5], "S4 'BarFlow' inventario de bar con fetch y estados; S5 parcial practico completo.",
      "Paulina, tu inventario de bar resuelve bien el consumo de API y el manejo de estados, y el parcial quedo completo."),
 12: ("Daniel666-ui", [4,5], "S4 'People Explorer' con mockup.md y frontend; S5 practica C1 con fetch, eventos y respuestas conceptuales bilingues.",
      "Daniel Felipe, haber entregado el mockup en un archivo aparte antes del frontend muestra buen orden de trabajo, y tus respuestas conceptuales bilingues estan bien redactadas."),
 13: ("Andresfg20", [4,5], "S4 'Task Ledger' consumiendo la API de DummyJSON; S5 parcial con fetch a JSONPlaceholder e interactividad.",
      "Andres Felipe, Task Ledger consume una API real y la muestra bien; el parcial tambien quedo funcionando con interactividad."),
 17: ("jesusestebanlopezcharry-source", [4,5], "S4 'Mi Inventario' CRUD con Open Food Facts (sin framework, la S4 pedia Angular o React); S5 backend Express + frontend plano.",
      "Jesus Esteban, montar un backend con Express en la semana 5 va mas alla de lo que pedia la actividad y habla bien de tu interes. Ojo con un detalle: la semana 4 pedia explicitamente Angular o React, y la entregaste sin framework."),
 18: ("Lozano-027", [4,5], "S4 task manager con fetch real a JSONPlaceholder (con nota sobre las limitaciones de la API publica); S5 parcial con fetch de usuarios. ANOMALIA: su CONFIG trae el nombre del docente.",
      "Julio Cesar, me gusto que dejaras anotadas las limitaciones de la API publica en tu task manager: es lo que haria alguien que probo de verdad. Importante: el bloque CONFIG de tu repo de perfil tiene el nombre del docente en vez del tuyo; corrigelo para que las entregas queden a tu nombre."),
 20: ("santiagoparraC12-ux", [3,4,5], "S3 subio el PDF de la guia, no su trabajo; S4 Pokedex SPA en React via CDN, correcta; S5 parcial completo.",
      "Santiago Stiven, la Pokedex en React quedo bien resuelta como SPA y el parcial esta completo. Un aviso: en la semana 3 subiste el PDF del enunciado en vez de tu entrega, asi que esa semana quedo sin trabajo tuyo."),
 22: ("Mapt05", [4,5], "S4 'FINANZAPP' control de ingresos y gastos con fetch local y estados; S5 parcial completo con Bootstrap.",
      "Michael Adonis, FINANZAPP resuelve un problema concreto y el manejo de estados esta bien hecho; el parcial con Bootstrap quedo ordenado."),
 24: ("Adst2006", [1,4,5], "S1 presentacion completa; S4 directorio de usuarios con fetch y estados (JS plano); S5 buscador de paises con fetch real. Le faltan S2 y S3.",
      "Alex David, hiciste la presentacion de la semana 1 y tus entregas de las semanas 4 y 5 funcionan bien, con fetch real y estados. Te faltaron las semanas 2 y 3."),
}

SIN_FORK = {
 6:  "ninguna cuenta de GitHub hallada por nombre ni por prefijo de correo (aura.cabrera)",
 25: "ninguna cuenta de GitHub hallada por nombre ni por prefijo de correo (vatovar-2025b)",
}

REGLA = ("\n\n_Sobre la apreciativa:_ el bono de este corte era para quien entregara las actividades de las "
         "**semanas 1 a 5**. En tu repositorio estan las semanas {w}, asi que en `appr` queda 0 — pero eso no "
         "le quita merito a lo que si hiciste. Si completas las semanas que faltan durante el corte 2, cuentan "
         "para el bono de ese corte.")

json.dump({"completos": {str(k): v for k, v in COMPLETOS.items()},
           "incompletos": {str(k): v for k, v in INCOMPLETOS.items()},
           "sin_fork": SIN_FORK, "regla": REGLA},
          io.open("assessment_fs.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

roster = {r["row"]: r for r in json.load(io.open("roster_fs.json", encoding="utf-8"))}
print(f"{'fil':<5}{'estudiante':<38}{'usuario':<32}{'semanas':<18}appr")
print("-" * 100)
for r in sorted(COMPLETOS):
    print(f"{r:<5}{roster[r]['nombre']:<38}{COMPLETOS[r][0]:<32}{'[1,2,3,4,5]':<18}0.6")
for r in sorted(INCOMPLETOS):
    u, w, _, _ = INCOMPLETOS[r]
    print(f"{r:<5}{roster[r]['nombre']:<38}{u:<32}{str(w):<18}0")
for r in sorted(SIN_FORK):
    print(f"{r:<5}{roster[r]['nombre']:<38}{'(sin fork)':<32}{'—':<18}en blanco")
print(f"\n0.6: {len(COMPLETOS)} | 0: {len(INCOMPLETOS)} | en blanco: {len(SIN_FORK)} | total {len(COMPLETOS)+len(INCOMPLETOS)+len(SIN_FORK)}")
