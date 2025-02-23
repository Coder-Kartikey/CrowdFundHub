# CrowdFundHub - React + Vite Application

## Overview

CrowdFundHub is a React-based web application built with Vite, designed to facilitate crowdfunding campaigns. Users can browse campaigns, create new campaigns, manage their existing campaigns, and engage with campaigns through comments. The application uses a modern UI built with Material UI (MUI) and incorporates routing with React Router.

## Features

-   **Browse Campaigns:** View a list of active crowdfunding campaigns on the home page.
-   **Campaign Details:** See detailed information about a specific campaign, including its description, goal, funding progress, and comments.
-   **Create Campaigns:** Authenticated users can create new campaigns by providing details such as title, description, funding goal, category, start and end dates, and an image or video URL.
-   **Manage Campaigns:** Authenticated users can manage their campaigns, including editing and deleting them.
-   **User Authentication:** Secure user registration and login functionality.
-   **Commenting System:** Users can add comments to campaigns to engage with the campaign creators and other supporters.
-   **Responsive Design:** The application is designed to be responsive and accessible on various devices.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A build tool that provides a fast and optimized development experience.
-   **Material UI (MUI):** A popular React UI framework for building consistent and attractive user interfaces.
-   **React Router:** A standard library for routing in React applications.
-   **Local Storage:** Used for mock API calls and storing user and campaign data locally.

## Setup Instructions

Follow these steps to get the application up and running on your local machine:

### Prerequisites

-   Node.js (version 18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:

    ```sh
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```sh
    cd EY-Internship
    ```

3.  Navigate to the client directory:

    ```sh
    cd client
    ```

4.  Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

### Development Server

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

This will start the application at:

```http://localhost:5173```

### Building the Application

To build the application for production, run:

```sh
npm run build
# or
yarn build
```

This will create an optimized build in the dist directory.

### Running Tests

To run the unit tests, execute:

```sh
npm run test
# or
yarn test
```

## File Structure

client/
├── __mocks__/            # Mocks for testing
├── public/             # Static assets
├── src/                # Source code
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable React components
│   ├── pages/          # React components for different routes
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point for the React application
│   └── index.css       # Global styles
├── .babelrc             # Babel configuration
├── .gitignore           # Specifies intentionally untracked files that Git should ignore
├── eslint.config.js    # ESLint configuration
├── index.html          # Main HTML file
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
└── vite.config.js      # Vite configuration

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

Kartikey Pandey:\
-E-mail - ```pkartikey5757@gmail.com```\
LinkedIn - ```www.linkedin.com/in/coderkp```\

## Acknowledgements

-This project was built using React, Vite, and Material UI.\
-Inspiration was taken from various open-source projects and online tutorials.

## Author 

Coder-Kartikey