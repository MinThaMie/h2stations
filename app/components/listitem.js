import Component from '@glimmer/component';

export default class ListitemComponent extends Component {
  get isClosed() {
    return (
      this.args.station.closedState350s ||
      this.args.station.closedState700 ||
      this.args.station.closedState700l
    );
  }

  get isOpen() {
    return !this.isClosed;
  }

  get available350l() {
    return this.args.station.has_350_large && !this.args.station.errorState350l;
  }

  get available350s() {
    return this.args.station.has_350_small && !this.args.station.errorState350s;
  }

  get available700() {
    return this.args.station.has_700_small && !this.args.station.errorState700;
  }

  // get exceptionMessage() {
  //   let message = '';
  //   if (this.args.station.errorState700) {
  //     message += this.args.station.status700message  || '';
  //   }
  //   if (this.args.station.errorState350s) {
  //     message += this.args.station.status350smessage || '';
  //   }
  //   if (this.args.station.errorState350l) {
  //     message += this.args.station.status350lmessage  || '';
  //   }
  //   return message;
  // }
}
