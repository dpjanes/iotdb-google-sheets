/*
 *  sheets/properties.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-07-04
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

"use strict"

const _ = require("iotdb-helpers")
const errors = require("iotdb-errors")

/**
 */
const sheets = _.promise((self, done) => {
    const google = require("..")

    _.promise(self)
        .validate(sheets)
        .then(google.sheets.properties)
        .make(sd => {
            sd.sheets = []

            sd.properties.sheets.forEach(sheet => {
                sd.sheets.push(sheet.properties)
            })
        })
        .end(done, self, "sheets")
})

sheets.method = "sheets"
sheets.requires = {
}
sheets.accepts = {
}
sheets.produces = {
    sheets: _.is.Dictionary,
}

/**
 *  API
 */
exports.sheets = sheets;
