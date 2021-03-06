import { OkHiCore, OkHiAuth } from '@okhi/react-native-core';

/**
 * @ignore
 */
export class OkHiLocationManagerCore extends OkHiCore {
  constructor(auth: OkHiAuth) {
    super(auth);
  }
  getBearerToken(phone: string) {
    return this.anonymousSignInWithPhoneNumber(phone, ['address']);
  }
}
