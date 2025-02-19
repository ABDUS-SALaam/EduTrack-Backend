class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: Array<string>;
  message: string;
  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: Array<string> = [],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) this.stack = stack;
  }
}
export default ApiError;
