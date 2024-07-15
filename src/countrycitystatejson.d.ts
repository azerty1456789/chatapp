declare module 'countrycitystatejson' {
    export function getCountries(): { shortName: string , name: string}[];
    export function getStatesByShort(country: string): string[];
  }
  