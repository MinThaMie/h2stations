const fetch = require('node-fetch');

const API_ENDPOINT =
  'https://my.h2.live/ceemes/base.php?__type__=fuelstation&action=xmllist&__status_fueltype__=P700_SMALL&__show_permclosed__=1&__language__=en&__transform__=json&__fieldsin__=idx,name,street,streetnr,zip,city,combinedstatus,combinedremark,has_350_large,has_350_small,has_700_small,image,opening_hours,latitude,longitude,operatorname,operatorlogo,hostname,operatorhotline,comments,news,date_commissioning_message,progress_percent,progress_description,progress_extratext,countryshortname,funding,fundingpage,paymenttypes,paymentinfo,price_message,activity_message,tec_recom_time,openinghours_nextchange_message&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

exports.handler = async (event, context) => {
  try {
    let response = await fetch(API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(
        data.fuelstation.filter(
          (station) =>
            station.countryshortname === 'NL' &&
            station.combinedstatus !== 'PLANNED'
        )
      ),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
