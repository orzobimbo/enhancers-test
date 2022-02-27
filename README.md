# ENHANCERS TEST
- [goal](#goal)
- [note](#note)
- [le-mie-credenziali-di-accesso-alle-api](#le-mie-credenziali-di-accesso-alle-api)
- [come-ho-ottenuto-i-dati-meteo-e-business](#come-ho-ottenuto-i-dati-meteo-e-business)
- [testare-il-progetto](#testare-il-progetto)
- [testare-il-progetto-con-docker](#testare-il-progetto-con-docker)
- [api-mod](#api-mod)
- [api-openweathermap-delle-coordinate](#api-openweathermap-delle-coordinate)
- [api-openweathermap-del-meteo](#api-openweathermap-del-meteo)
- [api-yelp-delle-attività-commerciali](#api-yelp-delle-attività-commerciali)
- [documentazione-api](#documentazione-api)

---
## goal
Realizzare un back-end che esponga tramite endpoint RESTful ad un ipotetico front-end un
set di dati composito relativo a 5 città.
Il set composito deve seguire le seguenti specifiche:

- Il back-end dovrà essere integrato back-end to back-end via API con il servizio di dati
  meteo Open Weather Map (https://openweathermap.org/api).
- I dati meteo dovranno essere arricchiti con le informazioni sugli esercizi commerciali
  presenti nelle singole città tramite l'integrazione back-end to back-end del
  servizio API Yelp Fusion (https://www.yelp.com/developers/documentation/v3/business_search)

Le tecnologie richieste all'interno del prototipo sono:
- Node.js
- Express
- Altre librerie a scelta del candidato

Ti chiedo gentilmente di consegnare il progetto tramite Git una volta pronto.


---
## note
rispetto alla richiesta dell'esercizio di aggregare le api in base
a 5 città di mia scelta
ho preferito sviluppare e migliorare ulteriormente l'esercizio
consentendo all'utente di poter scegliere qualsiasi città desidera
semplicemente inserendo negli endpoint delle api il
nome della città e il paese/nazione della città

Le api che aggregano i dati come richiesto dall'esercizio sono 2:

1. /api/cities/full?city={nome della città}&country={codice ISO 3166 del paese}
2. /api/cities/mod?city={nome città}&country={codice paese}&reviewCount={numero intero}&searchName={alphanumerico}&distanceOrder={asc|desc}

---
## le-mie-credenziali-di-accesso-alle-api
Ho reso disponibile il file `.env` che contiene
le variabili ambientali:

- YELP_AUTH_TOKEN
- OPENWEATHERMAP_API_KEY

  che sono le mie credenziali per accedere alle
  api di terze parti esposte da:

- https://www.yelp.com/developers
- https://openweathermap.org/


---
## come-ho-ottenuto-i-dati-meteo-e-business
Considerato che molte città nel mondo possono avere lo stesso nome per
poter accedere con precisione ai dati meteo e business di una specifica città
è necessario prima ottenere le coordinate della città, perchè
le coordinate `latitudine` e `longitudine` indicano un punto univoco
nella mappa geografica.
Per ottenere le coordinate precise si utilizza il nome della città e
il nome della sua nazione/paese
Per ottenere le coordinate ho utilizzato le api https://openweathermap.org/api/geocoding-api

Dopo aver ottenuto i dati delle coordinate è possibile accedere ai dati:

- del meteo della città (https://openweathermap.org/current)
- delle attività commerciali della città (https://www.yelp.com/developers/documentation/v3/business_search)


---
## testare-il-progetto
entrare nella root del progetto
ed eseguire:
```
npm run dev
```


---
## testare-il-progetto-con-docker
entrare nella root del progetto

fare prima la build:
```
docker build -t api-cities .
```

...e poi avviare:
```
docker run -d -p 8080:8080 api-cities
```


---
## api-mod
La api `/api/cities/mod`
rispetto a tutte le altre api ha 2 parametri opzionali in più e sono:

1. `reviewCount`:
   - accetta solo numeri interi
   - permette di filtrare le attività commerciali in base alla proprietà `review_count`

2. `searchName`:
   - accetta caratteri alfanumerici
   - permette di filtrare le attività commerciali in base alla proprietà `name`

3. `distanceOrder`:
   - accetta la stringa `asc` oppure `desc`
   - permette di ordinare le attività commerciali in base alla proprietà `distance`


Endpoint completo:
```
/api/cities/mod?city={nome città}&country={codice paese}&reviewCount={numero intero}&searchName={alphanumerico}&distanceOrder={asc|desc}
```


Esempio di utilizzo:
```
/api/cities/mod?city=napoli&country=it&reviewCount=1&searchName=sa&distanceOrder=asc
```


---
## api-openweathermap-delle-coordinate
Per ottenere latitudine e longitudine (`lat`,`lon`) della città:
https://openweathermap.org/api/geocoding-api

Esempio sulla città Napoli:
http://api.openweathermap.org/geo/1.0/direct?q=napoli,IT&limit=1&appid=bb66303ccd5a1a1f37661529c25639f9

Ritorna:
"lat": 40.8359336,
"lon": 14.2487826,
"country": "IT",
"state": "Campania"


---
## api-openweathermap-del-meteo
https://openweathermap.org/api

Per ottenere il meteo corrente:
https://openweathermap.org/current
api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

Esempio meteo corrente su Napoli:
api.openweathermap.org/data/2.5/weather?lat=40.8359336&lon=14.2487826&appid=bb66303ccd5a1a1f37661529c25639f9


---
## api-yelp-delle-attività-commerciali
https://www.yelp.com/developers/documentation/v3/business_search

Per ottenere le attività commerciali di una città:
https://api.yelp.com/v3/businesses/search?term=delis&latitude=40.8359336&lon&longitude=14.2487826

Esempio meteo corrente su Napoli:
https://documenter.getpostman.com/view/4029716/UVRAK7RJ


---
## documentazione-api
https://documenter.getpostman.com/view/4029716/UVkqqZpq


---

### città-testate
city                     | paese | risultato
-------------------------|-------|----------
Napoli                   | IT    | OK
La Spezia                | IT    | OK
Lüdenscheid              | DE    | OK
Île-de-France            | FR    | OK
Húběi                    | CN    | OK
Петропавловск-Камчатский | RU    | OK

