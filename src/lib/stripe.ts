import { Alert } from "react-native";
import { supabase } from "./supabase";


const fetchPaymentSheetParams = async (amount: number) => {
    const {data, error} = await supabase.functions.invoke('payment-sheet', {body: {amount}})
    if(data) return data
    Alert.alert('Error', error.message)
    return {};
}

export const initialisePayment = async (amount: number) => {
    console.log('Initialising payment sheet for amount: ', amount);
    const {data} = await fetchPaymentSheetParams(amount)
    console.log('Payment sheet params: ', data);
}