import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Custom error classes
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401);
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string = 'Access denied') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

// Global error handler middleware
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log error
    logger.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    // Handle known operational errors
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({
            status: 'error',
            message: 'Database operation failed',
        });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message,
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token',
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired',
        });
    }

    // Default to 500 server error
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
