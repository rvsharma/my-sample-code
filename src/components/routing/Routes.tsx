import React, { PureComponent, ReactNode } from 'react';
import { Switch } from 'react-router-dom';
import Login from '../accounts/login/Login';
import GuestLayout from '../layouts/guestLayout/GuestLayout';
import ProtectedLayout from '../layouts/protectedLayout/ProtectedLayout';
import AdminDashboard from '../screens/dashboard/Dashboard';
import {
  APP_HOME_URL,
  APP_VERSION_PAGE_URL,
  BRANDING_PAGE_URL,
  ERROR_AND_ALERTS_PAGE_URL,
  LINKS_PAGE_URL,
  MEMBER_EXP_CONFIGURATION_URL,
  MEMBER_EXP_GENRAL_URL,
  MEMBER_EXP_MENU_URL,
  MEMBER_EXP_PAGES_URL,
  MEMBER_EXP_PAGE_URL,
  NOTIFICATION_PAGE_URL,
  REPORTS_PAGE_URL,
  SSO_PAGE_URL,
  TILES_PAGE_URL,
  USER_MANAGEMENT_PAGE_URL,
  VIRTUAL_VISIT_PAGE_URL,
} from '../shared/constant/Urls';
import { AppRoute } from './guestRoute/GuestRoute';
import { ProtectedRoute } from './protectedRoute/ProtectedRoute';
import Branding from '../screens/content/branding/Branding';
import Tiles from '../screens/content/tiles/Tiles';
import Links from '../screens/content/links/Links';
import Sso from '../screens/content/sso/Sso';
import VirtualVisit from '../screens/content/virtualVisit/VirtualVisit';
import Reports from '../screens/operations/report/Reports';
import ErrorAndAlerts from '../screens/operations/errorAndAlerts/ErrorAndAlerts';
import MemberConfiguratios from '../screens/operations/memberConfigurations/MemberConfiguratios';
import UserManagement from '../screens/operations/userManagement/UserManagement';
import Pages from '../screens/memberExperience/pages/Pages';
import MenuItems from '../screens/memberExperience/menuItems/MenuItems';
import General from '../screens/memberExperience/general/General';
import Configurations from '../screens/memberExperience/configurations/Configurations';
import Notifications from '../screens/operations/notifications/Notifications';
import AppVersion from '../screens/operations/appVersion/AppVersion';
import {
  CONTENT_SIDENAV,
  MEMBEREXPERIENCE_SIDENAV,
  OPERATIONS_SIDENAV,
} from '../shared/constant/AppConstants';

export default class Routes extends PureComponent {
  render(): ReactNode {
    return (
      <Switch>
        {!localStorage.getItem('isLoggedIn') && (
          <AppRoute
            layout={GuestLayout}
            component={Login}
            path={APP_HOME_URL}
            exact
            pageTitle='Admin'
          />
        )}
        {localStorage.getItem('isLoggedIn') && (
          <ProtectedRoute
            layout={ProtectedLayout}
            component={AdminDashboard}
            path={APP_HOME_URL}
            exact
            pageTitle='Dashboard'
            section={OPERATIONS_SIDENAV}
          />
        )}
        <ProtectedRoute
          layout={ProtectedLayout}
          component={MemberConfiguratios}
          path={MEMBER_EXP_PAGE_URL}
          exact
          pageTitle='Member Experience'
          section={OPERATIONS_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={UserManagement}
          path={USER_MANAGEMENT_PAGE_URL}
          exact
          pageTitle='User Management'
          section={OPERATIONS_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Notifications}
          path={NOTIFICATION_PAGE_URL}
          exact
          pageTitle='Notifications'
          section={OPERATIONS_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Reports}
          path={REPORTS_PAGE_URL}
          exact
          pageTitle='Reports'
          section={OPERATIONS_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={ErrorAndAlerts}
          path={ERROR_AND_ALERTS_PAGE_URL}
          exact
          pageTitle='Error And Alerts'
          section={OPERATIONS_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={AppVersion}
          path={APP_VERSION_PAGE_URL}
          exact
          pageTitle='App Versions'
          section={OPERATIONS_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Configurations}
          path={MEMBER_EXP_CONFIGURATION_URL}
          exact
          pageTitle='Configurations'
          section={MEMBEREXPERIENCE_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={General}
          path={MEMBER_EXP_GENRAL_URL}
          exact
          pageTitle='General'
          section={MEMBEREXPERIENCE_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={MenuItems}
          path={MEMBER_EXP_MENU_URL}
          exact
          pageTitle='Menu Items'
          section={MEMBEREXPERIENCE_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Pages}
          path={MEMBER_EXP_PAGES_URL}
          exact
          pageTitle='Pages'
          section={MEMBEREXPERIENCE_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Branding}
          path={BRANDING_PAGE_URL}
          exact
          pageTitle='Branding'
          section={CONTENT_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Links}
          path={LINKS_PAGE_URL}
          exact
          pageTitle='Links'
          section={CONTENT_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={VirtualVisit}
          path={VIRTUAL_VISIT_PAGE_URL}
          exact
          pageTitle='Virtual Visits'
          section={CONTENT_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Sso}
          path={SSO_PAGE_URL}
          exact
          pageTitle='Sso'
          section={CONTENT_SIDENAV}
        />
        <ProtectedRoute
          layout={ProtectedLayout}
          component={Tiles}
          path={TILES_PAGE_URL}
          exact
          pageTitle='Tiles'
          section={CONTENT_SIDENAV}
        />
      </Switch>
    );
  }
}
