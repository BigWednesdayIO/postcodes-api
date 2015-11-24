'use strict';

const expect = require('chai').expect;

const dataset = require('../lib/dataset');
const specRequest = require('./spec_request');

const entities = [
  {key: dataset.key(['Postcode', 'HS12AA']), data: {postcode: 'HS12AA', place: 'Steòrnabhagh / Stornoway', district: '', county: 'Na h-Eileanan an Iar', region: 'Scotland', country: 'Scotland'}},
  {key: dataset.key(['Postcode', 'DL104DE']), data: {postcode: 'DL104DE', place: 'Richmond', district: 'Richmondshire', county: 'North Yorkshire', region: 'Yorkshire and the Humber', country: 'England'}},
  {key: dataset.key(['Postcode', 'L314EU']), data: {postcode: 'L314EU', place: '', district: 'West Lancashire', county: 'Lancashire', region: 'North West', country: 'England'}},
  {key: dataset.key(['Postcode', 'CA101AA']), data: {postcode: 'CA101AA', place: 'Lazonby', district: 'Eden', county: 'Cumbria', region: 'North West', country: 'England'}}
];

describe('/postcodes/{id}', () => {
  describe('get', () => {
    let getResponses;

    before(() =>
      new Promise((resolve, reject) => {
        dataset.save(entities, err => {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      })
      .then(() => Promise.all([
        specRequest({url: '/postcodes/hs12aa', method: 'GET'}),
        specRequest({url: '/postcodes/DL104DE', method: 'GET'}),
        specRequest({url: '/postcodes/l314eu', method: 'GET'}),
        specRequest({url: '/postcodes/CA101AA', method: 'GET'})
      ]))
      .then(responses => {
        getResponses = responses;
      })
    );

    it('returns http 200', () => {
      getResponses.forEach(response => expect(response.statusCode).to.equal(200));
    });

    it('returns postcode resource', () => {
      expect(getResponses[0].result).to.deep.equal({
        postcode: 'HS12AA',
        place: 'Steòrnabhagh / Stornoway',
        district: null,
        county: 'Na h-Eileanan an Iar',
        region: 'Scotland',
        country: 'Scotland'
      });

      expect(getResponses[1].result).to.deep.equal({
        postcode: 'DL104DE',
        place: 'Richmond',
        district: 'Richmondshire',
        county: 'North Yorkshire',
        region: 'Yorkshire and the Humber',
        country: 'England'
      });

      expect(getResponses[2].result).to.deep.equal({
        postcode: 'L314EU',
        place: null,
        district: 'West Lancashire',
        county: 'Lancashire',
        region: 'North West',
        country: 'England'
      });

      expect(getResponses[3].result).to.deep.equal({
        postcode: 'CA101AA',
        place: 'Lazonby',
        district: 'Eden',
        county: 'Cumbria',
        region: 'North West',
        country: 'England'
      });
    });

    it('returns http 404 for unknown postcodes', () => {
      specRequest({url: '/postcodes/ab123de', method: 'GET'}).then(response => expect(response.statusCode).to.equal(404));
    });
  });
});
