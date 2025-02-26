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

import {
  createModuleNamespace,
  FirebaseModule,
  getFirebaseRoot,
} from '@react-native-firebase/app/lib/internal';
import {
  isNumber,
  isObject,
  isString,
  isUndefined,
  validateOptionalNativeDependencyExists,
} from '@react-native-firebase/common';

import version from './version';
import SmartReplyConversation from './SmartReplyConversation';

// TODO not available on iOS until SDK 6.0.0
// import TranslateModelManager from './TranslateModelManager';

const statics = {};
const namespace = 'mlKitLanguage';
const nativeModuleName = [
  'RNFBMLNaturalLanguageIdModule',
  'RNFBMLNaturalLanguageTranslateModule',
  'RNFBMLNaturalLanguageSmartReplyModule',
];

function validateIdentifyLanguageArgs(text, options, methodName) {
  if (!isString(text)) {
    throw new Error(`firebase.mlKitLanguage().${methodName}(*, _) 'text' must be a string value.`);
  }

  if (!isObject(options)) {
    throw new Error(
      `firebase.mlKitLanguage().${methodName}(_, *) 'options' must be an object or undefined.`,
    );
  }

  if (
    !isUndefined(options.confidenceThreshold) &&
    (!isNumber(options.confidenceThreshold) ||
      options.confidenceThreshold < 0 ||
      options.confidenceThreshold > 1)
  ) {
    throw new Error(
      `firebase.mlKitLanguage().${methodName}(_, *) 'options.confidenceThreshold' must be a float value between 0 and 1.`,
    );
  }
}

class FirebaseMlKitLanguageModule extends FirebaseModule {
  identifyLanguage(text, options = {}) {
    validateOptionalNativeDependencyExists(
      'ml_natural_language_language_id_model',
      'ML Kit Language Identification',
      !!this.native.identifyLanguage,
    );
    validateIdentifyLanguageArgs(text, options, 'identifyLanguage');
    return this.native.identifyLanguage(text.slice(0, 200), options);
  }

  identifyPossibleLanguages(text, options = {}) {
    validateOptionalNativeDependencyExists(
      'ml_natural_language_language_id_model',
      'ML Kit Language Identification',
      !!this.native.identifyPossibleLanguages,
    );
    validateIdentifyLanguageArgs(text, options, 'identifyPossibleLanguages');
    return this.native.identifyPossibleLanguages(
      text.slice(0, 200),
      Object.assign({}, options, { multipleLanguages: true }),
    );
  }

  newSmartReplyConversation(messageHistoryLimit) {
    validateOptionalNativeDependencyExists(
      'ml_natural_language_smart_reply_model',
      'ML Kit Smart Replies',
      !!this.native.getSuggestedReplies,
    );
    if (!isUndefined(messageHistoryLimit) && !isNumber(messageHistoryLimit)) {
      throw new Error(
        `firebase.mlKitLanguage().newSmartReplyConversation(*) 'messageHistoryLimit' must be a number or undefined.`,
      );
    }

    return new SmartReplyConversation(this.native, messageHistoryLimit);
  }
}

// import { SDK_VERSION } from '@react-native-firebase/mlkit';
export const SDK_VERSION = version;

// import mlKitLanguage from '@react-native-firebase/mlkit';
// mlKitLanguage().X(...);
export default createModuleNamespace({
  statics,
  version,
  namespace,
  nativeModuleName,
  nativeEvents: false,
  hasMultiAppSupport: true,
  hasCustomUrlOrRegionSupport: false,
  ModuleClass: FirebaseMlKitLanguageModule,
});

// import mlKitLanguage, { firebase } from '@react-native-firebase/mlkit';
// mlKitLanguage().X(...);
// firebase.mlKitLanguage().X(...);
export const firebase = getFirebaseRoot();

// TODO not available on Firebase iOS until SDK 6.0.0, add in RNFB >6.1
// --------------------------
//     LANGUAGE_TRANSLATE
// --------------------------
// translate(text, translationOptions) {
//   const _translationOptions = {};
//
//   // retrieve the language id integers
//   const { sourceLanguage, targetLanguage } = translationOptions;
//   _translationOptions.sourceLanguage = this.native.TRANSLATE_LANGUAGES[sourceLanguage];
//   _translationOptions.targetLanguage = this.native.TRANSLATE_LANGUAGES[targetLanguage];
//   // translationOptions required:
//   //    sourceLanguage
//   //    targetLanguage
//   return this.native.translate(text, _translationOptions);
// }
//
// get translateModelManager() {
//   return new TranslateModelManager(this);
// }
