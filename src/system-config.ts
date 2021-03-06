// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'moment': 'vendor/moment/moment.js',
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'firebase': 'vendor/firebase/firebase.js',
  'angularfire2': 'vendor/angularfire2',
  'jquery': 'vendor/jquery/dist/jquery.min.js',
  'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.js',
  'ng2-pagination': 'vendor/ng2-pagination'
};

/** User packages configuration. */
const packages: any = {
  'jquery' : {
    format: 'global',
    defaultExtension: 'js'
  },
  'bootstrap': {
    format: 'global'
  },
  'ng2-bootstrap': {
    defaultExtension: 'js'
  },
  'moment': {
    format: 'cjs'
  },
  angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  }
};

const meta: any = {
  'bootstrap': {
    deps: ['jquery']
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/shared/form-extensions',
  'app/shared/UserDetails',
  'app/login',
  'app/signup',
  'app/profile',
  'app/event-list',
  'app/event-create',
  'app/event-create/guest-lis',
  'app/event-create/guest-list',
  'app/event-create/event-details',
  'app/event-create/event-location',
  'app/event-create/event-message',
  'app/home',
  'app/notfound',
  'app/notloggedin',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages, meta});
