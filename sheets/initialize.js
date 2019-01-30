/*
 *  sheets/initialize.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-07-29
 *
 *  Copyright [2013-2019] [David P. Janes]
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

const assert = require("assert")

/**
 *  Requires: self.google
 *  Produces: self.google
 */
const initialize = _.promise.make(self => {
    const method = "sheets.initialize";
    const google = require("googleapis").google

    assert.ok(self.google, `${method}: expected self.google`)
    assert.ok(self.google.client, `${method}: expected self.google.client`)

    self.google = _.d.clone(self.google)
    self.google.sheets = google.sheets({
        version: "v4",
        auth: self.google.client
    });
})

/**
 *  API
 */
exports.initialize = initialize;
