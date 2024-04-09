# NestJS Backend Project

This is the backend component for the NestJS project.

## Development Setup

### Prerequisites

Ensure you have Node.js and npm/yarn installed on your machine.

### Installation

First, clone the repository:

```bash
git clone <repository_url>
```

Then, navigate into the project directory and install the dependencies:

```bash
cd <project_directory>
npm install
# or
yarn install
```

### AWS IAM Setup for S3 and Access Keys

1. Sign in to the AWS Management Console and open the IAM console at https://console.aws.amazon.com/iam/.
2. In the navigation pane, choose Users and then choose your IAM user name.
3. In the user details page, choose the Security credentials tab and then choose Create access key.
4. To see the new access key, choose Show. Your credentials will look something like this:

```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

5. To download the key pair, choose Download .csv file. Store the keys in a secure location.

### Environment Variables

Create a `.env` from the `.env.sample` file in the directory of this project. Add environment-specific variables on new lines in the form of `NAME=VALUE`. For example:

```env
AWS_ACCESS_KEY_ID=<your_access_key_id>
AWS_SECRET_ACCESS_KEY=<your_secret_access_key>
AWS_REGION=<your_region>
```

Running the application without the necessary environment variables or with missing ones will result in errors.

### Running the Development Server

Run the development server:

```bash
npm run start:dev
# or
yarn start:dev
```

The server will start at [http://localhost:3000](http://localhost:3000).

### Building the Project

To build the project, run:

```bash
npm run build
# or
yarn build
```

### Swagger Documentation

After running the server, you can access the Swagger UI at [http://localhost:3000/docs](http://localhost:3000/docs). This provides you with a visual interface to interact with your API's resources.

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
