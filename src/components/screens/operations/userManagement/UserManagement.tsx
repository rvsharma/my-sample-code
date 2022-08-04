// import axios from 'axios';
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GridView from '../../../shared/sharedComponent/tableGrid/GridView';
import { InputField } from '../../../shared/sharedComponent/tableGrid/InputField';
import TableCells from '../../../shared/sharedComponent/tableGrid/TableCells';
import { UserManagementCell } from './Cells';
import * as actions from '../../../../redux/screens/common/CommonActions';
import UserConfirmModal from './UserConfirmModal';
import {
  FAILED_EMAIL_TEXT,
  // FAILED_MFA_TEXT,
  FAILED_PASSWORD_TEXT,
  FAILED_USERNAME_TEXT,
  // CONFIRM_DOB_LBL,
  FORGOT_USERNAME_LBL,
  NOT_MATCHED_DOB,
  RESET_MFA_LBL,
  RESET_PASSWORD_LBL,
  SUCCESS_EMAIL_TEXT,
  SUCCESS_MFA_TEXT,
  // SUCCESS_PASSWORD_TEXT,
  // SUCCESS_USERNAME_TEXT,
  // UPDATE_USER_EMAIL,
  UPDATE_EMAIL_LBL,
} from '../../../shared/constant/AppConstants';
import {
  FETCH_CONTENT_DATA_COUNT,
  FETCH_USERS_DATA,
  UPDATE_USER_DATA,
  USER_FORGOT_PASSWORD,
  // FETCH_USERS_DATA_COUNT,
  USER_MFA_FACTOR_RESET,
  USER_RECOVER_USERNAME,
} from '../../../../redux/services/Apis';
import Tabs from '../../../shared/sharedComponent/tabs/Tabs';
// import UserDOBModal from './UserDOBModal';
import EnterDOB from './EnterDOB';
import UserMessageModal from './UserMessageModal';
import AdminSearch from '../../../shared/sharedComponent/adminSearch/AdminSearch';

// let initialDataState = {
//   skip: 1,
//   take: 10,
// };

