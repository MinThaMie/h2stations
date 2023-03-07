import Route from '@ember/routing/route';

export default class EuropeRoute extends Route {
  model() {
    let result = [];
    for (const [country, stations] of Object.entries(
      this.modelFor('application')['Europe']
    )) {
      result.push({
        country,
        shortcode: stations[0].countryshortname,
        stations,
      });
    }
    return result;
  }
}
