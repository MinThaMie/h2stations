const fetch = require('node-fetch');

const ALL_STATIONS_API_ENDPOINT =
  'https://my.h2.live/ceemes/base.php?__type__=fuelstation&action=xmllist&__show_permclosed__=1&__language__=en&__transform__=json&__fieldsin__=idx,name,street,streetnr,zip,city,has_350_large,has_350_small,has_700_small,image,opening_hours,latitude,longitude,operatorname,operatorlogo,hostname,operatorhotline,comments,news,date_commissioning_message,progress_percent,progress_description,progress_extratext,countryshortname,funding,fundingpage,paymenttypes,paymentinfo,price_message,activity_message,tec_recom_time,openinghours_nextchange_message&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

const STATUS_700_SMALL_API_ENDPOINT =
  'https://my.h2.live/ceemes/base.php?__type__=fuelstation&action=xmllist&__status_fueltype__=P700_SMALL&__show_permclosed__=1&__language__=en&__transform__=json&__fieldsin__=idx,name,combinedstatus,combinedremark,price_message&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

const STATUS_350_SMALL_API_ENDPOINT =
  'https://my.h2.live/ceemes/base.php?__type__=fuelstation&action=xmllist&__status_fueltype__=P350_SMALL&__show_permclosed__=1&__language__=en&__transform__=json&__fieldsin__=idx,name,combinedstatus,combinedremark,price_message&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

const STATUS_350_LARGE_API_ENDPOINT =
  'https://my.h2.live/ceemes/base.php?__type__=fuelstation&action=xmllist&__status_fueltype__=P350_LARGE&__show_permclosed__=1&__language__=en&__transform__=json&__fieldsin__=idx,name,combinedstatus,combinedremark,price_message&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

exports.handler = async (event, context) => {
  try {
    let stationResponse = await fetch(ALL_STATIONS_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let status700Response = await fetch(STATUS_700_SMALL_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let status350SmallResponse = await fetch(STATUS_350_SMALL_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let status350LargeResponse = await fetch(STATUS_350_LARGE_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let stationData = await stationResponse.json();
    let status700 = await status700Response.json();
    let status350Small = await status350SmallResponse.json();
    let status350Large = await status350LargeResponse.json();
    let combinedData = [];
    stationData.fuelstation.forEach((station) => {
      if (station.countryshortname === 'NL') {
        let completeStation = { ...station };
        let shouldbeShown = false;
        if (station.has_350_large == 't') {
          const s350l = status350Large.fuelstation.find(
            (s) => s.name == station.name
          );
          if (s350l && s350l.combinedstatus !== 'PLANNED') {
            completeStation['status350l'] = s350l.combinedstatus;
            completeStation['status350lmessage'] = s350l.combinedremark;
            completeStation['price_message'] = s350l.price_message;
            shouldbeShown = true;
          }
        }
        if (station.has_700_small == 't') {
          const s700 = status700.fuelstation.find(
            (s) => s.name == station.name
          );
          if (s700 && s700.combinedstatus !== 'PLANNED') {
            completeStation['status700'] = s700.combinedstatus;
            completeStation['status700message'] = s700.combinedremark;
            completeStation['price_message'] = s700.price_message;
            shouldbeShown = true;
          }
        }
        if (station.has_350_small == 't') {
          const s350s = status350Small.fuelstation.find(
            (s) => s.name == station.name
          );
          if (s350s && s350s.combinedstatus !== 'PLANNED') {
            completeStation['status350s'] = s350s.combinedstatus;
            completeStation['status350smessage'] = s350s.combinedremark;
            completeStation['price_message'] = s350s.price_message;
            shouldbeShown = true;
          }
        }
        if (shouldbeShown == true) {
          combinedData.push(completeStation);
        }
      }
    });
    combinedData.sort((a, b) => (a.city > b.city ? 1 : -1));
    return {
      statusCode: 200,
      body: JSON.stringify(combinedData),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
