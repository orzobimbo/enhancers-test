import { check, buildCheckFunction } from 'express-validator';

const checkQuery = buildCheckFunction(['query']);

class ValidateRequest {
  private readonly cityRegex = /[a-zA-Z]{2,20}/;
  private readonly countryRegex = /^[a-zA-Z]{2}$/;

  setErrorMessage = (param: string) => {
    return `il parametro ${param} non è valido`;
  };

  queryCommon = () => {
    const paramsValidator = [
      checkQuery('city', this.setErrorMessage('city')).matches(this.cityRegex),
      checkQuery('country', this.setErrorMessage('country')).matches(this.countryRegex),
    ];
    return paramsValidator;
  };

  queryMod = () => {
    const paramsValidator = [
      checkQuery('city', this.setErrorMessage('city')).matches(this.cityRegex),
      checkQuery('country', this.setErrorMessage('country')).matches(this.countryRegex),
      checkQuery('reviewCount', this.setErrorMessage('reviewCount'))
        .optional({ nullable: true })
        .matches(/^[1-9][0-9]{0,2}$/),
      checkQuery('searchName', this.setErrorMessage('searchName'))
        .optional({ nullable: true })
        .matches(/^[a-zA-Z0-9]{1,10}$/),
      checkQuery('distanceOrder', this.setErrorMessage('distanceOrder'))
        .optional({ nullable: true })
        .matches(/^asc|desc$/),
    ];
    return paramsValidator;
  };

  paramsTest = () => {
    const paramsValidator = [
      checkQuery('nome', this.setErrorMessage('nome')).matches(/^[a-zA-Z]{2,10}$/),
      checkQuery('anni', this.setErrorMessage('anni')).matches(/^[1-9][0-9]?$/),
    ];
    return paramsValidator;
  };

  paramsCommon = () => {
    const paramsValidator = [
      check('city', this.setErrorMessage('city')).matches(this.cityRegex),
      check('country', this.setErrorMessage('country')).matches(this.countryRegex),
    ];
    return paramsValidator;
  };
}

export default new ValidateRequest();
