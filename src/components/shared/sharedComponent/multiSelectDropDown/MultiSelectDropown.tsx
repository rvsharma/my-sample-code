import React, { PureComponent } from 'react';

interface ownProps {
  data: any;
  disabled?: boolean;
  name?: string;
  onChange?: any;
  selectedData?: any[];
  key?: any;
}
interface ownState {
  onFocus: any;
  providerPrimaryCare: any;
  providerSpecialities: any;
  allChecked: boolean;
  test: boolean;
}

class MultiselectDropDown extends PureComponent<ownProps, ownState> {
  wrapperRef: any;

  original: any;

  constructor(props: ownProps) {
    super(props);
    this.state = {
      onFocus: false,
      providerPrimaryCare: props.selectedData ? props.selectedData : [],
      providerSpecialities: [],
      allChecked: false,
      test: false,
    };
    this.wrapperRef = React.createRef();
    this.original = [...props.data];
  }

  componentDidMount(): any {
    document.addEventListener('mousedown', this.handleClickOutside);
    const { disabled } = this.props;
    if (disabled) {
      this.setState({ providerPrimaryCare: [], providerSpecialities: [] });
    }
  }

  static getDerivedStateFromProps(props: any, state: any): any {
    if (state.disabled !== props.disabled) {
      return {
        disabled: props.disabled,
        providerPrimaryCare: [],
        providerSpecialities: [],
      };
    }
    return null;
  }

  componentWillUnmount(): any {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: any): void => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      // alert('You clicked outside of me!');
      this.setState({ onFocus: false });
    }
  };

  onChangeproviderPrimaryCare = (e: any): any => {
    const { onChange, name } = this.props;
    const { providerPrimaryCare, test } = this.state;
    const options = providerPrimaryCare;
    let index;
    if (e.target.checked) {
      providerPrimaryCare.push(e.target.value);
      this.setState({ test: !test, providerPrimaryCare });
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1);
      this.setState({ providerPrimaryCare: options });

      this.setState({ test: !test });
    }
    const allCheckeData = this.original.length === providerPrimaryCare.length;
    this.setState({ allChecked: allCheckeData });
    onChange(name, [...providerPrimaryCare]);
  };

  selectAll = (): any => {
    const { data, onChange, name } = this.props;
    const { allChecked, providerPrimaryCare } = this.state;
    if (allChecked) {
      this.setState({ providerPrimaryCare: [] }, () => {
        const allCheckeData = this.original.length === providerPrimaryCare.length;
        this.setState({ allChecked: !allCheckeData });
        onChange(name, []);
      });
    } else {
      this.setState({ providerPrimaryCare: data }, () => {
        const allCheckeData = this.original.length === providerPrimaryCare.length;
        this.setState({ allChecked: !allCheckeData });
        onChange(name, data);
      });
    }
  };

  getCheckedPrimaryCare = (name: string): boolean => {
    const { providerPrimaryCare } = this.state;
    const getData = providerPrimaryCare.filter((i: any) => i === name);
    if (getData.length > 0) {
      this.setState({ allChecked: this.original.length === providerPrimaryCare.length });
      return true;
    }
    return false;
  };

  getCheckedPrimaryCareSpecialities = (name: string): boolean => {
    const { providerSpecialities } = this.state;
    const getData = providerSpecialities.filter((i: any) => i === name);
    if (getData.length > 0) {
      return true;
    }
    return false;
  };

  getSelectedData = (): any => {
    const { providerPrimaryCare, providerSpecialities } = this.state;
    let primaryCare = '';
    let providerSpecialitiesString = '';
    providerPrimaryCare.forEach((element: any) => {
      primaryCare = primaryCare.concat(`${element},`);
    });
    providerSpecialities.forEach((element: any) => {
      providerSpecialitiesString = providerSpecialitiesString.concat(`${element},`);
    });
    primaryCare = primaryCare.slice(0, -1);
    providerSpecialitiesString = providerSpecialitiesString.slice(0, -1);
    return { primaryCare, providerSpecialitiesString };
  };

  onClear = (): any => {
    this.setState({ providerPrimaryCare: [], providerSpecialities: [], allChecked: false });
  };

  render(): React.ReactElement {
    const { onFocus, providerPrimaryCare, providerSpecialities, allChecked } = this.state;
    const { disabled, key, name } = this.props;
    const allData = [...providerPrimaryCare, ...providerSpecialities];
    return (
      <>
        <div
          className='multiselect custom-dark health-plan position-relative multiselect-dropdowns'
          ref={this.wrapperRef}>
          <div
            className='selectBox'
            onClick={() => !disabled && this.setState({ onFocus: !onFocus })}
            onKeyPress={() => !disabled && this.setState({ onFocus: !onFocus })}
            tabIndex={-1}
            role='button'>
            <select
              className='custom-dark health-plan form-select'
              id='select_healthplan'
              disabled={disabled}>
              {allData && allData.length === 0 ? (
                <option>Select here</option>
              ) : (
                <option>
                  {providerPrimaryCare &&
                  providerPrimaryCare.length > 0 &&
                  providerPrimaryCare.length === this.original.length
                    ? 'All'
                    : providerPrimaryCare.toString()}
                </option>
              )}
            </select>
            <div className='overSelect' />
          </div>
          <div id='checkboxes' className={`${onFocus ? 'd-block' : 'd-none'}`}>
            <div>
              <label htmlFor={key} className='mb-0'>
                <input
                  name={name}
                  type='checkbox'
                  id={key}
                  checked={allChecked}
                  onChange={() => this.selectAll()}
                />
                <span>All</span>
              </label>
              {this.original &&
                this.original.sort().map((i: any) => (
                  <label htmlFor={key} className='mb-0' key={key} style={{ height: 24 }}>
                    <input
                      type='checkbox'
                      checked={this.getCheckedPrimaryCare(i)}
                      id={i}
                      value={i}
                      onChange={this.onChangeproviderPrimaryCare}
                    />
                    <span>{i}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MultiselectDropDown;
