import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UsersModel from '../database/models/UsersModel';
import JwtValidation from '../utils/JwtValidation';

import { Response } from 'superagent';
import { login, user, token } from './mocks/users.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing route /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(UsersModel, "findOne").resolves(user as UsersModel);
  });
  
  after(()=>{
    (UsersModel.findOne as sinon.SinonStub).restore();
  })
  
  it('is possible to login correctly', async () => {
    sinon.restore();
    sinon.stub(UsersModel, "findOne").resolves(null);
    sinon.stub(JwtValidation, "createToken").resolves(token);
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(login);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.token).to.be.equal(token);
  });

  it('is not possible to login without an email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: '', password: '123456' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('is not possible to login without an password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'luisffreitas@email.com', password: '' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('is not possible to login with an invalid email',async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: login.email, password: 'invalidpassword' });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('is not possible to login with an invalid email',async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'invalid@email.com', password: login.password });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });
});
