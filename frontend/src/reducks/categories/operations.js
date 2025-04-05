import { fetchCategoriesAction } from "./actions";
import axios from 'axios';

const categoriesUrl = process.env.REACT_APP_CATEGORIES_URL;

export const fetchCategories = () => {
    return async(dispatch) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');

        try {
            const response = await axios.get(`${categoriesUrl}`, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
                }
            });
            const categories = response.data;

            const categoriesList = [];
            categories.forEach(category => {
                categoriesList.push(category);
            });

            dispatch(fetchCategoriesAction(categoriesList));
        } catch(error) {
            console.error('Error Fetching Categories', error);
        }
    }
}
