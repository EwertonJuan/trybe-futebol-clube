import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchesModel from '../database/models/MatchesModel';

import { Response } from 'superagent';
import { matches, setMatch } from './mocks/matches.mock';

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
  
  it('returns filtered matches', async () => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
    sinon.stub(MatchesModel, "findAll").resolves(matches[2] as unknown as MatchesModel[]);
    
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matches[2]);
  });
  
  it('is possible to create a new match', async () => {
    sinon.stub(MatchesModel, "create")
      .resolves({ id: 4, inProgress: true, ...setMatch } as MatchesModel)
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(setMatch);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({ id: 4, inProgress: true, ...setMatch });
  });
});