import Route from '@ember/routing/route';

export default class CloseRoute extends Route {
  model() {
    let result = [];
    for (const [, stations] of Object.entries(
      this.modelFor('application')['Europe']
    )) {
      result.push(...stations);
    }
    result.push(...this.modelFor('application')['NL']);
    return result;
  }
}
