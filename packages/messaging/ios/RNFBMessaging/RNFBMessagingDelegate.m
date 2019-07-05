/**
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

#import <RNFBApp/RNFBRCTEventEmitter.h>
#import <UserNotifications/UserNotifications.h>

#import "RNFBMessagingDelegate.h"

//#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
//@import UserNotifications;
//#endif

@implementation RNFBMessagingDelegate

+ (instancetype)sharedInstance {
  static dispatch_once_t once;
  static RNFBMessagingDelegate *sharedInstance;
  dispatch_once(&once, ^{
    sharedInstance = [[RNFBMessagingDelegate alloc] init];
    sharedInstance.pendingPromiseReject = nil;
    sharedInstance.pendingPromiseResolve = nil;
    [FIRMessaging messaging].delegate = sharedInstance;
    [FIRMessaging messaging].shouldEstablishDirectChannel = YES;
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendDataMessageFailure:) name:FIRMessagingSendErrorNotification object:sharedInstance];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendDataMessageSuccess:) name:FIRMessagingSendSuccessNotification object:sharedInstance];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didDeleteMessagesOnServer) name:FIRMessagingMessagesDeletedNotification object:sharedInstance];
  });
  return sharedInstance;
}


#pragma mark -
#pragma mark UNUserNotificationCenter Methods

- (void)sendDataMessageFailure:(NSNotification *)notification {
  NSDictionary *userInfo = notification.userInfo;
  NSError *error = (NSError *) userInfo[@"error"];
  NSString *messageID = (NSString *) userInfo[@"messageID"];
  [[RNFBRCTEventEmitter shared] sendEventWithName:@"messaging_message_send_error" body:@{
      @"messageId": messageID,
      @"error": @{
          @"code": @"unknown",
          @"message": error.localizedDescription
      }
  }];
}

- (void)sendDataMessageSuccess:(NSNotification *)notification {
  NSDictionary *userInfo = notification.userInfo;
  NSString *messageID = (NSString *) userInfo[@"messageID"];
  [[RNFBRCTEventEmitter shared] sendEventWithName:@"messaging_message_sent" body:@{
      @"messageId": messageID
  }];
}

- (void)didDeleteMessagesOnServer {
  [[RNFBRCTEventEmitter shared] sendEventWithName:@"messaging_message_deleted" body:@{}];
}


#pragma mark -
#pragma mark FIRMessagingDelegate Methods

// Listen for FCM tokens
- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
  [[RNFBRCTEventEmitter shared] sendEventWithName:@"messaging_token_refresh" body:@{
      @"token": fcmToken
  }];
}

// Listen for data messages in the foreground
- (void)applicationReceivedRemoteMessage:(nonnull FIRMessagingRemoteMessage *)remoteMessage {
  [[RNFBRCTEventEmitter shared] sendEventWithName:@"messaging_message_received" body:@{
//      @"token": fcmToken
  }];
//  NSDictionary *message = [self parseFIRMessagingRemoteMessage:remoteMessage];
//  [self sendJSEvent:self name:MESSAGING_MESSAGE_RECEIVED body:message];
}

// Receive data messages on iOS 10+ directly from FCM (bypassing APNs) when the app is in the foreground.
// To enable direct data messages, you can set [Messaging messaging].shouldEstablishDirectChannel to YES.
- (void)messaging:(nonnull FIRMessaging *)messaging
didReceiveMessage:(nonnull FIRMessagingRemoteMessage *)remoteMessage {
//  NSDictionary *message = [self parseFIRMessagingRemoteMessage:remoteMessage];
  [[RNFBRCTEventEmitter shared] sendEventWithName:@"messaging_message_received" body:@{
//      @"token": fcmToken
  }];
}


@end
