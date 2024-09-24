import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
const App = () => {
  // const ParentComponent = (props) => {
  //   return (
  //     <>
  //       <div>Parent Component</div>
  //       <div>{props.children}</div>
  //     </>
  //   );
  // };

  // const ChildComponent = (props) => {
  //   return <div>Child Component</div>;
  // };
  return (
    <>
      {/* <ParentComponent>
        <ChildComponent />
      </ParentComponent> */}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
