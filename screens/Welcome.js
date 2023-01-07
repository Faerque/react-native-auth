import AsyncStorage from '@react-native-async-storage/async-storage';
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


export default function Welcome({ navigation, route }) {
    const { name, email, picture, dateOfBirth } = route.params;
    // getting the user data from async storage
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e);
        }
    }
    const [userData, setUserData] = React.useState(null);
    React.useEffect(() => {
        getData().then((data) => {
            setUserData(data);
        })
    }, [])
    console.log(userData);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome to Farming Consultation</PageTitle>
                    <SubTitle welcome={true}>This is you are</SubTitle>
                    <SubTitle welcome={true}>{name}</SubTitle>
                    <SubTitle welcome={true}>{email}</SubTitle>
                    <SubTitle welcome={true}>{dateOfBirth}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={{ uri: picture }} />
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