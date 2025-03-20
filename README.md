# Index

- [About](#about)
- [Technologies](#technologies)
- [Installation](#installation)
- [Functional Requirements, Non-Functional Requirements, and Business Rules](#functional-requirements-non-functional-requirements-and-business-rules)   

---
![image](https://github.com/user-attachments/assets/3fd61e24-d061-4b98-aa28-3535ddb6b1d2)


## About

Rent an Auto is an API designed to manage car rentals efficiently. The system provides functionalities for car registration, rental management, and user authentication. It ensures that only administrators can manage car listings, while users can search for available cars and rent them. The API also includes features for managing car specifications, uploading car images, handling returns, and processing user authentication and password recovery.

## Technologies

- TypeScript
- Express
- Jest
- PostgreSQL
- TypeORM
- Multer (for file uploads)

## Installation

```sh
# Clone the repository
git clone https://github.com/leandrolimadeveloper/rent-an-auto-api.git
cd rent-an-auto

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

Update the .env file with the necessary credentials. Use the .env.example file as a reference.

# Start the database container (PostgreSQL)
docker compose up
or
docker compose up -d   # run in detached mode

# Start the application
npm run dev

# Run migrations
npm run typeorm migrations:run
```

## Functional Requirements, Non-Functional Requirements, and Business Rules
### **Functional Requirements (FR)**

#### **Car Registration**

- The system must allow the registration of a new car.
- The system must set a car as available by default when registered.

#### **Car Listing**

- The system must allow listing all available cars.
- The system must allow filtering available cars by category, brand, or name.
- The system must allow users to view cars without requiring login.

#### **Car Specification Management**

- The system must allow adding specifications to a car.

#### **Car Image Upload**

- The system must allow uploading car images.
- The system must allow uploading multiple images per car.

#### **Car Rental**

- The system must allow registering a new rental.
- The system must allow only authenticated users to rent a car.
- The system must change the car's status to **unavailable** after rental.

#### **Car Return**

- The system must allow processing car returns.
- The system must mark the car as **available** for rental after return.
- The system must calculate the total rental cost, including any late fees if applicable.

#### **Rental History**

- The system must allow users to retrieve all rentals associated with them.
- The system must require users to be authenticated to view their rental history.

#### **Password Recovery**

- The system must allow users to request password recovery via email.
- The system must send an email with instructions to reset the password.
- The system must allow users to set a new password.

---

### **Non-Functional Requirements (NFR)**

- The system must use **Multer** for file handling in image uploads.
- The system must use a **PostgreSQL database** to store information.
- The password recovery link must expire **after 3 hours**.
- The system must use **TypeORM** for database management.
- The system must be developed in **TypeScript** and use **Express** as the backend framework.

---

### **Business Rules (BR)**

#### **Car Registration**

- The system must not allow the registration of cars with **duplicate license plates**.
- Only **administrators** can register cars in the system.

#### **Car Specification Management**

- The system must not allow adding specifications to **unregistered cars**.
- The system must prevent adding **duplicate specifications** to the same car.
- Only **administrators** can add specifications to a car.

#### **Car Image Upload**

- Only **administrators** can upload car images.

#### **Car Rental**

- The system must require a **minimum rental period of 24 hours**.
- The system must not allow a user to have **multiple open rentals**.
- The system must not allow a **single car** to be rented by multiple users simultaneously.

#### **Car Return**

- If a car is returned **before 24 hours**, a full daily rate must be charged.
- The system must charge an **extra fee for late returns**.

#### **Password Recovery**

- Users must be **required to enter a new password** when resetting their password.


## Documentation
To access the documentation and test the endpoints, make sure the application is running and open the following address in your browser: <code>http://localhost:3333/api-docs</code>

![Screenshot from 2025-03-19 20-25-28](https://github.com/user-attachments/assets/0a7728f5-f7ef-46a9-a09e-2a54c4bebb96)
