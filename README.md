# Car Rental Service

# Live Link: https://nyntax-task-frontend.vercel.app/

## Description

A web application to generate invoices for a car rental service using the MERN stack.

## Features

- Fetch car details from an external API
- Calculate rental charges based on duration
- Generate and save invoices
- Apply discounts and additional charges
- Get a breakdown of rental charges before generating an invoice

## API Endpoints

- `GET /cars` - Fetch car details
- `POST /invoices` - Create a new invoice

## Calculation Logic

Rental charges are calculated by converting the rental duration into weeks, days, and hours, ensuring the best rate is applied for the duration.
