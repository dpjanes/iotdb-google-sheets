/*
 *  drive/parse.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-09-25
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
const parse = _.promise((self, done) => {
    const google = require("..")

    _.promise(self)
        .validate(parse)

        .add("fileId", self.path)
        .conditional(_.is.AbsoluteURL(self.path), google.drive.parse_url.p(self.path))

        .end(done, self, "fileId")
})

parse.method = "drive.parse"
parse.requires = {
    path: _.is.String,
}
parse.produces = {
    fileId: _.is.String,
}

/**
 */
const parameterized = path => _.promise((self, done) => {
    _.promise(self)
        .add("path", path)
        .then(parse)
        .end(done, self, "fileId")
})

/**
 *  API
 */
exports.parse = parse;
exports.parse.p = parameterized