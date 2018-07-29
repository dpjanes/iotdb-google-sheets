/*
 *  token/set.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-07-28
 *
 *  Copyright [2013-2018] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require("iotdb-helpers")

const google = require("googleapis")

const assert = require("assert")

/**
 *  Requires: self.google.client, self.googled.credentials
 *  Produces: self.google
 */
const set = _.promise.make((self, done) => {
    const method = "initialize";

    assert.ok(self.google, `${method}: expected self.google`)
    assert.ok(self.google.client, `${method}: expected self.google.client`)
    assert.ok(self.googled, `${method}: expected self.googled`)
    assert.ok(self.googled.token, `${method}: expected self.googled.token`)

    self.google.client.setCredentials(self.googled.token)

    done(null, self)
})

/**
 *  API
 */
exports.set = set;