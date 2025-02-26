/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

android.describe('mlKitVision()', () => {
  describe('namespace', () => {
    it('accessible from firebase.app()', () => {
      const app = firebase.app();
      should.exist(app.mlKitVision);
      app.mlKitVision().app.should.equal(app);
    });

    it('supports multiple apps', async () => {
      firebase.mlKitVision().app.name.should.equal('[DEFAULT]');

      firebase
        .mlKitVision(firebase.app('secondaryFromNative'))
        .app.name.should.equal('secondaryFromNative');

      firebase
        .app('secondaryFromNative')
        .mlKitVision()
        .app.name.should.equal('secondaryFromNative');
    });
  });
});
