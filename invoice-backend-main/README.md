# Billing & Invoice Backend API

This is the backend API for managing Customers, Products, and Invoices. 

## Prequisites

You will need to have Node.js and PostgreSQL installed.

1. **Install Node.js:** Download it from [https://nodejs.org/](https://nodejs.org/)
2. **Install PostgreSQL:** Download it from [https://www.postgresql.org/](https://www.postgresql.org/)

## Setup Instructions

Once Node.js is installed, open your command prompt or terminal in this project folder and run:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Rename `.env.example` to `.env` and update your PostgreSQL connection URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/invoice_db?schema=public"
PORT=3000
```

### 3. Initialize & Migrate Database
Create the database tables using Prisma's migration tools. Run the following command to create your first migration and push the schema to the database:

```bash
npx prisma migrate dev --name init
```

> **Note for Windows Users:** If you get an `EPERM: operation not permitted` error (specifically on `query_engine-windows.dll.node`), it means the `npm run dev` server is currently running and locking the Prisma client files. You must **stop the development server** (Ctrl+C in the terminal) before running any `prisma generate` or `prisma migrate` commands! After it finishes, you can start `npm run dev` again.

### 4. Run the Server
For development (with auto-reload):
```bash
npm run dev
```

The Server should start on `http://localhost:3000`.

## API Documentation

All API routes validate their incoming payloads strictly. Malformed requests will automatically return a `400 Bad Request` with a clear array of error messages explaining what is wrong.

---

### Customers

#### 1. List All Customers
- **Endpoint**: `GET /api/customers`
- **Response**: Returns an array of exactly what is in the Customer table.
```json
[
  {
    "id": "some-uuid-here",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-0199",
    "address": "123 Main St",
    "createdAt": "2024-04-01T12:00:00.000Z",
    "updatedAt": "2024-04-01T12:00:00.000Z"
  }
]
```

#### 2. Create a Customer
- **Endpoint**: `POST /api/customers`
- **Request Payload**:
```json
{
  "name": "Jane Doe",           // Required, string
  "email": "jane@example.com",  // Required, valid email string
  "phone": "555-0199",          // Optional
  "address": "123 Main St"      // Optional
}
```
- **Response**: Returns the created Customer object (`201 Created`).

#### 3. Get Customer Details
- **Endpoint**: `GET /api/customers/:id`
- **Response**: Returns the Customer object appended with an `invoices` array containing all invoices billed to them.

---

### Products

#### 1. List All Products
- **Endpoint**: `GET /api/products`
- **Response**: Array of all created Products.
```json
[
  {
    "id": "some-uuid-here",
    "name": "Consulting Hour",
    "description": "One hour of expert consulting",
    "price": "150.00",
    "createdAt": "2024-04-01T12:00:00.000Z"
  }
]
```

#### 2. Create a Product
- **Endpoint**: `POST /api/products`
- **Request Payload**:
```json
{
  "name": "Consulting Hour",             // Required, string
  "description": "Expert consulting",    // Optional
  "price": 150.00                        // Required, positive number
}
```
- **Response**: Returns the created Product object (`201 Created`).

---

### Invoices

#### 1. List All Invoices
- **Endpoint**: `GET /api/invoices`
- **Response**: Array of Invoice objects, including partial nested Customer info.
```json
[
  {
    "id": "some-uuid-here",
    "customerId": "customer-uuid-here",
    "status": "DRAFT",
    "totalAmount": "300.00",
    "issueDate": "2024-04-01T12:00:00.000Z",
    "customer": {
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
]
```

#### 2. Create an Invoice
- **Endpoint**: `POST /api/invoices`
- **Request Payload**: Send the customer ID and how many items they are buying. **The backend natively figures out the product prices and calculates the total amount automatically.**
```json
{
  "customerId": "valid-customer-uuid",    // Required
  "items": [                              // Required, minimum 1 item
    {
      "productId": "valid-product-uuid",  // Required
      "quantity": 2                       // Required, minimum 1
    }
  ]
}
```
- **Response**: Returns the constructed Invoice object (`201 Created`).

#### 3. Get Invoice Details
- **Endpoint**: `GET /api/invoices/:id`
- **Response**: Complex object. Returns the Invoice object containing full `customer` details, alongside fully populated `items` objects (which themselves hold the nested `product` detail).

#### 4. Update Invoice Status
- **Endpoint**: `PUT /api/invoices/:id/status`
- **Request Payload**:
```json
{
  "status": "PAID"   // Required. Must be exact match string: 'DRAFT', 'SENT', 'PAID', or 'CANCELLED'
}
```
- **Response**: Returns the updated Invoice object.
