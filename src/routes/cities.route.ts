import express from 'express';

import citiesTestController from '../controllers/cities.test.controller';
import citiesDetailsController from '../controllers/cities.details.controller';
import citiesWeatherController from '../controllers/cities.weather.controller';
import citiesBusinessController from '../controllers/cities.business.controller';
import citiesFullController from '../controllers/cities.full.controller';
import citiesModController from '../controllers/cities.mod.controller';

import validateRequest from '../middlewares/validate-request.middleware';

const router = express.Router();

/**
 * @method GET
 * @route  api/cities/test
 * @param  {string} nome
 * @param  {number} anni
 * @desc   TEST
 */
router.get('/test', validateRequest.paramsTest(), citiesTestController.test);

/**
 * @method GET
 * @route  api/cities/city
 * @param  {string} city - nome delle città.
 * @param  {string} country - codice (ISO 3166) a 2 lettere del paese.
 * @desc   ritorna solo i dati dei dettagli della città.
 */
router.get('/details', validateRequest.queryCommon(), citiesDetailsController.getCity);

/**
 * @method GET
 * @route  api/cities/weather
 * @param  {string} city - nome delle città.
 * @param  {string} country - codice (ISO 3166) a 2 lettere del paese.
 * @desc   ritorna solo i dati delle condizioni meteo della città.
 */
router.get('/weather', validateRequest.queryCommon(), citiesWeatherController.getWeather);

/**
 * @method GET
 * @route  api/cities/business
 * @param  {string} city - nome delle città.
 * @param  {string} country - codice (ISO 3166) a 2 lettere del paese.
 * @desc   ritorna solo i dati delle attività commerciali della città.
 */
router.get('/business', validateRequest.queryCommon(), citiesBusinessController.getBusiness);

/**
 * @method GET
 * @route  api/cities/full
 * @param  {string} city - nome delle città.
 * @param  {string} country - codice (ISO 3166) a 2 lettere del paese.
 * @desc   ritorna i dati aggregati delle:
 * - dettagli della città
 * - condizioni meteo
 * - attività commerciali
 */
router.get('/full', validateRequest.queryCommon(), citiesFullController.getFullCityWeatherAndBusiness);

/**
 * @method GET
 * @route  api/cities/mod
 * @param  {string} city - nome delle città.
 * @param  {string} country - codice (ISO 3166) a 2 lettere del paese.
 * @param  {number} [reviewCount] - filtra in base alla prop "review_count" della attività commerciale.
 * @param  {string} [searchName] - filtra in base alla prop "name" della attività commerciale.
 * @param  {string} [distanceOrder] - ordina in base alla prop "distance" della attività commerciale.
 * @desc   ritorna i dati aggregati:
 * - dettagli della città
 * - condizioni meteo
 * - attività commerciali filtrati in base ai parametri "reviewCount" e "searchName"
 */
router.get('/mod', validateRequest.queryMod(), citiesModController.getModCityWeatherAndBusiness);

export default router;
