import { module, test } from 'qunit';
import { setupRenderingTest } from 'h2stations/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | coordinateURL', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('coor', '52.038415191644184,6.624909778245188');

    await render(hbs`{{coordinate-url this.coor}}`);

    assert.dom(this.element).includesText('52.038415191644184');
    assert.dom(this.element).includesText('6.624909778245188');
  });
});
