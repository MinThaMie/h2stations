import { module, test } from 'qunit';
import { setupTest } from 'h2stations/tests/helpers';

module('Unit | Route | nl', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:nl');
    assert.ok(route);
  });
});
