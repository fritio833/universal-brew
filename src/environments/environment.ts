// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ung build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.


export const environment = {
  production: false,
  breweryDBAPI:'3c7ec73417afb44ae7a4450482f99d70',
  breweryDBURL:'https://api.brewerydb.com/v2/',
  google: {
    googlePlacesAPIKey:'AIzaSyDJ5qz7QX1yXkX2c444v5v0ziSPg15PLjM',
    googleStaticMapAPIKey:'AIzaSyCDIPt-NJwC23kzmYJ5ZTYTMd9brpBVbCk',
    googleMapsAPIKey:'AIzaSyAKs0BGHgtV5I--IvIwsGkD3c_EFV0yXtY'
  },
  firebase: {
    apiKey: "AIzaSyCd-WZs4O8gNx9qVlwwyRdK6_qY60WuQl0",
    authDomain: "bender-1487426215149.firebaseapp.com",
    databaseURL: "https://bender-1487426215149.firebaseio.com",
    projectId: "bender-1487426215149",
    storageBucket: "bender-1487426215149.appspot.com",
    messagingSenderId: "925035513978"
  }  
};
