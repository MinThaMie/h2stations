import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'h2stations/config/environment';

export default class ApplicationRoute extends Route {
  async model() {
    const response = await fetch(ENV.APP.API_URL);
    const stations = await response.json();
    return stations.map((station) => {
      const price = station.price_message?.match(/\d+.\d+/g)[0] || '-';
      const errorState = station.combinedstatus !== "OPEN";
      const address =
        station.street + ' ' + station.streetnr + ', ' + station.city;
      const coor = station.latitude + ',' + station.longitude;
      const has_700_small = 't' === station.has_700_small;
      const has_350_large = 't' === station.has_350_large;
      const has_350_small = 't' === station.has_350_small;
      const payments =
        station.paymenttypes.map((type) => type.descr).join(', ') || '-';
      return {
        name: station.name,
        price: price,
        address: address,
        errorState: errorState,
        coor: coor,
        has_700_small: has_700_small,
        has_350_large: has_350_large,
        has_350_small: has_350_small,
        payments: payments,
      };
    });
  }
}
