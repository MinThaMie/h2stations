/* eslint-disable */
const fetch = require('node-fetch');

const ALL_700_API_ENDPOINT = 'https://fuelstations.h2-api.live/v1/fuelstation/masterlist?fuel_type=P700_SMALL&language=de&__show_permclosed__=1&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

const ALL_350_SMALL_API_ENDPOINT = 'https://fuelstations.h2-api.live/v1/fuelstation/masterlist?fuel_type=P350_SMALL&language=de&__show_permclosed__=1&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

const ALL_350_LARGE_API_ENDPOINT = 'https://fuelstations.h2-api.live/v1/fuelstation/masterlist?fuel_type=P350_LARGE&language=de&__show_permclosed__=1&__t__=b13831e6243b9bcd4c74aeda55c1fe22';

const STATUS_700_API_ENDPOINT = 'https://fuelstations.h2-api.live/v1/fuelstation/statuslist?fuel_type=P700_SMALL&language=de&__show_permclosed__=1&__t__=b13831e6243b9bcd4c74aeda55c1fe22'

const STATUS_350_SMALL_API_ENDPOINT = 'https://fuelstations.h2-api.live/v1/fuelstation/statuslist?fuel_type=P350_SMALL&language=de&__show_permclosed__=1&__t__=b13831e6243b9bcd4c74aeda55c1fe22'

const STATUS_350_LARGE_API_ENDPOINT = 'https://fuelstations.h2-api.live/v1/fuelstation/statuslist?fuel_type=P350_LARGE&language=de&__show_permclosed__=1&__t__=b13831e6243b9bcd4c74aeda55c1fe22'

exports.handler = async (event, context) => {
  try {
    let station700Response = await fetch(ALL_700_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let station350SmallResponse = await fetch(ALL_350_SMALL_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let station350LargeResponse = await fetch(ALL_350_LARGE_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let status700Response = await fetch(STATUS_700_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let status350SmallResponse = await fetch(STATUS_350_SMALL_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let status350LargeResponse = await fetch(STATUS_350_LARGE_API_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    let station700Data = await station700Response.json();
    let station350SmallData = await station350SmallResponse.json();
    let station350LargeData = await station350LargeResponse.json();
    let status700 = await status700Response.json();
    let status350Small = await status350SmallResponse.json();
    let status350Large = await status350LargeResponse.json();
    let combinedData = [];
    let stationIds = [];
    let stationData = [...station700Data.fuelstation, ...station350SmallData.fuelstation, ...station350LargeData.fuelstation];
    stationData.forEach((station) => {
      if (!stationIds.includes(station.idx)) {
        stationIds.push(station.idx);
        let completeStation = { ...station };
        let shouldbeShown = false;
        if (station.has_350_large == 't') {
          const s350l = status350Large.fuelstation.find(
            (s) => s.idx == station.idx
          );
          if (s350l && s350l.combinedstatus !== 'PLANNED') {
            completeStation['status350l'] = s350l.combinedstatus;
            completeStation['status350lmessage'] = s350l.combinedremark;
            completeStation['news'] = s350l.news;
            shouldbeShown = true;
          }
        }
        if (station.has_700_small == 't') {
          const s700 = status700.fuelstation.find((s) => s.idx == station.idx);
          if (s700 && s700.combinedstatus !== 'PLANNED') {
            completeStation['status700'] = s700.combinedstatus;
            completeStation['status700message'] = s700.combinedremark;
            completeStation['news'] = s700.news;
            shouldbeShown = true;
          }
        }
        if (station.has_350_small == 't') {
          const s350s = status350Small.fuelstation.find(
            (s) => s.idx == station.idx
          );
          if (s350s && s350s.combinedstatus !== 'PLANNED') {
            completeStation['status350s'] = s350s.combinedstatus;
            completeStation['status350smessage'] = s350s.combinedremark;
            completeStation['news'] = s350s.news;
            shouldbeShown = true;
          }
        }
        if (shouldbeShown == true) {
          combinedData.push(completeStation);
        }
      }
    });
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
