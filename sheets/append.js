/*
 *  sheets/append.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-01-30
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

/**
 */
const append = _.promise((self, done) => {
    _.promise.validate(self, append)

    const params = {
        spreadsheetId: self.query.spreadsheetId,
        range: self.query.range,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
            values: self.jsons,
        },
    }

    self.google.sheets.spreadsheets.values.append(params, (error, result) => {
        if (error) {
            return done(error)
        }
        
        self.google$result = result
        self.jsons = result.data.values
        
        done(null, self)
    })
})

append.method = "sheets.append";
append.requires = {
    jsons: _.is.Array.of.JSON,
    query: {
        spreadsheetId: _.is.String,
        range: _.is.String,
    },
    google: {
        sheets: _.is.Object,
    },
}
append.produces = {
    google$result: _.is.Dictionary,
}

/**
 *  API
 */
exports.append = append;
