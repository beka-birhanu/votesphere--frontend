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
