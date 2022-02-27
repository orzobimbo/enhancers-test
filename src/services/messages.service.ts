type IMessageKind = 'coord' | 'city' | 'weather' | 'business' | 'full' | 'mod';

export default class MessagesServices {
  private message = '';

  private city = '';

  private readonly frame = '|';

  private readonly endMessage = 'sono stati ottenuti';

  setCity = (city: string) => {
    this.city = city;
  };

  build = (type: IMessageKind) => {
    switch (type) {
      case 'coord':
        this.message += 'sulle coordinate';
        break;
      case 'city':
        this.message += 'sui dettagli';
        break;
      case 'weather':
        this.message += 'sulle condizioni meteo';
        break;
      case 'business':
        this.message += 'sulle attività commerciali';
        break;
      case 'full':
        this.message += 'completi';
        break;
      case 'mod':
        this.message += 'modificati';
        break;
      default:
        break;
    }
  };

  addFlag = (flag: string) => {
    this.message = `|${flag}|.${this.message}`;
  };

  setCommonPart = (type: IMessageKind, flag?: string) => {
    this.message = 'i dati ';
    this.build(type);
    if (flag) {
      this.addFlag(flag);
    }
    this.message = `${this.message} della città ${this.frame}${this.city}${this.frame}`;
  };

  success = (type: IMessageKind, flag?: string) => {
    this.setCommonPart(type, flag);
    return `${this.message} ${this.endMessage}`;
  };

  error = (type: IMessageKind, flag?: string) => {
    this.setCommonPart(type, flag);
    return `${this.message} NON ${this.endMessage}`;
  };
}
