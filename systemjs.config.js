/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
// To clean up the code, we're placing these values in variables to be mapped below
var uirVer = '1.0.0-beta.3';
var rxjsVer = '5.0.0-beta.12';
var ng2Ver = '2.1.2';
var ng2Pkgs = ['core', 'compiler', 'common', 'http', 'platform-browser-dynamic', 'platform-browser'];

  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    //use typescript for compilation
    transpiler: 'typescript',
    //typescript compiler options
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    // map tells the System loader where to look for things
    // Object.assign is assigning the dependencies we've declared at the top
    map: Object.assign(ng2MapObject(ng2Pkgs, ng2Ver), {
      // our app is within the app folder
      app: 'dist',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'appModule': "./dist/app.module.js",
      'ui-router-ng2': 'https://unpkg.com/ui-router-ng2@' + uirVer + '/_bundles/ui-router-ng2',
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
      'angular2-jwt': 'npm:angular2-jwt/angular2-jwt.js',
      'angular2-google-maps/core': 'npm:angular2-google-maps/core/core.umd.js',
      'ng2-daterangepicker': 'npm:ng2-daterangepicker',
      'moment': 'npm:moment/moment.js',
      'jquery': 'npm:jquery/dist/jquery.js',
      'bootstrap-daterangepicker': 'npm:bootstrap-daterangepicker/daterangepicker.js'
    }),
    // packages tells the System loader how to load when no filename and/or no extension
    // Object.assign is assigning the dependencies we've declared at the top
    packages: Object.assign(ng2PackagesObject(ng2Pkgs), {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-jwt': {
          defaultExtension: 'js'
      },
      'ng2-file-upload': {
        defaultExtension: 'js'
      },
    }),
      meta: { "ui-router-ng2": { format: "cjs" } },
  });

function ng2MapObject(ng2Packages, ng2Ver) {
  return ng2Packages.reduce(function (acc, pkg) {
    acc['@angular/' + pkg] = 'https://unpkg.com/@angular/' + pkg + '@' + ng2Ver;
    return acc;
  }, {});
}

function ng2PackagesObject(ng2Packages) {
  return ng2Packages.reduce(function(acc, pkg) {
    acc['@angular/' + pkg] = { main: 'bundles/' + pkg + '.umd.js', defaultExtension: 'js' }
    return acc;
  }, {});
}


