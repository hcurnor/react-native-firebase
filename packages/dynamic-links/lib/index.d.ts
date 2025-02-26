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

import { ReactNativeFirebase } from '@react-native-firebase/app';

/**
 * Dynamic DynamicLinks
 *
 * @firebase dynamic-links
 */
export namespace DynamicLinks {
  import FirebaseModule = ReactNativeFirebase.FirebaseModule;

  /**
   * The DynamicLinkAnalyticsParameters interface provides functionality to add Google Analytic
   * based parameters to a dynamic link.
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links().newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   * linkParams
   *    .analytics.setCampaign('banner')
   *    .analytics.setContent('Click Me');
   *
   *  const link = await firebase.links().buildLink(linkParams);
   * ```
   */
  export interface DynamicLinkAnalyticsParameters {
    /**
     * Sets the campaign name.
     *
     * @param campaign The campaign name; The individual campaign name, slogan, promo code, etc. for a product.
     */
    setCampaign(campaign: string): DynamicLinkParameters;

    /**
     * Sets the campaign content.
     *
     * @param content The campaign content; used for A/B testing and content-targeted ads to differentiate ads or links that point to the same URL.
     */
    setContent(content: string): DynamicLinkParameters;

    /**
     * Sets the campaign medium.
     *
     * @param medium The campaign medium; used to identify a medium such as email or cost-per-click (cpc).
     */
    setMedium(medium: string): DynamicLinkParameters;

    /**
     * Sets the campaign source.
     *
     * @param source The campaign source; used to identify a search engine, newsletter, or other source.
     */
    setSource(source: string): DynamicLinkParameters;

    /**
     * Sets the campaign term.
     *
     * @param term The campaign term; used with paid search to supply the keywords for ads.

     */
    setTerm(term: string): DynamicLinkParameters;
  }

  /**
   * The DynamicLinkAndroidParameters interface provides functionality to configure the behaviour
   * of dynamic links for Android devices.
   *
   * If any parameter is declared then the Android package name must also be set via `setPackageName`
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links().newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   * linkParams
   *   .android.setPackageName('io.invertase.testing')
   *   .android.setMinimumVersion('18');
   *
   *  const link = await firebase.links().buildLink(linkParams);
   * ```
   */
  export interface DynamicLinkAndroidParameters {
    /**
     * Sets the link to open when the app isn't installed. Specify this to do something other than install your app from
     * the Play Store when the app isn't installed, such as open the mobile web version of the content, or display a
     * promotional page for your app.
     *
     * @param fallbackUrl The link to open on Android if the app is not installed.
     */
    setFallbackUrl(fallbackUrl: string): DynamicLinkParameters;

    /**
     * Sets the version code of the minimum version of your app that can open the link.
     *
     * @param minimumVersion The minimum version.
     */
    setMinimumVersion(minimumVersion: string): DynamicLinkParameters;

    /**
     * Sets the Android package name.
     *
     * @param packageName The package name of the Android app to use to open the link. The app must be connected to your project from the Overview page of the Firebase console.
     */
    setPackageName(packageName: string): DynamicLinkParameters;
  }

  /**
   * The DynamicLinkIOSParameters interface provides functionality to configure the behaviour
   * of dynamic links for iOS devices.
   *
   * If any parameter is declared then the iOS BundleId must also be set via `setBundleId`
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links().newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   * linkParams
   *   .ios.setBundleId('io.invertase.testing')
   *   .ios.setAppStoreId('123456789')
   *   .ios.setMinimumVersion('18');
   *
   *  const link = await firebase.links().buildLink(linkParams);
   * ```
   */
  export interface DynamicLinkIOSParameters {
    /**
     * Sets the App Store ID, used to send users to the App Store when the app isn't installed.
     *
     * @param appStoreId The App Store ID.
     */
    setAppStoreId(appStoreId: string): DynamicLinkParameters;

    /**
     * Sets the iOS bundle ID.
     *
     * @param bundleId The bundle ID of the iOS app to use to open the link. The app must be connected to your project from the Overview page of the Firebase console.
     */
    setBundleId(bundleId: string): DynamicLinkParameters;

    /**
     * Sets the app's custom URL scheme, if defined to be something other than your app's parameters ID.
     *
     * @param customScheme The app's custom URL scheme.
     */
    setCustomScheme(customScheme: string): DynamicLinkParameters;

