import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'h2stations/config/environment';
import { countries } from '../data/countries';
import { manualPricing } from '../data/manual-pricing';
import { manualStations } from '../data/manual-stations';

export default class ApplicationRoute extends Route {
  async model() {
    try {
      const response = await fetch(ENV.APP.API_URL);
      let stations = await response.json();
      stations = [...stations, ...manualStations].sort((a, b) =>
        a.city > b.city ? 1 : -1
      );
      const parsedStations = stations.map((station) => {
        const [valuta, price] = station.price_message?.split(' ') || '';
        const address = `${station.street || ''} ${station.streetnr || ''}, ${
          station.city || ''
        }`;
        const coor = `${station.latitude},${station.longitude}`;
        const has_700_small = 't' === station.has_700_small;
        const has_350_large = 't' === station.has_350_large;
        const has_350_small = 't' === station.has_350_small;
        const has_350_slow = 't' === station.has_350_slow;
        const has_700_slow = 't' === station.has_700_slow;
        const payments =
          station.paymenttypes?.map((type) => type.descr).join(', ') || '';
        const errorState700 = station.status700 == 'EXCEPTION';
        const errorState350s = station.status350s == 'EXCEPTION';
        const errorState350l = station.status350l == 'EXCEPTION';
        const closedState700 = station.status700 == 'CLOSED';
        const closedState350s = station.status350s == 'CLOSED';
        const closedState350l = station.status350l == 'CLOSED';
        const statusMessage =
          station.statusMessage ||
          `${station.status350lmessage || ''} ${
            station.status350smessage || ''
          } ${station.status700message || ''}`.trim();
        const country = countries[station.countryshortname];
        return {
          name: station.name,
          valuta: valuta,
          price: price,
          address: address,
          countryshortname: station.countryshortname,
          country: country,
          longitude: station.longitude,
          latitude: station.latitude,
          news: station.news,
          errorState700: errorState700,
          errorState350s: errorState350s,
          errorState350l: errorState350l,
          closedState700: closedState700,
          closedState350s: closedState350s,
          closedState350l: closedState350l,
          statusMessage: statusMessage,
          coor: coor,
          has_700_small: has_700_small,
          has_350_large: has_350_large,
          has_350_small: has_350_small,
          has_350_slow: has_350_slow,
          has_700_slow: has_700_slow,
          payments: payments,
        };
      });
      const groups = { NL: [], Europe: {} };
      parsedStations.forEach((station) => {
        if (station.countryshortname == 'NL') {
          if (!station.price) {
            const foundStation = manualPricing.find(
              ({ name }) => name === station.name
            );
            station = { ...station, ...foundStation };
          }
          groups[station.countryshortname].push(station);
        } else {
          if (groups['Europe'][station.country]) {
            groups['Europe'][station.country].push(station);
          } else {
            groups['Europe'][station.country] = [station];
          }
        }
      });
      return groups;
    } catch (error) {
      console.error(error);
      return { NL: [], Europe: {} };
    }
  }
}
