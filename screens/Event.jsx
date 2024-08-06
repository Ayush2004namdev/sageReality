import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from "react-navigation";
import { blue } from "../constants";
const Event = () => {
    const [formData, setFormData] = useState({
        name: "",
        eventType:'select',
        eventName:'',
        startDate: new Date(),
        endDate: new Date(),
        eventDetails:'',
        numberOfAttendiees:'',
        numberOfLeads:'',
      });
    
      const [showDatePicker, setShowDatePicker] = useState(false);
    
      const onStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || formData.startDate;
        setShowDatePicker(Platform.OS === 'ios');
        setFormData({ ...formData, startDate: currentDate });
      };
    
      const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || formData.endDate;
        setShowDatePicker(Platform.OS === 'ios');
        setFormData({ ...formData, endDate: currentDate });
      };
    
      const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
      };
    
    
    
    
      const handleSubmit = () => {
        const emptyField = Object.keys(formData).find(key => !formData[key]);
    
        if (emptyField) {
          Alert.alert(
            "Validation Error",
            `Please fill out the ${emptyField} field.`,
            [
              { text: "OK", onPress: () => console.log(`Focus on ${emptyField} field`) },
            ],
            { cancelable: false }
          );
        } else {
          console.log(formData);
          Alert.alert("Success", "All fields are filled.", [{ text: "OK" }]);
        }
      };
    
     
    
      return (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Event Form</Text>
              <View style={styles.separator}></View>
              <Text style={styles.caption}>Feed Your Event Details.</Text>
    
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  value={formData.name}
                  onChangeText={value => handleInputChange('name', value)}
                  placeholder="Enter Your Name"
                  style={styles.inputText}
                />
              </View>

            
              <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Event Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.eventType}
                onValueChange={(itemValue) => handleInputChange('eventType', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="select" />
                <Picker.Item label="Type 1" value="type1" />
                <Picker.Item label="Type 2" value="type2" />
              </Picker>
            </View>
          </View>
              
          <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Name</Text>
                <TextInput
                  value={formData.eventName}
                  onChangeText={value => handleInputChange('eventName', value)}
                  placeholder="Enter Event Name"
                  style={styles.inputText}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Start Date</Text>
                <View style={[styles.datePickerContainer, { borderWidth: 1, borderColor: 'black', alignItems: 'center', paddingTop: 10, paddingBottom: 5, borderRadius: 5 }]}>
                  <TextInput
                    style={{ flexGrow: 1, paddingHorizontal: 10 }}
                    value={formData.startDate.toLocaleDateString()}
                    placeholder="Select Date"
                    editable={true}
                  />
                  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateIcon}>
                    <Icon name="date-range" size={24} color="black" />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formData.startDate}
                      mode="date"
                      display="default"
                      onChange={onStartDateChange}
                    />
                  )}
                </View>
              </View>
    
              <View style={styles.inputGroup}>
                <Text style={styles.label}>End Date</Text>
                <View style={[styles.datePickerContainer, { borderWidth: 1, borderColor: 'black', alignItems: 'center', paddingTop: 10, paddingBottom: 5, borderRadius: 5 }]}>
                  <TextInput
                    style={{ flexGrow: 1, paddingHorizontal: 10 }}
                    value={formData.endDate.toLocaleDateString()}
                    placeholder="Select Date"
                    editable={true}
                  />
                  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateIcon}>
                    <Icon name="date-range" size={24} color="black" />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formData.endDate}
                      mode="date"
                      display="default"
                      onChange={onEndDateChange}
                    />
                  )}
                </View>
              </View>
    
              
    
    
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Details</Text>
                <TextInput
                  value={formData.eventDetails}
                  onChangeText={value => handleInputChange('eventDetails', value)}
                  placeholder="Enter Event Details"
                  style={styles.inputText}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number Of Attendees</Text>
                <TextInput
                  value={formData.numberOfAttendiees}
                  onChangeText={value => handleInputChange('numberOfAttendiees', value)}
                  placeholder="Enter Number of Attendees"
                  style={styles.inputText}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number of Leads</Text>
                <TextInput
                  value={formData.numberOfLeads}
                  onChangeText={value => handleInputChange('numberOfLeads', value)}
                  placeholder="Enter Number of Leads"
                  style={styles.inputText}
                    keyboardType="numeric"
                />
              </View>
    
    
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: 100, backgroundColor: "white" }}></View>
          </ScrollView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingVertical: 10,
      },
      title: {
        fontSize: 24,
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: blue,
        width: 70,
        marginVertical: 5,
      },
      caption: {
        color: "#000",
        fontSize: 12,
        marginTop: 1,
      },
      inputGroup: {
        marginVertical: 10,
      },
      label: {
        color: "#000",
        fontSize: 14,
        marginTop: 10,
      },
      inputText: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
      },
      pickerContainer: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        paddingBottom: 5,
        marginVertical: 5,
      },
      picker: {
        height: 50,
        width: '100%',
      },
      datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateIcon: {
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 10,
      },
      radioGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 5,
      },
      radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginRight: 10,
      },
      radioLabel: {
        marginLeft: 5,
      },
      submitButton: {
        backgroundColor: blue,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 20,
      },
      submitButtonText: {
        color: "white",
        fontSize: 16,
      },
      image : {
        width: 200,
        height: 200,
        borderRadius: 5,
        marginVertical: 5,
      }
    
    });


export default Event;