    /**
     * Sets the link to open when the app isn't installed. Specify this to do something other than install your app from
     * the App Store when the app isn't installed, such as open the mobile web version of the content, or display a
     * promotional page for your app.
     *
     * @param fallbackUrl The link to open on iOS if the app is not installed.
     */
    setFallbackUrl(fallbackUrl: string): DynamicLinkParameters;

    /**
     * Sets the bundle ID of the iOS app to use on iPads to open the link. The app must be connected to your project
     * from the Overview page of the Firebase console.
     *
     * @param iPadBundleId The iPad parameters ID of the app.
     */
    setIPadBundleId(iPadBundleId: string): DynamicLinkParameters;

    /**
     * Sets the link to open on iPads when the app isn't installed. Specify this to do something other than install your
     * app from the App Store when the app isn't installed, such as open the web version of the content, or display a
     * promotional page for your app. Overrides the fallback link set by `setFallbackUrl` on iPad.
     *
     * @param iPadFallbackUrl The link to open on iPad if the app is not installed.
     */
    setIPadFallbackUrl(iPadFallbackUrl: string): DynamicLinkParameters;

    /**
     * Sets the minimum version of your app that can open the link.
     *
     * @param minimumVersion The minimum version.
     */
    setMinimumVersion(minimumVersion: string): DynamicLinkParameters;
  }

  /**
   * The DynamicLinkITunesParameters interface provides functionality to add iTunes Connect Analytics
   * based parameters to the created dynamic link.
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links().newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   * linkParams
   *   .itunes.setAffiliateToken('ABCDEFG');
   *
   *  const link = await firebase.links().buildLink(linkParams);
   * ```
   */
  export interface DynamicLinkITunesParameters {
    /**
     * Sets the affiliate token.
     *
     * @param affiliateToken The affiliate token used to create affiliate-coded links.
     */
    setAffiliateToken(affiliateToken: string): DynamicLinkParameters;

    /**
     * Sets the campaign token.
     *
     * @param campaignToken The campaign token that developers can add to any link in order to track sales from a specific marketing campaign.
     */
    setCampaignToken(campaignToken: string): DynamicLinkParameters;

    /**
     * Sets the provider token.
     *
     * @param providerToken The provider token that enables analytics for Dynamic DynamicLinks from within iTunes Connect.
     */
    setProviderToken(providerToken: string): DynamicLinkParameters;
  }

  /**
   * The DynamicLinkNavigationParameters interface provides functionality to specify how the navigation
   * of the created link is handled.
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links().newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   * linkParams
   *   .navigation.setForcedRedirectEnabled(true);
   *
   *  const link = await firebase.links().buildLink(linkParams);
   * ```
   */
  export interface DynamicLinkNavigationParameters {
    /**
     * Sets whether to enable force redirecting or going to the app preview page. Defaults to false.
     *
     * @param forcedRedirectEnabled If true, app preview page will be disabled and there will be a redirect to the FDL. If false, go to the app preview page.
     */
    setForcedRedirectEnabled(forcedRedirectEnabled: boolean): DynamicLinkParameters;
  }

  /**
   * The DynamicLinkSocialParameters interface provides functionality to add additional social
   * meta-data to the URL.
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links().newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   * linkParams
   *   .social.setTitle('Social Application')
   *   .social.setDescriptionText('A Social Application');
   *
   *  const link = await firebase.links().buildLink(linkParams);
   * ```
   */
  export interface DynamicLinkSocialParameters {
    /**
     * Sets the meta-tag description.
     *
     * @param descriptionText The description to use when the Dynamic Link is shared in a social post.
     */
    setDescriptionText(descriptionText: string): DynamicLinkParameters;

    /**
     * Sets the meta-tag image link.
     *
     * @param imageUrl The URL to an image related to this link.
     */
    setImageUrl(imageUrl: string): DynamicLinkParameters;

    /**
     * Sets the meta-tag title.
     *
     * @param title The title to use when the Dynamic Link is shared in a social post.
     */
    setTitle(title: string): DynamicLinkParameters;
  }

  /**
   * The DynamicLinkParameters interface provides access to the Dynamic Link builder classes
   * used to configure a created link.
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links()
   *   .newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   *
   * linkParams.analytics.setCampaign('banner');
   *
   * const link = await firebase.links().buildLink(linkParams);
   * ```
   */
  export interface DynamicLinkParameters {
    /**
     * Access Google Analytics specific link parameters.
     */
    analytics: DynamicLinkAnalyticsParameters;

