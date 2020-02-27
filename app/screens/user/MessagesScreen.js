import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { human } from 'react-native-typography';
import {
    FlatButton,
    ThemedView,
} from '../../components';
import { Fake, ArrayHelper } from '../../utils';

const users = {
    friend: ArrayHelper.random(Fake.users),
    own: ArrayHelper.random(Fake.users)
};

if (users.own.user === users.friend.user) {
    users.own = ArrayHelper.random(Fake.users);
}

const Message = ({ isOwner, body, title, time, user }) => {
    return (
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: isOwner ? 'flex-end' : 'flex-start' }}>
            <View style={{ backgroundColor: '#f0f1f4', padding: 10, borderRadius: 10, maxWidth: '70%' }}>
                <Text style={[ human.callout, { paddingBottom: 10 } ]}>
                    { user.user }
                </Text>
                <Text>
                    { body }
                </Text>
            </View>
        </View>
    );
};

const messages = [
    {
        body: 'Привет! Как дела?',
        user: users.friend,
        isOwner: false
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
    {
        body: 'Привет! Как дела?',
        user: users.friend,
        isOwner: false
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
    {
        body: 'Привет! Как дела?',
        user: users.friend,
        isOwner: false
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
    {
        body: 'Привет! Как дела?',
        user: users.friend,
        isOwner: false
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
    {
        body: 'Привет! Все отлично! Я пиздец как рад что ты спросил!!',
        user: users.own,
        isOwner: true
    },
];

const MessagesScreen = () => {

    return (
        <ThemedView>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => `__${index}`}
                ListHeaderComponent={
                    <View>
                        <FlatButton text={'Загрузить еще'} />
                    </View>
                }
                renderItem = {({item}) =>
                    <Message
                        body={item.body}
                        user={item.user}
                        isOwner={item.isOwner}
                    />
                }
                initialScrollIndex={messages.length - 1}
            />
        </ThemedView>
    )
};

export default MessagesScreen;
