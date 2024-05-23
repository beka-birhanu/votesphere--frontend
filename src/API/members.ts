import axios from 'axios';

export async function fetchMembers(groupID: string) {
    try {
        const url = `/groups/${groupID}/members`;
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching members:', error);
        throw error;
    }
}

export async function addMember(username: string, groupID: string) {
    const url = `/groups/${groupID}/members`;

    return axios.post(url, { username });
}
