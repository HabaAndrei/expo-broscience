import { View } from 'react-native';
import { Button, Form, H4, Input, Spinner, Paragraph, XStack } from 'tamagui';
import { useState, useEffect } from 'react';
import { isValidEmail } from '@/helpers/diverse';

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // pe acesta il voi scoate din schema !! si merg sa rezolv jos
  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '', general: '' })); // reset error on change
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

  const handleSubmit = () => {
    if (!validate()) return;
    setStatus('submitting');
    // console.log(mode);

    // Here you would send data to the backend
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
        <>
          <H4>
            {mode === 'signup'
              ? 'Sign Up'
              : mode === 'login'
              ? 'Login'
              : 'Reset Password'}
          </H4>

          {errors.general ? (
            <Paragraph color="red">{errors.general}</Paragraph>
          ) : null}

          {mode === 'signup' && (
            <>
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                size="$4"
                width={250}
              />
              {errors.firstName ? (
                <Paragraph color="red">{errors.firstName}</Paragraph>
              ) : null}

              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
                size="$4"
                width={250}
              />
              {errors.lastName ? (
                <Paragraph color="red">{errors.lastName}</Paragraph>
              ) : null}
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
          {errors.email ? (
            <Paragraph color="red">{errors.email}</Paragraph>
          ) : null}

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
              {errors.password ? (
                <Paragraph color="red">{errors.password}</Paragraph>
              ) : null}
            </>
          )}

          <Form.Trigger asChild disabled={status !== 'off'}>
            <Button
              icon={status === 'submitting' ? () => <Spinner /> : undefined}
              size="$5"
              width={250}
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

          {/* Navigation Buttons */}
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
        </>
      </Form>
    </View>
  );
}
