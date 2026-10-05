# BarFlow

**Proyecto:** BarFlow

## Overview

BarFlow is a frontend application designed to represent a product inventory view for a bar management platform. The application displays a list of products with information such as name, category, price, image, stock, and availability. It consumes product data from the DummyJSON public API using the JavaScript `fetch` function. The application handles a loading state while the API request is being processed, a data state when the products are successfully received, and an error state when the request fails. Users can also search for products using the search field. Product prices are displayed in Colombian pesos to make the interface suitable for a Colombian bar management context. The project is organized into separate HTML, CSS, and JavaScript files to keep the application structured and maintainable.

## Features

* Product inventory list
* Product images
* Product categories
* Product prices in COP
* Stock information
* Stock availability status
* Product search
* Loading state
* Data state
* Error state
* Retry button
* Responsive interface

## API

This project consumes the DummyJSON Products API.

API endpoint:

`https://dummyjson.com/products?limit=12`

The API provides sample product information such as product names, categories, prices, stock, and images.

## Technologies

* HTML5
* CSS3
* JavaScript
* Fetch API
* DummyJSON
* Git
* GitHub

## Project Structure

```text
barflow/
│
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   └── styles.css
│
└── js/
    └── app.js
```

## How to Run

1. Clone the repository.

```bash
git clone https://github.com/Palinapau/complementaria-iii-desarrollo-fullstack-2026-b-g1.git

2. Open the project directory.

```bash
cd complementaria-iii-desarrollo-fullstack-2026-b-g1
```

3. Go to the BarFlow activity.

```bash
cd 04-week/02-optional-activity/barflow
```

4. Open `index.html` using a web browser or a local development server such as Live Server in Visual Studio Code.

## Application States

### Loading State

The application displays a loading indicator while waiting for the API response.

### Data State

When the API request is successful, the products are displayed as cards in the inventory list.

### Error State

If the API request fails, the application displays an error message and a button to try the request again.

## Git Versioning

The project is versioned using Git. Changes are committed with descriptive commit messages.

