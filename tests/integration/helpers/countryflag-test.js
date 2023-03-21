import { module, test } from 'qunit';
import { setupRenderingTest } from 'h2stations/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | countryflag', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the German flag', async function (assert) {
    await render(hbs`{{countryflag 'DE'}}`);

    assert.dom(this.element).hasText('🇩🇪');
  });

  test('it renders empty when provided with an invalid country', async function (assert) {
    await render(hbs`{{countryflag 'D'}}`);

    assert.dom(this.element).hasText('');
  });
});
