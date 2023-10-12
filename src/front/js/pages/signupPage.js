import React from 'react'
import HeaderSignupPage from '../component/headerSignupPage';
import { SignupKeeper } from './signupKeeper';
import Steps from "../component/steps"
import FeatureServices from '../component/featureServices';
import "../../styles/signupPage.css"
import FooterSignupPage from '../component/footerSignupPage';

const SignupPage = () => {
    return (
        <div className="signup-page">
            <HeaderSignupPage />
            <FeatureServices />
            <Steps />
            <SignupKeeper />
            <FooterSignupPage />
        </div>
    )
}

export default SignupPage;