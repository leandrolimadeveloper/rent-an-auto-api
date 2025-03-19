# Index

- [About](#about)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Features](#features)

---

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

## Features

### Car Registration

- Register a new car
- Prevent duplicate license plate registration
- Set the car as available by default
- Ensure only administrators can register cars

### Car Listing

- List all available cars
- Filter available cars by category, brand, or name
- Users do not need to be logged in to view available cars

### Car Specification Management

- Add specifications to a car
- Prevent adding specifications to non-registered cars
- Prevent duplicate specifications for the same car
- Ensure only administrators can add specifications

### Car Image Upload

- Upload car images
- Allow multiple images for a car
- Ensure only administrators can upload images
- Uses Multer for file handling

### Car Rental

- Register a new rental
- Enforce a minimum rental duration of 24 hours
- Prevent users from having multiple open rentals
- Prevent cars from being rented by multiple users simultaneously
- Require users to be logged in to rent a car
- Change car status to unavailable upon rental

### Car Return

- Process car returns
- Charge a full-day fee if returned within 24 hours
- Mark the car as available for rental after return
- Allow users to rent another car after return
- Calculate total rental cost, including late return fees
- Charge a late fee for overdue returns
- Require users to be logged in to return a car

### Rental History

- Retrieve all rentals associated with a user
- Require users to be logged in to view rental history

### Password Recovery

- Allow users to request password recovery via email
- Send an email with recovery instructions
- Enable users to set a new password
- Require users to enter a new password
- Set a recovery link expiration time of 3 hours