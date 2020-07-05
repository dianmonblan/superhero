// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

const SUPERHERO_URL_API: string = 'https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/'

export const SUPERHERO: { [key: string]: { [key: string]: string | { [key: string]: string } } } = {
  CONFIGURATION: {
    TITLE: 'DEV - ECON',
    LIST: {
      TITLE: 'SUPERHEROES'
    }
  },
  RESOURCE: {
    LIST: `${SUPERHERO_URL_API}all.json`,
    ID: `${SUPERHERO_URL_API}id/#{ID}.json`
  }
};