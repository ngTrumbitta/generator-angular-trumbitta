describe('Service: <%= factoryModule %>', function() {
  'use strict';
  var <%= factoryName %>,
      <%= factoryNameMock %>,
      $httpBackend,
      <%= factoryNameRequestHandler %>,
      ENV;

  beforeEach(module('<%= factoryModule %>'));
  beforeEach(module('app.config'));
  beforeEach(inject(function(_<%= factoryName %>_, _$httpBackend_, _ENV_) {

    <%= factoryName %> = _<%= factoryName %>_;
    $httpBackend = _$httpBackend_;
    ENV = _ENV_;

    <%= factoryNameMock %> =
      {
        data: {
          foo: 'bar'
        },
        success: true
      };

    <%= factoryNameRequestHandler %> = $httpBackend.when(
      'GET',
      ENV.BACKEND.URL.FULL + ENV.BACKEND.ENTRY_POINTS.<%= factoryEntryPoint %>)
      .respond(<%= factoryNameMock %>);

  }));

  afterEach(function() {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should GET the CUSTOMIZE THIS PART', function() {
    <%= factoryName %>.get().$promise
    .then(function(data) {
      expect(data.data).toEqual(<%= factoryNameMock %>.data);
    });
  });
});
