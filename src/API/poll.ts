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
    const response = await axios.post(url, { adminUsername, groupID, poll });

    return response.data;
}

export async function castVote(pollID: string, optionID: string) {
    const url = `/polls/${pollID}/vote` + new URLSearchParams({ optionID });
    const response = await axios.patch(url);

    return response.data;
}
