import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CloseController extends Controller {
  @tracked userLocation = null;
  @tracked triedLocation = false;

  constructor() {
    super(...arguments);
    this.getUserLocation();
  }

  get stationsByDistance() {
    if (this.userLocation) {
      return this.model
        .map((item) => ({
          ...item,
          distance: this.calcDistance(this.userLocation, {
            longitude: item.longitude,
            latitude: item.latitude,
          }),
        }))
        .filter((station) => station.distance < 250)
        .sort((a, b) => (a.distance > b.distance ? 1 : -1));
    } else {
      return [];
    }
  }

  @action
  async getUserLocation(options) {
    try {
      const result = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      );
      this.userLocation = {
        longitude: result.coords.longitude,
        latitude: result.coords.latitude,
      };
    } catch (error) {
      console.warn(`ERROR(${error.code}): ${error.message}`);
    } finally {
      this.triedLocation = true;
    }
  }

  degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
  }

  calcDistance(startCoords, destCoords) {
    let startingLat = this.degreesToRadians(startCoords.latitude);
    let startingLong = this.degreesToRadians(startCoords.longitude);
    let destinationLat = this.degreesToRadians(destCoords.latitude);
    let destinationLong = this.degreesToRadians(destCoords.longitude);

    // Radius of the Earth in kilometers
    let radius = 6571;

    // Haversine equation
    let distanceInKilometers =
      Math.acos(
        Math.sin(startingLat) * Math.sin(destinationLat) +
          Math.cos(startingLat) *
            Math.cos(destinationLat) *
            Math.cos(startingLong - destinationLong)
      ) * radius;
    return Math.round(distanceInKilometers);
  }
}
