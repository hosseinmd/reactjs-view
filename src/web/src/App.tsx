import { Route, Routes } from "react-router-dom";
import { View } from "reactjs-view";
import { AppProviders } from "./appProviders";

const App = () => {
  return (
    <AppProviders>
      <Routes>
        <Route
          path="*"
          element={
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Routes>
                  <Route path="/team" element={<div>team</div>} />
                  <Route path="/user" element={<div>user</div>} />
                  <Route path="/timeline" element={<div>timeline</div>} />
                  <Route path="/screen" element={<div>screen</div>} />
                  <Route
                    path="/productivity"
                    element={<div>productivity</div>}
                  />
                </Routes>
              </View>
            </View>
          }
        />
      </Routes>
    </AppProviders>
  );
};

export default App;
