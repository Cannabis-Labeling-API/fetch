import { getQr, putQr, uapiFetch, getOptions, fetchEndpointInfo } from '../dist';

import { assert } from 'chai';

const badApiKey = "123asd";
const env = require("./example.env.json");

const testFixtures = {
    id: "1A4000000",
    strain: "Api Kush",
    category: "Api Vape 1g",
    quantity: 6,
    caseQuantity: 2
}

const endpointInfo = {
    qr: env.qrBase + '/test_id'
}

export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time < 60 ? time * 1000 : time));
}

describe('Environment', async () => {
    it(`endpoint info for ${env.qrBase}`, async () => {
        const epInfo = await fetchEndpointInfo(endpointInfo.qr);
        assert.exists(epInfo, 'bad endpoint info');
        // console.log(epInfo['path-components']);
        // console.log(epInfo.endpoint);
        endpointInfo.qr = epInfo.example.qr;
        assert.notEqual(epInfo['path-components'].indexOf(env.qrBase), -1);
        assert.equal(epInfo.endpoint, env.endpoint)
    });

    it('fails get with missing key', async () => {
        const res = await getQr(endpointInfo.qr);
        assert.equal(401, res.status);
    });

    it('fails get with bad key', async () => {
        const res = await getQr(endpointInfo.qr, "case", { apiKey: badApiKey });
        assert.equal(401, res.status);
    });
});

describe('Test', async () => {
    const fixtures = { cases: [], eaches: [], results: { added: [], removed: [] } }

    before(async () => {
        const epInfo = await fetchEndpointInfo(endpointInfo.qr);
        assert.exists(epInfo, 'bad endpoint info');
        endpointInfo.qr = epInfo.example.qr;
        assert.notEqual(epInfo['path-components'].indexOf(env.qrBase), -1);
        assert.equal(epInfo.endpoint, env.endpoint)
    });

    it('created fixtures', async () => {
        const res = await uapiFetch({
            apiKey: env.apiKey,
            uri: `${env.endpoint}/fixtures/create`,
            method: 'put',
            body: { ...testFixtures }
        });
        const body = await res.json();
        const { added } = body;
        fixtures.results.added = added;
        console.log("created fixures", added, "wait to settle");
        await sleep(1500);
    });

    it('gets cases and eaches via fixture ID', async () => {
        await sleep(1500);
        const res = await uapiFetch({
            apiKey: env.apiKey,
            uri: `${env.endpoint}/regulator/${testFixtures.id}`,
        });
        const { cases, eaches } = await res.json();
        // console.log({ cases, eaches })
        assert.notEqual(cases?.length, 0, "no cases");
        assert.notEqual(eaches?.length, 0, "no caeacheses");
        fixtures.cases = cases;
        fixtures.eaches = eaches;
    });

    it('gets eaches from case endpoint', async () => {
        const [case0] = fixtures.cases;
        // console.log(case0);
        const res = await getQr(case0, "case", { apiKey: env.apiKey });
        // console.log(res);
        const { eaches } = await res;
        assert.exists(eaches.length);
        // console.log("in eaches", eaches);
        for (const e of eaches) {
            // console.log("expect", e);
            assert.notEqual(fixtures.eaches.indexOf(e), -1);
        }
    });

    it('case data from each endpoint', async () => {
        const [each0] = fixtures.eaches;
        // console.log("get", each0);
        const res = await getQr(each0, "each", { apiKey: env.apiKey });
        const { caseId } = await res;
        assert.exists(caseId);
    });

    after(async () => {
        const res = await uapiFetch({
            apiKey: env.apiKey,
            method: 'put',
            uri: `${env.endpoint}/fixtures/clean`,
            body: { ...testFixtures }
        });
        const body = await res.json();
        const { removed } = body;
        console.log("removed", removed)
        fixtures.results.removed = removed;
        assert.notEqual(removed?.branches?.length, 0);
        assert.notEqual(removed?.softCodes?.length, 0);
    });
});


