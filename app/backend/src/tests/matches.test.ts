import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchesModel from '../database/models/MatchesModel';

import { Response } from 'superagent';
import { matches } from './mocks/matches.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing route /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(MatchesModel, "findAll").resolves(matches as unknown as MatchesModel[]);
  });
  
  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('returns all matches with GET', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matches);
  });
});
