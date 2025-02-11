import { View, Text, Image, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";
import { useRouter } from "expo-router";
import firebase from '../.expo/services/firebase';  // Adjust path as necessary
  // Import Firebase config
import Animated, {
    FadeInDown,
    FadeInUp,
} from "react-native-reanimated";

import beachImage from "@/assets/meditation-images/beach.webp";

const App = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);  // To store logged-in user state

    useEffect(() => {
        // Check if the user is logged in using Firebase authentication
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);  // User is logged in, store user data
            } else {
                setUser(null);  // User is not logged in
            }
        });

        return () => unsubscribe(); // Cleanup on component unmount
    }, []);

    const handleGetStarted = () => {
        router.push("/nature-meditate");
    };

    const handleLogin = () => {
        // Trigger login action (you can implement your login form here)
        firebase.auth()
            .signInWithEmailAndPassword('test@example.com', 'password')  // Example login
            .then((userCredential) => {
                setUser(userCredential.user);  // Store logged-in user
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const handleSignUp = () => {
        // Trigger signup action
        firebase.auth()
            .createUserWithEmailAndPassword('newuser@example.com', 'password') // Example signup
            .then((userCredential) => {
                setUser(userCredential.user); // Store user after signup
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return (
        <View className="flex-1">
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient
                    colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
                >
                    <SafeAreaView className="flex flex-1 px-1 justify-between">
                        <Animated.View
                            entering={FadeInDown.delay(300)
                                .mass(0.5)
                                .stiffness(80)
                                .springify(20)}
                        >
                            <Text className="text-center text-white font-bold text-4xl">
                                Simple Meditation
                            </Text>
                            <Text className="text-center text-white font-regular text-2xl mt-3">
                                Simplifying Meditation for Everyone
                            </Text>
                        </Animated.View>

                        {/* Conditional rendering based on user login status */}
                        {user ? (
                            <Animated.View
                                entering={FadeInDown.delay(300)
                                    .mass(0.5)
                                    .stiffness(80)
                                    .springify(20)}
                            >
                                <CustomButton
                                    onPress={handleGetStarted}
                                    title="Get Started"
                                />
                            </Animated.View>
                        ) : (
                            <Animated.View
                                entering={FadeInUp.delay(500).stiffness(100)}
                                style={{ marginTop: 20 }}
                            >
                                <CustomButton
                                    onPress={handleLogin}
                                    title="Login"
                                    containerStyles="mt-4"
                                />
                                <CustomButton
                                    onPress={handleSignUp}
                                    title="Sign Up"
                                    containerStyles="mt-4"
                                />
                            </Animated.View>
                        )}

                        <StatusBar style="light" />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default App;


