import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const Footer = () => {
    const dispatch = useDispatch();

    return (
        <footer>
            <ul className="l-footer">
                <li onClick={dispatch(push())}>利用規約</li>
                <li onClick={dispatch(push())}>プライバシーポリシー</li>
                <li onClick={dispatch(push())}>お問い合わせ</li>
                <li>Copyright &copy; 2025 ono02</li>
            </ul>
        </footer>
    );
};

export default Footer;
