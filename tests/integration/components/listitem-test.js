import { module, test } from 'qunit';
import { setupRenderingTest } from 'h2stations/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | listitem', function (hooks) {
  setupRenderingTest(hooks);
  const station = {
    name: 'Shell Westpoort',
    price: '17,50',
    address: 'Galwin 6, Amsterdam',
    countryshortname: 'NL',
    country: 'Netherlands',
    longitude: '4.8006504132389',
    latitude: '52.396216585178',
    errorState700: false,
    errorState350s: false,
    errorState350l: false,
    closedState700: false,
    closedState350s: false,
    closedState350l: false,
    statusMessage: '',
    coor: '52.396216585178,4.8006504132389',
    has_700_small: false,
    has_350_large: false,
    has_350_small: false,
    payments: 'Credit card, Debit card',
  };

  test('it renders', async function (assert) {
    this.set('station', station);
    await render(hbs`<Listitem @station={{this.station}} />`);

    assert.dom(this.element).exists();
  });

  test('it shows closed', async function (assert) {
    this.set('station', { ...station, closedState700: true });
    await render(hbs`<Listitem @station={{this.station}} />`);

    assert.dom('[data-test-closed]').exists();
  });

  test('it shows all types', async function (assert) {
    this.set('station', {
      ...station,
      has_700_small: true,
      has_350_large: true,
      has_350_small: true,
    });
    await render(hbs`<Listitem @station={{this.station}} />`);

    assert.dom('[data-test-350l]').exists();
    assert.dom('[data-test-350s]').exists();
    assert.dom('[data-test-700]').exists();
  });

  test('it does not show types with error', async function (assert) {
    this.set('station', {
      ...station,
      has_700_small: true,
      has_350_large: true,
      has_350_small: true,
      errorState700: true,
      errorState350s: true,
      errorState350l: true,
    });
    await render(hbs`<Listitem @station={{this.station}} />`);

    assert.dom('[data-test-350l]').doesNotExist();
    assert.dom('[data-test-350s]').doesNotExist();
    assert.dom('[data-test-700]').doesNotExist();
  });

  test('it shows 700', async function (assert) {
    this.set('station', { ...station, has_700_small: true });
    await render(hbs`<Listitem @station={{this.station}} />`);

    assert.dom('[data-test-350l]').doesNotExist();
    assert.dom('[data-test-350s]').doesNotExist();
    assert.dom('[data-test-700]').exists();
  });

  test('it shows 350l', async function (assert) {
    this.set('station', { ...station, has_350_large: true });
    await render(hbs`<Listitem @station={{this.station}} />`);

    assert.dom('[data-test-350l]').exists();
    assert.dom('[data-test-350s]').doesNotExist();
    assert.dom('[data-test-700]').doesNotExist();
  });

  test('it shows 350s', async function (assert) {
    this.set('station', { ...station, has_350_small: true });
    await render(hbs`<Listitem @station={{this.station}} />`);

    assert.dom('[data-test-350l]').doesNotExist();
    assert.dom('[data-test-350s]').exists();
    assert.dom('[data-test-700]').doesNotExist();
  });
});
