/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { GENERAL_HEADER_LABEL } from '../../../shared/constant/AppConstants';
import GrievancesAndAppeals from './GrievancesAndAppeals/GrievancesAndAppeals';
import NondiscriminationNotice from './NondiscriminationNotice/NondiscriminationNotice';
import PhoneNumbers from './PhoneNumbers/PhoneNumbers';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import TermsAndCondition from './TermsAndCondition/TermsAndCondition';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';

export default class General extends PureComponent {
  sectionList: string[] = [
    GENERAL_HEADER_LABEL.GRIEVANCES_APPEALS_LBL,
    GENERAL_HEADER_LABEL.TERMS_AND_CONDITION_LBL,
    GENERAL_HEADER_LABEL.PRIVACY_POLICY_LBL,
    GENERAL_HEADER_LABEL.NONDISCRIMINATION_NOTICE_LBL,
    GENERAL_HEADER_LABEL.PHONE_NUMBERS_LBL,
    GENERAL_HEADER_LABEL.WELCOME_MESSAGE_LBL,
  ];

  getComponent = (type: string): any => {
    const componentArray = [];
    if (type === GENERAL_HEADER_LABEL.GRIEVANCES_APPEALS_LBL) {
      componentArray.push(<GrievancesAndAppeals />);
    }
    if (type === GENERAL_HEADER_LABEL.TERMS_AND_CONDITION_LBL) {
      componentArray.push(<TermsAndCondition />);
    }
    if (type === GENERAL_HEADER_LABEL.PRIVACY_POLICY_LBL) {
      componentArray.push(<PrivacyPolicy />);
    }
    if (type === GENERAL_HEADER_LABEL.NONDISCRIMINATION_NOTICE_LBL) {
      componentArray.push(<NondiscriminationNotice />);
    }
    if (type === GENERAL_HEADER_LABEL.PHONE_NUMBERS_LBL) {
      componentArray.push(<PhoneNumbers />);
    }
    if (type === GENERAL_HEADER_LABEL.WELCOME_MESSAGE_LBL) {
      componentArray.push(<WelcomeMessage />);
    }

    return componentArray;
  };

  render(): React.ReactElement {
    return (
      <>
        {this.sectionList.map((name: any, index: number) => (
          <div className='collapse-directive white-panel pt-2 general'>
            <div className='row'>
              <div className='accordion px-0' id={`generalAccordion${index}`}>
                <div className='accordion-item border-0'>
                  <h2 className='accordion-header p-0 mb-0' id='headingOne'>
                    <button
                      className='accordion-button pt-2 pb-2'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target={`#collapseOne${index}`}
                      aria-expanded='false'
                      aria-controls={`collapseOne${index}`}>
                      <h2 className='mb-0 col'>{name}</h2>
                    </button>
                  </h2>
                </div>

                <div
                  id={`collapseOne${index}`}
                  className='accordion-collapse collapse hide'
                  aria-labelledby={`headingOne${index}`}
                  data-bs-parent={`#generalAccordion${index}`}>
                  <div className='accordion-body px-0 pt-0'>{this.getComponent(name)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}
