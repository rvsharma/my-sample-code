import React, { useEffect, useState } from 'react';
import {
  APP_VERSIONS_LBL,
  BRANDING_LBL,
  CONFIGURATIONS_LBL,
  CONTENT_LBL,
  CONTENT_SIDENAV,
  ERRORS_ALERTS_LBL,
  GENERAL_LBL,
  LINKS_LBL,
  MEMBEREXPERIENCE_SIDENAV,
  MEMBER_EXP_LBL,
  MENU_ITEMS_LBL,
  NAVMENUVARS,
  NOTIFICATIONS_LBL,
  OPERATIONS_LBL,
  OPERATIONS_SIDENAV,
  PAGES_LBL,
  REPORTS_LBL,
  SSO_LBL,
  TILES_LBL,
  USER_MANAGEMENT_LBL,
  VIRTUAL_VISIT_LBL,
} from '../../shared/constant/AppConstants';
import {
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
} from '../../shared/constant/Urls';
import { history } from '../../shared/helperMethods/HelperMethod';
import image from '../../shared/utils/Images';

interface ownProps {
  section?: string;
}

export default function NavMenu({ section }: ownProps): JSX.Element {
  const [selectedMenu, setSelectedMenu] = useState(LINKS_PAGE_URL);

  const handleDocumentClick = (): any => {
    setTimeout(() => setSelectedMenu(window.location.pathname.split('/')[2]), 100);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, true);
    setSelectedMenu(window.location.pathname.split('/')[2]);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  });

  return (
    <div>
      <div className='logo-container'>
        <a href='https://www.canopyhealth.com/en.html' target='_blank' rel='noreferrer'>
          <img src={image.canopyDesktop} className='img-logo-canopy-white' alt='canopy' />
        </a>
      </div>
      <div>
        <div className='accordion d-nsone' id='accordionExample'>
          <div className='accordion-item'>
            <h2 className='accordion-header' id='adminoperationcollapse'>
              <button
                className={`accordion-button ${section !== OPERATIONS_SIDENAV && 'collapsed'}`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseOne'
                aria-expanded={section === OPERATIONS_SIDENAV && 'true'}
                aria-controls='collapseOne'>
                {OPERATIONS_LBL}
              </button>
            </h2>
            <div
              id='collapseOne'
              className={`accordion-collapse accordion-body-before collapse ${
                section === OPERATIONS_SIDENAV && 'show'
              } `}
              aria-labelledby='headingOne'
              data-bs-parent='#accordionExample'>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.MEMBER_EXP_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(MEMBER_EXP_PAGE_URL)}>
                {MEMBER_EXP_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.USER_MANAGEMENT_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(USER_MANAGEMENT_PAGE_URL)}>
                {USER_MANAGEMENT_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.NOTIFICATION_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(NOTIFICATION_PAGE_URL)}>
                {NOTIFICATIONS_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.REPORTS_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(REPORTS_PAGE_URL)}>
                {REPORTS_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.ERROR_ALERTS_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(ERROR_AND_ALERTS_PAGE_URL)}>
                {ERRORS_ALERTS_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.APP_VERSION_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(APP_VERSION_PAGE_URL)}>
                {APP_VERSIONS_LBL}
              </button>
            </div>
          </div>

          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingTwo'>
              <button
                className={`accordion-button ${
                  section !== MEMBEREXPERIENCE_SIDENAV && 'collapsed'
                }`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseTwo'
                aria-expanded={section === MEMBEREXPERIENCE_SIDENAV && 'true'}
                aria-controls='collapseTwo'>
                {MEMBER_EXP_LBL?.toUpperCase()}
              </button>
            </h2>
            <div
              id='collapseTwo'
              className={`accordion-collapse accordion-body-before collapse ${
                section === MEMBEREXPERIENCE_SIDENAV && 'show'
              } `}
              aria-labelledby='headingTwo'
              data-bs-parent='#accordionExample'>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.CONFIG_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(MEMBER_EXP_CONFIGURATION_URL)}>
                {CONFIGURATIONS_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.GENERAL_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(MEMBER_EXP_GENRAL_URL)}>
                {GENERAL_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.MENUITEM_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(MEMBER_EXP_MENU_URL)}>
                {MENU_ITEMS_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.PAGES_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(MEMBER_EXP_PAGES_URL)}>
                {PAGES_LBL}
              </button>
            </div>
          </div>

          <div className='accordion-item'>
            <h2 className='accordion-header' id='headingThree'>
              <button
                className={`accordion-button ${section !== CONTENT_SIDENAV && 'collapsed'}`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseThree'
                aria-expanded={section === CONTENT_SIDENAV && 'true'}
                aria-controls='collapseThree'>
                {CONTENT_LBL}
              </button>
            </h2>
            <div
              id='collapseThree'
              className={`accordion-collapse accordion-body-before collapse ${
                section === CONTENT_SIDENAV && 'show'
              } `}
              aria-labelledby='headingThree'
              data-bs-parent='#accordionExample'>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.BRANDING_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(BRANDING_PAGE_URL)}>
                {BRANDING_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.LINKS_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(LINKS_PAGE_URL)}>
                {LINKS_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.VIRTUAL_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(VIRTUAL_VISIT_PAGE_URL)}>
                {VIRTUAL_VISIT_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${selectedMenu === NAVMENUVARS.SSO_VAR ? 'active' : ''}`}
                onClick={() => history.push(SSO_PAGE_URL)}>
                {SSO_LBL}
              </button>
              <button
                type='button'
                className={`accordion-body ${
                  selectedMenu === NAVMENUVARS.TILES_VAR ? 'active' : ''
                }`}
                onClick={() => history.push(TILES_PAGE_URL)}>
                {TILES_LBL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
