import { TSeverity, IInfo, TData } from '../types/api';

class HttpResponse {
  public successful = false;

  public info = {} as IInfo;

  public data = null as TData;

  constructor(private scope: string) {
    this.info.scope = scope.toUpperCase();
  }

  initValues(severity: TSeverity, statusCode: number, data: TData, message: string) {
    this.successful = severity !== 'error';

    this.info = {
      ...this.info,
      statusCode,
      severity,
      message: `${message.charAt(0).toUpperCase() + message.slice(1)}.`,
    };

    this.data = data;
    return this;
  }

  setOperation(operation: string) {
    this.info.operation = operation.toUpperCase();
    return this.info.operation;
  }

  success(statusCode: number, data: TData, message: string) {
    return this.initValues('success', statusCode, data, message);
  }

  note(statusCode: number, data: TData, message: string) {
    return this.initValues('note', statusCode, data, message);
  }

  warning(statusCode: number, data: TData, message: string) {
    return this.initValues('warning', statusCode, data, message);
  }

  error(statusCode: number, data: TData, message: string) {
    return this.initValues('error', statusCode, data, message);
  }

  // 'errore intercettato dal middleware express-validator';
  errors(info: IInfo[]) {
    this.successful = true;

    this.info = {
      ...this.info,
      scope: this.scope,
      statusCode: 422,
      severity: 'warning',
      message: info[0].message.charAt(0).toUpperCase() + info[0].message.slice(1),
    };

    this.data = null;

    return this;
  }
}

export default HttpResponse;
