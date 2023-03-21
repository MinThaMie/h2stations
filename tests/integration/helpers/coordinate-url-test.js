import { module, test } from 'qunit';
import { setupRenderingTest } from 'h2stations/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import window from 'ember-window-mock';
import { setupWindowMock } from 'ember-window-mock/test-support';

module('Integration | Helper | coordinateURL', function (hooks) {
  setupRenderingTest(hooks);
  setupWindowMock(hooks);

  test('it renders', async function (assert) {
    this.set('coor', '52.038415191644184,6.624909778245188');

    await render(hbs`{{coordinate-url this.coor}}`);

    assert.dom(this.element).includesText('52.038415191644184');
    assert.dom(this.element).includesText('6.624909778245188');
  });

  test('it render empty', async function (assert) {
    this.set('coor', '');

    await render(hbs`{{coordinate-url this.coor}}`);

    assert.dom(this.element).includesText('');
  });

  test('it renders geo for Android', async function (assert) {
    this.set('coor', '52.038415191644184,6.624909778245188');
    window.navigator.userAgent = 'Android';

    await render(hbs`{{coordinate-url this.coor}}`);

    assert.dom(this.element).includesText('geo');
  });
});
