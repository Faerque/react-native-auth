import { StatusBar } from 'expo-status-bar';
// formik importing 
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    StyledContainer,
    InnerContainer,
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

// date time picker
import DateTimePicker from '@react-native-community/datetimepicker';

// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

export default function Signup({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [loading, setLoading] = useState(false);

    // date to pick
    const [dob, setDob] = useState('');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    // show the date picker
    const showDatePicker = () => {
        setShow(true);

    }

    const submitHandle = async (values) => {
        console.log(values);
        const url = 'https://react-native-server.onrender.com/api/v1/users/register';
        const { email, password, fullName, confirmPassword, dateOfBirth } = values;
        const lowerCaseEmail = email.toLowerCase();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = {
            email: lowerCaseEmail,
            password: password,
            dateOfBirth: dateOfBirth,
            name: fullName
        }
        setLoading(true);
        if (password != confirmPassword) {
            alert('Password not matched!')
        }
        else if (email == '' || password == '' || dob == '' || fullName == '') {
            alert('Any input cannot be empty!');
        } else {
            try {
                await axios
                    .post(url, data, config)
                    .then((response) => {
                        const data = response.data;
                        AsyncStorage.setItem('userInfo', JSON.stringify(data));
                        navigation.navigate('Welcome', { ...data });
                        alert('Registration successful!');
                        setTimeout(() => {
                            setLoading(false);
                        }, 3000);
                    })

            } catch (error) {
                alert(error);
            }
        }
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Farming Consultation</PageTitle>
                    <SubTitle>Account Signup</SubTitle>
                    <Spinner
                        //visibility of Overlay Loading Spinner
                        visible={loading}
                        //Text with the Spinner
                        textContent={'Creating account...'}
                        //Text style of the Spinner Text
                        textStyle={{ styles: { color: '#FFF' } }}
                    />
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}

                    <Formik
                        initialValues={{ fullName: '', email: '', password: '', confirmPassword: '', dateOfBirth: '' }}
                        onSubmit={(values) => {
                            values = { ...values, dateOfBirth: dob };
                            submitHandle(values);
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
                                        label="Full Name"
                                        icon="person"
                                        placeholder="Enter your full name"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        value={values.fullName}

                                    />
                                    <MyTextInput
                                        label="Email Address"
                                        icon="mail"
                                        placeholder="Enter your mail address"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    <MyTextInput label="Date of Birth"
                                        icon="calendar"
                                        placeholder="YYYY - MM - DD"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('dateOfBirth')}
                                        onBlur={handleBlur('dateOfBirth')}
                                        value={dob ? dob.toDateString() : values.dateOfBirth}
                                        isDate={true}
                                        editable={false}
                                        showDatePicker={showDatePicker} />
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
                                    <MyTextInput
                                        label="Confirm Password"
                                        icon="lock"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('password')}
                                        value={values.confirmPassword}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Sign up</ButtonText>
                                    </StyledButton>
                                    <Line />
                                    <ExtraView>
                                        <ExtraText>have an account already? </ExtraText>
                                        <TextLink onPress={() => navigation.navigate("Login")}>
                                            <TextLinkContent>Login</TextLinkContent>
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
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,
    isDate, showDatePicker, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>

            {!isDate && <StyledTextInput {...props} />}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
            </TouchableOpacity>}
            {isPassword && (<RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight} />
            </RightIcon>)}
        </View>
    )
}