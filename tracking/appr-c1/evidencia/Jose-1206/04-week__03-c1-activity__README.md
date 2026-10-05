# 🎓 UniAttend MVP — CORHUILA

> A lightweight web application designed for real-time academic attendance tracking, asynchronous data fetching, and robust UI state management.

---

## 📌 Overview

| Attribute | Details |
| :--- | :--- |
| **Institution** | Corporación Universitaria del Huila (CORHUILA) |
| **Target Audience** | Academic Faculty |
| **Primary Goal** | Real-time attendance logging and UI state management |
| **Integration** | Public REST API (JSONPlaceholder) via Native JavaScript `fetch()` |

UniAttend MVP is a web-based attendance management system designed to help professors efficiently track student participation. This frontend application provides a clean, user-friendly interface that displays a list of enrolled students along with real-time class metrics. To populate the student roster, the system consumes the external JSONPlaceholder REST API, dynamically mapping the retrieved mock user data into formatted student profiles. During this asynchronous data fetching process, the application handles a specific "Loading" state by displaying a visual spinner to inform the user that information is being processed. Furthermore, it seamlessly manages "Error" and "Success" states, providing graceful fallbacks and retry mechanisms if the network connection fails, or rendering the interactive attendance table when the data loads successfully.

---

## 🚀 Key Features

*   👨‍🏫 **Teacher Management Module:** Full subject overview, real-time class metrics (Present, Late, Absent), and digital attendance logging workflow.
*   ⏳ **Asynchronous Data Handling:** Native `fetch()` API consumption paired with robust UI state management.
*   🔄 **Dynamic State Management:** Centralized rendering logic that smoothly transitions between loading spinners, interactive data tables, and error fallbacks without overlapping elements.
*   ⚠️ **Error Simulation & Recovery:** Built-in tools for QA testing that simulate network failures, complete with transparent error messaging and a one-click connection retry system.

---

## 📁 Project Workspace Structure

The project is organized into three main functional areas to separate design, implementation, and testing evidence:

*   **1-Mockup:** This directory contains the visual blueprint of the application. It includes screenshots of the final rendered interface and any preliminary wireframes or designs used to plan the layout before coding.
*   **2-Frontend:** This is the core engine of the project. It houses the HTML structural semantic tags, CSS styling, and the Vanilla JavaScript logic responsible for DOM manipulation, API consumption, and application state control.
*   **3-Estados-Carga:** This folder acts as the QA (Quality Assurance) evidence repository. It contains screenshots demonstrating the application's behavior under different asynchronous conditions: the loading spinner during data retrieval and the fallback UI when an error is simulated.