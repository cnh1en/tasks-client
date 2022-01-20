// import axios from "axios";

// const setAuth = () => async (dispatch) => {
//   try {
//     const response = await axios.get("/api/v1/user", {
//       headers: {
//         "X-API-Key": localStorage.getItem("api_key"),
//       },
//     });
//     if (response.data.success) {
//       dispatch({
//         type: "SET_AUTH_SUCCESS",
//       });
//     }
//   } catch (error) {
//     localStorage.removeItem("api_key");
//     dispatch({
//       type: "SET_AUTH_FAILURE",
//     });
//   }
// };
// const login = () => (dispatch) => {
//   return dispatch({
//     type: "SET_AUTH_SUCCESS",
//   });
// };
// const logout = () => {
//   return {
//     type: "LOG_OUT",
//   };
// };
// export { setAuth, login, logout };
