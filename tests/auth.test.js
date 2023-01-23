import chaiHttp from "chai-http";
import chai from "chai";

import app from "../src/app.js";

const { expect, should } = chai;

chai.use(chaiHttp);

describe("Auth", () => {
    describe("/POST user login", () => {
        const user = {
            username: "admin",
            password: "admin123",
        };

        it("it should POST the user", (done) => {
            chai.request(app)
                .post("/")
                .set("content-type", "application/x-www-form-urlencoded")
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.be.equals(200);
                    done();
                });
        });
    });
});
