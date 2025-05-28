# Beehive Management System API

This project is a RESTful API. It simulates a beehive monitoring and management system tailored for farmers and IoT lab administrators. The API adheres to REST principles, implements HATEOAS, supports JWT authentication, webhooks, and includes comprehensive [Swagger](https://swagger.io/docs/) documentation.

Postman tests are attached under the folder "postman" as a json file.

The data used is taken from the [beehive metrics](https://www.kaggle.com/datasets/se18m502/bee-hive-metrics) dataset on Kaggle.

---

## ✅ Features Implemented

* Full CRUD operations for beehives
* User authentication with JWT
* Role-based authorization (farmer, admin)
* HATEOAS-compliant responses for navigation
* Webhooks for external services (harvest or transport request)
* Swagger UI documentation at `/api-docs`
* Postman collection available under `/postman`
* MongoDB Atlas database integration

---

## 🧪 Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* Swagger (OpenAPI 3.0)
* JSON Web Tokens (JWT)
* Postman

## 🔐 Authentication

All unsafe operations (POST, PUT, DELETE) are protected using JWT authentication. Users must log in to obtain a token, which must be provided in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## 📦 How to Run Locally

1. **Install dependencies**

```bash
npm install
```

2. **Create `.env` file**

```
DB_CONNECTION_STRING= { String to connect to database }
PORT= { The port that the server listens for after connections. }

ACCESS_TOKEN_SECRET= { Secret to used to sign tokens for verification }
ACCESS_TOKEN_LIFETIME= { Lifetime of a token before expiring }
BASE_URL= { The base url of the api }
```

3. **Start the server**

```bash
npm start
```

Server runs on `http://localhost:PORT/BASE_URL`
Swagger available at `http://localhost:PORT/BASE_URL/api-docs`

---

## 📬 Webhooks

* Webhooks can be registered for:

  * Beehive transportation request
  * Honey harvest event
* Once registered, the system POSTs a payload to the provided URL whenever the event triggers.

---

## 📘 HATEOAS

Responses include relevant `links` for:

* Self
* Related resources (e.g., getAllBeehives, updateBeehive)
* Navigation actions

---

## 📑 Swagger Docs

OpenAPI 3.0 Swagger docs can be accessed at:

```
http://localhost:PORT/BASE_URL/api-docs
```

Swagger describes all endpoints with input/output schemas, security requirements, and error messages.

---

## 📄 Postman Collection

Located in the `/postman` folder:

* Collection includes:

  * Valid login & registration flows
  * All beehive routes (CRUD)
  * Webhook registration
  * Authenticated + error scenarios

---

## 📊 Endpoints

* `POST /authentication/register` - Register new user
* `POST /authentication/login` - Authenticate and receive token
* `GET /beehives` - List all beehives
* `GET /beehives/{id}/status` - Get current beehive status by id
* `GET /beehives/{id}/humidity/{startDate}/{endDate}` - Get current beehive humidity status by id and date range
* `GET /beehives/{id}/weight/{startDate}/{endDate}` - Get current beehive weight status by id and date range
* `GET /beehives/{id}/temperature/{startDate}/{endDate}` - Get current beehive temperature status by id and date range
* `GET /beehives/{id}/flow/{startDate}/{endDate}` - Get current beehive flow status by id and date range
* `POST /beehives` - Create a new beehive
* `PUT /beehives/{id}` - Update a beehive location or name
* `DELETE /beehives/{id}` - Delete a beehive
* `POST /beehives/report-transportation` - Create a new transportation request
* `POST /beehives/report-harvest` - Report honey harvest
* `POST /webhook` - Register a webhook

---

## 🧪 Testing

* Every endpoint comprehensive tests with errors and expected outputs in swagger
* Webhooks tested via webhook.site
* Database populated with data taken from the [Beehive Kaggle dataset](https://www.kaggle.com/datasets/se18m502/bee-hive-metrics)

---

## 📌 Notes

* This project was developed and tested locally with MongoDB Atlas
* The `.env.example` file shows required variables
* Project uses Swagger annotations for automatic docs

* Was once hosted publically through a virtual cloud machine with nginx reverse proxy setup (but no longer available)

---

## 👨‍💻 Developer

* Duc Anh Pham - ducanh.p@outlook.com
