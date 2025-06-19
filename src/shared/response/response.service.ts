import { Injectable, HttpStatus } from '@nestjs/common';

// Enum for common response messages
export enum ResponseMessage {
  CREATED = 'Resource created successfully',
  UPDATED = 'Resource updated successfully',
  DELETED = 'Resource deleted successfully',
  FETCHED = 'Resource fetched successfully',
  NOT_FOUND = 'Resource not found',
  BAD_REQUEST = 'Invalid request parameters',
  UNAUTHORIZED = 'Unauthorized access',
  FORBIDDEN = 'Access forbidden',
  SERVER_ERROR = 'Internal server error',
}

// Enhanced Response DTO with optional metadata
export interface ResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T | null;
  metadata?: {
    timestamp?: number;
    requestId?: string;
    [key: string]: any; // This allows additional properties
  };
}

@Injectable()
export class ResponseService {
  /**
   * Builds a standardized API response
   * @param statusCode HTTP status code
   * @param message Response message
   * @param data Optional response data
   * @param metadata Optional additional metadata
   * @returns Standardized response object
   */
  buildResponse<T>(
    statusCode: number = HttpStatus.OK,
    message: string = ResponseMessage.FETCHED,
    data?: T | null,
    metadata: Record<string, any> = {},
  ): ResponseDto<T> {
    return {
      statusCode,
      message,
      data: data ?? null,
      metadata: {
        timestamp: Date.now(),
        ...metadata,
      },
    };
  }

  /**
   * Builds a success response with default 200 OK status
   * @param data Response data
   * @param message Optional custom message
   * @returns Success response
   */
  buildSuccessResponse<T>(data: T, message?: string): ResponseDto<T> {
    return this.buildResponse(
      HttpStatus.OK,
      message || ResponseMessage.FETCHED,
      data,
    );
  }

  /**
   * Builds a creation response with 201 Created status
   * @param data Created resource
   * @param message Optional custom message
   * @returns Creation response
   */
  buildCreatedResponse<T>(data: T, message?: string): ResponseDto<T> {
    return this.buildResponse(
      HttpStatus.CREATED,
      message || ResponseMessage.CREATED,
      data,
    );
  }

  /**
   * Builds an error response
   * @param statusCode Error status code
   * @param message Error message
   * @param errors Optional additional error details
   * @returns Error response
   */
  buildErrorResponse(
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = ResponseMessage.SERVER_ERROR,
    errors?: any,
  ): ResponseDto<null> {
    return {
      statusCode,
      message,
      data: null,
      metadata: {
        timestamp: Date.now(),
        errors, // Now this will work due to the [key: string]: any
      },
    };
  }
}
