import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class EuropeController extends Controller {
  queryParams = ['countries'];
  @tracked countries = [];

  get stationsByCountry() {
    return this.model
      .map((item) => ({
        ...item,
        selected:
          !this.countries.length || this.countries.includes(item.shortcode),
      }))
      .sort((a, b) => (a.country > b.country ? 1 : -1));
  }

  @action
  selectCountry(code) {
    if (!this.countries.includes(code)) {
      this.countries = [...this.countries, code];
    }
  }

  @action
  removeCountry(code) {
    this.countries = this.countries.filter((country) => country !== code);
  }
}
