import { StatusBar } from 'expo-status-bar';

import React from 'react';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
} from '../components/styles';


export default function Welcome({ navigation }) {

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <WelcomeImage resizeMode="cover" source={require('./../assets/Logo.png')} />
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome to Farming Consultation</PageTitle>
                    <SubTitle welcome={true}>This is you are</SubTitle>
                    <SubTitle welcome={true}>Omar Faruk</SubTitle>
                    <SubTitle welcome={true}>jfak</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/Logo.png')} />
                        <MsgBox>...</MsgBox>
                        <Line />
                        <StyledButton onPress={() => navigation.navigate('Login')}>
                            <ButtonText>Log out</ButtonText>
                        </StyledButton>


                    </StyledFormArea>
                </WelcomeContainer>

            </InnerContainer>
        </StyledContainer>
    )
}

// // myTextInput
// const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,
//     isDate, showDatePicker, ...props }) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Octicons name={icon} size={30} color={Colors.brand} />
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>

//             {!isDate && <StyledTextInput {...props} />}
//             {isDate && <TouchableOpacity onPress={showDatePicker}>
//                 <StyledTextInput {...props} />
//             </TouchableOpacity>}
//             {isPassword && (<RightIcon onPress={() => setHidePassword(!hidePassword)}>
//                 <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight} />
//             </RightIcon>)}
//         </View>
//     )
// }