
export interface IDomainException {
  statusCode: number;
  message: string[];
  error: string;
}

export class DomainError extends Error {

  private readonly status: number;
  public readonly message: string;

  constructor(message = "Domain Error", status = 406) {
    super(message);
    this.status = status;
    this.message = message;
  }

  getStatus() {
    return this.status;
  }

  getResponse(): IDomainException {
    return {
      statusCode: this.status,
      message: [this.message],
      error: "Domain Error"
    }
  }

}
