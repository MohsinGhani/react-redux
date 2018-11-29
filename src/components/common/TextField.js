import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


class MdTextField extends React.Component {
    render() {
        let { name, placeholder, value, info, error, type, onChange, disabled, multiline, required } = this.props
        return (
            <TextField
                id="full-width"
                label={placeholder}
                name={name}
                placeholder={placeholder}
                helperText={info}
                multiline={multiline}
                rows={multiline ? 3 : 1}
                type={type}
                value={value}
                error={error}
                onChange={onChange}
                disabled={disabled}
                margin="normal"
                required={required}
                fullWidth
            />
        );
    }
}

MdTextField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.bool,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    required: PropTypes.bool,
};

MdTextField.defaultProps = {
    type: 'text',
    error: false,
    disabled: false,
    multiline: false,
    required: false,
};

export default withStyles({})(MdTextField);