import axios from 'axios';

const API_URL = 'http://localhost:8080'


export const getProjects = async() => {
    try {
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
    } catch(error) {
        console.log("Error fetching message: ", error);
        throw error;
    }
}

export const getContingent = async() => {
    try {
        const response = await axios.get(`${API_URL}/contingent`);
        return response.data;
    } catch(error) {
        console.log("Error fetching data: ", error)
        throw error;
    }
}

export const getRotation = async() => {
    try {
        const response = await axios.get(`${API_URL}/rotation`);
        console.log(response.data)
        return response.data;
    } catch(error) {
        console.log("Error fetching data: ", error);
        throw error;
    }
}

export const postHiring = async() => {
    try {
        const response = await axios.post()
    } catch(error) {
        console.log("Error adding data: ", error)
        throw error;
    }
}

export const updateContingencyProject = async(projectID, empIDs) => {
    try {
        const response = await axios.post(`${API_URL}/update-contingency`, {
            projectID,
            empIDs
        });
        return response.data;

    } catch(error) {
        console.error('Error updating contingency', error)
    }

}
export const checkoutforcontingent =(contingentlist)=>{
    try{
        return axios.get(`${API_URL}/checkout/contingent`,contingentlist)
        
    }
    catch(error)
    {
        console.log('error in fetching contingency',error)
    }
}