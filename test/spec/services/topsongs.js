'use strict';

describe('Service: TopSongs', function () {

  // load the service's module
  beforeEach(module('MuzMemApp'));

  // instantiate service
  var TopSongs;
  beforeEach(inject(function (_TopSongs_) {
    TopSongs = _TopSongs_;
  }));

  it('should do something', function () {
    expect(!!TopSongs).toBe(true);
  });

});
