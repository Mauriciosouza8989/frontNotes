import { useState } from "react";
import { Container, Form, Avatar } from "./style";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import {FiUser, FiLock, FiMail, FiArrowLeft, FiCamera} from "react-icons/fi"
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/avatarPlaceholder.svg"


export function Profile(){
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarURL);
    const [newAvatar, setNewAvatar] = useState(null);
    const navigate = useNavigate()

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: newPassword,
            oldPassword: oldPassword,
        }

        const userUpdated = Object.assign(user, updated);

        await updateProfile({user: userUpdated, newAvatar})
    }

    function handleUpdateAvatar(event){
        const file = event.target.files[0];
        setNewAvatar(file);
        
        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }
    function handleBack(){
        navigate(-1)
      }



    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft />
                </button>
            </header>


            <Form>
                <Avatar>
                    <img src={avatar} alt={user.name} />

                    <label htmlFor="avatar">
                        <FiCamera />
                            <input 
                            id="avatar" 
                            type="file"
                            onChange={handleUpdateAvatar}
                            />
                    </label>
                </Avatar>
                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    value = {email}
                    onChange={e => setEmail(e.target.value)}

                />
                
                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setOldPassword(e.target.value)}

                />
                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setNewPassword(e.target.value)}
                />
                
                <Button title="Salvar" onClick={handleUpdate}/>
               
            </Form>
        </Container>
    )
}