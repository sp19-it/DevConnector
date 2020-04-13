// <input /> gets rendered as following

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function TextFieldGroup({ // deconstructing props {  }
  type,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  error,
  info
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", { "is-invalid": error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <small className="form-text text-muted">{info}</small>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

// when TextField Group component is loaded, below should be given so that component can land successfully
TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string
}

// default type as "text"
TextFieldGroup.defaultProps = {
  type: 'text'
}

