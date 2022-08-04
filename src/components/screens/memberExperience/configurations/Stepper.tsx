import React from 'react';

interface ownProps {
  step: number;
  isEdit?: boolean;
}

export default function Stepper({ step, isEdit }: ownProps): JSX.Element {
  return (
    <>
      <div className='col-12 member-signup-container shadow py-2'>
        <div className='container stepper'>
          <div className='row'>
            <div className='col-12 member-signup-text mt-3'>
              {isEdit ? 'Edit Configuration' : 'New Configuration'}
            </div>
          </div>

          <div className='row'>
            <div className={`step col ${step <= 4 && 'completed'}`}>
              <button type='button' className='v-stepper w-100'>
                <div className='circle col-auto'>
                  <span className='number'>2</span>
                  <span className='icon' />
                </div>
                <div className='line w-96' />
              </button>
            </div>
            <div className={`step col ${step > 1 && step <= 4 && 'completed'}`}>
              <button type='button' className='v-stepper w-100'>
                <div className='circle col-auto'>
                  <span className='number'>2</span>
                  <span className='icon' />
                </div>
                <div className='line w-96' />
              </button>
            </div>
            <div className={`step col ${step > 2 && step <= 4 && 'completed'}`}>
              <button type='button' className='v-stepper w-100'>
                <div className='circle col-auto'>
                  <span className='number'>3</span>
                  <span className='icon' />
                </div>
                <div className='line w-96' />
              </button>
            </div>
            <div className={`step col ${step === 4 && 'completed'}`}>
              <button type='button' className='v-stepper w-100'>
                <div className='circle col-auto'>
                  <span className='number'>4</span>
                  <span className='icon' />
                </div>
                <div className='line w-96' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
