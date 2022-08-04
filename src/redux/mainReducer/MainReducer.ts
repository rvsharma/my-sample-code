import Login from '../accounts/login/LoginReducer';
import contentData from '../screens/content/ContentReducer';
import GeneralReducer from '../screens/memberExperience/general/GeneralReducer';
import ConfigurationsReducer from '../screens/memberExperience/configurations/ConfigurationsReducer';

export const AllReducer = {
  Login,
  contentData,
  GeneralReducer,
  ConfigurationsReducer,
};
