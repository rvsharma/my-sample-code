import { all } from 'redux-saga/effects';
import LoginSaga from '../accounts/login/LoginSagas';
import ContentSaga from '../screens/content/ContentSagas';
import GeneralSaga from '../screens/memberExperience/general/GeneralSagas';
import CommonSaga from '../screens/common/CommonSagas';
import ConfigurationsSaga from '../screens/memberExperience/configurations/ConfigurationsSagas';

export function* mainSaga(): any {
  yield all([LoginSaga(), ContentSaga(), GeneralSaga(), CommonSaga(), ConfigurationsSaga()]);
}
