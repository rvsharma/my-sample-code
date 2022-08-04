/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export interface IProps extends RouteProps {
  component: any;
  layout: React.ComponentClass<any>;
  pageTitle?: string;
  section: string;
}

export const ProtectedRoute = ({
  component: Component,
  layout: Layout,
  pageTitle,
  section,
  ...rest
}: IProps): React.ReactElement => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('isLoggedIn')) {
          return (
            <Layout title={pageTitle} section={section}>
              <Helmet>
                <title>{pageTitle}</title>
              </Helmet>
              <Component {...props} />
            </Layout>
          );
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
