
# ▶️ How to Run the Project

This project is delivered as a ZIP file. Follow these steps to run the API on your local machine.

---

## 📦 Step 1: Unzip the Project

Unzip the folder anywhere on your machine.

```bash
unzip product-comparison-api.zip
cd product-comparison-api
```

---

## ⚙️ Step 2: Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher  
- **npm** or **yarn**

To verify:

```bash
node -v
npm -v
```

---

## 🛠️ Step 3: Install Dependencies

Install all project dependencies:

```bash
npm install
```

---

## 🚀 Step 4: Run the Application

Start the development server:

```bash
npm run start:dev
```

Once running, the API will be available at:

```
http://localhost:3000
```

---

## 📘 Step 5: Explore the API (Swagger)

You can access the Swagger documentation at:

```
http://localhost:3000/api
```

Use this interface to test the endpoint:  
**`POST /products/compare`**

---

## 🧪 Step 6: Run Tests (Optional)

### Unit & Integration Tests

```bash
npm run test
```

### End-to-End (e2e) Tests

```bash
npm run test:e2e
```

### Coverage Report

```bash
npm run test:cov
```


---

You're ready to go! 🎉  
This folder also includes a `README.md` file with architecture, tools used, and design decisions.
