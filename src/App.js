import React, {useContext, useEffect, useRef, useState} from "react";
import './styles/app.css'
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import PostFilter from "./components/postFilter";
import MyModal from "./components/UI/Modal/myModal";
import MyButton from "./components/UI/button/myButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/postService";
import Loader from "./components/UI/loader/Loader";
import {getPagesArray, getPagesCount} from "./utils/pages";
import {useObserver} from "./hooks/useObserver";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter]= useState({sort:'', query:''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [IsPostLoading, setIsPostLoading] = useState(true)
    const[totalPages, setTotalPages]=useState(0)
    const[limit, setLimit] = useState(10)
    const[page, setPage] = useState(1)
    const lastElement = useRef()
    let pagesArray = getPagesArray(totalPages)

    useObserver(lastElement, page < totalPages, IsPostLoading ,()=>{
        setPage(page + 1)
    })

    useEffect(()=> {
        getPosts()
    },[page])

    const createPost = (newPost) => {
        setPosts([...posts,newPost])
        console.log(posts)
        setModal(false)

    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

   async function getPosts() {
       setIsPostLoading(true)
       const response = await PostService.getALL(limit, page)
       setPosts([...posts, ...response.data])
       const totalCount = response.totalCount
       setTotalPages(getPagesCount(totalCount, limit))
       setIsPostLoading(false)
   }


    return (
            <div className="App">
                <MyButton style={{marginTop: '20px'}} onClick={() => setModal(true)}>
                    Create new post
                </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost} />
                </MyModal>
                <hr style={{margin:'15px 0'}}/>
                <PostFilter filter={filter} setFilter={setFilter}/>

                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'List'}/>
                <div ref={lastElement} style={{height:'20px', background: 'white'}}></div>
                {IsPostLoading &&
                    <div style={{display: "flex", justifyContent: "center"}}><Loader/></div>
                }
                <div className="page__wrapper">
                    {pagesArray.map(p =>
                            <span
                                onClick={() => setPage(p)}
                                key={p}
                                className={page === p ? 'page page__current': 'page'}>
                                {p}</span>
                    )}
                </div>
            </div>
  );
}

export default App;
