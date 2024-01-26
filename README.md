# TLP Dashboard

Internt dashbord for TLP.

## Nyheiter

API Nyhende frå www.digdir.no:
Denne lenka vil hente dei 3 siste nyhende frå www.digdir.no sortert synkande på oppretta dato.

https://www.digdir.no/api/content/node/news?filter[status]=1&page[limit]=3&sort=-created

Relevant info er:
data.attributes.title = Tittel
data.attributes.field_ingress = Ingressteksten

## Vêr

YR.NO API:
https://developer.yr.no/
https://developer.yr.no/doc/locationforecast/HowTO/

Sjå spesielt "Steps to handle a request". Ein må t.d. ha med ein variabel "sitename" for å ikkje bli "banna".

https://developer.yr.no/doc/GettingStarted/

Døme på request:
https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58

| Stad      | lat      | lon      |
| --------- | -------- | -------- |
| Sogndal   | 61.23122 | 7.10079  |
| Leikanger | 61.18444 | 6.85006  |
| Dingsøyr  | 61.23414 | 5.58074  |
| Halden    | 59.12819 | 11.38502 |

## Nettside Status

PINGDOM:
For å bruke APIet må ein alltid sende med token i kvar request.

Dokumentasjon ligg her:
https://docs.pingdom.com/api/

Gj.sn oppetid:
curl -X GET "https://api.pingdom.com/api/3.1/summary.average/5687834?includeuptime=true&from=1701784111" -H 'Authorization:Bearer XXXXXXX'

ALle resultat av testar:
curl -X GET "https://api.pingdom.com/api/3.1/results/5687834?from=1701784111&limit=1" -H 'Authorization:Bearer XXXXXXX'

Når det har vore oppe/nedetid:
curl -X GET "https://api.pingdom.com/api/3.1/summary.outage/5687834?from=1701784111" -H 'Authorization:Bearer XXXXXXX'
