import Category from "./styled/category";
import Collection from "./styled/collection";
import Slide from "./styled/slide";

const Main = () => {
  return (
    <div className="mx-auto flex flex-col items-center">
      <Slide />
      <Category />
      <Collection />
    </div>
  );
};

export default Main;
