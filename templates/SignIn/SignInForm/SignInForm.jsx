import { useContext, useState } from 'react';

import { Grid, Link, useTheme } from '@mui/material';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import { FormContainer } from 'react-hook-form-mui';
import { useDispatch } from 'react-redux';

import AuthTextField from '@/components/AuthTextField';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

import sharedStyles from '@/styles/shared/sharedStyles';

import { AUTH_ERROR_MESSAGES } from '@/libs/constants/auth';
import ALERT_COLORS from '@/libs/constants/notification';
import ROUTES from '@/libs/constants/routes';

import { AuthContext } from '@/libs/providers/GlobalProvider';
import { setLoading } from '@/libs/redux/slices/authSlice';
import { auth, firestore } from '@/libs/redux/store';
import fetchUserData from '@/libs/redux/thunks/user';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import ReCAPTCHA from 'react-google-recaptcha';

import AUTH_REGEX from '@/libs/regex/auth';

const DEFAULT_FORM_VALUES = {
  email: typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'user@test.com' : '',
  password: typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'Test@123' : '',
};

const DEFAULT_ERR_STATE = {
  email: false,
  password: false,
};

/**
 * Renders a sign-in form with email and password inputs, and a submit button.
 *
 * @param {object} props - The props object containing the handleSwitch function.
 * @return {JSX.Element} The sign-in form component.
 */
const SignInForm = (props) => {
  const { handleSwitch } = props;

  const theme = useTheme();

  const [signInLoading, setSignInLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const dispatch = useDispatch();
  const router = useRouter();

  const { handleOpenSnackBar } = useContext(AuthContext);

  const handleSubmit = async (data) => {
    try {
      const { email, password } = data;

      setError(DEFAULT_ERR_STATE);

      // Check for required fields
      if (!email && !password) {
        setError({
          email: { message: 'Email address is required' },
          password: { message: 'Password is required' },
        });
        return;
      }

      // Check for valid email
      if (!AUTH_REGEX.email.regex.test(email)) {
        setError({ email: { message: AUTH_REGEX.email.message } });
        return;
      }

      // Check if password is entered
      if (!password) {
        setError({ password: { message: 'Password is required' } });
        return;
      }
      // Check if reCAPTCHA is completed
      if (!recaptchaValue) {
        handleOpenSnackBar(ALERT_COLORS.ERROR, "Please complete the reCAPTCHA.");
        return;
      }

      // Send reCAPTCHA token to your backend for verification
      const recaptchaVerified = await verifyRecaptchaToken(recaptchaValue);

      if (!recaptchaVerified) {
        handleOpenSnackBar(ALERT_COLORS.ERROR, "reCAPTCHA verification failed.");
        return;
      }

      // Sign in user
      setSignInLoading(true);
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // If user is not verified, sign out user
      if (!userCred.user.emailVerified) {
        signOut(auth);
        handleOpenSnackBar(
          ALERT_COLORS.INFO,
          'Please check your inbox to verify your email'
        );
        return;
      }

      // If user is verified, redirect to home
      dispatch(setLoading(true));
      const userData = await dispatch(
        fetchUserData({ firestore, id: userCred.user.uid })
      ).unwrap();
      if (userData?.needsBoarding) {
        router.replace(ROUTES.ONBOARDING);
      } else {
        router.replace(ROUTES.HOME);
      }
    } catch ({ code }) {
      setError({ password: { message: AUTH_ERROR_MESSAGES[code] } });
    } finally {
      setSignInLoading(false);
    }
  };
//To  Handle Google Sign-In
const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    setSignInLoading(true);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Dispatch user data to Redux
    dispatch(setLoading(true));
    const userData = await dispatch(
      fetchUserData({ firestore, id: user.uid })
    ).unwrap();

    if (userData?.needsBoarding) {
      router.replace(ROUTES.ONBOARDING);
    } else {
      router.replace(ROUTES.HOME);
    }
  } catch (error) {
    console.error("Google Sign-In Error: ", error.message);
    handleOpenSnackBar(
      ALERT_COLORS.ERROR,
      error.message || "An error occurred during Google Sign-In"
    );
  } finally {
    setSignInLoading(false);
  }
};
// Function to verify reCAPTCHA token in the backend
const verifyRecaptchaToken = async (token) => {
  try {
    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
};

const onRecaptchaChange = (value) => {
  setRecaptchaValue(value);
};

  const renderEmailInput = () => {
    return (
      <AuthTextField
        id="email"
        label="Email Address"
        placeholderText="Email address"
        error={!!error.email}
        helperText={error.email?.message}
        state="text"
      />
    );
  };

  const renderPaswordInput = () => {
    return (
      <Grid {...styles.passwordGridProps}>
        <Grid {...styles.passwordInputGridProps}>
          <AuthTextField
            id="password"
            label="Password"
            placeholderText="Enter Password"
            error={!!error.password}
            helperText={error.password?.message}
            state="text"
            isPasswordField
          />
        </Grid>
        <Grid {...styles.forgotPasswordGridProps}>
          <Link onClick={handleSwitch} {...styles.forgotPasswordProps}>
            Forgot Password?
          </Link>
        </Grid>
      </Grid>
    );
  };

  const renderSubmitButton = () => {
    return (
      <GradientOutlinedButton
        bgcolor={theme.palette.Dark_Colors.Dark[1]}
        text="Sign In"
        textColor={theme.palette.Common.White['100p']}
        loading={signInLoading}
        {...styles.submitButtonProps}
      />
    );
  };

  return (
    <FormContainer
      defaultValues={DEFAULT_FORM_VALUES}
      onSuccess={(data) => handleSubmit(data)}
    >
      <Grid {...sharedStyles.formGridProps}>
        {renderEmailInput()}
        {renderPaswordInput()}
        {renderSubmitButton()}
      </Grid>
    </FormContainer>
  );
};

export default SignInForm;
