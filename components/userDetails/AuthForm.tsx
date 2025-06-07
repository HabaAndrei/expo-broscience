import { View } from 'react-native';
import { Button, Form, H4, Input, Spinner, Paragraph, XStack } from 'tamagui';
import { useState, useEffect, useContext } from 'react';
import { isValidEmail } from '@/helpers/diverse';
import { Firebase } from '@/providers/Firebase';
import { UserContext } from '@/contexts/UserContext';

export default function AuthForm() {
  const { user } = useContext(UserContext);
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const firebase = new Firebase();

  useEffect(() => {
    if (!successMessage.length) return;
    const timeout = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [successMessage]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '', general: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (mode === 'signup') {
      if (formData.firstName.trim() === '') {
        newErrors.firstName = 'First name is required.';
      }
      if (formData.lastName.trim() === '') {
        newErrors.lastName = 'Last name is required.';
      }
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (mode !== 'reset' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setGeneralError = (error: string) => {
    setErrors((prev) => ({ ...prev, general: error }));
  }

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus('submitting');

    if (mode === 'login') {
      const resultLogin = await firebase._signInWithEmailAndPassword({
        email: formData.email,
        password: formData.password
      });
      if (!resultLogin.isResolved) {
        setGeneralError("The email address or password is invalid.");
      }
    } else if (mode === 'signup') {
      const resultSignup = await firebase._createUserWithEmailAndPassword({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        secondName: formData.lastName
      });
      if (!resultSignup.isResolved) {
        if (resultSignup?.err?.includes("auth/email-already-in-use")) {
          setGeneralError("The email address is already in use");
        } else {
          setGeneralError("We were unable to create your account.");
        }
      }
    } else if (mode === 'reset') {
      const resultReset = await firebase._sendPasswordResetEmail(formData.email);
      if (!resultReset.isResolved) {
        if (resultReset?.err?.includes("(auth/invalid-email)")) {
          setGeneralError("Invalid email address.");
        } else {
          setGeneralError("We were unable to send you the email.");
        }
      } else {
        setSuccessMessage("You will receive the email soon");
      }
    }
    setStatus('off');
  };

  const handleLogout = async () => {
    await firebase._signOut();
  };

  return (
    <View>
      <Form
        alignItems="center"
        minWidth={320}
        gap="$3"
        onSubmit={handleSubmit}
        borderWidth={1}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
        padding="$8"
      >

        { !user ?
          <>
            <H4>
              {mode === 'signup'
                ? 'Sign Up'
                : mode === 'login'
                ? 'Login'
                : 'Reset Password'}
            </H4>

            {errors.general && (
              <Paragraph color="red">{errors.general}</Paragraph>
            )}

            {successMessage.length > 0 && (
              <Paragraph color="green"> {successMessage} </Paragraph>
            )}

            {mode === 'signup' && (
              <>
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChangeText={(text) => handleChange('firstName', text)}
                  size="$4"
                  width={250}
                />
                {errors.firstName && (
                  <Paragraph color="red">{errors.firstName}</Paragraph>
                )}

                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChangeText={(text) => handleChange('lastName', text)}
                  size="$4"
                  width={250}
                />
                {errors.lastName && (
                  <Paragraph color="red">{errors.lastName}</Paragraph>
                )}
              </>
            )}

            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              size="$4"
              width={250}
            />
            {errors.email && (
              <Paragraph color="red">{errors.email}</Paragraph>
            )}

            {mode !== 'reset' && (
              <>
                <Input
                  placeholder="Password"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => handleChange('password', text)}
                  size="$4"
                  width={250}
                />
                {errors.password && (
                  <Paragraph color="red">{errors.password}</Paragraph>
                )}
              </>
            )}

            <Form.Trigger asChild disabled={status !== 'off'}>
              <Button
                icon={status === 'submitting' ? () => <Spinner /> : undefined}
                size="$5"
                width={250}
                theme="accent"
              >
                <Paragraph>
                  {mode === 'signup'
                    ? 'Create Account'
                    : mode === 'login'
                    ? 'Login'
                    : 'Reset Password'}
                </Paragraph>
              </Button>
            </Form.Trigger>

            <XStack gap="$2" marginTop="$4" justifyContent="center">
              {mode !== 'login' && (
                <Button
                  size="$3"
                  onPress={() => setMode('login')}
                  variant="outlined"
                  width={110}
                >
                  Login
                </Button>
              )}
              {mode !== 'signup' && (
                <Button
                  size="$3"
                  onPress={() => setMode('signup')}
                  variant="outlined"
                  width={110}
                >
                  Sign Up
                </Button>
              )}
              {mode !== 'reset' && (
                <Button
                  size="$3"
                  onPress={() => setMode('reset')}
                  variant="outlined"
                  width={130}
                >
                  Reset Password
                </Button>
              )}
            </XStack>
          </> :
          <Button
            onPress={handleLogout}
            width={150}
            size="$5"
            width={250}
            theme="accent"
          >
            Logout
          </Button>
        }
      </Form>
    </View>
  );
}
