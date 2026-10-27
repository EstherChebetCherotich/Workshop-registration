
# Workshop Registration Application

## Project Description

This project is an interactive workshop registration application developed using React and Vite. It allows users to register workshop participants, validate registration details, view registered participants, and remove registrations when necessary.

## Features

- Controlled form inputs managed using React state.
- Registration fields for full name, email, phone number, workshop date, age, portfolio URL, and workshop selection.
- Validation with clear error messages.
- Success message after a valid registration.
- Automatic form clearing after successful registration.
- Display of registered participants in individual cards.
- Ability to remove a participant from the registration list.
- Responsive layout for different screen sizes.
- Accessible labels and validation feedback.

## Technologies Used

- React
- JavaScript
- HTML
- CSS
- Vite

## Requirements

Install the following before running the project:

- Node.js
- npm
- Visual Studio Code or another code editor

## Installation and Setup

1. Download or clone the project repository.
2. Open the project folder in Visual Studio Code.
3. Open the terminal in VS Code.
4. Install the project dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal, usually:

   `http://localhost:5173`

## How to Use the Application

1. Enter the participant's full name.
2. Enter a valid email address and phone number.
3. Select the workshop date.
4. Enter an age between 16 and 100.
5. Choose a workshop from the dropdown list.
6. Optionally enter a portfolio URL.
7. Click the Register button.
8. Review the success message and participant card.
9. Click Remove participant to remove a registration.

## Validation

The application validates required fields, email format, phone number length, workshop date, age range, workshop selection, and portfolio URL format when provided. Invalid information is rejected with an appropriate message.

## Screenshots

The `screenshots` folder contains screenshots demonstrating the application.

- `registration-form.png` — the registration form.
- `registered-participants.png` — the registered participants list.

## Limitations

Registration data is held in React state and is not saved permanently. Refreshing the browser clears the registrations.

## Author

Student Name: [Chebet Esther Cherotich]

Course: [Diploma in information technology]

Project: Lab 2 — Interactive Workshop Registration
