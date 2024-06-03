# Hospital COVID-19 Management API

## Overview
This API is designed for a hospital allocated by the government for testing, quarantine, and well-being of COVID-19 patients. It supports two types of users: Doctors and Patients. Doctors can log in, register patients, and create reports after checkups.

## Users
- **Doctor**:
Can log in to the system
Register new patients or retrieve existing patient information
Create patient reports after checkups
- **Patients**:
Registered by doctors using their phone number
If already registered, their information is retrieved

## Patient Reports
- **A patient report includes**:
Created by doctor
Status (enum): Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit
Date

## Routes
- **Doctor Routes**:
POST /doctors/register
Registers a new doctor with username and password
POST /doctors/login
Logs in a doctor and returns a JWT for authentication

- **Patient Routes**:
POST /patients/register
Registers a new patient using their phone number
POST /patients/:id/create_report
Creates a new report for the patient with the specified ID
GET /patients/:id/all_reports
Lists all reports of a patient from oldest to latest

## Report Routes
GET /reports/:status
Lists all reports filtered by a specific status

## Authentication
The following routes are protected by JWT authentication:

POST /patients/register
POST /patients/:id/create_report
GET /patients/:id/all_reports
GET /reports/:status

## Setup and Running
- **Prerequisites**:
Node.js
MongoDB
Installation
- **Clone the repository**:
git clone https://github.com/satyam-769/employee-review.git
Install dependencies:
npm install
- **Set up environment variables**:
Create a .env file and add the following:
PORT=8000
JWT_SECRET=secret

Running the Server
npm run start