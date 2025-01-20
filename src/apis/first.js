import axios from 'axios'
import React from 'react'
import { apiConst } from './apiConst';


const API_BASE_URL = 'http://192.168.29.229:3001/v1/'

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
    timeout: 10000,
});

export async function taskCreate(payload) {
    try {
        const res = await axiosInstance.post(apiConst.CREATE, payload);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error during API call:", error);
        alert('error')
        throw error;
    }
}

export async function taskList(payload) {
    try {
        const res = await axiosInstance.post(apiConst.TASK_LIST, payload);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error;
    }
}

export async function taskUpdate({ id, payload }) {
    try {
        const res = await axiosInstance.put(`${apiConst.TASK}/${id}`, payload);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error;
    }
}

export async function taskUDelete(id) {
    try {
        const res = await axiosInstance.delete(`${apiConst.TASK}/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error;
    }
}
