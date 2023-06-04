import { useState } from "react";
import { Container, Form } from "./style";
import { Header } from "../../components/header";
import { Input }from "../../components/input";
import { TextArea }from "../../components/TextArea";
import { Button }from "../../components/button";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/section";

import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import { ButtonText } from "../../components/buttonText";



export function New(){

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddLink = ()=>{
        if(newLink) {
            setLinks(prevState => [...prevState, newLink]);
            setNewLink("");
        }
    }
    const handleRemoveLink = (deleted)=>{
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const handleAddTag = ()=>{
        if(newTag){
            setTags(prevState => [...prevState, newTag]);
            setNewTag("");
        }
        return
    };
    const handleRemoveTag = (deleted)=>{
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote(){
        if(!title){
            return alert("Digite o título da nota!")
        }
       
        if(newLink){
            return alert("Você deixou um link sem adicionar. Clique em adicionar, ou deixe o campo vazio!")
        }
        if(newTag){
            return alert("Você deixou uma tag sem adicionar. Clique em adicionar, ou deixe o campo vazio!")
        }

        await api.post('/notes',{
            title,
            description,
            tags, 
            links
        })
        alert("Nota criada com sucesso!");
        navigate(-1)
    }
    function handleBack(){
        navigate(-1)
      }

    return(
        <Container>
            <Header />
            <main>
                <Form> 
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title="Voltar" onClick={handleBack}/>
                    </header>
                    <Input 
                    placeholder="Título"
                    onChange={e=> setTitle(e.target.value)}
                    />

                    <TextArea 
                    placeholder="Observações"
                    onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links úteis">

                        {
                            links.map((link, index)=>(
                                <NoteItem
                                    key={String(index)}
                                    value={link} 
                                    onClick={()=>{
                                        handleRemoveLink(link);
                                    }}  
                                />
                            ))
                        }
                        
                        <NoteItem 
                            isNew
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)} 
                            onClick={handleAddLink}
                         />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags"> 
                            {
                                tags.map((tag, index) =>(
                                    <NoteItem 
                                        key={index}
                                        value={tag}
                                        onClick={()=>{handleRemoveTag(tag)}}
                                    />
                                ))
                            }
                            
                            <NoteItem 
                                isNew 
                                placeholder="Nova tag"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)} 
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                <Button 
                    title="Salvar"
                    onClick={handleNewNote}
                />

                </Form>
            </main>

        </Container>
    )
}