import { module, test } from 'qunit';
import { setupRenderingTest } from 'h2stations/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | countryflag', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders', async function (assert) {
    await render(hbs`{{countryflag 'DE'}}`);

    assert.dom(this.element).hasText('🇩🇪');
  });
});
