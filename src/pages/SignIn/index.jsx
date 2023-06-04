import { Container, Form, Background } from "./style";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { FiLock, FiMail} from "react-icons/fi"
import { Link } from "react-router-dom";

import { useState } from "react";

import {useAuth} from '../../hooks/auth';

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { signIn } = useAuth();

    function handleSigIn(){
        signIn({ email, password });
    }

    return(
        <Container>
            <Form>
                <h1>Rocketnotes</h1>
                <p>Aplicação para gerenciar e salvar seus links úteis.</p>

                <h2>Faça seu login</h2>

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    onChange={e=> setEmail(e.target.value)}
                />
                <Input 
                    placeholder="Senha"
                    type="Password"
                    icon={FiLock}
                    onChange={e=> setPassword(e.target.value)}
                />
                <Button title="Entrar" onClick={handleSigIn}/>
                <Link to="/register">Criar conta</Link>
                
            </Form>

            <Background />
        </Container>
    )
}