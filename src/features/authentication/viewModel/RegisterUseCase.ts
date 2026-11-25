import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../model/auth_model';

export function useRegisterViewModel() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);


    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('You must agree to the terms to continue.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp(
      email.trim(),
      password,
    );
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    navigate('/onboarding');
  };

  return {
    email,
    password,
    confirmPassword,
    showPassword,
    agree,
    loading,
    error,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setAgree,
    handleSubmit,
  };
}
