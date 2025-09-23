import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Image Processing Service API',
            version: '1.0.0',
            description:
                'A RESTful API for a backend image processing service with secure user authentication using JWT. It allows users to upload, manage, and transform images, including features like resizing, cropping, rotating, and applying filters. Transformed images are saved as new files and linked to the original.',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token in the format: Bearer {token}',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The user ID.',
                            example: '60c72b2f9b1d8c001f8e4c6c',
                        },
                        username: {
                            type: 'string',
                            description: "The user's username.",
                            example: 'john.doe',
                        },
                        role: {
                            type: 'string',
                            description: "The user's role.",
                            enum: ['user', 'admin'],
                            example: 'user',
                        },
                    },
                },
                Image: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The image ID.',
                            example: '60c72b2f9b1d8c001f8e4c6d',
                        },
                        filename: {
                            type: 'string',
                            description: 'The name of the image file on the server.',
                            example: '1623829295123-my-image.jpg',
                        },
                        originalName: {
                            type: 'string',
                            description: 'The original name of the uploaded image file.',
                            example: 'my-image.jpg',
                        },
                        path: {
                            type: 'string',
                            description: 'The server path to the image file.',
                            example: 'Public/Uploads/1623829295123-my-image.jpg',
                        },
                        size: {
                            type: 'number',
                            description: 'The size of the image file in bytes.',
                            example: 1024,
                        },
                        userId: {
                            type: 'string',
                            description: 'The ID of the user who uploaded the image.',
                            example: '60c72b2f9b1d8c001f8e4c6c',
                        },
                        mimeType: {
                            type: 'string',
                            description: 'The MIME type of the image file.',
                            example: 'image/jpeg',
                        },
                        originalImageId: {
                            type: 'string',
                            description: 'The ID of the original image if this is a transformed version.',
                            example: '60c72b2f9b1d8c001f8e4c6a'
                        }
                    },
                },
            },
        },
        paths: {
            '/auth/register': {
                post: {
                    summary: 'Register a new user',
                    tags: ['Auth'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['username', 'password'],
                                    properties: {
                                        username: {
                                            type: 'string',
                                            example: 'newuser',
                                        },
                                        password: {
                                            type: 'string',
                                            description: 'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, and one number.',
                                            example: 'Password123!',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'User registered successfully',
                        },
                        '400': {
                            description: 'Bad Request (e.g., username taken, invalid password)',
                        },
                    },
                },
            },
            '/auth': {
                post: {
                    summary: 'Login to get an authentication token',
                    tags: ['Auth'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['username', 'password'],
                                    properties: {
                                        username: {
                                            type: 'string',
                                            example: 'newuser',
                                        },
                                        password: {
                                            type: 'string',
                                            example: 'Password123!',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Successful login',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            token: {
                                                type: 'string',
                                            },
                                            user: {
                                                $ref: '#/components/schemas/User',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Bad Request (e.g., invalid credentials)',
                        },
                    },
                },
            },
            '/uploads': {
                post: {
                    summary: 'Upload a new image',
                    tags: ['Uploads'],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        image: {
                                            type: 'string',
                                            format: 'binary',
                                            description: 'The image file to upload.',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Image uploaded successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Image'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'No file uploaded',
                        },
                        '401': {
                            description: 'Unauthorized',
                        },
                    },
                },
            },
            '/users': {
                get: {
                    summary: 'Get all users (Admin only)',
                    tags: ['Users'],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of all users.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/User',
                                        },
                                    },
                                },
                            },
                        },
                        '403': {
                            description: 'Forbidden - User is not an admin',
                        },
                    },
                },
            },
            '/users/{id}': {
                get: {
                    summary: 'Get a user by their ID',
                    tags: ['Users'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                            description: 'The ID of the user to retrieve.',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'User data retrieved successfully.',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'Unauthorized',
                        },
                    },
                },
                patch: {
                    summary: 'Update a user by their ID',
                    tags: ['Users'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                            description: 'The ID of the user to update.',
                        },
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        username: {
                                            type: 'string',
                                        },
                                        password: {
                                            type: 'string',
                                        },
                                        role: {
                                            type: 'string',
                                            description: "Can only be changed by an admin."
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'User updated successfully',
                        },
                        '403': {
                            description: 'Forbidden - Admins can only update their own profile',
                        },
                    },
                },
            },
            '/images': {
                get: {
                    summary: "Get the authenticated user's images",
                    tags: ['Images'],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: "A list of the user's uploaded images.",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Image',
                                        },
                                    },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                        },
                    },
                },
            },
            '/images/all': {
                get: {
                    summary: 'Get all images from all users (Admin only)',
                    tags: ['Images'],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of all images.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Image',
                                        },
                                    },
                                },
                            },
                        },
                        '403': {
                            description: 'Forbidden - User is not an admin',
                        },
                    },
                },
            },
            '/images/{imageId}': {
                get: {
                    summary: 'Get a specific image by ID',
                    tags: ['Images'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'imageId',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                            description: 'The ID of the image to retrieve.',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Image data retrieved successfully.',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Image'
                                    }
                                }
                            }
                        },
                        '403': {
                            description: 'Forbidden - User does not own this image',
                        },
                        '404': {
                            description: 'Image not found',
                        },
                    },
                },
                delete: {
                    summary: 'Delete an image by ID',
                    tags: ['Images'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'imageId',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                            description: 'The ID of the image to delete.',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Image deleted successfully',
                        },
                        '403': {
                            description: 'Forbidden - User does not own this image',
                        },
                        '404': {
                            description: 'Image not found',
                        },
                    },
                },
            },
            '/images/{imageId}/transform': {
                post: {
                    summary: 'Apply transformations to an image and save it as a new file',
                    tags: ['Images'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'imageId',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                            description: 'The ID of the image to transform.',
                        },
                    ],
                    requestBody: {
                        description: "A JSON object specifying the transformations to apply.",
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        resize: {
                                            type: 'object',
                                            properties: {
                                                width: { type: 'integer' },
                                                height: { type: 'integer' }
                                            }
                                        },
                                        crop: {
                                            type: 'object',
                                            properties: {
                                                x: { type: 'integer' },
                                                y: { type: 'integer' },
                                                width: { type: 'integer' },
                                                height: { type: 'integer' }
                                            }
                                        },
                                        rotate: { type: 'integer' },
                                        filters: {
                                            type: 'object',
                                            properties: {
                                                grayscale: { type: 'boolean' }
                                            }
                                        },
                                        format: {
                                            type: 'string',
                                            enum: ['jpeg', 'png', 'webp']
                                        }
                                    }
                                },
                                examples: {
                                    resize_and_grayscale: {
                                        summary: "Resize and apply grayscale",
                                        value: {
                                            resize: {
                                                width: 200,
                                                height: 200
                                            },
                                            filters: {
                                                grayscale: true
                                            }
                                        }
                                    },
                                    crop_and_rotate: {
                                        summary: 'Crop and rotate',
                                        value: {
                                            crop: {
                                                x: 10,
                                                y: 10,
                                                width: 100,
                                                height: 100
                                            },
                                            rotate: 90
                                        }
                                    },
                                    change_format: {
                                        summary: "Change format to WebP",
                                        value: {
                                            format: "webp"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Image transformed and saved successfully.',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Image'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'No transformations provided',
                        },
                        '403': {
                            description: 'Forbidden - User does not own this image',
                        },
                        '404': {
                            description: 'Image not found',
                        },
                    },
                },
            },
        },
    },
    apis: ['./Routes/*.js'],
};



const swaggerDocs = swaggerJSDoc(options);

export default swaggerDocs;