import Route from '@ember/routing/route';

export default class NlRoute extends Route {
  model() {
    return this.modelFor('application')['NL'];
  }
}
