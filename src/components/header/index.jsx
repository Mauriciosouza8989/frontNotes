import { Container, Profile } from "./style"
import { RiShutDownLine} from "react-icons/ri"
import { Logout } from "./style"

import { useAuth } from "../../hooks/auth"
import {api} from "../../services/api"
import { useNavigate } from "react-router-dom"
const avatarPlaceholder = "../../assets/avatarPlaceholder.svg"

export function Header(){
    const { signOut, user } = useAuth()
    let avatarURL;
    const navigate = useNavigate()

    
    if(user.avatar == null){
        avatarURL = avatarPlaceholder
    }else{
        avatarURL = `${api.defaults.baseURL}/files/${user.avatar}`
    }

    function handleSignOut(){
        navigate("/")
        signOut()
    }
    return (
        <Container>
            <Profile to="/profile">
                <img src={avatarURL} alt="imagem do usuario" />
                <div>
                    <span>Bem vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}