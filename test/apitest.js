const chai= require('chai');
const chaiHttp= require('chai-http');
const should= chai.should();
const server=require('../app');

chai.use(chaiHttp);

// Don't forget to uncomment the test line in "/getotp" route.
// Important!! Don't forget the comment it again after the test is finished.

// Get OTP, login with it, then logout.
let token, otp;
describe('All Tests', ()=>{
    before('(POST /getotp)', (done)=>{
        const testUser={
            email: "loremipsum@dolorsitamet.com"
        };
        chai.request(server)
        .post('/getotp')
        .send(testUser)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('token');
            res.body.should.have.property('otp');
            token=res.body.token;
            otp=res.body.otp;
            done();
        });
    });
    before('(POST /login)', (done)=>{
        const testOtp={
            otp: otp
        };

        chai.request(server)
        .post('/login')
        .set('x-access-token', token)
        .send(testOtp)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('token');
            token=res.body.token;
            done();
        });
    });


    // Logout
    it('(POST /logout)', (done)=>{
         chai.request(server)
        .post('/api/logout')
        .set('x-access-token', token)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            done();
        });
    });
});
