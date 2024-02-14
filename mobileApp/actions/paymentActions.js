import axios from "axios"
import { createpaymentFail, createpaymentRequest, createpaymentSuccess, paymentDetailFail, paymentDetailRequest, paymentDetailSuccess, userpaymentsFail, userpaymentsRequest, userpaymentsSuccess } from "../slices/paymentSlice"

export const createPayment=payment=>async(dispatch)=>
{
    try {
        dispatch(createpaymentRequest())
        const {data}=await axios.post(`/SiteSupplyCraft/payment/new`,payment)
        dispatch(createpaymentSuccess(data))
    } catch (error) {
        dispatch(createpaymentFail(error.response.data.message))
    }
}
export const getAllPayments=async(dispatch)=>
{
    try {
        dispatch(userpaymentsRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/payments`)
        dispatch(userpaymentsSuccess(data))
    } catch (error) {
        dispatch(userpaymentsFail(error.response.data.message))
    }
}
export const paymentDetail=async(dispatch)=>
{
    try {
        dispatch(tailRequest())
        const {data}=await axios.post(`/SiteSupplyCraft/payment/${id}`)
        dispatch(paymentDetailSuccess(data))
    } catch (error) {
        dispatch(paymentDetailFail(error.response.data.message))
    }
}