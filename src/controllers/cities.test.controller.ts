import { Request, Response, NextFunction } from 'express';
import Controller from './_cities.controller';

class CitiesTestController extends Controller {
  /**
   * @route   GET /api/cities/test
   * @desc    TEST
   */
  test = async (req: Request, res: Response, next: NextFunction) => {
    req.userAction = this.response.setOperation('test');
    const { nome, anni } = req.query;

    let test;
    try {
      test = await this.citiesServices.testData();
    } catch (error) {
      return next(this.response.error(500, null, 'ERRORE test'));
    }

    return next(this.response.success(200, null, `${test}: ${nome} - ${anni}`));
  };
}

export default new CitiesTestController();
