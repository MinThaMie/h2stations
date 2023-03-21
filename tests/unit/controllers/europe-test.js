import { module, test } from 'qunit';
import { setupTest } from 'h2stations/tests/helpers';

module('Unit | Controller | europe', function (hooks) {
  setupTest(hooks);

  test('it selects a country', function (assert) {
    let controller = this.owner.lookup('controller:europe');
    controller.send('selectCountry', 'DE');
    assert.propEqual(controller.countries, ['DE']);
  });

  test('it does not duplicate a country', function (assert) {
    let controller = this.owner.lookup('controller:europe');
    controller.send('selectCountry', 'DE');
    controller.send('selectCountry', 'DE');
    assert.propEqual(controller.countries, ['DE']);
  });

  test('it removes a country', function (assert) {
    let controller = this.owner.lookup('controller:europe');
    controller.send('selectCountry', 'DE');
    assert.propEqual(controller.countries, ['DE']);
    controller.send('removeCountry', 'DE');
    assert.propEqual(controller.countries, []);
  });

  test('it does not crash when removing from a empty array', function (assert) {
    let controller = this.owner.lookup('controller:europe');
    controller.send('removeCountry', 'DE');
    assert.propEqual(controller.countries, []);
  });
});
