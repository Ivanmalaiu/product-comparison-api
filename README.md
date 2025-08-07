# 🛍️ Item Comparison API

This project is a simplified RESTful API that allows comparing multiple products. It was built using [NestJS](https://nestjs.com/) with best practices in modularity, validation, testing, and architecture.
#### GitHub Repository

- [GitHub Public Repository](https://github.com/Ivanmalaiu/product-comparison-api)
---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
npm install
```

### Running the app

```bash
npm run start:dev
```
### Explore the API (Swagger)

You can access the Swagger documentation at:

```
http://localhost:3000/api
```

Use this interface to test the endpoint:  
**`POST /products/compare`**
### Running tests

```bash
# Unit & integration tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📌 API Overview

### Base URL

```
POST /products/compare
```

### Request body

```json
{
  "productIds": [
    "eec1ec2d-188c-437d-88ca-c2120a4a2c33",
    "7745dcda-d2df-4a67-ae47-aa0c4297bf3f"
  ]
}
```

### Response

```json
[
  {
    "id": "eec1ec2d-188c-437d-88ca-c2120a4a2c33",
    "name": "Samsung Galaxy S23",
    "imageUrl": "https://example.com/images/samsung_galaxy_s23.jpg",
    "description": "This is a high-quality smartphones product.",
    "price": 597.9,
    "rating": 3.7,
    "specifications": {
      "Screen": "6.5'' AMOLED",
      "Battery": "4000 mAh",
      "Camera": "12 MP"
    }
  },
  {
    "id": "7745dcda-d2df-4a67-ae47-aa0c4297bf3f",
    "name": "TCL 4K",
    "imageUrl": "https://example.com/images/tcl_4k.jpg",
    "description": "This is a high-quality tvs product.",
    "price": 302.03,
    "rating": 4.4,
    "specifications": {
      "Screen Size": "55''",
      "Resolution": "4K",
      "Panel Type": "QLED"
    }
  }
]
```

### Errors
- `200 OK` → List of products returned successfully.
- `400 Bad Request` → Invalid UUIDs or empty array
- `404 Not Found` → One or more products not found

---

## 🧱 Architecture

We implemented a **layered architecture** following clean code principles:

- **Controller Layer:** Receives HTTP requests and delegates to the service.
- **Service Layer:** Contains the business logic and coordinates actions.
- **Repository Layer:** Handles data access. In this case, it loads products from a local JSON file.

Each layer communicates via **interfaces**, promoting separation of concerns and making the system easier to test, maintain, and extend.

### ❌ Why not Hexagonal (Ports & Adapters)?

Although our architecture was inspired by **Hexagonal Architecture**, we chose not to apply it fully. The reason was pragmatic:  
> This project’s scope is a **simple REST API for comparing products**, and full Hexagonal complexity would be overkill for such a small use case.

However, the layered structure still reflects many of the same benefits:  
- Clear boundaries between concerns  
- Flexibility to replace or mock layers (e.g., replace JSON with a real DB)  
- Testability at each level

### 💡 Design Decisions

- **In-memory cache:** Instead of reading and parsing the `products.json` file on every request, we load it **once** at application startup and store it in memory.  
  This improves performance and avoids unnecessary I/O operations.
- **Validation and error handling:** We use DTO validation and explicit `NotFoundException` responses to fail fast and clearly.
- **OpenAPI with Swagger:** Provides automatic and interactive API documentation out-of-the-box.

### Folder structure

```
src/
│
├── products/
│   ├── controller/         # HTTP layer
│   ├── data/               # Product Data
│   ├── service/            # Business logic
│   ├── repository/         # Data source abstraction
│   ├── model/              # Domain entities
│   └── dto/                # Request validation
│
├── app.module.ts           # Main NestJS module
test/                       # e2e App test
```

### Why this architecture?

- ✅ Improves testability
- ✅ Encourages separation of concerns
- ✅ Makes it easy to swap infrastructure (e.g., from file-based repo to database)
- ✅ Works well for scaling the project

---
## 🤖 Modern Tools & AI Integration

To boost development efficiency, the project integrates **Generative AI (GenAI)** and modern development tools in the following ways:

- **GenAI-assisted development**: Tools like ChatGPT were used for:
  - Generating unit and e2e test scaffolding.
  - Refactoring and validating code structure.
  - Writing documentation, such as this README.
  - Creating the .json data file for products.
  - Clarifying edge cases, architecture decisions, and best practices on demand.
  
- **VS Code Extensions**: Leveraged productivity extensions for ESLint, Prettier, and Jest integration.

- **Live Reloading & Dev Scripts**: Used `npm run start:dev` with hot reload to speed up iteration.

    These tools helped reduce boilerplate coding time and ensured consistency and clarity throughout the project.
---
## 🧪 Testing Strategy

We implemented tests at multiple levels:

- **Unit Tests**: For services, repositories, and controller logic
- **E2E Tests**: Full HTTP lifecycle validation using Supertest
- **Mocking**: Dependencies like the repository were mocked for isolation
- **Validation Errors**: Fully tested with edge cases

---

## 🛠️ Technologies Used

- **NestJS** – Main framework
- **TypeScript** – Strong typing
- **Jest** – Testing
- **Supertest** – E2E testing
- **class-validator** – DTO validation
- **ESLint & Prettier** – Linting & formatting

---

## 📌 Notes

- This project does not use a real database. Instead, it reads data from a local JSON file.
- Future enhancements could include adding pagination, filtering, or connecting to an external data source.

---

## 📂 Example Product Data

Located in:

```
src/products/data/products.json
```

Each product includes `id`, `name`, `imageUrl`, `description`, `price`, `rating`, and a `specifications` object.

---

## 🧠 Purpose

This project was built as part of a technical challenge to demonstrate good practices in API design, code structure, and testing.