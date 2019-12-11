import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#F3F3F3';
const dark = '#448B68';
const darker = '#22252E';
const dark1 = '#787C7D';

const appFont = 'TitilliumWeb-Bold';

class Login extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        showPassword: true,
    };

    render() {
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor={dark} barStyle="light-content" />

                <View style={styles.logoContainer}>
                    {/* <Text style={styles.heading}>RMS</Text> */}
                    <Image source={require('../assets/logo.png') } style={styles.logo} />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <View style={styles.iconContainer}>
                            <MaterialIcon style={styles.icon} name='person' size={26} color={dark} />
                        </View>
                        <TextInput
                            placeholder='Username'
                            style={{ width: '70%' }}
                            placeholderTextColor={dark1}
                        />
                    </View>

                    <View style={styles.input}>
                        <View style={styles.iconContainer}>
                            <MaterialIcon style={styles.icon} name='lock' size={26} color={dark} />
                        </View>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={this.state.showPassword}
                            style={{ width: '70%', }}
                            placeholderTextColor={dark1}
                        />

                        <TouchableOpacity
                            style={{ marginLeft: screenWidth * 0.05 }}
                            onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                        >
                            <FontAwesome5 name={this.state.showPassword ? 'eye-slash' : 'eye'} size={24} color={dark} />
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => { this.props.navigation.navigate('main') }}
                    >
                        <MaterialIcon name='exit-to-app' size={26} color={whiteColor} />
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        height: '70%', width: '70%'
    },
    logoContainer: {
        height: screenHeight * 0.14, marginVertical: screenHeight * 0.06, alignItems: 'center', justifyContent: 'center'
    },
    container: {
        backgroundColor: whiteColor, height: '100%',
    },
    heading: {
        fontFamily: appFont, color: whiteColor, fontSize: screenHeight * 0.05,
    },
    inputContainer: {
        alignSelf: 'center', 
    },
    input: {
        backgroundColor: whiteColor, width: screenWidth * 0.9, marginVertical: screenHeight * 0.03, elevation: 4, flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        color: dark, fontFamily: appFont, width: '85%', backgroundColor: 'orange'
    },
    loginButton: {
        backgroundColor: whiteColor, width: screenWidth * 0.7, alignItems: 'center', justifyContent: 'center', elevation: 4,
        marginVertical: screenHeight * 0.05, height: screenHeight * 0.06, backgroundColor: darker, alignSelf: 'center',
        flexDirection: 'row'
    },
    loginText: {
        fontFamily: appFont, color: whiteColor, fontSize: screenHeight * 0.03, marginHorizontal: screenWidth * 0.03
    },
    icon: {
        marginHorizontal: screenWidth * 0.02
    },
    iconContainer: {
        width: '12%'
    }
});

export default Login;