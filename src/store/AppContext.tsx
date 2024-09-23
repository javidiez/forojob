import { useContext, useEffect, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
    commentContent: string;
    themeAuthor: number;
    themeActive: boolean;
    commentAuthor: number;
    selectedCategory: number;
    categoryName: string;
    likeUser: number;
    likeTheme: number;
    likeComment: number;
    themeId: number;
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
    editCategory: (id:number, name: string) => Promise<void>;
    getUsers: () => Promise<void>;
    setThemes: (themes: any[]) => void;
    addTheme: () => Promise<void>;
    addComment: (themeId: number) => Promise<void>;
    addCategory: () => Promise<void>;
    addLike: (themeId: number) => Promise<void>;
    getThemes: () => Promise<void>;
    getCategories: () => Promise<void>;
    getLikes: () => Promise<void>;
    getComments: () => Promise<void>;
    deleteTheme: (id:number) => Promise<void>;
    deleteLike: (id:number) => Promise<void>;
    deleteCategory: (id:number) => Promise<void>;
    deleteComment: (id:number) => Promise<void>;
    editTheme: (id:number, title:string, content:string, category:string) => Promise<void>;
    editComment: (id:number, content:string) => Promise<void>;
    deactiveTheme: (id:number, active:boolean) => Promise<void>;
    deactiveUser: (id:number, active:boolean) => Promise<void>;
    setThemeTitle: (themeTitle: string) => void;
    setThemeContent: (themeContent: string) => void;
    setThemeCategory: (themeCategory: string) => void;
    setThemeAuthor: (themeAuthor: number) => void;
    setThemeActive: (themeActive: boolean) => void;
    setCommentAuthor: (commentAuthor: number) => void;
    setSelectedCategory: (selectedCategory: number) => void;
    setCommentContent: (commentContent: string) => void;
    setCategoryName: (categoryName: string) => void;
    setLikeUser: (likeUser: number) => void;
    setLikeTheme: (likeTheme: number) => void;
    setLikeComment: (likeComment: number) => void;
    setThemeId: (themeId: number) => void;
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
    const navigate = useNavigate()

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
    const [themeAuthor, setThemeAuthor] = useState(localStorage.getItem('themeAuthor') || '')
    const [themeActive, setThemeActive] = useState(localStorage.getItem('themeActive') || '')
    const [commentAuthor, setCommentAuthor] = useState(localStorage.getItem('commentAuthor') || '')
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // Categoría seleccionada
    const [commentContent, setCommentContent] = useState(localStorage.getItem('commentContent') || '')
    const [categoryName, setCategoryName] = useState(localStorage.getItem('categoryName') || '')
    const [likeUser, setLikeUser] = useState(localStorage.getItem('likeUser') || '')
    const [likeTheme, setLikeTheme] = useState(localStorage.getItem('likeTheme') || '')
    const [likeComment, setLikeComment] = useState(localStorage.getItem('likeComment') || '')
    const [themeId, setThemeId] = useState(localStorage.getItem('themeId') || '')
    
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

    const deactiveUser = async (id:number, active:boolean): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/deactive/user/${id}`, {
				method: "PUT",
				body: JSON.stringify({ active }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			// Actualiza el usuario en la lista existente
			setUsers(users.map(user => (user.id === id ? data : user)));
            getUsers();
			console.log('User deactivated/activated successfully:', data);
		} catch (error) {
			console.error('There was an error deactivating/activating the user:', error);
		}
	}

    const addTheme = async (): Promise<void> => {
        
		try {
			// Enviar la solicitud POST usando fetch
            const authorIdNumber = Number(userId);
			const response = await fetch('http://127.0.0.1:5000/add/theme', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: themeTitle,
					content: themeContent,
					category_id: selectedCategory,
                    author_id: authorIdNumber,
                    active: themeActive
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setThemes([...themes, data]);
				setThemeTitle(data.title);
				setThemeContent(data.content);
				setThemeCategory(data.category_id);
				setThemeAuthor(data.author_id);
				setThemeActive(data.active);
                setThemeId(data.id);
                navigate(`/theme/${data.id}`);
                setThemeTitle('')
                setThemeContent('')
                setSelectedCategory('')
			} else {
				console.error("Data no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const getThemes = async (): Promise<void> => {
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

	const deleteTheme = async (id:number): Promise<void> => {
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

	const editTheme = async (id:number, title:string, content:string, category:string): Promise<void> => {
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

    const deactiveTheme = async (id:number, active:boolean): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/deactive/theme/${id}`, {
				method: "PUT",
				body: JSON.stringify({ active }),
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
            getThemes();
			console.log('Theme deactivated successfully:', data);
		} catch (error) {
			console.error('There was an error deactivating the theme:', error);
		}
	}

    const getCategories = async (): Promise<void> => {
		try {
			const response = await fetch('http://127.0.0.1:5000/categories');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setCategories([...data]);
		} catch (error) {
			console.error('There was an error fetching the themes!', error);
		}
	};

    const addCategory = async (): Promise<void> => {
        
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/category', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: categoryName
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setCategories([...categories, data]);
				setCategoryName(data.name);
                setCategoryName('');
			} else {
				console.error("Data no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

    const deleteCategory = async (id:number): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/category/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setCategories(categories.filter(category => category.id !== id));

			console.log('Category deleted successfully');
		} catch (error) {
			console.error('There was an error deleting category:', error);
		}
	};

    const editCategory = async (id:number, name:string): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/edit/category/${id}`, {
				method: "PUT",
				body: JSON.stringify({ name }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			// Actualiza el usuario en la lista existente
			setCategories(categories.map(category => (category.id === id ? data : category)));
            getCategories()
			console.log('Category updated successfully:', data);
		} catch (error) {
			console.error('There was an error updating the category:', error);
		}
	}

    const getComments = async (): Promise<void> => {
		try {
			const response = await fetch('http://127.0.0.1:5000/comments');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setComments([...data]);
		} catch (error) {
			console.error('There was an error fetching the comments!', error);
		}
	};

    const addComment = async (themeId: number): Promise<void> => {
        
		try {
			// Enviar la solicitud POST usando fetch
            const authorIdNumber = Number(userId);
			const response = await fetch('http://127.0.0.1:5000/add/comment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: commentContent,
                    theme_id: themeId,
                    author_id: authorIdNumber
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setComments([...comments, data]);
				setCommentContent(data.title);
				setCommentAuthor(data.author_id);
			} else {
				console.error("Data no recibida:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

    const deleteComment = async (id:number): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/comment/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setComments(comments.filter(comment => comment.id !== id));

			console.log('Comment deleted successfully');
		} catch (error) {
			console.error('There was an error deleting comment:', error);
		}
	};

    const editComment = async (id:number, content:string): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/edit/comment/${id}`, {
				method: "PUT",
				body: JSON.stringify({ content }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			// Actualiza el usuario en la lista existente
			setComments(comments.map(comment => (comment.id === id ? data : comment)));

			console.log('Comment updated successfully:', data);
		} catch (error) {
			console.error('There was an error updating the comment:', error);
		}
	}

    const getLikes = async (): Promise<void> => {
		try {
			const response = await fetch('http://127.0.0.1:5000/likes');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setLikes([...data]);
		} catch (error) {
			console.error('There was an error fetching the likes!', error);
		}
	};

    const addLike = async (themeId: number): Promise<void> => {
        
		try {
			// Enviar la solicitud POST usando fetch
            const authorIdNumber = Number(userId);
			const response = await fetch('http://127.0.0.1:5000/add/like', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: authorIdNumber,
                    theme_id: themeId
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setLikes([...likes, data]);
				setLikeUser(data.user_id);
				setLikeTheme(data.theme_id);
			} else {
				console.error("Data no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

    const deleteLike = async (id:number): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/like/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setLikes(likes.filter(like => like.id !== id));

			console.log('Like deleted successfully');
		} catch (error) {
			console.error('There was an error deleting like:', error);
		}
	};


    const store = { users, name, email, password, username, lastname, role, token, userId, userImage, birthdate, userPhone, comments, likes, categories, themes, themeTitle, themeContent, themeCategory, themeAuthor, selectedCategory, commentAuthor, commentContent, themeActive, categoryName, likeUser, likeTheme, likeComment, themeId }

    const actions = { signUp, logIn, logOut, setName, setUsername, setLastname, setRole, setEmail, setPassword, setToken, setUserId, setUsers, setCategories, setComments, setLikes, setUserImage, setBirthdate, setUserPhone, editUser, getUsers, setThemes, addTheme, editTheme, getThemes, deleteTheme, setThemeCategory, setThemeContent, setThemeTitle, setThemeAuthor, getCategories, setSelectedCategory, getComments, addComment, setCommentAuthor, setCommentContent, setThemeActive, deactiveTheme, setCategoryName, addCategory, deleteCategory, deleteComment, deactiveUser, addLike, setLikeComment, setLikeTheme, setLikeUser, getLikes, deleteLike, setThemeId, editCategory, editComment}

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
