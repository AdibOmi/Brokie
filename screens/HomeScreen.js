import React from "react";
import { KeyboardAvoidingView, Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({navigation}){

    // const [balance, setBalance] = useState(0);


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Fare Bean</Text>
            {/* <Text style={styles.balance}>Current Balance: BDT {balance.toFixed(1)}</Text> */}
        
            <Text style={styles.balance}>Current Balance: 
                <Text style={styles.balanceAmount}> BDT 1000</Text>
             </Text>
           
    

        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Add Transaction')}>
            <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Graphs</Text>
        </TouchableOpacity>
    </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        paddingTop: 60,
        padding: 30,
    },
    title:{
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15,
  
        
    
    },
    balance:{
        fontSize: 28,
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
    },

    balanceAmount:{
        fontSize: 24,
        // fontWeight: 'bold',
        fontWeight: '600'
    },



    button:{
        backgroundColor: '#07c5ffff',
        width: '80%',
        padding: 14,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
        marginVertical: 10,
    },

    buttonText:{
        color:'white',
        fontSize: 18,
        fontWeight: '600',
    },
})