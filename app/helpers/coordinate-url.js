import { helper } from '@ember/component/helper';
import window from 'ember-window-mock';

export default helper(function coordinateURL([coor]) {
  if (coor) {
    if (/Android|midori/i.test(window.navigator.userAgent)) {
      return `geo:${coor}`;
    } else {
      // false for not mobile device
      return `https://maps.google.com/maps/search/?api=1&query=${coor
        .split(',')
        .join('%2C')}&amp;ll=`;
    }
  }
});
