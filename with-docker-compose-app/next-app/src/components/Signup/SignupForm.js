import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import PasswordForm from './ChoosePwd';
import SideBarDesktop from './SideBar/SideBarDesktop';

function SignupForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // envoyer les données
  };

  switch (step) {
    case 1:
      return (
        <>
            <div className='col-4'>
                <SideBarDesktop  step={step} />
            </div>
            <div className='col-8'>
                <PersonalInfo
                        nextStep={nextStep}
                        formData={formData}
                        setFormData={setFormData}
                />
            </div>
        </> 
      );
    case 2:
      return (
        <>
            <div className='col-4'>
                    <SideBarDesktop  step={step} />
            </div>
            <div className='col-8'>
                <form onSubmit={handleSubmit}>
                <PasswordForm
                    prevStep={prevStep}
                    formData={formData}
                    setFormData={setFormData}
                />
                </form>
            </div>
        </>
      );
    default:
      return <h3>Invalid Step</h3>;
  }
};

export default SignupForm;
