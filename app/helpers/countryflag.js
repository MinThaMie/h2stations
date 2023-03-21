import { countries } from '../data/countries';

export default function countryflag(countryCode /*, named*/) {
  if (countries[countryCode]) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
}
