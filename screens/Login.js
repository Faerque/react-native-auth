import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
// formik importing 
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    StyledInputLabel,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/styles';

// destructing the colors
const { brand, darkLight, primary } = Colors;



export default function Login({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const submitHandle = async (values) => {
        console.log(values);
        const url = 'https://react-native-server.onrender.com/api/v1/users/login';
        const { email, password } = values;
        const lowerCaseEmail = email.toLowerCase();
        console.log(email, password);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setLoading(true);
        if (email == '' || password == '') {
            alert('Email or password is empty!');
        } else {
            try {
                await axios
                    .post(url, {
                        email: lowerCaseEmail,
                        password
                    }, config)
                    .then((response) => {
                        const data = response.data;
                        AsyncStorage.setItem('userInfo', JSON.stringify(data));
                        navigation.navigate('Welcome', { ...data });
                        setTimeout(() => {
                            setLoading(false);
                        }, 3000);
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }



    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/Logo.png')} />
                    <PageTitle>Farming Consultation</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Spinner
                        //visibility of Overlay Loading Spinner
                        visible={loading}
                        //Text with the Spinner
                        textContent={'Fetching Data...'}
                        //Text style of the Spinner Text
                        textStyle={{ styles: { color: '#FFF' } }}
                    />
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => submitHandle(values)}
                    >
                        {
                            ({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values
                            }) => <StyledFormArea>
                                    <MyTextInput
                                        label="email"
                                        icon="mail"
                                        placeholder="Enter your mail address"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"

                                    />
                                    <MyTextInput
                                        label="Password"
                                        icon="lock"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Login</ButtonText>
                                    </StyledButton>
                                    <Line />
                                    <ExtraView>
                                        <ExtraText>Don't have an account already? </ExtraText>
                                        <TextLink onPress={() => navigation.navigate('Signup')}
                                        >
                                            <TextLinkContent>Signup</TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                </StyledFormArea>
                        }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

// myTextInput
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (<RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight} />
            </RightIcon>)}
        </View>
    )
}