import React from 'react'
import HeaderSignupPage from '../component/headerSignupPage';
import { SignupKeeper } from './signupKeeper';
import ServicesSection from '../component/servicesSection';
import FeatureServices from '../component/featureServices';

const SignupPage = () => {
    return (
        <div>
            <HeaderSignupPage />
            <ServicesSection />
            <FeatureServices />
            <SignupKeeper />
        </div>
    )
}

export default SignupPage;