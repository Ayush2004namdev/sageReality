import axios from 'axios';
import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const cardData = [
  { id: 1, number: '0', text: "Today's Pending F/W" },
  { id: 2, number: '0', text: 'Completed Tasks' },
  { id: 3, number: '0', text: 'Upcoming Deadlines' },
  { id: 4, number: '0', text: 'Recent Updates' },
  { id: 5, number: '0', text: 'Overdue Tasks' },
  { id: 6, number: '0', text: 'Team Notifications' },
  { id: 7, number: '0', text: 'Project Status' },
  { id: 9, number: '0', text: 'Scheduled Meetings' },
  { id: 8, number: '0', text: 'Client Feedback' },
];

const Dashboard = ({ navigation }) => {
  const navigate = navigation.navigate;
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    const url = `${process.env.BASE_URL}/Dashboard/${user.user.first_name}`;
    console.log(url);
    axios.get(`http://10.22.130.15:8000/api/Dashboard/${user.user.first_name}` ,{
      withCredentials: true,
      headers:{
        'Authorization': `Bearer ${user.access}`
      }
    }).then((res) => console.log({data:res.data})).catch((err) => console.log({err}));
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
       {/* {user && <Text>Hello {user.user.first_name}</Text>} */}

        <ScrollView style={styles.scroller}>
          {cardData.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.dialog}
              onPress={() => {}}
            >
              <Text style={styles.dialogText}>{card.text}</Text>
              <Text style={styles.dialogNumber}>{card.number}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.dummy}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  dialog: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    transition: 'all 0.2s ease',
  },
  dialogNumber: {
    color: '#1E88E5', 
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },
  dialogText: {
    color: 'black',
    fontSize: 16,
  },
  scroller: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  dummy: {
    height: 150,
    width: '100%',
    backgroundColor: 'white',
  },
});
