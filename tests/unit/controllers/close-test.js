import { module, test } from 'qunit';
import { setupTest } from 'h2stations/tests/helpers';

module('Unit | Controller | close', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:close');
    assert.ok(controller);
  });
});
