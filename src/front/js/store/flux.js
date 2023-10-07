import swal from "sweetalert2";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      accessToken: null,
      userInfo: {},
      message: null,
      pets: [],
      singlePet: [],
      signup: [],
      signupKeeper: [],
      getKeepers: [],
      currentUser: [],
      profilePic: null,
    },
    actions: {
      getPets: async () => {
        const { pets } = getStore();
        try {
          fetch(process.env.BACKEND_URL + "/api/pets")
            .then((resp) => {
              if (!resp.ok) {
                console.error(resp.status + ": " + resp.statusText);
              }
              return resp.json();
            })
            .then((data) => {
              console.log(data);
              setStore({ pets: data });
            });
        } catch (error) {
          console.error(error);
        }
      },
      //Get pets by owner id
      getOwnerPets: async (owner_id) => {
        const { pets } = getStore();
        try {
          fetch(process.env.BACKEND_URL + `/api/pets/owner/${owner_id}`)
            .then((resp) => {
              if (!resp.ok) {
                if (resp.status == 404) {
                  throw Error({ "msg": "User does not exist" });
                }
                console.error(resp.status + ": " + resp.statusText);
              }
              return resp.json();
            })
            .then((data) => {
              setStore({ pets: data });
              return "ok";
            });
        } catch (error) {
          console.error(error);
        }
      },
      createPet: async (obj) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/pets`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          })
          if (!response.ok) {
            console.error(response.status + ": " + response.statusText)
          }
          let data = await response.json()
          getActions().getOwnerPets(obj.owner_id);
          return data
        } catch (error) {
          console.error(error);
        }
      },
      updatePet: async (obj) => {
        try {
          fetch(process.env.BACKEND_URL + `/api/pets/${obj.id}`, {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw Error(response.status + ": " + response.statusText);
              }
              return response.json();
            })
            .then((data) => {
              console.log("Successfully updated pet: " + data);
              //getActions().getOwnerPets(obj.owner_id);
              const { pets } = getStore()
              let arr = pets
              for (let pet in arr) {
                if (arr[pet].id == obj.id) {
                  arr[pet] = obj
                  console.log({ obj })
                  console.log(arr[pet])
                }
              }
              setStore({ pets: arr })
            });
        } catch (error) {
          console.error(error);
        }
      },
      getPet: async (id) => {
        const { singlePet } = getStore();
        try {
          fetch(process.env.BACKEND_URL + `/api/pets/${id}`)
            .then((resp) => {
              if (!resp.ok) {
                console.error(resp.status + ": " + resp.statusText);
              }
              return resp.json();
            })
            .then((data) => {
              console.log(data);
              setStore({ singlePet: data });
            });
        } catch (error) {
          console.error(error);
        }
      },
      deletePet: async (obj) => {
        try {
          fetch(process.env.BACKEND_URL + `/api/pets/${obj.id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                if (response.status == 404) {
                  throw Error("No pet associated with ID provided");
                } else {
                  throw Error(response.status + ": " + response.statusText);
                }
              }
              return response.json();
            })
            .then((data) => {
              console.log({ data } + " Succesfully deleted pet from server");
              //setStore({pets:data})
              getActions().getOwnerPets(obj.owner_id);
            });
        } catch (error) {
          console.error({ error });
          return;
        }
      },

      apiFetch: async (endpoint, method = "GET", body = null) => {
        var request;
        if (method == "GET") {
          request = await fetch(process.env.BACKEND_URL + "/api" + endpoint);
        } else {
          const params = {
            method,
            headers: {
              "Content-Type": "application/json",
            },
          };
          if (body) params.body = JSON.stringify(body);
          request = fetch(process.env.BACKEND_URL + "/api" + endpoint, params);
        }
        const resp = await request;
        const data = await resp.json();
        return { code: resp.status, data };
      },

      apiFetchProtected: async (endpoint, method = "GET", body = null) => {
        const { accessToken } = getStore();
        if (!accessToken || accessToken === "null") {
          localStorage.setItem("userInfo", {});
          return "No token"; //error 422
        }
        const params = {
          method,
          headers: {
            /* prettier-ignore */
            'Authorization': "Bearer " + accessToken,
          },
        };
        if (body) {
          params.headers["Content-Type"] = "application/json";
          params.body = JSON.stringify(body);
        }
        const resp = await fetch(
          process.env.BACKEND_URL + "/api" + endpoint,
          params
        );
        const data = await resp.json();
        return { code: resp.status, data };
      },

      loadTokens: () => {
        let token = localStorage.getItem("accessToken");
        let userData = {}
        if (localStorage.hasOwnProperty("userInfo") != null) {
          userData = JSON.parse(localStorage.getItem("userInfo"))
        }
        if (token) {
          setStore({ accessToken: token });
          setStore({ userInfo: userData })
        }
      },

      login: async (email, password) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch("/login", "POST", {
          email,
          password,
        });

        console.log({ resp });
        const { message, token, user_id, user_type } = resp.data;
        localStorage.setItem("accessToken", token);
        setStore({ accessToken: token });
        setStore({ userInfo: { "userId": user_id, "user_type": user_type } })
        localStorage.setItem("userInfo", JSON.stringify({ "userId": user_id, "user_type": user_type }))
        return resp.code;
      },

      logout: () => {
        setStore({ accessToken: null });
        setStore({ userInfo: {} })
        localStorage.setItem("userInfo", {});
        localStorage.setItem("accessToken", null);
      },

      getUserInfo: async () => {
        const { apiFetchProtected } = getActions();
        const resp = await apiFetchProtected("/helloprotected");
        setStore({ userInfo: resp.data });
        return "Ok";
      },
      signup: async (first_name, last_name, email, location, password) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch("/signup", "POST", {
          first_name,
          last_name,
          email,
          location,
          password,
        });
        if (resp.code === 201) {
          console.log("Signup Succesfully");
          return resp;
        }
        navigate("/login");
        console.log(resp);
      },

      signupKeeper: async (
        first_name,
        last_name,
        email,
        location,
        password
      ) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch("/signup/keeper", "POST", {
          first_name,
          last_name,
          email,
          location,
          password,
        });
        if (resp.code === 201) {
          console.log("Signup Succesfully");
          return resp;
        }
        navigate("/login");
        console.log(resp);
      },
      getKeeper: async (id) => {
        const { apiFetch } = getActions()
        const response = await apiFetch(`/keeper/${id}`, "GET");
        setStore({ currentUser: response.data })
        return response.data
      },
      updateKeeper: async (obj) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch(`/keeper/${obj.id}`, "PUT", {
          first_name: obj.first_name,
          last_name: obj.last_name,
          hourly_pay: obj.hourly_pay,
          description: obj.description,
          experience: obj.experience,
          services: obj.services,
          location: obj.location,
        });
        if (resp.code != 200) {
          console.error("Error saving profile, code: " + resp.code);
          return resp;
        }
        const { currentUser } = getStore()
        let user = resp.data
        Object.assign(resp.data, { "profile_pic": currentUser.profile_pic })
        setStore({ currentUser: user })
      },
      uploadPicture: async (formData, id) => {
        const { accessToken } = getStore();
        if (!accessToken) {
          return "No token";
        }
        const resp = await fetch(process.env.BACKEND_URL + `/api/avatar/${id}`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        });
        if (!resp.ok) {
          console.error("Error saving picture, code: " + resp.code);
          return resp;
        }
        const { currentUser } = getStore()
        let data = await resp.json()
        let user = currentUser
        user["profile_pic"] = data.public_url
        setStore({ currentUser: user })
        console.log("User info updated")
        return user
      },
      uploadpetAvatar: async (formData, id) => {
        const { accessToken } = getStore();
        if (!accessToken) {
          return "No token";
        }
        const resp = await fetch(process.env.BACKEND_URL + `/api/pet_avatar/${id}`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        });
        if (!resp.ok) {
          console.error("Error saving picture, code: " + resp.code);
          return resp;
        }
        let data = await resp.json()
        return data
      },

      getKeepers: async () => {
        try {
          const store = getStore();
          const { apiFetch } = getActions();

          const resp = await apiFetch("/keeper", "GET");

          if (resp.code === 200) {
            setStore({ getKeepers: resp.data });
          } else {
            console.error("Error al obtener los keepers:", resp);
          }
        } catch (error) {
          console.error("Error en getKeepers:", error);
        }
      },

      getOwner: async (id) => {
        try {
          fetch(process.env.BACKEND_URL + `/api/owner/${id}`).then(resp => {
            if (!resp.ok) {
              console.error(resp.status + ": " + resp.statusText)
            }
            return resp.json();
          }).then(data => {
            console.log("retrieved owner data successfully => " + data)
            setStore({ currentUser: data })
            setStore({ pets: data.pets })
            return data;
          })
        } catch (error) {
          console.error(error);
        }
      },
      updateOwner: async (obj) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch(`/owner/${obj.id}`, "PUT", {
          "first_name": obj.first_name,
          "last_name": obj.last_name,
          "description": obj.description,
          "location": obj.location
        });
        if (resp.code != 200) {
          console.error("Error saving profile, code: " + resp.code);
          return resp;
        }
        setStore({ currentUser: resp.data })
      },
      getdailySlots: async (id, date) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch(`/bookings/${id}/?start_date=${date}`, "GET")
        if (resp.code != 200) {
          console.error(resp.status + ": " + resp.statusText)
        }
        return resp.data
      },
      requestPasswordRecovery: async (email) => {
        console.log(email);
        const response = await getActions().apiFetch(`/recoverypassword`, "POST", { email })


        return response
      },
      changePasswordWithToken: async (tokenPassword, password) => {
        let resp = await fetch(process.env.BACKEND_URL + `/api/changepassword`, {
          method: "POST",
          body: JSON.stringify({ password }),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer  ${tokenPassword}`
          },
        }
        )

        return resp
      },
    }
  };
};

export default getState;