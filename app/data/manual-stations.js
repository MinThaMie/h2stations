export const manualStations = [
  {
    name: 'Vissers Energy',
    // price_message: 'EUR 19.50*',
    news: 'Opening hours Ma t/m Fri 06:00-22:00, Sat 07:00-22:00, Sun 07:00-22:00',
    street: 'Stationsstraat',
    streetnr: '90',
    city: 'Horst',
    countryshortname: 'NL',
    latitude: '51.44061113038025',
    longitude: '6.048567427716015',
    has_700_small: 'f',
    has_350_small: 'f',
    has_350_large: 'f',
    has_350_slow: 't',
    has_700_slow: 't',
    statusMessage:
      'Slowfiller : <4kg/h, the car should be uncoupled before 22:00',
    //statusMessage: 'Out of service, waiting for technician',
    paymenttypes: [
      { descr: 'Debit Card' },
      { descr: 'Credit Card' },
      { descr: 'TANXpas' },
    ],
  },
];
