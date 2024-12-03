import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Stack, Tabs} from 'expo-router';

export default function TabLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index" options={{headerShown:false}}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Stack>
    );
}
