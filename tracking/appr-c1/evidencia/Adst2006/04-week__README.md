# User Directory App

## Overview
This single-page web application displays a dynamic list of users by consuming data from the JSONPlaceholder REST API using native JavaScript `fetch`. The primary objective of this project is to demonstrate proper asynchronous data fetching and responsive user interface state management. The application handles three distinct UI states: a loading indicator, successful data rendering, and error management. When a network request is initiated, a visual spinner is displayed to inform the user that data is loading. If the request succeeds, user details such as name, username, email, city, and company are dynamically rendered into cards, whereas an error message with a retry option is presented if the API fails.

## How to Run

1. Open `index.html` in your web browser or use VS Code Live Server extension.