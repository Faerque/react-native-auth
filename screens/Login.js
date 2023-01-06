import { StatusBar } from 'expo-status-bar';
// formik importing 
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { View } from 'react-native';
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

// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

export default function Login({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/Logo.png')} />
                    <PageTitle>Farming Consultation</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate('Welcome');
                        }}
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
                                    <MsgBox>...</MsgBox>
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Login</ButtonText>
                                    </StyledButton>
                                    <Line />
                                    <StyledButton google={true} onPress={handleSubmit}>
                                        <Fontisto name="google" size={25} color={primary} />
                                        <ButtonText google={true} color={primary} >google</ButtonText>
                                    </StyledButton>
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