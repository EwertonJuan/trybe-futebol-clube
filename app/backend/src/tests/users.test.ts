import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UsersModel from '../database/models/UsersModel';
import JwtValidation from '../utils/JwtValidation';

import { Response } from 'superagent';
import { login, token } from './mocks/users.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing route /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves({
        ...login
      } as UsersModel);
    sinon
      .stub(JwtValidation, "createToken")
  });

  after(()=>{
    (UsersModel.findOne as sinon.SinonStub).restore();
  })

  it('is possible to login correctly', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: "luisffreitas@email.com", password: "geladeiravelha" })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.token).to.be.equal(token)
  });
});
