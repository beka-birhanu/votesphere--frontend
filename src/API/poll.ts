import axios from 'axios';

export async function fetchPolls(groupID: string) {
    try {
        const url = '/polls?' + new URLSearchParams({ groupID });
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching polls:', error);
        throw error;
    }
}

export async function addPoll(adminUsername: string, groupID: string, poll: { question: string; options: string[] }) {
    const url = `/polls`;
    const data = await axios.post(url, { adminUsername, groupID, poll });

    return data;
}
