import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const StyledFooter = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(3, 0),
    marginTop: theme.spacing(4),
}));

const Footer = () => {
    const navigate = useNavigate();

    const handleTermsOfServiceClick = () => {
        navigate('/termsofservice');
    };

    const handlePrivacyPolicyClick = () => {
        navigate('/privacypolicy');
    };

    const handleInquiryFormClick = () => {
        navigate('/inquiryform');
    };

    return (
        <StyledFooter>
            <Container maxWidth="md">
                <Box display="flex" justifyContent="space-around" alignItems="center">
                    <Link component="button" variant="body2" onClick={handleTermsOfServiceClick}>
                        利用規約
                    </Link>
                    <Link component="button" variant="body2" onClick={handlePrivacyPolicyClick}>
                        プライバシーポリシー
                    </Link>
                    <Link component="button" variant="body2" onClick={handleInquiryFormClick}>
                        お問い合わせ
                    </Link>
                </Box>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
                    Copyright &copy; 2025 ono02
                </Typography>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
