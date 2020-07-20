import React from 'react'

const FormErrors = ({formErrors}) => {
    return(
      <div className='formErrors'>
        <ul>
          {
            Object.keys(formErrors).map((fieldName, i) => {
              if(formErrors[fieldName].length > 0){
                return (
                  <li key={i}>{formErrors[fieldName]}</li>
                )
              }
            })
          }
        </ul>
      </div>
    )
  }
  
  export default FormErrors