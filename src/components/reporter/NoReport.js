import React from 'react';

const NoReport = (props) => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <p
        id='noReport'
        className={
          props.anonymous?
          'yellow text-center':
          'text-center reportHeader'
        }
      > You Do not have any report yet !!!</p>
    </div>
  );
}

export default NoReport;
