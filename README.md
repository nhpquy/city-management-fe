# City Management System - Frontend

## Overview

The City Management System frontend is a **React-based** application that provides a user interface for managing city and electricity/water supply data.

## Dependencies

- **React**: Frontend library for building user interfaces.
- **React Router DOM**: For handling routing and navigation.
- **Material-UI**: For UI components and styling.
- **Chart.js**: For rendering charts and graphs.
- **Axios**: For making HTTP requests.
- **Tailwind CSS**: For utility-first CSS framework (if used in `App.css`).

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:nhpquy/city-management-fe.git
cd city-management-fe
```

### 2. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Run the following command to install the required dependencies:

```bash
npm install
yarn
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project if it doesn't already exist. Add any required environment variables. For example:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

Make sure to replace the `REACT_APP_API_URL` with your backend server URL.

### 4. Start the Development Server

Run the following command to start the development server:

```bash
npm start
yarn start
```

This will start the React development server and open the application in your default web browser. The app will be available at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

To create a production build of your application, run:

```bash
npm run build
yarn run build
```

The build files will be generated in the `build` directory. You can deploy these files to your production server.

### 6. Running Tests

To run tests, use:

```bash
npm test
```

This will start the test runner and execute your test cases.
