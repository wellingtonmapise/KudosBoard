import BoardList from "../Board/BoardList";
import Category from "../Category/Category";
import CreateBoard from "../CreateBoard/CreateBoard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Search from "../Search/Search";

const Home = () => {
  return (
    <>
    <Header/>
    <Search/>
    <Footer/>
    <Category/>
    <CreateBoard/>
    <BoardList/>
    </>
  );
};
export default Home;