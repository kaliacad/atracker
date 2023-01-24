import chai from "chai"
import chaiHttp from "chai-http"

import server from "../src/server.js"

const { expect } = chai

chai.use(chaiHttp)

describe("Auth", () => {
    const user = {
        username: "admin",
        password: "admin123",
    }

    it("it should login the user", (done) => {
        chai.request(server)
            .post("/")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(user)
            .redirects(0)
            .end((err, res) => {

                expect(err).to.be.null
                expect(res).to.have.status(302)
                expect(res).to.redirectTo("/myaccount/summary")
                expect(res).to.have.cookie("session")
                done()
            })
    })
})