# PAWHunter

PAWHunter is a server-side rendered web application for managing a catalog of computer mice.

The application allows you to manage mouse brands and models, store their specifications, track prices and stock quantities, and view individual product details.

## Features

- Manage mouse brands
  - Create
  - View
  - Edit
  - Delete
- Manage mouse models
  - Create
  - View
  - Edit
  - Delete
- Store detailed mouse specifications:
  - Brand
  - Model name
  - Color
  - Price
  - Weight
  - Dimensions
  - Wired / wireless connection
  - Stock quantity
- Server-side form validation
- PostgreSQL database
- Server-side rendered pages using EJS

## Tech Stack

- **Node.js**
- **Express 5**
- **EJS**
- **PostgreSQL**
- **pg** — PostgreSQL client for Node.js
- **express-validator** — request validation
- **dotenv** — environment variable management

## Project Structure

```text
mouse-inventory-app/
├── controllers/
│   ├── brandsController.js
│   └── modelsController.js
│
├── db/
│   ├── queries/
│   │   ├── brandsQueries.js
│   │   └── modelsQueries.js
│   ├── pool.js
│   └── populatedb.js
│
├── public/
│   ├── css/
│   └── images/
│
├── routes/
│   ├── brandsRouter.js
│   └── modelsRouter.js
│
├── views/
│   ├── !main/
│   ├── brands/
│   ├── models/
│   └── partials/
│
├── app.js
├── package.json
└── .gitignore
```

The application follows a simple MVC-style structure:

- **Routes** handle URL routing and validation.
- **Controllers** handle application logic and render views.
- **Database queries** contain PostgreSQL operations.
- **EJS views** render the HTML pages.
- **Public** contains static assets such as CSS and images.

## Database

PAWHunter uses PostgreSQL with two main tables:

### `mouse_brands`

Stores mouse manufacturers.

| Column | Type | Description |
|---|---|---|
| `id` | Integer | Primary key |
| `name` | Varchar(100) | Brand name |

### `mouse_models`

Stores individual mouse models.

| Column | Type | Description |
|---|---|---|
| `id` | Integer | Primary key |
| `brand_id` | Integer | References `mouse_brands` |
| `name` | Varchar(150) | Model name |
| `color` | Varchar(50) | Mouse color |
| `price` | Numeric | Price |
| `weight_g` | Numeric | Weight in grams |
| `length_mm` | Numeric | Length in millimeters |
| `width_mm` | Numeric | Width in millimeters |
| `height_mm` | Numeric | Height in millimeters |
| `is_wireless` | Boolean | Wireless connection |
| `stock_quantity` | Integer | Available quantity |
| `created_at` | Timestamp | Creation date |

Mouse models are linked to their manufacturers through `brand_id`.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/ICELUV0x/mouse-inventory-app.git
cd mouse-inventory-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=9999
DATABASE_URL=postgresql://username:password@localhost:5432/mouse_inventory
```

`DATABASE_URL` is used by the PostgreSQL connection pool.

### 4. Initialize the database

The repository contains a database initialization script that creates the required tables.

Run:

```bash
node db/populatedb.js "$DATABASE_URL"
```

The script creates the `mouse_brands` and `mouse_models` tables if they do not already exist.

### 5. Start the application

```bash
node app.js
```

The server uses the `PORT` environment variable or falls back to port `9999`.

Open:

```text
http://localhost:9999
```

## Routes

### Brands

| Method | Route | Description |
|---|---|---|
| `GET` | `/brands` | List all brands |
| `GET` | `/brands/create` | Create brand form |
| `POST` | `/brands/create` | Create a brand |
| `GET` | `/brands/:id` | View a brand |
| `GET` | `/brands/:id/update` | Edit brand form |
| `POST` | `/brands/:id/update` | Update a brand |
| `GET` | `/brands/:id/delete` | Delete a brand |

### Models

| Method | Route | Description |
|---|---|---|
| `GET` | `/models` | List all mouse models |
| `GET` | `/models/create` | Create model form |
| `POST` | `/models/create` | Create a model |
| `GET` | `/models/:id` | View model details |
| `GET` | `/models/:id/update` | Edit model form |
| `POST` | `/models/:id/update` | Update a model |
| `POST` | `/models/:id/delete` | Delete a model |

Routes use `express-validator` to validate submitted brand and model data before it reaches the database.

## Example

A mouse model can contain information such as:

```text
Brand: VAXEE
Model: XE v2
Color: Black
Price: $139.00
Weight: 63g
Dimensions: 122 × 61 × 39 mm
Connection: Wireless
Stock: 5 pcs
```

## Current Scope

PAWHunter is currently focused on inventory management and catalog functionality.

The project is intentionally simple and serves as a practical Node.js / Express application using PostgreSQL and server-side rendering.