'use strict';

const expect = require('chai').expect;

const specRequest = require('./spec_request');

describe('/postcodes/{id}', () => {
  describe('get', () => {
    let getResponse;

    before(() => specRequest({url: '/postcodes/hs12aa', method: 'GET'}).then(response => {
      getResponse = response;
    }));

    it('returns http 200', () => {
      expect(getResponse.statusCode).to.equal(200);
    });

    it('returns postcode resource', () => {
      expect(getResponse.result).to.deep.equal({
        postcode: 'HS12AA',
        place: 'Steòrnabhagh / Stornoway',
        district: null,
        region: 'Scotland',
        country: 'Scotland'
      });
    });
  });
});
