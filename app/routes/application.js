import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'h2stations/config/environment';

export default class ApplicationRoute extends Route {
  async model() {
    const response = await fetch(ENV.APP.API_URL);
    const stations = await response.json();
    return stations.map((station) => {
      const price = station.price_message?.match(/\d+.\d+/g)[0] || '-';
      const address =
        station.street + ' ' + station.streetnr + ', ' + station.city;
      const coor = station.latitude + ',' + station.longitude;
      const has_700_small = 't' === station.has_700_small;
      const has_350_large = 't' === station.has_350_large;
      const has_350_small = 't' === station.has_350_small;
      const payments =
        station.paymenttypes.map((type) => type.descr).join(', ') || '-';
      const errorState700 = station.status700 == 'EXCEPTION';
      const errorState350s = station.status350s == 'EXCEPTION';
      const errorState350l = station.status350l == 'EXCEPTION';
      return {
        name: station.name,
        price: price,
        address: address,
        news: station.news,
        errorState700: errorState700,
        errorState350s: errorState350s,
        errorState350l: errorState350l,
        coor: coor,
        has_700_small: has_700_small,
        has_350_large: has_350_large,
        has_350_small: has_350_small,
        payments: payments,
      };
    });
  }
}
