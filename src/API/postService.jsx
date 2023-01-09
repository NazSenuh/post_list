import axios from "axios";

export default class PostService{
    static async getALL(limit=10, page = 1){
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
            params:{
                _limit:limit,
                _page:page
            }
        })
        let arr = []
        arr = response.data
        let res = {data: arr, totalCount: response.headers['x-total-count']}
        return res

    }
}