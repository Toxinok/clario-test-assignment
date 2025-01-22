'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HidePasswordIcon from '../icons/HidePasswordIcon';
import ShowPasswordIcon from '../icons/ShowPasswordIcon';

interface FormInputs {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, '8 characters or more')
    .matches(/[A-Z]/, 'Uppercase and lowercase letters')
    .matches(/[0-9]/, 'At least one digit')
    .matches(/^\S*$/, 'No spaces allowed')
    .required('Password is required'),
});

const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const password = watch('password', '');

  const validateRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    noSpaces: /^\S*$/.test(password),
  };

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };

  const isFieldValid = (field: 'email' | 'password'): boolean =>
    !errors[field] && !!touchedFields[field];
  const isFieldinvalid = (field: 'email' | 'password'): boolean =>
    !!errors[field];

  const getInputStyles = (
    field: 'email' | 'password'
  ) => `max-w-full w-full h-12 ${
    field === 'email' ? 'px-5' : 'pl-5 pr-12'
  } border rounded-lg placeholder:text-[#6F91BC] 
    focus:outline-none focus:border-[#6F91BC] focus:placeholder:text-[#4A4E71]
    ${
      isFieldinvalid(field) &&
      'focus:border-[#FF8080] border-[#FF8080] text-[#FF8080] bg-[#FDEFEE]'
    }
    ${
      isFieldValid(field) &&
      'focus:border-[#27B274] border-[#27B274] text-[#27B274] bg-[#fff]'
    }
    `;

  const getPasswordRulesColor = (isValid: boolean) => {
    if (!touchedFields.password && !isValid) return '#4A4E71';
    if (isValid) return '#27B274';
    else return '#FF8080';
  };

  const getPasswordIconColor = () => {
    if (!touchedFields.password && !isFieldValid('password')) return '#7C8696';
    if (isFieldValid('password')) return '#27B274';
    else return '#FF8080';
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[315px] flex flex-col items-center"
    >
      <h1 className="text-2xl font-bold text-[#4A4E71] mb-10">Sign up</h1>
      {/* Email Input */}
      <div className="w-full mb-5">
        <input
          id="email"
          type="email"
          {...register('email')}
          className={getInputStyles('email')}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-[#FF8080] text-xs mt-2 ml-5">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div className="relative w-full mb-10">
        <div className="relative w-full h-12 max-w-full">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={getInputStyles('password')}
            placeholder="Create your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute -translate-y-1/2 right-5 top-1/2"
          >
            {showPassword ? (
              <ShowPasswordIcon color={getPasswordIconColor()} />
            ) : (
              <HidePasswordIcon color={getPasswordIconColor()} />
            )}
          </button>
        </div>

        {/* Validation Rules */}
        <div className="mt-2 ml-5 space-y-1">
          <p
            className={`text-xs text-[${getPasswordRulesColor(
              validateRules.length
            )}]`}
          >
            8 characters or more (no spaces)
          </p>
          <p
            className={`text-xs text-[${getPasswordRulesColor(
              validateRules.uppercase
            )}]`}
          >
            Uppercase and lowercase letters
          </p>
          <p
            className={`text-xs text-[${getPasswordRulesColor(
              validateRules.digit
            )}]`}
          >
            At least one digit
          </p>
        </div>
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="font-semibold text-white"
        style={{
          width: '240px',
          height: '48px',
          background:
            'linear-gradient(110.46deg, rgba(112, 195, 255, 1), rgba(75, 101, 255, 1))',
          borderRadius: '30px',
        }}
      >
        Sign up
      </button>
    </form>
  );
};

export default AuthForm;
