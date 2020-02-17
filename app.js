//------------------------------------------------------------------------------
// Copyright 2016 IBM Corp. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

const fs = require('fs');
const VisualRecognitionV4 = require('ibm-watson/visual-recognition/v4');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV4({
  version: '2019-02-11',
  authenticator: new IamAuthenticator({
    apikey: '{apikey}'
  }),
  url: '{url}',
});

const params = {
  imagesFile: [
    {
		data: fs.createReadStream('./data/ThumbUp-test.jpeg'),
		contentType: 'image/jpeg',
	  },
	  {
		data: fs.createReadStream('./data/ThumbDown-test.jpeg'),
		contentType: 'image/jpeg',
	  }
	],
  collectionIds: ['5826c5ec-6f86-44b1-ab2b-cca6c75f2fc7'],
  features: ['objects'],
};

visualRecognition.analyze(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });
