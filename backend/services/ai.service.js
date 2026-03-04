import axios from "axios";

export const generateSummary = async (transcript) =>{
    const response = await axios.post("http://localhost:8000/summarize",{
        transcript: transcript
    })

    return response.data.summary ;
}