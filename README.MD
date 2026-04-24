# Personal Information 

MEHAKPREET KAUR 
24BCY70046

#  Ticket Booking System with Redis

A simple backend application that simulates a ticket booking system with concurrency control using Redis.

---

##  Aim
To create a concurrent ticket booking system with seat locking using Redis.

---

##  Overview
This project is built using Node.js and Express.js. It allows users to view available seats and book them. Redis is used to handle concurrency by implementing a locking mechanism to prevent multiple users from booking the same seat at the same time.

---

## Tech Stack
- Node.js  
- Express.js  
- Redis  
- Postman (for API testing)  
- Render (for deployment)  

---

##  Features
- View all seats and their status  
- Book a seat  
- Prevent double booking using Redis locks  
- Reset seat data  

---

##  Concurrency Handling
Redis is used to implement seat locking:
- A lock is created when a booking request is made  
- Only one user can acquire the lock  
- Lock expires automatically after a few seconds  
- Prevents race conditions and duplicate bookings  

---

##  API Endpoints

### Get All Seats
GET /seats

### Book a Seat
POST /book/:id

Example:
POST /book/1

### Reset Seats
POST /reset

---

##  Testing
All endpoints are tested using Postman by sending HTTP requests to the server.

---

##  Deployment
The backend is deployed on Render and connected to Redis Cloud for data storage and locking.

---

##  Conclusion
This project demonstrates how Redis can be used to handle concurrency in real-time systems by implementing a seat locking mechanism, ensuring reliable and consistent booking operations.