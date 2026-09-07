# 🖱️ PAWHunter

> A server-side rendered inventory management application for computer mice.

**[Live Demo](https://mouse-inventory-app.onrender.com)**

---

## ✨ Overview

PAWHunter is a web application designed to manage a catalog of computer mice.

It provides a simple interface for managing **brands and mouse models**, while keeping track of product specifications, prices, and stock quantities.

The project was built with a focus on **server-side rendering, structured application architecture, database relationships, and form validation**.

---

## 🚀 Features

### Brands

* Create, view, edit and delete brands
* View all models associated with a brand

### Mouse Models

* Create, view, edit and delete mouse models
* Assign models to their respective brands
* View detailed product information

### Product Information

Each mouse model can contain:

* Brand
* Model name
* Color
* Price
* Weight
* Dimensions
* Wired / wireless connection
* Stock quantity
* Creation date

### Validation

User input is validated using `express-validator` before being processed by the application.

---

## 🛠️ Tech Stack

| Technology            | Purpose                   |
| --------------------- | ------------------------- |
| **Node.js**           | Runtime environment       |
| **Express 5**         | Web framework             |
| **EJS**               | Server-side rendering     |
| **PostgreSQL**        | Database                  |
| **pg**                | PostgreSQL client         |
| **express-validator** | Form validation           |
| **dotenv**            | Environment configuration |

---

## 🏗️ Architecture

The application follows a simple **MVC-style architecture**:

```text
Routes
  │
  ▼
Controllers
  │
  ├──► Database Queries ──► PostgreSQL
  │
  ▼
EJS Views
  │
  ▼
HTML Response
```

### Project Structure

```text
├── controllers/       # Application logic
├── db/
│   ├── queries/       # Database queries
│   ├── pool.js        # PostgreSQL connection
│   └── populatedb.js  # Database setup
├── public/            # Static assets
├── routes/            # Application routes
├── views/             # EJS templates
├── app.js             # Application entry point
└── package.json
```

---

## 🗄️ Database

The application uses PostgreSQL with two main entities:

### `mouse_brands`

Stores mouse manufacturers.

| Column | Type    |
| ------ | ------- |
| `id`   | Integer |
| `name` | Varchar |

### `mouse_models`

Stores individual mouse models and their specifications.

| Column           | Type      |
| ---------------- | --------- |
| `id`             | Integer   |
| `brand_id`       | Integer   |
| `name`           | Varchar   |
| `color`          | Varchar   |
| `price`          | Numeric   |
| `weight_g`       | Numeric   |
| `length_mm`      | Numeric   |
| `width_mm`       | Numeric   |
| `height_mm`      | Numeric   |
| `is_wireless`    | Boolean   |
| `stock_quantity` | Integer   |
| `created_at`     | Timestamp |

Each mouse model is associated with a brand through `brand_id`.

---

## 🎯 Purpose

PAWHunter is a focused inventory management project built to demonstrate practical use of:

* **Node.js & Express**
* **Server-side rendering**
* **PostgreSQL**
* **Relational database design**
* **CRUD operations**
* **MVC-style application structure**
* **Server-side form validation**

---

## 🌐 Live Demo

**[→ Open PAWHunter](https://mouse-inventory-app.onrender.com)**
