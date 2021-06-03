import { OkHiCore } from '@okhi/react-native-core';

/**
 * @ignore
 */
export class OkHiLocationManagerCore extends OkHiCore {
  getBearerToken(phone: string) {
    return this.anonymousSignInWithPhoneNumber(phone, ['address']);
  }
  getConfiguration() {
    return this.getApplicationConfiguration();
  }
}
