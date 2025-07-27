import React, { useState } from "react";
import {Text, View, StyleSheet, TextInput, Alert, FlatList, Touchable, TouchableOpacity} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';


export default function AddTransaction(){

    const [selectDate, setSelectDate]=useState(new Date());
    const [showPicker, setShowPicker]=useState(false);
    const [showForm, setShowForm] = useState(false);
    const [type, setType]=useState('Expenditure');
    const [amount, setAmount]=useState=('');
    const [description, setDescription]=useState('');
    const [transactions, setTransactions]=useState([]);

    const handleAddTransaction=()=>{
        if(!amount || isNaN(amount)){
            //isNan->is not a number
            Alert.alert("Invalid Input");
            return;
        }

        //if valid, then
        const newEntry={
            id: Date.now().toString(),
            date: selectedDate.toISOString().split('T')[0],
            // YYYY-MM-DD **T** HH:MM:SS -> we take the first part
            type,
            amount: parseFloat(amount),
            description,
        };

        const updated=[newEntry, ...transactions].sort((a,b)=>
        b.date.localeCompare(a.date));
        //localCompare used to compare two strings
        //-1 if a comes before b, else 1. 0 if equal

        
        //resets
        setTransactions(updated);
        setAmount('');
        setDescription('');
        setShowForm(false);
    };

    const renderTransaction=({item})=>(
        <View style={styles.entry}>
            <Text style={styles.entryText}>{item.date} - {item.type}</Text>
            <Text style={styles.entryText}>BDT {item.amount} - {item.description}</Text>
        </View>
    );

    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Selected Date: {selectedDate.toDateString()}</Text>

            <TouchableOpacity style={styles.button} onPress={()=> setShowPicker(true)}>
                <Text style={styles.buttonText}>Change Date</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker value={selectedDate} mode="date" display="default" onChange={(event, date)=>{
                    if(date) setSelectedDate(date);
                    setShowPicker(false);
                    }}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={()=>setShowForm(true)}>
                <Text style={styles.buttonText}>Add New Transaction</Text>
            </TouchableOpacity>

            {showForm && (
                <View style={styles.form}> 
                    <View style={styles.typeToggle}> 
                        <TouchableOpacity style={[styles.typeButton, type==='Income' && styles.selectedType,]}
                            onPress={()=>setType('Income')}>
                                <Text>Income</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.typeButton, type === 'Expenditure' && styles.selectedType]}
                            onPress={()=>setType('Expenditure')}>
                                <Text>Expenditure</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput style={styles.input} placeholder="Amount" type="numeric" value={amount} onChangeText={setAmount}/>
                    <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription}/>

                    <TouchableOpacity style={styles.saveButton} onPress={handleAddTransaction}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList data={transactions} keyExtractor={(item)=>item.id} renderItem={renderTransaction} ListHeaderComponent={()=>transactions.length > 0 && (
                <Text style = {styles.subheading}>Saved Transaction</Text>
                )}
            />
        </View>  
    );
}

const styles=StyleSheet.create({

    container:{flex: 1, padding: 20,},
    heading:{fontSize: 18, fontWeight: 'bold',},
    subheading:{fontSize: 16, marginTop: 20, marginBottom: 10, fontWeight: 'bold',},
    button:{backgroundColor: '#4caf50', paddding: 12, marginTop: 10, borderRadius: 9, alignItems: 'center',},
    saveButton:{backgroundColor: '#2196f3', padding: 12, marginTop: 10, borderRadius: 8, alignItems: 'center'},
    buttonText:{color: 'white', fontSize: 16, },
    form:{marginTop: 20,},
    typeToggle:{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,},
    typeButton:{flex:1, padding:10, borderWidth: 1, alignItems: 'center', borderColor: '#ccc', backgroundColor:'#eee',},
    selectedType:{backgroundColor: '#d0f0c0',},
    input:{borderWidth:1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10,},
    entry:{padding: 12, borderBottomWidth: 1, borderColor: '#eee',},
    entryText: {fontSize: 15, },

})