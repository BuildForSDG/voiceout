import React from 'react';

const NoReport = (props) => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <p
        className={
          props.anonymous?
          'yellow text-center':
          'text-center reportHeader'
        }
        style={{
          fontSize: '50px',
          paddingBottom: '100px'
        }}> You Do not have any report yet !!!</p>
    </div>
  );
}

export default NoReport;
