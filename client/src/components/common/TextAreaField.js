import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export default function TextAreaField({
  type,
  placeholder,
  value,
  name,
  onChange,
  error 
}) {
  return (
    <div className="form-group">
      <textarea
        type={type}
        className={classnames("form-control form-control-lg", { "is-invalid": error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

TextAreaField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

// default type as "text"
TextAreaField.defaultProps = {
  type: 'text'
}

