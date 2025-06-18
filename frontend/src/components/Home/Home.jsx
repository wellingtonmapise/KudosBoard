import BoardList from "../Board/BoardList";
import Category from "../Category/Category";
import CreateBoard from "../CreateBoard/CreateBoard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Search from "../Search/Search";
import { useState, useEffect } from "react";
import { getBoards,postBoards} from "../../utils/data";


const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleClearSearch = (value) => { setSearch('') };
  const handleSearchChange = (value) => { setSearch(value) };
  const handleCategoryChange = (value) => { setCategory(value) };
  const handleCreateBoard = async (newBoardData) => {
    try {
      await postBoards(newBoardData);
      const updatedBoards = await getBoards(search, category);
      setBoards(updatedBoards);
    } catch (err) {
      console.error(err);
    }
  };



    const [boards, setBoards] = useState([]);

    useEffect(() => {
      getBoards(search,category)
        .then((data) => {
          setBoards(data);
        })
        .catch(console.error);
    }, [search, category]);

  return (
    <>
    <div className="home-page">
    <Header/>
    <Search
    onSearchChange={handleSearchChange}
    onClear={handleClearSearch}
    />
    <Category onCategoryChange={handleCategoryChange}/>
    <CreateBoard onCreate={handleCreateBoard}/>
    <BoardList boards ={boards} setBoards={setBoards}/>
    </div>
     <Footer/>
     </>
  );
};
export default Home;
