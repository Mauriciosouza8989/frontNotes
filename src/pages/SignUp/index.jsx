import { Container, Form, Background } from "./style";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { FiLock, FiUser, FiMail} from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { api } from "../../services/api"

export function SignUp(){
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navegate = useNavigate();

    function handleSignUp(){
        if(!name || !email || !password){
            return alert("Por favor, preencha todos os campos...");
        }

        api.post("/users", {name, email, password})
        .then(()=>{
            alert("Usuário cadastrado com sucesso!");
            navegate("/")
        })
        .catch(err => {
            if(err.response){
                alert(err.response.data.message);
            }else{
                alert("Não foi possível cadastrar!")
            }
        })
    }

    return(
        <Container>
                <Background />
            <Form>

                <h1>Rocketnotes</h1>
                <p>Aplicação para gerenciar e salvar seus links úteis.</p>

                <h2>Crie sua conta</h2>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={e=> setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    onChange={e=> setemail(e.target.value)}
                />
                <Input 
                    placeholder="Senha"
                    type="Password"
                    icon={FiLock}
                    onChange={e=> setpassword(e.target.value)}
                />
                <Button title="Cadastrar" onClick={handleSignUp} />
                <Link to="/">Voltar para o login</Link>
                
            </Form>

        </Container>
    )
}