    /**
     * Access Android specific link parameters.
     */
    android: DynamicLinkAndroidParameters;

    /**
     * Access iOS specific link parameters.
     */
    ios: DynamicLinkIOSParameters;

    /**
     * Access iTunes Connect specific link parameters.
     */
    itunes: DynamicLinkITunesParameters;

    /**
     * Access navigation specific link parameters.
     */
    navigation: DynamicLinkNavigationParameters;

    /**
     * Access social specific link parameters.
     */
    social: DynamicLinkSocialParameters;
  }

  /**
   * ShortLinkType determines the type of dynamic short link which Firebase creates. Used when building
   * a new short link via `buildShortLink()`.
   *
   * #### Example
   *
   * ```js
   * const linkParams = firebase.links()
   *   .newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
   *
   * linkParams.analytics.setCampaign('banner');
   *
   * const link = await firebase.links().buildShortLink(
   *   linkParams,
   *   firebase.links.ShortLinkType.UNGUESSABLE,
   * );
   * ```
   */
  export interface ShortLinkType {
    /**
     * Shorten the path to a string that is only as long as needed to be unique, with a minimum length
     * of 4 characters. Use this if sensitive information would not be exposed if a short
     * Dynamic Link URL were guessed.
     */
    SHORT: 'SHORT';

    /**
     * Shorten the path to an unguessable string. Such strings are created by base62-encoding randomly
     * generated 96-bit numbers, and consist of 17 alphanumeric characters. Use unguessable strings
     * to prevent your Dynamic DynamicLinks from being crawled, which can potentially expose sensitive information.
     */
    UNGUESSABLE: 'UNGUESSABLE';

    /**
     * By default, Firebase returns a standard formatted link.
     */
    DEFAULT: 'DEFAULT';
  }

  /**
   * Firebase Dynamic DynamicLinks Statics
   *
   * ```js
   * firebase.links.X
   * ```
   */
  export interface Statics {
    /**
     * Returns the {@link links.ShortLinkType} interface.
     */
    ShortLinkType: ShortLinkType;
    // TODO deprecate DynamicLink
  }

  /**
   *
   * The Firebase Dynamic DynamicLinks service is available for the default app only.
   *
   * #### Example 1
   *
   * Get the links instance for the **default app**:
   *
   * ```js
   * const links = firebase.links();
   * ```
   */
  export class Module extends FirebaseModule {
    /**
     * Creates new parameters which enhance the functionality of a created link.
     *
     * To create a DynamicLinkParameters, first populate it by using the setX methods available on the `DynamicLinkParameters` builder classes,
     * then pass it to `firebase.links().buildLink(linkParams)` or `firebase.links().buildShortLink(linkParams, type)`.
     *
     * #### Example
     *
     * ```js
     * const linkParams = firebase.links()
     *    .newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
     *
     * linkParams.analytics.setCampaign('banner');
     *
     * const link = await firebase.links().buildShortLink(
     *   linkParams,
     *   firebase.links.ShortLinkType.UNGUESSABLE,
     * );
     * ```
     *
     * @param link The link the target app will open. You can specify any URL the app can handle, such as a link to the app’s content, or a URL that initiates some app-specific logic such as crediting the user with a coupon, or displaying a specific welcome screen. This link must be a well-formatted URL, be properly URL-encoded, and use the HTTP or HTTPS scheme.
     * @param domainURIPrefix Domain URI Prefix of your App. This value must be your assigned domain from the Firebase console. (e.g. https://xyz.page.link) The domain URI prefix must start with a valid HTTPS scheme (https://).
     */
    newDynamicLinkParameters(link: string, domainURIPrefix: string): DynamicLinkParameters;

    /**
     * Builds a Dynamic Link from the provided DynamicLinkParameters instances.
     *
     * #### Example
     *
     * ```js
     * const linkParams = firebase.links()
     *   .newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
     *
     * linkParams.analytics.setCampaign('banner');
     *
     * const link = await firebase.links().buildLink(linkParams);
     * ```
     *
     * @param dynamicLinkParams An instance of DynamicLinkParameters created via `newDynamicLinkParameters`
     */
    buildLink(dynamicLinkParams: DynamicLinkParameters): Promise<string>;

