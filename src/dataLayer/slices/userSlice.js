import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        highScoreRevenue: null,
        highScoreRating: null,
        highScoreRunTime: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state, _) => {
            state.user = null
        },
        setHighScoreRevenue: (state, action) => {
            state.highScoreRevenue = action.payload
        },
        setHighScoreRating: (state, action) => {
            state.highScoreRating = action.payload
        },
        setHighScoreRunTime: (state, action) => {
            state.highScoreRunTime = action.payload
        },
        setHighScores: (state, action) => {
            state.highScoreRevenue = action.payload.highScoreRevenue
            state.highScoreRating = action.payload.highScoreRating
            state.highScoreRunTime = action.payload.highScoreRunTime
        }

    }
})


export const { login, logout, setHighScoreRevenue, setHighScoreRating, setHighScoreRunTime, setHighScores } = userSlice.actions

export const selectUser = state => state.user.user
export const selectHighScoreRevenue = state => state.user.highScoreRevenue
export const selectHighScoreRating = state => state.user.highScoreRating
export const selectHighScoreRunTime = state => state.user.highScoreRunTime


export default userSlice.reducer