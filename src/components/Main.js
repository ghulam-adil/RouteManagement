import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Dimensions, TouchableOpacity, Animated, Vibration, Image, 
        TouchableHighlight, Easing, Linking }
    from 'react-native';

import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import SlidingUpPanel from 'rn-sliding-up-panel'

import Geolocation from '@react-native-community/geolocation';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import haversine from "haversine";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 24.871975;
const LONGITUDE = 67.062559;

const statusBarColor = 'rgba(0,0,0,0.2)';
const whiteColor = '#F3F3F3';
const dark = '#448B68';
const darker = '#22252E';
const dark1 = '#787C7D';

// Lighter 	
// Light	#97D2B0
// Primary	#448B68
// Dark	#787C7D
// Darker	#22252E

const appFont = 'TitilliumWeb-Bold';


mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d6e2e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#cfd4d5"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7492a8"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dde2e3"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#cfd4d5"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dde2e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7492a8"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dde2e3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#588ca4"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a9de83"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#bae6a1"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c6e8b3"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#bae6a1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#41626b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": -45
            },
            {
                "lightness": 10
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c1d1d6"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a6b5bb"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#9fb6bd"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b4cbd4"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#588ca4"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#008cb5"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": -5
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a6cbe3"
            }
        ]
    }
]


class Main extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.moveAnimation = new Animated.ValueXY({ x: 0, y: screenHeight * 0.4 });

        this.moveAnimation1 = new Animated.ValueXY({ x: 0, y: screenHeight * 0.5 });

        this.moveAnimation2 = new Animated.ValueXY({ x: -screenWidth * 0.5, y: screenHeight * 0.06, });

        this.moveAnimation3 = new Animated.ValueXY({ x: screenWidth, y: screenHeight * 0.06, });

        this.moveAnimation4 = new Animated.ValueXY({ x: 0, y: screenHeight * 0.82 });

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            }),
            coordinates: [
                { latitude: 24.887453, longitude: 67.059067 },
                { latitude: 24.8822, longitude: 67.0674 },
                { latitude: 24.871641, longitude: 67.059906 },
                { latitude: 24.865149, longitude: 67.055715 },
            ],
            allowDragging: true
        };
    }
    
    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);

        // setTimeout(() => {
        //     this.mapRef.fitToCoordinates(this.state.coordinates, true);
        // }, 2000);

    }

    moveNotification = () => {
        Animated.spring(this.moveAnimation, {
            toValue: { x: -screenWidth * 0.6, y: screenHeight * 0.4 },
        }).start()


        // this.timeoutHandle = setTimeout(() => {
        //     // Add your logic for the transition
        //     Animated.spring(this.moveAnimation, {
        //         toValue: { x: 0, y: screenHeight * 0.4 },
        //     }).start()
        // }, 5000)

    }
    
    moveAlert = () => {
        Animated.spring(this.moveAnimation1, {
            toValue: { x: -screenWidth * 0.6, y: screenHeight * 0.5 },
        }).start()


        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition
            Animated.spring(this.moveAnimation1, {
                toValue: { x: 0, y: screenHeight * 0.5 },
            }).start()
        }, 5000)

    }

    moveDrawer = () => {
        Animated.spring(this.moveAnimation2, {
            toValue: { x: 0, y: screenHeight * 0.06, },
        }).start()


        //this.timeoutHandle = setTimeout(() => {
        //    // Add your logic for the transition
        //    Animated.spring(this.moveAnimation2, {
        //        toValue: { x: -screenWidth * 0.5, y: screenHeight * 0.06, },
        //    }).start()
        //}, 5000)

    }

    hideDrawer = (value) => {

        if (value == 'login') {
            Animated.spring(this.moveAnimation2, {
                toValue: { x: -screenWidth * 0.5, y: screenHeight * 0.06, },
            }).start()

            this.props.navigation.navigate('login');
        }
        else {
            Animated.spring(this.moveAnimation2, {
                toValue: { x: -screenWidth * 0.5, y: screenHeight * 0.06, },
            }).start()
        }
        
        
    }

    moveNotificationsContainer = () => {

        Animated.spring(this.moveAnimation3, {
            toValue: { x: screenWidth * 0, y: screenHeight * 0.06 },
        }).start()

        Animated.spring(this.moveAnimation2, {
            toValue: { x: -screenWidth * 0.5, y: screenHeight * 0.06, },
        }).start()

        //this.timeoutHandle = setTimeout(() => {
        //    // Add your logic for the transition
        //    Animated.spring(this.moveAnimation3, {
        //        toValue: { x: screenWidth, y: screenHeight * 0.06 },
        //    }).start()
        //}, 5000)

    }

    hideNotificationsContainer = () => {
        Animated.spring(this.moveAnimation3, {
            toValue: { x: screenWidth, y: screenHeight * 0.06 },
        }).start()
    }

    onSwipeUp() {

        Animated.spring(this.moveAnimation4, {
            toValue: { x: 0, y: screenHeight * 0.3 },
            
        }).start();

        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 500,
        }).start();

        Animated.timing(this.animatedValue1, {
            toValue: -screenHeight * 0.01,
            duration: 500,
        }).start();

        Animated.timing(this.animatedValue2, {
            toValue: 1,
            duration: 1000,
        }).start();
    }

    onSwipeDown() {
        Animated.spring(this.moveAnimation4, {
            toValue: { x: 0, y: screenHeight * 0.82 },
        }).start();

        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 500,
        }).start();

        Animated.timing(this.animatedValue1, {
            toValue: screenHeight * 0.08,
            duration: 500,
        }).start();

        Animated.timing(this.animatedValue2, {
            toValue: 0,
            duration: 500,
        }).start();
    }

    hideDetailsContainer = () => {
        Animated.spring(this.moveAnimation4, {
            toValue: { x: 0, y: screenHeight * 0.82 },
        }).start()

        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 500,
        }).start();

        Animated.timing(this.animatedValue1, {
            toValue: screenHeight * 0.08,
            duration: 500,
        }).start();
    }

    handleMarker(index){

        if(index == 0)
        {
            return (
                <View>
                    <Image style={styles.imageStyle} source={require('../assets/car.png')} />
                </View>
            );
        }
        else if( index == this.state.coordinates.length - 1 )
        {
            return(
                <View>
                    <Image style={styles.imageStyle} source={require('../assets/person.png')} />
                </View>
            );
            
        }
        else
        {
            return(
                <View style={{ height: screenHeight * 0.04, width: screenHeight * 0.04, backgroundColor: 'red', borderRadius: screenHeight * 0.02,
                                alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: whiteColor, fontFamily: appFont }}>{index}</Text>
                </View>
            );
        }
    }

    handleCall = () => {
        this.setState({ allowDragging: false });
        console.log('clicked!');

        Linking.openURL(`tel:0346-1234567`);

        // this.setState({ allowDragging: true });

        // setTimeout(() => {
        //     console.log('sdjfklsjfkljsdfkljkl')
        //     this.setState({ allowDragging: true });
        // }, 2000);


    }

    render() {

        this.state.allowDragging == false ? this.setState({ allowDragging: true }) : null;

        const config = {
            velocityThreshold: 1,
            directionalOffsetThreshold: 80,
        };

        const animatedStyle = { opacity: this.animatedValue };
        const animatedStyle1 = { marginTop: this.animatedValue1 };
        const animatedStyle2 = { opacity: this.animatedValue2 };

        return (
            <GestureRecognizer style={{ height: '100%' }}
                config={config}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
            >

                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                
                <MapView
                    ref={(ref) => { this.mapRef = ref }}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 24.871641,
                        longitude: 67.059906,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    customMapStyle = { mapStyle }
                    // showUserLocation
                    // followUserLocation
                    // loadingEnabled
                    // region={this.getMapRegion()}
                    onStartShouldSetResponder={() => { this.hideNotificationsContainer(); this.hideDrawer(); this.hideDetailsContainer() }}
                >
                    {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}
                    {/* <Marker
                        ref={marker => {
                            this.marker = marker;
                        }}
                        coordinate={this.state.coordinate}
                    /> */}

                    {this.state.coordinates.map((marker, index) => (

                        <Marker
                            key={index}
                            coordinate = {{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                        >

                            {
                                this.handleMarker(index)
                            }

                        </Marker>
                    ))}

                    <Polyline
                        coordinates={this.state.coordinates}
                        strokeColor={dark} // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={4}
                    />
                </MapView>


                <Animated.View style={[styles.notificationsContainer, this.moveAnimation3.getLayout()]}>

                    <View style={styles.notificationsHeader}>
                        
                        <TouchableOpacity
                            onPress={this.hideNotificationsContainer}
                            style={styles.notificationsButton}
                        >
                            <MaterialIcon name='arrow-forward' size={26} color={whiteColor} />
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.notificationsHeading}>Trip History</Text>
                        </View>

                        <View></View>

                    </View>

                    <View style={styles.notificationItem}>
                        <Text style={[styles.title, { color: dark }]}>XYZ Store</Text>
                        <Text style={{ fontFamily: appFont, color: dark }}>Johar Mor, Karachi</Text>
                        <Text style={[styles.time, { color: dark }]}>150 m, 30 min</Text>
                    </View>

                    <View style={styles.notificationItem}>
                        <Text style={[styles.title, { color: dark }]}>Lucky One Mall</Text>
                        <Text style={{ fontFamily: appFont, color: dark }}>Gulshan Iqbal, Karachi</Text>
                        <Text style={[styles.time, { color: dark }]}>110 m, 25 min</Text>
                    </View>

                    <View style={styles.notificationItem}>
                        <Text style={[styles.title, { color: dark }]}>ABC Store</Text>
                        <Text style={{ fontFamily: appFont, color: dark }}>Tariq Road, Karachi</Text>
                        <Text style={[styles.time, { color: dark }]}>50 m, 10 min</Text>
                    </View>

                </Animated.View>

                <TouchableOpacity style={styles.menuContainer}
                    onPress={() => { this.moveDrawer(); this.hideNotificationsContainer() }}
                >
                    <MaterialIcon name='menu' size={26} color={dark} />
                </TouchableOpacity>
                
                <Animated.View style={[styles.drawerContainer, this.moveAnimation2.getLayout()]}>

                    <View style={styles.drawerHeader}>
                        <Image style={styles.drawerImage} source={require('../assets/avatar.png')} />

                        <Text style={styles.driverTitle}>Noman Ahmed</Text>
                    </View>

                    <View style={styles.drawerBody}>


                        <TouchableOpacity style={styles.drawerItem}
                            onPress={this.moveNotificationsContainer}
                        >
                            <MaterialIcon name='notifications-none' size={24} color={dark} style={styles.iconStyle} />

                            <Text style={{ fontFamily: appFont, color: dark }}>Notifications</Text>

                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.drawerItem}
                            onPress={() => this.hideDrawer('login')}
                        >
                            <MaterialIcon name='exit-to-app' size={24} color={dark} style={styles.iconStyle} />

                            <Text style={{ fontFamily: appFont, color: dark }}>Log Out</Text>

                        </TouchableOpacity>

                    </View>

                </Animated.View>

                

                <Animated.View style={[styles.notificationContainer, this.moveAnimation.getLayout()]}>
                    <View>
                        <Text style={styles.title}>ABC Store</Text>
                        <Text style={{ fontFamily: appFont }}>Tariq Road, Karachi</Text>
                        <Text style={styles.time}>150 m, 30 min</Text>
                    </View>

                    <TouchableOpacity style={styles.iconContainer}
                        onPress={this.moveNotification}
                    >

                        <MaterialIcon name='close' size={26} color={whiteColor} />

                    </TouchableOpacity>
                </Animated.View>

                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    style={{ zIndex: 12 }}
                    draggableRange={{ top: screenHeight * 0.56, bottom: screenHeight * 0.18 }}
                    // animatedValue={animatedValue}
                    minimumVelocityThreshold={2}
                    showBackdrop={false}
                    // allowMomentum={true}
                    allowDragging={this.state.allowDragging}
                >
                
                <View style={[styles.detailsContainer]}>

                    <View style={styles.timeContainer}>
                        <Text style={{ fontSize: screenHeight * 0.04, fontFamily: appFont }}>25</Text>
                        <Text>min</Text>
                    </View>
                    
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: screenHeight * 0.04, fontFamily: appFont }}>Ali Khan</Text>
                        <Text style={{ color: 'gray', fontFamily: appFont }}>ABC-123</Text>
                    </View>

                    {/* <Animated.View style={[styles.imagesContainer, animatedStyle]}> */}

                        {/* <Image style={styles.userImage} source={require('../assets/avatar.png')} />

                        <Image style={styles.userImage} source={require('../assets/avatar.png')} />

                        <Image style={styles.userImage} source={require('../assets/avatar.png')} /> */}

                    {/* </Animated.View> */}

                    <View style={[styles.passengerDetails]}>

                        <View style={[styles.itemContainer, { justifyContent: 'space-between' }]}>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            
                                <View style={styles.detailsIcon}>
                                    <MaterialIcon name='person' size={26} color={dark} />
                                    {/* <Image style={styles.mediumImage} source={require('../assets/avatar.png')} /> */}
                                </View>

                                <View style={styles.rightContainer}>
                                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Ali Khan</Text>
                                    <Text style={styles.text}>0346-1234567</Text>
                                </View>

                            </View>

                            <TouchableOpacity
                                style={styles.detailsIcon}
                                // style={{ zIndex: 10 }}
                                onPress={() => this.handleCall()}
                            >
                                <MaterialIcon name='phone' size={26} color={dark} />
                            </TouchableOpacity>

                        </View>

                        <View style={{ height: screenHeight * 0.001, backgroundColor: dark1 }}></View>

                        <View style={styles.itemContainer}>
                            
                            <View style={styles.detailsIcon}>
                                <MaterialIcon name='directions-car' size={26} color={dark} />
                                {/* <Image style={styles.mediumImage} source={require('../assets/avatar.png')} /> */}
                            </View>

                            <View style={styles.rightContainer}>
                                <Text style={[styles.text, { fontWeight: 'bold' }]}>ABC-123</Text>
                                <Text style={styles.text}>Black | Suzuki Cultus</Text>
                            </View>

                        </View>

                        {/* <Animated.View style={styles.itemContainer}>
                            
                            <View style={styles.detailsIcon}>
                                <MaterialIcon name='invert-colors' size={26} color={dark} />
                                <Image style={styles.mediumImage} source={require('../assets/avatar.png')} />
                            </View>

                            <View>
                                <Text style={styles.text}>Black</Text>
                                <Text style={styles.text}>C-19, ABC society, New York</Text>
                            </View>

                        </Animated.View> */}

                        <TouchableOpacity style={styles.trackButton}
                            // onPress={() => { this.props.navigation.navigate('main') }}
                        >
                            <MaterialIcon name='my-location' size={26} color={whiteColor} />
                            <Text style={styles.trackText}>Track</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                </SlidingUpPanel>
                
                
            </GestureRecognizer>

        );
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: screenHeight * 0.82
    },
    bubble: {
        flex: 1, backgroundColor: "rgba(255,255,255,0.7)", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 20
    },
    button: { width: 80, paddingHorizontal: 12, alignItems: "center", marginHorizontal: 10
    },
    buttonContainer: { flexDirection: "row", marginVertical: 20, backgroundColor: "transparent"
    },
    notificationContainer: {
        backgroundColor: dark, elevation: 4, position: 'absolute', zIndex: 12,
        padding: screenHeight * 0.01, borderTopRightRadius: screenHeight * 0.06, borderBottomRightRadius: screenHeight * 0.06,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * 0.6
    },
    title: {
        fontFamily: appFont, fontSize: screenHeight * 0.025,
    },
    notificationTitle: {
        fontFamily: appFont, fontSize: screenHeight * 0.025, color: whiteColor
    },
    time: {
        color: whiteColor, fontFamily: appFont,
    },
    iconContainer: {
        height: screenHeight * 0.06, width: screenHeight * 0.06, borderRadius: screenHeight * 0.03, backgroundColor: darker,
        alignItems: 'center', justifyContent: 'center',
    },
    header: {
        backgroundColor: dark, position: 'absolute', elevation: 4, flexDirection: 'row',
        alignItems: 'center', left: 0, right: 0, paddingHorizontal: screenWidth * 0.05, paddingVertical: screenHeight * 0.03,
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: whiteColor, fontFamily: appFont,
    },
    menuContainer: {
        height: screenHeight * 0.07, width: screenHeight * 0.07, borderRadius: screenHeight * 0.035, backgroundColor: whiteColor,
        top: screenHeight * 0.06, elevation: 4, alignItems: 'center', justifyContent: 'center', position: 'absolute',
        left: screenWidth * 0.05
    },
    detailsContainer: {
        backgroundColor: whiteColor, elevation: 4, borderTopWidth: 5, borderColor: dark, zIndex: 10
    },
    timeContainer: {
        alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.15, width: screenHeight * 0.15,
        borderRadius: screenHeight * 0.075, borderWidth: 5, borderColor: dark, alignSelf: 'center', elevation: 5,
        backgroundColor: whiteColor, marginTop: -screenHeight * 0.075,
    },
    userImage: {
        height: screenHeight * 0.05, width: screenHeight * 0.05, borderRadius: screenHeight * 0.025, margin: screenHeight * 0.01,
    },
    drawerImage: {
        height: screenHeight * 0.07, width: screenHeight * 0.07, borderRadius: screenHeight * 0.035, margin: screenHeight * 0.01,
    },
    imagesContainer: {
        flexDirection: 'row', alignItems: 'center', alignSelf: 'center'
    },
    textContainer: {
        alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
        marginBottom: screenHeight * 0.01
    },
    drawerContainer: {
        backgroundColor: whiteColor, width: screenWidth * 0.5, elevation: 6, position: 'absolute'
    },
    driverTitle: {
        fontFamily: appFont, fontSize: 18,
    },
    drawerHeader: {
        flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#e3e3e3', padding: screenHeight * 0.01,
    },
    drawerBody: {
        padding: screenHeight * 0.02,
    },
    iconStyle: {
        marginHorizontal: screenHeight * 0.01,
    },
    drawerItem: {
        flexDirection: 'row', alignItems: 'center', margin: screenHeight * 0.01,
    },
    notificationsContainer: {
        backgroundColor: whiteColor, width: screenWidth, elevation: 7, height: screenHeight,
    },
    notificationItem: {
        marginHorizontal: screenHeight * 0.02, borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: screenHeight * 0.01
    },
    notificationsHeader: {
        margin: screenHeight * 0.02, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    itemContainer: {
        flexDirection: 'row', alignItems: 'center', padding: screenHeight * 0.015
    },
    passengerDetails: {
        marginHorizontal: screenWidth * 0.06
    },
    text: {
        fontFamily: appFont
    },
    mediumImage: {
        height: screenHeight * 0.07, width: screenHeight * 0.07, borderRadius: screenHeight * 0.035, margin: screenHeight * 0.01,
    },
    notificationsButton: {
        height: screenHeight * 0.07, width: screenHeight * 0.07, borderRadius: screenHeight * 0.035, backgroundColor: dark,
        alignItems: 'center', justifyContent: 'center'
    },
    notificationsHeading: {
        fontFamily: appFont, color: 'gray', fontSize: screenHeight * 0.03,
    },
    detailsIcon: {
        backgroundColor: whiteColor, borderColor: dark, borderWidth: 1, 
        height: screenHeight * 0.05, alignItems: 'center', justifyContent: 'center',
        width: screenHeight * 0.05, borderRadius: screenHeight * 0.025
    },
    rightContainer: {
        padding: screenHeight * 0.01
    },
    imageStyle: {
        height: screenHeight * 0.06, width: screenHeight * 0.06
    },
    trackButton: {
        backgroundColor: whiteColor, width: screenWidth * 0.7, alignItems: 'center', justifyContent: 'center', elevation: 4,
        marginVertical: screenHeight * 0.05, height: screenHeight * 0.06, backgroundColor: darker, alignSelf: 'center',
        flexDirection: 'row'
    },
    trackText: {
        fontFamily: appFont, color: whiteColor, fontSize: screenHeight * 0.03, marginHorizontal: screenWidth * 0.03
    },
});
export default Main;
