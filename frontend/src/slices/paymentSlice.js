import { createSlice } from "@reduxjs/toolkit";



const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentDetail: {},
        userpayments : [],
        isLoading: false,
    },
    reducers: {
        createpaymentRequest(state, action) {
            return {
                ...state,
                isLoading: true
            }
        },
        createpaymentSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                paymentDetail: action.payload.payment
            }
        },
        createpaymentFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        userpaymentsRequest(state, action) {
            return { 
                ...state,
                isLoading: true
            }
        },
        userpaymentsSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                userpayments: action.payload.payments,
                totalAmount:action.payload.totalAmount,
                totalCount:action.payload.totalCount,
                totalsOfCountAmount:action.payload.post_per_month_Totals,
                
            }
        },
        userpaymentsFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        },
        paymentDetailRequest(state, action) {
            return {
                ...state,
                isLoading: true
            }
        },
        paymentDetailSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                paymentDetail: action.payload.payment
            }
        },
        paymentDetailFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        },

    }
});

const { actions, reducer } = paymentSlice;

export const { 
    createpaymentFail,
    createpaymentSuccess,
    createpaymentRequest,
    clearError,
    userpaymentsFail,
    userpaymentsSuccess,
    userpaymentsRequest,
    paymentDetailFail,
    paymentDetailSuccess,
    paymentDetailRequest,
 } = actions;

export default reducer;