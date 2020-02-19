import { API_DOMAIN } from "./Api";
import { INJ_JS } from './JS';
import { OLD_ANDROID_VERSIONS } from './Android';
import { ERROR_INVALID_EMAIL_ADRESS, ERROR_INVALID_PASSWORD, ERROR_INVALID_USERNAME, ERROR_INVALID_NAME } from './Auth';
import * as Players from './Players';
import { SESSION_TOKEN_KEY, IDENTITY_STORAGE_KEY } from './Auth';
import Theme, { THEME_STORAGE_KEY } from "./Theme";
import * as Content from './Content';
import * as ParentControl from './ParentControl';
import * as LocalDatabaseConstants from './LocalDatabase';
import * as User from './User';

export {
    API_DOMAIN,
    INJ_JS,
    OLD_ANDROID_VERSIONS,
    // auth errors
    ERROR_INVALID_PASSWORD, ERROR_INVALID_USERNAME, ERROR_INVALID_EMAIL_ADRESS, ERROR_INVALID_NAME,
    Players, Theme, THEME_STORAGE_KEY, Content,
    SESSION_TOKEN_KEY, IDENTITY_STORAGE_KEY,
    ParentControl,
    LocalDatabaseConstants,
    User
}
