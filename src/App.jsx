import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Flex, Spin } from "antd";
const App = () => {
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  const delay = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    await delay(300);
    if (res && res.data) {
      //success
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  return (
    <>
      {isAppLoading ? (
        <Flex
          style={{ width: "100vw", height: "100vh" }}
          justify={"center"}
          align={"center"}
        >
          <Spin tip="Loading..." size="large">
            <div
              style={{
                padding: 50,
                borderRadius: 4,
              }}
            />
          </Spin>
        </Flex>
      ) : (
        <>
          {/* <ParentComponent>
        <ChildComponent />
      </ParentComponent> */}
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
