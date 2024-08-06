import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from "react-navigation";
import { blue } from "../constants";
const Admission = () => {
    const [formData, setFormData] = useState({
        name: "",
        date: new Date(),
        fatherName: "",
        studentName:'',
        branch:'',
        Vertical:'select'
      });
    
      const [showDatePicker, setShowDatePicker] = useState(false);
    
      const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || formData.date;
        setShowDatePicker(Platform.OS === 'ios');
        setFormData({ ...formData, date: currentDate });
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
              <Text style={styles.title}>Admission</Text>
              <View style={styles.separator}></View>
              <Text style={styles.caption}>Feed Your Admission Done Details.</Text>
    
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
                <Text style={styles.label}>Admission Date</Text>
                <View style={[styles.datePickerContainer, { borderWidth: 1, borderColor: 'black', alignItems: 'center', paddingTop: 10, paddingBottom: 5, borderRadius: 5 }]}>
                  <TextInput
                    style={{ flexGrow: 1, paddingHorizontal: 10 }}
                    value={formData.date.toLocaleDateString()}
                    placeholder="Select Date"
                    editable={true}
                  />
                  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateIcon}>
                    <Icon name="date-range" size={24} color="black" />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formData.date}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                    />
                  )}
                </View>
              </View>
    

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  value={formData.fatherName}
                  onChangeText={value => handleInputChange('fatherName', value)}
                  placeholder="Enter Father's Name"
                  style={styles.inputText}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Student's Name</Text>
                <TextInput
                  value={formData.studentName}
                  onChangeText={value => handleInputChange('studentName', value)}
                  placeholder="Enter Student's Name"
                  style={styles.inputText}
                />
              </View>
    
    
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Branch/Class</Text>
                <TextInput
                  value={formData.branch}
                  onChangeText={value => handleInputChange('branch', value)}
                  placeholder="Enter Branch/Class "
                  style={styles.inputText}
                />
              </View>
    
    
    
              <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Vertical Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.Vertical}
                onValueChange={(itemValue) => handleInputChange('Vertical', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="select" />
                <Picker.Item label="Type 1" value="type1" />
                <Picker.Item label="Type 2" value="type2" />
              </Picker>
            </View>
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


export default Admission;