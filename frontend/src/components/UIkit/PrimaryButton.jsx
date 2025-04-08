import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const PrimaryButton = (props) => {
    const { label, onClick, color, disabled } = props;
    return (
        <StyledButton
            variant="contained"
            color={color ? color : "primary"}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </StyledButton>
    );
};

export default PrimaryButton;
