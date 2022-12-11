import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  Box,
  Button,
  Icon,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import { createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import Input from '../../components/Input/Input';
import auth, { provider } from '../../database';
import { signUp } from '../../Request/request';

const RegisterUser = () => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const nameRef = createRef();
  const dateRef = createRef();
  const emailRef = createRef();
  const emailConfirmationRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const registerUser = async (event) => {
    event.preventDefault();

    const { value: name } = nameRef.current;
    const { value: date } = dateRef.current;
    const { value: email } = emailRef.current;
    const { value: emailconfirmation } = emailConfirmationRef.current;
    const { value: password } = passwordRef.current;
    const { value: passwordConfirmation } = passwordConfirmationRef.current;

    if (
      !name ||
      !date ||
      !email ||
      !emailConfirmationRef ||
      !password ||
      !passwordConfirmation
    ) {
      return toast({
        description: 'Todos os campos são obrigatórios!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
    }

    if (email !== emailconfirmation) {
      toast({
        description: 'Email de confirmação diferente!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
      emailConfirmationRef.current.style.borderColor = '#FF843F';
      return true;
    }
    emailConfirmationRef.current.style.borderColor = '#0F241D';

    if (password.length < 6) {
      toast({
        description: 'A senha precisa conter no mínimo 6 digitos.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
      passwordConfirmationRef.current.style.borderColor = '#FF843F';
      return true;
    }

    if (passwordConfirmation !== password) {
      toast({
        description: 'Senha de confirmação diferente!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
      passwordConfirmationRef.current.style.borderColor = '#FF843F';
      return true;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signUp({
        fullName: name,
        email,
        birthDate: date,
      });
      navigate('/home');
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const signInGoogle = async () => {
    try {
      const sign = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(sign);
      const token = credential.accessToken;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      gap="2rem"
    >
      <Icon boxSize="6rem" as={FaUserCircle} />
      <Box as="form">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <Stack width="min-content" spacing="0.5rem">
            <Input type="text" ref={nameRef} placeholder="Nome" />
            <Input type="date" ref={dateRef} placeholder="Data de nascimento" />
            <Input type="email" ref={emailRef} placeholder="Email" />
            <Input
              type="email"
              ref={emailConfirmationRef}
              placeholder="Confirmar email"
            />
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                ref={passwordRef}
                placeholder="Senha"
              />
              <InputRightElement width="4.5rem">
                <Button variant="unstyled" onClick={() => setShow(!show)}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                type={showConfirmation ? 'text' : 'password'}
                ref={passwordConfirmationRef}
                placeholder="Confirmar senha"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant="unstyled"
                  onClick={() => setShowConfirmation(!showConfirmation)}
                >
                  {showConfirmation ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Button
            marginTop="1rem"
            padding="0.3rem 1rem"
            borderRadius="5px"
            border="1px solid rgba(99, 99, 99, 0.2)"
            onClick={signInGoogle}
          >
            <Icon as={FcGoogle} boxSize="2.5rem" />
          </Button>
        </Box>
        <Button
          type="submit"
          marginTop="2rem"
          display="block"
          marginX="auto"
          background="greenX.700"
          borderRadius="15px"
          paddingY="0.5rem"
          width="100%"
          fontWeight="500"
          color="whiteX.600"
          _hover={{ background: 'greenX.600' }}
          transition="0.3s"
          onClick={(event) => registerUser(event)}
        >
          Cadastrar
        </Button>
      </Box>
    </Layout>
  );
};

export default RegisterUser;
