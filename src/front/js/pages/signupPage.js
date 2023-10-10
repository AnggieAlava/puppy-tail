import React from 'react'
import HeaderSignupPage from '../component/headerSignupPage';
import { SignupKeeper } from './signupKeeper';
import ServicesList from '../component/servicesList';
import Steps from "../component/steps"
import FeatureServices from '../component/featureServices';
import "../../styles/signupPage.css"

const SignupPage = () => {
    return (
        <div className="signup-page">
            <HeaderSignupPage />
            {/* <ServicesList /> */}
            <FeatureServices />
            <Steps />
            <SignupKeeper />
        </div>
    )
}

export default SignupPage;