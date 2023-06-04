import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Brand, Menu, Search, Content, NewNote } from './style'
import { Header } from '../../components/header'
import { Input} from '../../components/input'
import { ButtonText } from '../../components/buttonText'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { Section } from '../../components/section'
import { Note } from '../../components/note'

import { api } from '../../services/api'

export function Home(){

    const [tags, setTags] = useState([])
    const [tagSelected, setTagSelected] = useState([])
    const [notes, setNotes] = useState([])
    const [search, setSearch] = useState([])

    const navigate = useNavigate()

    function handleTagSelected(tagName){
        if(tagName === "all"){
            return setTagSelected([])
        }
        const alredySelected = tagSelected.includes(tagName)
        if(alredySelected){
            const filteredTags = tagSelected.filter(tag => tag !== tagName)
            setTagSelected(filteredTags)
        }else{
            setTagSelected(prevstate=> [...prevstate, tagName])
        }

    }

    function handleDetails(id){
        navigate(`/details/${id}`)
    }

    useEffect(() =>{
        async function fetchTags(){
            const response = await api.get(`/tags`);
            setTags(response.data);
        }
        
        fetchTags();
    }, [])

    useEffect(() =>{
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagSelected}`);
            setNotes(response.data);
        }
        fetchNotes();
    },[search, tagSelected])

    

    return(
        <Container>
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos" 
                        onClick={()=> handleTagSelected("all")}  
                        isActive={tagSelected.length === 0}
                         
                    />
                </li>
                
                {
                    tags && tags.map(tag =>{
                        return(<li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name} 
                                onClick={()=> handleTagSelected(tag.name)}
                                isActive={tagSelected.includes(tag.name)} 
                            />
                        </li>)
                    })
                }
                
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    icon={FiSearch}
                    onChange={e => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map((note) => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                    
                </Section>
            </Content>

            <NewNote  to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
}