/*
 *  sheets/parse.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-07-05
 *
 *  Copyright (2013-2020) David P. Janes
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
const parse = _.promise((self, done) => {
    const google = require("..")

    _.promise.validate(self, parse)

    let parser
    if (!_.is.String(self.path)) {
        parser = null
    } else if (_.is.AbsoluteURL(self.path)) {
        parser = google.sheets.parse_url
    } else if (self.path.startsWith("/")) {
        parser = google.sheets.parse_path
    } else if (self.path.length > 40) {
        parser = google.sheets.parse_path
    } else {
        parser = google.sheets.parse_range
    }

    _.promise(self)
        .add({
            url: self.path,
            range: self.path,
            google$range: null,
        })
        .then(parser)
        .end(done, self, "google$range")
})

parse.method = "sheets.parse"
parse.requires = {
    path: _.is.String,
}
parse.produces = {
    google$range: {
        spreadsheetId: _.is.String,
        range: _.is.String,
    },
}

/**
 */
const parameterized = path => _.promise((self, done) => {
    _.promise(self)
        .add("path", path)
        .then(parse)
        .end(done, self, "google$range")
})

/**
 *  API
 */
exports.parse = parse;
exports.parse.p = parameterized
