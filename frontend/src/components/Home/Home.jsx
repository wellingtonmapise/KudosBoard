import BoardList from "../Board/BoardList";
import Category from "../Category/Category";
import CreateBoard from "../CreateBoard/CreateBoard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Search from "../Search/Search";

const Home = () => {
  return (
    <>
    <div className="home-page">
    <Header/>
    <Search/>
    <Category/>
    <CreateBoard/>
    <BoardList/>
    </div>
     <Footer/>
     </>
  );
};
export default Home;