    /**
     * **Deprecated**: Creates a link from the provided DynamicLinkParameters instances.
     *
     * @deprecated Use `buildLink` with the same args instead.
     * @param dynamicLinkParams An instance of DynamicLinkParameters created via `newDynamicLinkParameters`
     */
    createDynamicLink(dynamicLinkParams: DynamicLinkParameters): Promise<string>;

    /**
     * Builds a short Dynamic Link from the provided DynamicLinkParameters instances.
     *
     *  ```js
     * const linkParams = firebase.links()
     *   .newDynamicLinkParameters('https://invertase.io', 'https://xyz.page.link');
     *
     * linkParams.analytics.setCampaign('banner');
     *
     * const link = await firebase.links().buildShortLink(
     *   linkParams,
     *   firebase.links.ShortLinkType.UNGUESSABLE,
     * );
     * ```
     *
     * @param dynamicLinkParams An instance of DynamicLinkParameters created via `newDynamicLinkParameters`
     * @param shortLinkType The short link type, one of `ShortLinkType` from `firebase.links.ShortLinkType`
     */
    buildShortLink(
      dynamicLinkParams: DynamicLinkParameters,
      shortLinkType?: ShortLinkType,
    ): Promise<string>;

    /**
     * **Deprecated**: Creates a short Dynamic Link from the provided DynamicLinkParameters instances.
     *
     * @deprecated Use `buildShortLink` with the same args instead.
     * @param dynamicLinkParams An instance of DynamicLinkParameters created via `newDynamicLinkParameters`
     * @param shortLinkType The short link type, one of `ShortLinkType` from `firebase.links.ShortLinkType`
     */
    createShortDynamicLink(
      dynamicLinkParams: DynamicLinkParameters,
      shortLinkType?: ShortLinkType,
    ): Promise<string>;

    /**
     * Returns the URL that the app has been launched from. If the app was not launched from a URL the return value will be null.
     *
     * > Use {@link auth#isSignInWithEmailLink} to check if an inbound dynamic link is an email sign-in link.
     *
     * #### Example
     *
     * ```js
     * async function bootstrapApp() {
     *    await initialLink = await firebase.links().getInitialLink();
     *
     *    if (initialLink) {
     *      // Handle dynamic link inside your own application
     *      if (initialLink === 'https://invertase.io/offer') return navigateTo('/offers')
     *    }
     * }
     * ```
     */
    getInitialLink(): Promise<string | null>;

    /**
     * Subscribe to URL open events while the app is still running.
     *
     * The listener is called from URL open events whilst the app is still running, use
     * {@link links#getInitialLink} for URLs which cause the app to open from a previously closed / not running state.
     *
     * #### Example
     *
     * ```jsx
     * function App() {
     *   const handleDynamicLink = (link) => {
     *     // Handle dynamic link inside your own application
     *     if (link === 'https://invertase.io/offer') return navigateTo('/offers')
     *   };
     *
     *   useEffect(() => {
     *     const unsubscribe = firebase.links().onLink(handleDynamicLink);
     *     // When the component unmounts, remove the listener
     *     return unsubscribe;
     *   }, []);
     *
     *   return <YourApp />;
     * }
     * ```
     *
     * @returns Unsubscribe function, call the returned function to unsubscribe from all future events.
     * @param listener The listener callback, called URL open events.
     */
    onLink(listener: Function<string>): Function;
  }
}

declare module '@react-native-firebase/dynamic-links' {
  import ReactNativeFirebaseModule = ReactNativeFirebase.Module;
  import FirebaseModuleWithStatics = ReactNativeFirebase.FirebaseModuleWithStatics;

  const firebaseNamedExport: {} & ReactNativeFirebaseModule;
  export const firebase = firebaseNamedExport;

  const module: FirebaseModuleWithStatics<DynamicLinks.Module, DynamicLinks.Statics>;
  export default module;
}

/**
 * Attach namespace to `firebase.` and `FirebaseApp.`.
 */
declare module '@react-native-firebase/app' {
  namespace ReactNativeFirebase {
    import FirebaseModuleWithStatics = ReactNativeFirebase.FirebaseModuleWithStatics;
    interface Module {
      links: FirebaseModuleWithStatics<DynamicLinks.Module, DynamicLinks.Statics>;
    }
    interface FirebaseApp {
      links(): DynamicLinks.Module;
    }
  }
}
