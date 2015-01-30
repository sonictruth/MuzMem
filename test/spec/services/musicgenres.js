'use strict';

describe('Service: musicGenres', function () {

  // load the service's module
  beforeEach(module('MuzMemApp'));

  // instantiate service

  var musicGenres;
  beforeEach(inject(function (_musicGenres_) {
    musicGenres = _musicGenres_;
  }));

  //it('should do something', function () {
  //  expect(!!musicGenres).toBe(true);
  //});
 
});
