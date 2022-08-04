/* eslint-disable react/jsx-props-no-spreading */
import { Route, RouteProps } from 'react-router';
import * as React from 'react';
import { Helmet } from 'react-helmet';

export interface IProps extends RouteProps {
  component: any;
  layout: React.ComponentClass<any>;
  pageTitle?: string;
}

export const AppRoute = ({
  component: Component,
  layout: Layout,
  pageTitle,
  ...rest
}: IProps): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Helmet>
            <title>{pageTitle}</title>
          </Helmet>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
