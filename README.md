# Tuza S3 Challenge

## Features

-   [x] Enumerate available buckets in the AWS account

-   [x] View files in tree / file explorer layout

-   [x] Access files from a private S3 bucket

-   [x] Download or view files using signed URLs

-   [x] Unit Testing

-   [x] Coverage Reports

-   [x] End-to-End (E2E) Testing

-   [x] Swagger documentation

-   [x] Material UI components

-   [x] Manage secrets through environment variables

-   [x] React Routing

-   [x] TypeScript for static typing and scalability

-   [x] Linting

-   [x] Formatter

## Project Structure

The project structure has a directory hierarchy containing two main components: the Next.js frontend and the Node.js backend.
The project structure follows a common pattern for web development projects, separating the frontend and backend components and providing instructions for setup, installation, running the development server, building the project, and running tests.

Here's a breakdown of the structure:

1. **README.md**: This file provides an overview of the project.

2. **NestJs Backend**: This section contains the setup and configuration for the Node.js backend.

    - **Development Setup**: This subsection outlines the prerequisites for running the backend and provides instructions for installation.

    - **Installation**: This subsection explains how to navigate into the backend directory and install the required dependencies using either npm or yarn.

    - **Running the Development Server**: This subsection provides commands to start the development server, which will be accessible at [http://localhost:3000](http://localhost:3000).

    - **Building the Project**: This subsection explains how to build the backend project using npm or yarn.

    - **Testing**: This section provides instructions for running the test suite for both backend project.

    Please refer to the README.md inside the `backend-nest` folder for detailed instructions.

3. **NextJs Frontend**: This section contains the setup and configuration for the Next.js frontend.

    - **Development Setup**: This subsection outlines the prerequisites for running the frontend and provides instructions for installation.

    - **Installation**: This subsection explains how to navigate into the frontend directory and install the required dependencies using either npm or yarn.

    - **Running the Development Server**: This subsection provides commands to start the development server, allowing you to view the frontend in your browser at [http://localhost:3001](http://localhost:3001).

    - **Building the Project**: This subsection explains how to build the frontend project using npm or yarn.

    - **Testing**: This section provides instructions for running the test suite for both the frontend project using npm or yarn.

    Please refer to the README.md inside the `frontend-next` folder for detailed instructions.

## Assumptions

Several assumptions were made regarding business, technical, and team aspects are listed below:

1. There is no requirement for the user to display file thumbnails for media such as images or video.

2. Currently, there is no necessity for authentication between the Backend and Frontend.

3. The team possesses an understanding of TypeScript and React.

4. The team has already set up the necessary AWS infrastructure.

5. The team has a fundamental understanding of the project's problem domain and requirements.

6. The team is equipped with the requisite technical knowledge and skills to debug, run, and resolve any potential issues.

7. The frontend will be accessed by mobile users and therefore requires responsive design.

8. There is no requirement for a media player for the users.

## Future Work:

1. **Implement Authentication**: Adding service to service authentication can be a significant enhancement in terms of security.

2. **Improve Frontend Testing Setup**: Ensuring that all components, pages, and utilities are thoroughly tested. This could include unit tests, integration tests, and end-to-end tests.

3. **Pagination**: When managing and navigating large sets of data. This feature allows users to view data in a series of pages, thus improving the application's performance and usability by only loading a subset of data at any one time.

4. **Implement Continuous Integration/Continuous Deployment (CI/CD)**: A CI/CD pipeline will automate testing and deployment process.

5. **Improve Error Handling**: Robust error handling and reporting can make it easier to identify and fix issues that arise such as using Sentry.

6. **Use Server Side Rendering**: Leverage Next.js Server Side Rendering to abstract API calls.
