Of course. I have updated the `README.md` file to include the project source link you provided from roadmap.sh.

Here is the updated `README.md` file:

# Image Processing Service API

This project is a backend image processing service built with Node.js and Express, featuring secure user authentication, image uploading, and dynamic on-the-fly image transformations.

## Features

* **Secure Authentication**: JWT-based authentication for registering and logging in users.
* **Role-Based Access Control**: Differentiates between `user` and `admin` roles, with protected routes for admin-only functionalities.
* **Image Uploading**: Handles multipart/form-data for seamless image uploads using `multer`.
* **Dynamic Image Transformations**: Utilizes the high-performance `sharp` library to:
    * Resize images to specific dimensions.
    * Crop images to a specified region.
    * Rotate images.
    * Apply filters like grayscale.
    * Convert images to different formats (JPEG, PNG, WebP).
* **Persistent Transformed Images**: Saves transformed images as new files and creates new database entries, linking them back to the original image.

## Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`
* **Image Processing**: `sharp`
* **File Uploads**: `multer`
* **Environment Variables**: `dotenv`

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v14 or higher)
* npm
* MongoDB

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/amirs0b/Roadmap.sh-Image-Processing-Service-API.git
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `config.env` file in the root directory and add your environment variables:
    ```env
    PORT=5000
    DATABASE=mongodb://localhost:27017/ImageService
    JWT_SECRET=your_jwt_secret
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user. | Public |
| `POST` | `/auth` | Login and receive a JWT. | Public |
| `POST` | `/uploads` | Upload a new image. | User |
| `GET` | `/users` | Get a list of all users. | Admin |
| `GET` | `/users/:id` | Get a specific user by ID. | User/Admin |
| `PATCH`| `/users/:id` | Update a user's details. | User/Admin |
| `GET` | `/images` | Get all images uploaded by the authenticated user. | User |
| `GET` | `/images/all` | Get a list of all images in the system. | Admin |
| `GET` | `/images/:imageId` | Get a specific image by its ID. | User/Admin |
| `DELETE`| `/images/:imageId` | Delete an image. | User/Admin |
| `POST` | `/images/:imageId/transform` | Transform an image and save it as a new file. | User/Admin |

## Source

This project was inspired by the project idea on roadmap.sh and is open source.

* **Project Idea**: [Image Processing Service on roadmap.sh](https://roadmap.sh/projects/image-processing-service)
* **GitHub Repository**: [https://github.com/amirs0b/Roadmap.sh-Image-Processing-Service-API](https://www.google.com/search?q=https://github.com/amirs0b/Roadmap.sh-Image-Processing-Service-API)