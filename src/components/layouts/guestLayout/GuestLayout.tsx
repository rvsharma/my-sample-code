import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IProps {
  children: any;
}

type Props = IProps & RouteComponentProps<any>;

export default class GuestLayout extends React.PureComponent<Props, {}> {
  public render(): JSX.Element {
    const { children } = this.props;
    return (
      <div id='guestLayout' className='layout'>
        <div>{children}</div>
      </div>
    );
  }
}
