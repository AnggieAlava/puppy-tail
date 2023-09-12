const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			login : []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
			   login : async (email) =>{
				try {
				  // Realiza una solicitud GET a la API para obtener la lista de usuarios
				  const response = await fetch('admin/user/');
				  
				  if (response.status === 200) {
					// Si la solicitud es exitosa, obtén la lista de usuarios en formato JSON
					const users = await response.json();
					
					// Compara el email proporcionado con los emails de los usuarios
					const userExists = users.some(user => user.email === email);
					
					return userExists;
				  } else {
					// Maneja el caso en el que la solicitud a la API no sea exitosa
					console.error('Error al obtener la lista de usuarios');
					return false;
				  }
				} catch (error) {
				  console.error('Error al verificar si el usuario existe:', error);
				  return false;
				}
			
			  }
			}
			,
			  getToken : () => {
				return localStorage.getItem('token');
			  },
			  
			  // Función para enviar solicitudes con el token
			  sendAuthenticatedRequest : async (url, method, body) => {
				const token = getToken();
			  
				const headers = {
				  'Content-Type': 'application/json',
				};
			  
				if (token) {
				  headers['Authorization'] = `Bearer ${token}`;
				}
			  
				const options = {
				  method,
				  headers,
				  body: JSON.stringify(body),
				};
			  
				try {
				  const response = await fetch(url, options);
			  
				  if (response.status === 401) {
					// Manejar el caso en el que el token haya expirado o no sea válido
					console.error('Token no válido o expirado');
				  } else {
					return response.json();
				  }
				} catch (error) {
				  console.error('Error al enviar la solicitud:', error);
				}
			  },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};


export default getState;
