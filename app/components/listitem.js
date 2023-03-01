import Component from '@glimmer/component';

export default class ListitemComponent extends Component {
  get iconClass350l() {
    let availability = 'unavailable';
    let error = '';
    if (this.args.station.has_350_large) {
      availability = 'available';
    }
    if (this.args.station.errorState350l) {
      error = 'error';
    }
    return `valve ${availability} ${error}`;
  }

  get iconClass350s() {
    let availability = 'unavailable';
    let error = '';
    if (this.args.station.has_350_small) {
      availability = 'available';
    }
    if (this.args.station.errorState350s) {
      error = 'error';
    }
    return `valve ${availability} ${error}`;
  }

  get iconClass700() {
    let availability = 'unavailable';
    let error = '';
    if (this.args.station.has_700_small) {
      availability = 'available';
    }
    if (this.args.station.errorState700) {
      error = 'error';
    }
    return `valve ${availability} ${error}`;
  }
}
