import * as React from 'react';
import NavMenu from '../header/NavMenu';
import AdminHeader from '../header/header';

interface IProps {
  children?: React.ReactNode;
  section?: string;
}

class ProtectedLayout extends React.PureComponent<IProps, {}> {
  public render(): React.ReactElement {
    const { children, section } = this.props;

    return (
      <div>
        <div id='highlight-line' />
        {/* Mobile-menu */}
        {/* Mobile-menu */}
        <div id='main-container'>
          <div id='sidebar'>
            <div className='row'>
              <div className='col-12 navigation'>
                <NavMenu section={section} />
              </div>
            </div>
          </div>
          <div id='content'>
            <AdminHeader />
            <div className='scrolling-content'>
              <div className='row'>
                <div id='view' className='isLoggedIn'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProtectedLayout;
