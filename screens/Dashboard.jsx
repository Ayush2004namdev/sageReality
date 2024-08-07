import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { blue, yellow } from '../constants';
import { Ionicons } from '@expo/vector-icons';



const Dashboard = ({ navigation }) => {

  const cardTemplate = [
    { id: 0, text_id: 'total_panding_FW', text: "Today's Pending Follow Up", number: 0, targetNo: 10, backgroundColor: '#FFD166' },
    { id: null, text_id: 'total_event', text: 'Events Done', number: 0, targetNo: 10, backgroundColor: '#EF476F' },
    { id: 1, text_id: 'total_leads', text: 'Leads', number: 10, targetNo: 10, backgroundColor: '#06D6A0' },
    { id: 2, text_id: 'total_corp_visit', text: 'Corporate Visit', number: 10, targetNo: 10, backgroundColor: '#118AB2' },
    { id: 3, text_id: 'total_followUP', text: 'Follow Up', number: 10, targetNo: 10, backgroundColor: '#073B4C' },
    { id: 4, text_id: 'total_home_visit', text: 'Home Visit', number: 10, targetNo: 10, backgroundColor: '#A7C957' },
    { id: 5, text_id: 'total_SM_FW', text: 'Sage Mitra Follow Up', number: 10, targetNo: 10, backgroundColor: '#F4A261' },
    { id: 6, text_id: 'total_site_visit', text: 'Site Visit', number: 10, targetNo: 10, backgroundColor: '#2A9D8F' },
    { id: 7, text_id: 'total_admission', text: 'Admission', number: 10, targetNo: 10, backgroundColor: '#E76F51' },
    { id: 8, text_id: 'total_ip', text: 'IP', number: 10, targetNo: 10, backgroundColor: '#E9C46A' },
  ];
  

  const [cardData, setCardData] = useState(cardTemplate);

  const {user} = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      axios.get(`http://10.22.130.15:8000/api/Dashboard/${user.user.first_name}` ,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${user.access}`
        }
      }).then((res) => {
        res?.data?.targets.forEach((target) => {
          const card = cardTemplate.find((card) => card.id === target.id);
          if(card){
            card.targetNo = target.target;
          }
        })
        console.log(res?.data?.total);
        Object.entries(res?.data?.total).forEach(([key, value]) => {
          const card = cardTemplate.find((card) => card.text_id.toString() === key.toString());
          if(card){
            card.number = value;
          }
        });
  
        console.log({cardTemplate});
        console.log('dashboard');
        console.log(res?.data);  
        setCardData(cardTemplate);
      }).catch((err) => console.log({err}));
    },[])
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.devider}>
          {cardData && cardData.map((card) => (
            <View style={[styles.innerContainer , {backgroundColor:card.backgroundColor}]}>
              <View style={styles.textContainer}>
                <View style={{display:'flex' , flexDirection:'row' , gap:5 , alignItems:'center'}}>
                  <Ionicons name="people-outline" size={24} color={'white'} />
                  <Text style={styles.dialogText}>{card.text}</Text>
                </View>
                <Text style={styles.dialogNumber}>{card.number}{card.targetNo && `/ ${card.targetNo}`}</Text>
              </View>
            
          </View>
          ))}
          </View>
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
    paddingBottom: 20,
  },
  dialogNumber: {
    color: 'white', 
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  dialogText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textContainer:{
    display:'flex',
    width:'100%',
    flexDirection:'column',
    justifyContent:'space-between',
  },
  innerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transition: 'all 0.2s ease',
    width:'46%',
    height:100,
    padding:10,
  },
  devider:{
    display:'flex',
    flexDirection:'row',
    gap:20,
    flexWrap:'wrap',
    paddingBottom:30,
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
