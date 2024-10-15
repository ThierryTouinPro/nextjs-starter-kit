import Buttons from '../Interface/Buttons';
import styles from './css/ChoosePwd.module.css';
import { useState } from 'react';

function PasswordForm({ prevStep, formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.formContainer}>
      <h3>Set Password</h3>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <Buttons label="Back" mode="primary" onClick={prevStep}/>
        <Buttons label="Submit" mode="secondary" type="submit"/>
      </div>
    </div>
  );
};

export default PasswordForm;
