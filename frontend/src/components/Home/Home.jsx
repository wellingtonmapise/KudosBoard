import BoardList from "../Board/BoardList";
import Category from "../Category/Category";
import CreateBoard from "../CreateBoard/CreateBoard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Search from "../Search/Search";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const handleClearSearch = (value) => { setSearch('') };
  const handleSearchChange = (value) => { setSearch(value) };

  return (
    <>
    <div className="home-page">
    <Header/>
    <Search
    onSearchChange={handleSearchChange}
    onClear={handleClearSearch}
    />
    <Category/>
    <CreateBoard/>
    <BoardList search={search}/>
    </div>
     <Footer/>
     </>
  );
};
export default Home;
