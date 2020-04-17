// <input /> with icon gets rendered as following

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function InputIconField({ // deconstructing props {  }
  placeholder,
  name,
  value,
  onChange,
  error,
  icon
}) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

// when TextField Group component is loaded, below should be given so that component can land successfully
InputIconField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

// default type as "text"
InputIconField.defaultProps = {
  type: 'text'
}

