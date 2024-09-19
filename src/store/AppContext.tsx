import { useContext, createContext, useState, ReactNode } from "react";

// Definir la estructura del estado `store`
interface Store {
    users: any[];
    name: string;
    email: string;
    password: string;
    username: string;
    lastname: string;
    role: string;
    token: string;
    userId: string;
    userImage: string;
    birthdate: string;
    userPhone: string;
    comments: any[];
    likes: any[];
    categories: any[];
    themes: any[];
    themeTitle: string;
    themeContent: string;
    themeCategory: string;
}

// Definir la estructura de las `actions`
interface Actions {
    signUp: (username: string, email: string, password: string) => Promise<void>;
    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    setName: (name: string) => void;
    setUsername: (username: string) => void;
    setLastname: (lastname: string) => void;
    setRole: (role: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setToken: (token: string) => void;
    setUserId: (userId: string) => void;
    setUsers: (users: any[]) => void;
    setCategories: (categories: any[]) => void;
    setComments: (comments: any[]) => void;
    setLikes: (likes: any[]) => void;
    setUserImage: (userImage: string) => void;
    setBirthdate: (birthdate: string) => void;
    setUserPhone: (userPhone: string) => void;
    editUser: (name: string, lastname: string, phone: string, image: string, birthdate: Date) => Promise<void>;
    getUsers: () => Promise<void>;
    setThemes: (themes: any[]) => void;
    addTheme: () => Promise<void>;
    getThemes: () => Promise<void>;
    deleteTheme: (id:number) => Promise<void>;
    editTheme: (id:number, title:string, content:string, category:string) => Promise<void>;
    setThemeTitle: (themeTitle: string) => void;
    setThemeContent: (themeContent: string) => void;
    setThemeCategory: (themeCategory: string) => void;
}

// Definir el tipo del contexto
interface AppContextType {
    store: Store;
    actions: Actions;
}

// Crear el contexto con un valor inicial vacío
const AppContext = createContext<AppContextType | undefined>(undefined);

// Definir el tipo de props que espera el `AppProvider`
interface AppProviderProps {
    children: ReactNode;
}

// Implementación del `AppProvider`
export const AppProvider = ({ children }: AppProviderProps) => {
    const [users, setUsers] = useState<any[]>(() => {
        const storedUsers = localStorage.getItem('users');
        try {
            return storedUsers ? JSON.parse(storedUsers) : [];
        } catch (error) {
            console.error("Error parsing users from localStorage:", error);
            return [];
        }
    });
    const [themes, setThemes] = useState<any[]>(() => {
        const storedThemes = localStorage.getItem('themes');
        try {
            return storedThemes ? JSON.parse(storedThemes) : [];
        } catch (error) {
            console.error("Error parsing themes from localStorage:", error);
            return [];
        }
    });

    const [categories, setCategories] = useState<any[]>(() => {
        const storedCategories = localStorage.getItem('categories');
        try {
            return storedCategories ? JSON.parse(storedCategories) : [];
        } catch (error) {
            console.error("Error parsing categories from localStorage:", error);
            return [];
        }
    });

    const [comments, setComments] = useState<any[]>(() => {
        const storedComments = localStorage.getItem('comments');
        try {
            return storedComments ? JSON.parse(storedComments) : [];
        } catch (error) {
            console.error("Error parsing comments from localStorage:", error);
            return [];
        }
    });

    const [likes, setLikes] = useState<any[]>(() => {
        const storedLikes = localStorage.getItem('likes');
        try {
            return storedLikes ? JSON.parse(storedLikes) : [];
        } catch (error) {
            console.error("Error parsing likes from localStorage:", error);
            return [];
        }
    });

    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [lastname, setLastname] = useState(localStorage.getItem('lastname') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [role, setRole] = useState(localStorage.getItem('role') || '')
    const [userImage, setUserImage] = useState(localStorage.getItem('userImage') || '')
    const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') || '')
    const [birthdate, setBirthdate] = useState(localStorage.getItem('birthdate') || '')
    const [themeTitle, setThemeTitle] = useState(localStorage.getItem('themeTitle') || '')
    const [themeContent, setThemeContent] = useState(localStorage.getItem('themeContent') || '')
    const [themeCategory, setThemeCategory] = useState(localStorage.getItem('themeCategory') || '')

    const signUp = async (username: string, email: string, password: string): Promise<void> => {
        try {
            // Enviar la solicitud POST usando fetch
            const response = await fetch('http://127.0.0.1:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.access_token) {
                // Guardar el token en el estado

                const updatedUsers = [...users, data];
                setUsers(updatedUsers);

                // Guardar el nuevo valor en localStorage
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('name', data.name);
                localStorage.setItem('lastname', data.lastname);
                localStorage.setItem('username', data.username);
                localStorage.setItem('email', data.email);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', data.role);
                setToken(data.access_token);
                setName(data.name);
                setLastname(data.lastname);
                setUsername(data.username);
                setEmail(data.email);
                setUserId(data.userId);
                setRole(data.role);
                await logIn(email, password);
            } else {
                console.error("Token no recibido:", data);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const logIn = async (email: string, password: string): Promise<void> => {
        try {
            const resp = await fetch(`http://127.0.0.1:5000/login`, {
                method: "POST",
                body: JSON.stringify({ username, email, password }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await resp.json();

            if (data.token) {

                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.name);
                localStorage.setItem('lastname', data.lastname);
                localStorage.setItem('username', data.username);
                localStorage.setItem('email', data.email);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userImage', data.image ? data.image : '');
                localStorage.setItem('birthdate', data.birthdate);
                localStorage.setItem('userPhone', data.phone);
                setToken(data.token);
                setName(data.name ? data.name : '');
                setLastname(data.lastname ? data.lastname : '');
                setUsername(data.username);
                setEmail(data.email);
                setUserId(data.userId);
                setRole(data.role);
                setUserImage(data.image ? data.image : '');
                setBirthdate(data.birthdate ? data.birthdate : '');
                setUserPhone(data.phone ? data.phone : '');
                console.log("Success:", data);
            } else {
                console.error("Token no recibido:", data);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        localStorage.removeItem('userImage');
        localStorage.removeItem('birthdate');
        localStorage.removeItem('userPhone');
        setToken('');
        setUsername('');
        setEmail('');
        setPassword('');
        setUserId('');
        setUserImage('');
        setUserPhone('');
        setBirthdate('');
    };

    const getUsers = async (): Promise<void> => {
        try {
            const response = await fetch('http://127.0.0.1:5000/users');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUsers([...data]);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
        }
    };

    const editUser = async (name: string, lastname: string, phone: string, image: string, birthdate: Date): Promise<void> => {
        try {
            const body = JSON.stringify({ name, lastname, phone, image, birthdate });
            console.log('Payload being sent:', body);
            const response = await fetch(`http://127.0.0.1:5000/edit/user/${userId}`, {
                method: "PUT",
                body: JSON.stringify({ name, lastname, phone, image, birthdate }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Actualiza el usuario en la lista existente
            setUsers(users.map(user => (user.id === userId ? data : user)));

            console.log('User updated successfully:', data);
        } catch (error) {
            console.error('There was an error updating the user:', error);
        }
    }

    const addTheme = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/theme', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: themeTitle,
					content: themeContent,
					category_id: themeCategory
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setThemes([...themes, data]);
				setThemeTitle(data.title);
				setThemeContent(data.themeContent);
				setThemeCategory(data.themeCategory);
			} else {
				console.error("Token no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const getThemes = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/themes');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setThemes([...data]);
		} catch (error) {
			console.error('There was an error fetching the themes!', error);
		}
	};

	const deleteTheme = async (id:number) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/theme/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setThemes(themes.filter(theme => theme.id !== id));

			console.log('Theme deleted successfully');
		} catch (error) {
			console.error('There was an error deleting theme:', error);
		}
	};

	const editTheme = async (id:number, title:string, content:string, category:string) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/edit/theme/${id}`, {
				method: "PUT",
				body: JSON.stringify({ title, content, category}),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			// Actualiza el usuario en la lista existente
			setThemes(themes.map(theme => (theme.id === id ? data : theme)));

			console.log('Theme updated successfully:', data);
		} catch (error) {
			console.error('There was an error updating the theme:', error);
		}
	}

    const store = { users, name, email, password, username, lastname, role, token, userId, userImage, birthdate, userPhone, comments, likes, categories, themes, themeTitle, themeContent, themeCategory }

    const actions = { signUp, logIn, logOut, setName, setUsername, setLastname, setRole, setEmail, setPassword, setToken, setUserId, setUsers, setCategories, setComments, setLikes, setUserImage, setBirthdate, setUserPhone, editUser, getUsers, setThemes, addTheme, editTheme, getThemes, deleteTheme, setThemeCategory, setThemeContent, setThemeTitle }

    return (
        <AppContext.Provider value={{ store, actions }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook para usar el contexto
const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export default useAppContext;
