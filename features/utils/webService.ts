import axios from 'axios';

export class WebServices {

    public async getMethod(path: string): Promise<any> {
        try {
            const response = await axios.get(path);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new WebServices();