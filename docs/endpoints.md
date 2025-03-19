# Rent An Auto API Endpoints Documentation

## Overview

This document provides an overview of the API endpoints available in the Rent An Auto application. Each endpoint is described with its path, HTTP method, parameters, and response format.

---

## Endpoints

### 1. Create Car

- **Path:** `/api/cars`
- **Method:** `POST`
- **Description:** Creates a new car in the system.
- **Request Parameters:**
  - `name` (body): The name of the car.
  - `description` (body): A description of the car.
  - `daily_rate` (body): The daily rental rate for the car.
  - `license_plate` (body): The car's license plate number.
  - `fine_amount` (body): The fine amount for late return.
  - `brand` (body): The brand of the car.
  - `category_id` (body): The ID of the car's category.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Toyota Corolla",
    "description": "A reliable sedan",
    "daily_rate": 50,
    "license_plate": "ABC1234",
    "fine_amount": 100,
    "brand": "Toyota",
    "category_id": "1"
  }'
  ```
- **Response:**
  - Returns the created car object.

### 2. List Available Cars

- **Path:** `/api/cars/available`
- **Method:** `GET`
- **Description:** Retrieves a list of all available cars for rent.
- **Request Parameters:**
  - `category_id` (query, optional): Filter by category ID.
  - `name` (query, optional): Filter by car name.
  - `brand` (query, optional): Filter by car brand.
- **Example Request:**
  ```bash
  curl -X GET "http://localhost:3000/api/cars/available?brand=Toyota"
  ```
- **Response:**
  - Returns a list of available cars.

### 3. Upload Car Images

- **Path:** `/api/cars/{id}/images`
- **Method:** `POST`
- **Description:** Uploads images for a specific car.
- **Request Parameters:**
  - `id` (path): The ID of the car.
  - `images` (form-data): The images to upload.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/cars/1/images \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
  ```
- **Response:**
  - Returns a success message upon successful upload.

### 4. Create Rental

- **Path:** `/api/rentals`
- **Method:** `POST`
- **Description:** Creates a new rental for a car.
- **Request Parameters:**
  - `car_id` (body): The ID of the car to rent.
  - `expected_return_date` (body): The expected return date for the rental.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "car_id": "1",
    "expected_return_date": "2023-12-31T23:59:59Z"
  }'
  ```
- **Response:**
  - Returns the rental confirmation details.

### 5. Return Rental

- **Path:** `/api/rentals/{id}/return`
- **Method:** `POST`
- **Description:** Marks a rental as returned.
- **Request Parameters:**
  - `id` (path): The ID of the rental to be returned.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/rentals/1/return
  ```
- **Response:**
  - Returns a confirmation of the return.

### 6. List Rentals by User

- **Path:** `/api/users/{id}/rentals`
- **Method:** `GET`
- **Description:** Retrieves the rental history for a specific user.
- **Request Parameters:**
  - `id` (path): The ID of the user.
- **Example Request:**
  ```bash
  curl -X GET http://localhost:3000/api/users/1/rentals
  ```
- **Response:**
  - Returns a list of past rentals for the user.

### 7. Create Category

- **Path:** `/api/categories`
- **Method:** `POST`
- **Description:** Creates a new category for cars.
- **Request Parameters:**
  - `name` (body): The name of the category.
  - `description` (body): A description of the category.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SUV",
    "description": "Sport Utility Vehicle"
  }'
  ```
- **Response:**
  - Returns a success message upon successful creation.

### 8. List Categories

- **Path:** `/api/categories`
- **Method:** `GET`
- **Description:** Retrieves a list of all car categories.
- **Example Request:**
  ```bash
  curl -X GET http://localhost:3000/api/categories
  ```
- **Response:**
  - Returns a list of categories.

### 9. Import Category

- **Path:** `/api/categories/import`
- **Method:** `POST`
- **Description:** Imports categories from a file.
- **Request Parameters:**
  - `file` (form-data): The file containing categories to import.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/categories/import \
  -F "file=@/path/to/categories.csv"
  ```
- **Response:**
  - Returns a success message upon successful import.

### 10. Authenticate User

- **Path:** `/api/sessions`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token.
- **Request Parameters:**
  - `email` (body): The user's email.
  - `password` (body): The user's password.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
  ```
- **Response:**
  - Returns an authentication token.

### 11. Refresh Token

- **Path:** `/api/refresh-token`
- **Method:** `POST`
- **Description:** Refreshes the authentication token.
- **Request Parameters:**
  - `token` (body/query/header): The current token to refresh.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "token": "current_token"
  }'
  ```
- **Response:**
  - Returns a new authentication token.

### 12. Update User Avatar

- **Path:** `/api/users/avatar`
- **Method:** `PATCH`
- **Description:** Updates the user's avatar.
- **Request Parameters:**
  - `avatar_file` (form-data): The new avatar image file.
- **Example Request:**
  ```bash
  curl -X PATCH http://localhost:3000/api/users/avatar \
  -F "avatar_file=@/path/to/avatar.jpg"
  ```
- **Response:**
  - Returns a success message upon successful update.

### 13. Send Forgot Password Mail

- **Path:** `/api/password/forgot`
- **Method:** `POST`
- **Description:** Sends a password reset email to the user.
- **Request Parameters:**
  - `email` (body): The user's email.
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/password/forgot \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
  ```
- **Response:**
  - Returns a success message upon successful email dispatch.

### 14. Reset Password

- **Path:** `/api/password/reset`
- **Method:** `POST`
- **Description:** Resets the user's password.
- **Request Parameters:**
  - `token` (query): The reset token.
  - `password` (body): The new password.
- **Example Request:**
  ```bash
  curl -X POST "http://localhost:3000/api/password/reset?token=reset_token" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "newpassword123"
  }'
  ```
- **Response:**
  - Returns a success message upon successful password reset.

### 15. Get User Profile

- **Path:** `/api/users/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile of the authenticated user.
- **Example Request:**
  ```bash
  curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer your_token"
  ```
- **Response:**
  - Returns the user's profile information.

---

## Notes

- Ensure that all request bodies are sent in JSON format unless specified otherwise (e.g., form-data for file uploads).
- Authentication is required for most endpoints, typically via a Bearer token in the Authorization header.
- Date formats should be in ISO 8601. 