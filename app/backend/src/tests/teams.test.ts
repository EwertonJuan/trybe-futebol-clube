import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamsModel from '../database/models/TeamsModel';
import JwtValidation from '../utils/JwtValidation';

import { Response } from 'superagent';
import { teams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing route /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamsModel, "findAll").resolves(teams as TeamsModel[]);
    sinon.stub(TeamsModel, "findOne").resolves(teams[0] as TeamsModel);
  });
  
  after(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
    (TeamsModel.findOne as sinon.SinonStub).restore();
  });

  it('returns all teams with GET', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });

  it('returns one team by id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(teams[0]);
  });
})