let emailInfo = { skip: 1, take: 10 };
let pageInfo = { skip: 1, take: 10 };
let isEmailUsed = false;
export default function UserManagement(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [rowDataItem, setRowData]: any = useState();
  // const [searchedEmail, setSearchedEmail] = useState([] as any);
  // const [dataState, setPageLimit] = useState(initialDataState);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [tableData, setTableData] = useState([] as any);
  const [dobModal, showDobModal] = useState(false);
  const [confirmModal, showConfirmModal] = useState(false);
  const [messageModal, showMessageModal] = useState(false);
  const [userAction, setUserAction] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const dispatch = useDispatch();

  const onGetUserManagement = (additionalParam: any): any => {
    setLoading(true);
    // console.log('get users');

    const usersData: any = [];
    const getUserParam = additionalParam ? `&query=${additionalParam}` : ``;
    const countUserParam = additionalParam ? `&queryUser=${additionalParam}` : ``;

    const queryString = `?environment=${selectedFilter}&page=${pageInfo.skip}&limit=${pageInfo.take}${getUserParam}`;

    // console.log(queryString);

    dispatch(
      actions.createGetDataRequest(
        queryString,
        (res: any) => {
          // console.log(res?.data);
          if (res?.isSuccess) {
            Object.entries(res?.data).forEach((key, index) => {
              const employeeObject: any = key[1];
              const { _id, environment, oktaId } = employeeObject;
              const empEmail = employeeObject?.email ? employeeObject.email : 'No email';
              // console.log(employeeObject);
              const { memberId, firstName, lastName, phones, dateOfBirth } = employeeObject?.empi;
              const phoneNumber = phones?.home ? phones?.home : 'No phone number';
              // console.log(memberId);
              usersData.push({
                id: index,
                _id,
                memberId,
                firstName,
                lastName,
                phoneNumber,
                emailAddress: empEmail,
                environment,
                oktaId,
                dateOfBirth,
              });
            });

            // console.log(usersData);
            setTableData(usersData);
            setLoading(false);
          }
        },
        FETCH_USERS_DATA
      )
    );

    const countQueryStr = `?type=operation&subtype=user-management&environment=${selectedFilter}${countUserParam}`;
    dispatch(
      actions.createGetDataCountRequest(
        countQueryStr,
        (res: any) => {
          if (res?.isSuccess) {
            // console.log('test');
            // console.log('Total Records ', res?.data?.length);
            setTotalCount(res?.data?.totalRecords);
          }
        },
        FETCH_CONTENT_DATA_COUNT
      )
    );
  };

  useEffect(() => {
    onGetUserManagement('');

    return () => {
      setSelectedFilter('All');
      setSearchText('');
      setRowData();
      setUserAction('');
      showConfirmModal(false);
      setLoading(false);
      setTotalCount(0);
      setTableData([]);
      showDobModal(false);
      setUserTitle('');
      setUserMessage('');
    };
  }, []);

  useEffect(() => {
    onGetUserManagement(searchText || ``);
  }, [selectedFilter]);

  const onDataStateChange = (data: any): void => {
    pageInfo = { skip: data?.skip, take: data?.take };
    onGetUserManagement(searchText || ``);
  };

  const onSearchUser = (text: string): void => {
    setSearchText(text);
    pageInfo = { skip: 1, take: 10 };

    if (text === '') {
      onGetUserManagement(``);
    } else {
      onGetUserManagement(text);
    }
  };

  const onChooseEdit = (dataItem: any): any => {
    setRowData({ ...dataItem });

    const lob = tableData.map((item: any) =>
      item.id === dataItem.id ? { ...item, inEdit: true } : { ...item, inEdit: false }
    );

    setTableData(lob);
  };

  const onResetMFA = (props: any): any => {
    // console.log('onResetMFA usermanagement', props);
    setUserAction(RESET_MFA_LBL);
    setRowData(props);
    showMessageModal(false);
    showConfirmModal(true);
  };

  const onForgotUsername = (props: any): any => {
    // console.log('onForgotUsername usermanagement', props);
    setUserAction(FORGOT_USERNAME_LBL);
    setRowData(props);
    showMessageModal(false);
    showConfirmModal(true);
  };

  const onResetPassword = (props: any): any => {
    // console.log('onResetPassword usermanagement', props);userModalData = {
    setUserAction(RESET_PASSWORD_LBL);
    setRowData(props);
    showMessageModal(false);
    showConfirmModal(true);
  };

  const onClickedEditSave = (): void => {
    setUserAction(UPDATE_EMAIL_LBL);
    showConfirmModal(true);
  };

  const closeConfirmModalHandler = (): void => {
    showMessageModal(false);
    showConfirmModal(false);
    // setUserAction('');
    showDobModal(false);
  };

  const confirmModalHandler = (): void => {
    showConfirmModal(false);
    showMessageModal(false);
    showDobModal(true);
  };

  const resetEmailHandler = (): any => {
    showDobModal(false);
    showConfirmModal(false);
    showMessageModal(false);

    const userDataInfo = {
      oktaUserId: rowDataItem?.oktaId,
      environment: rowDataItem?.environment,
      profile: {
        // phoneNumber: rowDataItem?.empi.phones.home,
        email: rowDataItem?.emailAddress,
      },
    };

    dispatch(
      actions.createUpdateDataRequest(UPDATE_USER_DATA, userDataInfo, (res: any) => {
        if (res?.isSuccess) {
          // console.log(res?.data);
          onGetUserManagement(searchText || ``);
          setUserTitle('Success');
          setUserMessage(SUCCESS_EMAIL_TEXT);
        } else {
          setUserTitle('Failed');
          setUserMessage(FAILED_EMAIL_TEXT);
        }
      })
    );
    showMessageModal(true);
  };

  const resetMFAHandler = (): any => {
    // console.log(rowDataItem);

    showDobModal(false);
    showConfirmModal(false);
    showMessageModal(false);

    const userMFAResetData = {
      userId: rowDataItem?._id,
      environment: rowDataItem?.environment,
    };

    dispatch(
      actions.createAddNewDataRequest(USER_MFA_FACTOR_RESET, userMFAResetData, (res: any) => {
        if (res?.isSuccess) {
          // console.log(res?.data);
          setUserTitle('Success');
          setUserMessage(SUCCESS_MFA_TEXT);
        } else {
          setUserTitle('Failed');
          setUserMessage(res?.data?.message);
        }
      })
    );

    showMessageModal(true);
  };

  const forgotPasswordHandler = (): any => {
    showDobModal(false);
    showConfirmModal(false);
    showMessageModal(false);

    const userForgotPswdData = {
      usernameEmail: rowDataItem?.emailAddress,
      environment: rowDataItem?.environment,
    };

    dispatch(
      actions.createAddNewDataRequest(USER_FORGOT_PASSWORD, userForgotPswdData, (res: any) => {
        if (res?.isSuccess) {
          // console.log(res?.data);
          const userPswdMessage = `Email has been sent to ${rowDataItem?.emailAddress} with instructions on resetting your password`;
          setUserTitle('Please check your email');
          setUserMessage(userPswdMessage);
        } else {
          setUserTitle('Failed');
          setUserMessage(FAILED_PASSWORD_TEXT);
        }
      })
    );

    showMessageModal(true);
  };

  const recoverUsernameHandler = (): any => {
    // console.log(rowDataItem);
    showDobModal(false);
    showConfirmModal(false);
    showMessageModal(false);

    const recoverUsernameData = {
      email: rowDataItem?.emailAddress,
      environment: rowDataItem?.environment,
    };

    dispatch(
      actions.createAddNewDataRequest(USER_RECOVER_USERNAME, recoverUsernameData, (res: any) => {
        if (res?.isSuccess) {
          // console.log(res?.data);
          setUserTitle('Please check your email');
          setUserMessage('We have sent you a message with your username.');
        } else {
          setUserTitle('Failed');
          setUserMessage(FAILED_USERNAME_TEXT);
        }
      })
    );
    showMessageModal(true);
  };

  const onGetAllEmails = (searchEmail: any): void => {
    const allEmailsData: any = [];
    const queryString = `?environment=${selectedFilter}&page=${emailInfo.skip}&limit=${emailInfo.take}&query=${searchEmail}`;

    // console.log(queryString);

    dispatch(
      actions.createGetDataRequest(
        queryString,
        (res: any) => {
          // console.log(res?.data);
          if (res?.isSuccess) {
            Object.entries(res?.data).forEach((key) => {
              const employeeObject: any = key[1];
              const { _id } = employeeObject;
              const empEmail = employeeObject?.email ? employeeObject.email : null;
              allEmailsData.push({ _id, emailAddress: empEmail });
            });

            const emailExist = allEmailsData.filter(
              (item: any) =>
                item.emailAddress.trim().toLowerCase() ===
                rowDataItem.emailAddress.trim().toLowerCase()
            )[0];

            if (emailExist) {
              if (emailExist._id === rowDataItem._id) {
                isEmailUsed = false;
              } else {
                isEmailUsed = true;
              }
            } else {
              isEmailUsed = false;
            }

            if (isEmailUsed) {
              const userEmailMessage = `Email id ${rowDataItem.emailAddress} has already been used please use a different one.`;
              setUserTitle('Email already used');
              setUserMessage(userEmailMessage);
              showMessageModal(true);
            } else {
              resetEmailHandler();
            }
          }
        },
        FETCH_USERS_DATA
      )
    );
  };

  const actionUpdateHandler = (memberDob: any): any => {
    // console.log('Selected member dob is ', memberDob);
    // console.log(rowDataItem);
    showMessageModal(false);
    setUserTitle('');
    setUserMessage('');

    const memberDobFullDate = new Date(memberDob);
    const memberDobYear = memberDobFullDate.getFullYear().toString();
    const memberDobMonth = memberDobFullDate.getMonth() + 1;
    const memberDobDate = memberDobFullDate.getDate();

    const memberDobStringMonth = memberDobMonth <= 9 ? `0${memberDobMonth}` : memberDobMonth;

    const memberDobStringDate = memberDobDate <= 9 ? `0${memberDobDate}` : memberDobDate;

    const selectedMemberDob = memberDobYear + memberDobStringMonth + memberDobStringDate;
    const actualMemberDob = rowDataItem?.dateOfBirth;

    // console.log('Actual Dob ', actualMemberDob);
    // console.log('Selected Dob ', selectedMemberDob);

    if (selectedMemberDob === actualMemberDob) {
      if (userAction === UPDATE_EMAIL_LBL) {
        emailInfo = { skip: 1, take: totalCount };
        onGetAllEmails(rowDataItem.emailAddress);
      }

      if (userAction === RESET_PASSWORD_LBL) {
        forgotPasswordHandler();
      }

      if (userAction === FORGOT_USERNAME_LBL) {
        recoverUsernameHandler();
      }

      if (userAction === RESET_MFA_LBL) {
        resetMFAHandler();
      }
    } else {
      showDobModal(false);
      setUserTitle('Failed');
      setUserMessage(NOT_MATCHED_DOB);
      showMessageModal(true);
    }
  };

  // const onCancelEdit = (): any => {
  //   // console.log('onEdit usermanagement', dataItem);
  //   // const lob = tableData.map((item: any) =>
  //   //   item.memberId === dataItem.memberId ? { ...item, inEdit: true } : item
  //   // );
  //   // const lob = tableData.map((item: any) =>
  //   //   item.id === dataItem.id ? { ...item, inEdit: false } : item
  //   // );
  //   // setTableData(lob);

  //   // pageInfo = { skip: pageInfo.skip, take: pageInfo.take };
  //   // setPageInfo({ skip: pageInfo.skip, take: pageInfo.take });
  //   onGetUserManagement(searchText || ``);
  // };

  const onEditUpdateData = (value: any, props: any): any => {
    // console.log(value);
    // console.log('updated dtata', props);
    setRowData({
      ...props?.dataItem,
      emailAddress: value.trim(),
    });

    const data = tableData?.map((item: any) =>
      item.id === props.dataItem.id ? { ...item, [props.field]: value.trim() } : item
    );

    setTableData(data);
  };

  // const itemChange = (dataItem: any): void => {
  //   // setRowData(dataItem);
  //   console.log('data on Change', dataItem);
  // };

  const dobModalCloseHandler = (): void => {
    showMessageModal(false);
    showConfirmModal(false);
    showDobModal(false);
  };

  const userMsgCloseModalHandler = (): void => {
    showMessageModal(false);
    showConfirmModal(false);
    if (userTitle === 'Failed' || userTitle === 'Email already used') {
      showDobModal(true);
    } else {
      showDobModal(false);
    }
  };

  return (
    <>
      <div className='col-12 member-signup-container shadow'>
        <div className='row'>
          <div className='col-12 member-signup-text'>User management</div>
        </div>

        <div className='row my-4 align-items-center'>
          <AdminSearch
            placeholder='Search by user name, membership Id, email address'
            onSearch={(t: string) => onSearchUser(t)}
          />
          <div className='col-12 col-sm-6 col-md-8 mt-3 mt-sm-0'>
            <label className='col-12 pb-0 mb-0 text-end' htmlFor='info'>
              <span className='accelerationmark font-family-fontawesome' />
              <span className='text-black fw-normal ms-2'>
                Please keep the DOB handy of the user to perform any action
              </span>
            </label>
          </div>
        </div>
        <Tabs
          data={[
            { title: 'All', value: 'all' },
            { title: 'Production', value: 'prod' },
            { title: 'Stage', value: 'stage' },
            { title: 'QA', value: 'qa' },
            { title: 'Dev', value: 'dev' },
          ]}
          active={selectedFilter}
          onSelect={(data: any) => setSelectedFilter(data)}
        />
        <GridView
          pagination
          dataState={pageInfo}
          // onItemChange={(data: any) => itemChange(data)}
          total={totalCount}
          loading={loading}
          data={tableData}
          onDataStateChange={onDataStateChange}>
          <TableCells field='memberId' title='Member Id' type='text' />
          <TableCells field='firstName' title='First Name' type='text' />
          <TableCells field='lastName' title='Last Name' type='text' />
          <TableCells field='phoneNumber' title='Phone Number' type='text' />
          <TableCells
            field='emailAddress'
            title='Email Address'
            type='text'
            cell={(props: any) =>
              InputField({
                dataItem: props?.dataItem,
                field: props?.field,
                updateState: onEditUpdateData,
              })
            }
          />
          <TableCells
            field='actions'
            title='Action'
            cell={(props: any) =>
              UserManagementCell({
                dataItem: props?.dataItem,
                onChooseEdit,
                onResetPassword,
                onForgotUsername,
                onResetMFA,
                onClickedEditSave,
                // onCancelEdit,
              })
            }
          />
        </GridView>
      </div>

      {dobModal && <EnterDOB onConfirmDOB={actionUpdateHandler} onClose={dobModalCloseHandler} />}

      {confirmModal && (
        <UserConfirmModal
          action={userAction}
          show
          onClose={closeConfirmModalHandler}
          onOK={confirmModalHandler}
        />
      )}

      {messageModal && userTitle !== '' && userMessage !== '' && (
        <UserMessageModal
          userTitle={userTitle}
          userMessage={userMessage}
          onOK={userMsgCloseModalHandler}
        />
      )}
    </>
  );
}
