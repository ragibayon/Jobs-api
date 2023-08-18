export class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomAPIError';
  }
}
